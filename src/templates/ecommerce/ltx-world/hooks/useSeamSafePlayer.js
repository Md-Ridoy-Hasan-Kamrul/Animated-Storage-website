import { useCallback, useRef, useState } from 'react';
import {
  ANNOUNCE_BASE,
  ANNOUNCE_ERROR,
  ANNOUNCE_RESET_ERROR,
  BASE_CLIP_KEY,
  BRANCHES,
  STATUS_FORWARD_ERROR,
  STATUS_REVERSE_ERROR,
} from '../constants';
import {
  canStartForward,
  canStartReverse,
  getHoldAtSeconds,
  getTitleHideDelaySeconds,
  isSameBranchSelected,
} from '../utils/sceneMachine';
import { commitHeldFrame } from '../utils/commitHeldFrame';
import { restoreFocusedControl } from '../utils/restoreFocusedControl';
import { waitForFirstFrame, waitForSeeked } from '../utils/waitForFirstFrame';

const findBranch = (id) => BRANCHES.find((branch) => branch.id === id);

export function useSeamSafePlayer(videosRef, announce) {
  const [scene, setScene] = useState('base');
  const [playback, setPlayback] = useState('loading');
  const [visibleKey, setVisibleKey] = useState(BASE_CLIP_KEY);
  const [titleHidden, setTitleHidden] = useState(false);
  const [controllerMode, setControllerMode] = useState('expanded');
  const [activeBranchId, setActiveBranchId] = useState(null);
  const [statusError, setStatusError] = useState('');
  const [retryBranch, setRetryBranch] = useState(null);

  const lockRef = useRef(false);
  const tokenRef = useRef(0);
  const visibleKeyRef = useRef(BASE_CLIP_KEY);
  const sceneRef = useRef('base');
  const focusRestoreRef = useRef(null);

  const getToken = useCallback(() => tokenRef.current, []);

  const setVisibleClip = useCallback((nextKey) => {
    visibleKeyRef.current = nextKey;
    setVisibleKey(nextKey);
  }, []);

  const holdUntilTerminal = useCallback((video, branchId, direction, token) => {
    const holdAt = getHoldAtSeconds(
      findBranch(branchId),
      direction,
      video.duration,
    );

    return new Promise((resolve, reject) => {
      const onEnded = () => finish();
      const onTime = () => {
        if (tokenRef.current !== token) return;
        if (video.currentTime >= holdAt) finish();
      };
      const finish = () => {
        video.removeEventListener('timeupdate', onTime);
        video.removeEventListener('ended', onEnded);
        if (tokenRef.current !== token) {
          reject(new Error('stale'));
          return;
        }
        commitHeldFrame(video);
        resolve();
      };
      video.addEventListener('timeupdate', onTime);
      video.addEventListener('ended', onEnded);
      onTime();
    });
  }, []);

  const playClip = useCallback(
    async (clipKey, branchId, direction, token) => {
      const video = videosRef.current[clipKey];
      if (!video) throw new Error('Missing clip');

      video.pause();
      await waitForSeeked(video);
      if (tokenRef.current !== token) throw new Error('stale');

      const playPromise = video.play();
      const framePromise = waitForFirstFrame(video, token, getToken);
      await Promise.all([playPromise, framePromise]);
      if (tokenRef.current !== token) throw new Error('stale');

      setVisibleClip(clipKey);
      setPlayback('playing');
      await holdUntilTerminal(video, branchId, direction, token);
    },
    [getToken, holdUntilTerminal, setVisibleClip, videosRef],
  );

  const runForward = useCallback(
    async (branchId, restoreFocus) => {
      const branch = findBranch(branchId);
      if (!branch || lockRef.current || !canStartForward(sceneRef.current)) return;

      lockRef.current = true;
      const token = tokenRef.current + 1;
      tokenRef.current = token;
      focusRestoreRef.current = restoreFocus;
      setStatusError('');
      setRetryBranch(null);
      setPlayback('starting');
      setControllerMode('collapsed');
      setActiveBranchId(branchId);
      announce(`Playing ${branch.label}`);

      const hideTimer = window.setTimeout(() => {
        if (tokenRef.current === token) setTitleHidden(true);
      }, getTitleHideDelaySeconds(branch.forwardDuration) * 1000);

      try {
        await playClip(`${branchId}-forward`, branchId, 'forward', token);
        if (tokenRef.current !== token) return;
        sceneRef.current = branchId;
        setScene(branchId);
        setControllerMode('selected');
        setPlayback('ready');
        announce(`${branch.label} selected. Reset to return.`);
        restoreFocusedControl(focusRestoreRef.current);
      } catch (error) {
        if (error?.message === 'stale') return;
        setPlayback('error');
        setControllerMode('expanded');
        setActiveBranchId(null);
        setTitleHidden(false);
        setStatusError(STATUS_FORWARD_ERROR);
        setRetryBranch({ id: branchId, direction: 'forward' });
        announce(ANNOUNCE_ERROR);
      } finally {
        window.clearTimeout(hideTimer);
        if (tokenRef.current === token) lockRef.current = false;
      }
    },
    [announce, playClip],
  );

  const runReverse = useCallback(
    async (restoreFocus) => {
      const branchId = sceneRef.current;
      const branch = findBranch(branchId);
      if (!branch || lockRef.current || !canStartReverse(sceneRef.current)) return;

      lockRef.current = true;
      const token = tokenRef.current + 1;
      tokenRef.current = token;
      focusRestoreRef.current = restoreFocus;
      setStatusError('');
      setRetryBranch(null);
      setPlayback('starting');
      setControllerMode('reversing');
      announce(`Resetting ${branch.label}`);

      try {
        await playClip(`${branchId}-reverse`, branchId, 'reverse', token);
        if (tokenRef.current !== token) return;
        sceneRef.current = 'base';
        setScene('base');
        setTitleHidden(false);
        setControllerMode('expanded');
        setActiveBranchId(null);
        setPlayback('ready');
        announce(ANNOUNCE_BASE);
        restoreFocusedControl(focusRestoreRef.current);
      } catch (error) {
        if (error?.message === 'stale') return;
        setPlayback('error');
        setControllerMode('selected');
        setActiveBranchId(branchId);
        setStatusError(STATUS_REVERSE_ERROR);
        setRetryBranch({ id: branchId, direction: 'reverse' });
        announce(ANNOUNCE_RESET_ERROR);
      } finally {
        if (tokenRef.current === token) lockRef.current = false;
      }
    },
    [announce, playClip],
  );

  const handleBranchClick = useCallback(
    (branchId, buttonEl) => {
      if (lockRef.current) return;
      const restoreFocus = document.activeElement === buttonEl ? buttonEl : null;
      if (canStartForward(sceneRef.current)) {
        runForward(branchId, restoreFocus);
        return;
      }
      if (isSameBranchSelected(sceneRef.current, branchId) && canStartReverse(sceneRef.current)) {
        runReverse(restoreFocus);
      }
    },
    [runForward, runReverse],
  );

  const handleRetry = useCallback(() => {
    if (!retryBranch || lockRef.current) return;
    if (retryBranch.direction === 'reverse') {
      runReverse(null);
      return;
    }
    sceneRef.current = 'base';
    setScene('base');
    runForward(retryBranch.id, null);
  }, [retryBranch, runForward, runReverse]);

  const markReady = useCallback(() => {
    setPlayback((prev) => (prev === 'loading' ? 'ready' : prev));
  }, []);

  return {
    scene,
    playback,
    visibleKey,
    titleHidden,
    controllerMode,
    activeBranchId,
    statusError,
    lock: lockRef.current || playback === 'starting' || playback === 'playing',
    handleBranchClick,
    handleRetry,
    markReady,
  };
}
