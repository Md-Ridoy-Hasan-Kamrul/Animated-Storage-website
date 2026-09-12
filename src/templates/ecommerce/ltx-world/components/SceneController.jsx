import React, { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';
import { BRANCHES, RESET_LABEL, SELECT_LABEL } from '../constants';
import { useGlassPointer } from '../hooks/useGlassPointer';
import {
  isBranchControlDisabled,
  isBranchControlHidden,
} from '../utils/controllerAccess';
import {
  applyCapsuleTravel,
  clearCapsuleTravel,
  shouldPinActiveLabel,
  shouldShowReset,
} from '../utils/capsuleTravel';

const SceneController = memo(
  ({
    controllerMode,
    activeBranchId,
    pairReady,
    locked,
    onBranchClick,
    onPointerMove,
  }) => {
    const [highlight, setHighlight] = useState(0);
    const controllerRef = useRef(null);
    const cellRefs = useRef({});
    const trackGlass = useGlassPointer();

    const collapsed = controllerMode === 'collapsed';
    const selected = controllerMode === 'selected';
    const reversing = controllerMode === 'reversing';
    const expanded = controllerMode === 'expanded';

    useLayoutEffect(() => {
      const controller = controllerRef.current;
      const pin = () => {
        Object.entries(cellRefs.current).forEach(([id, node]) => {
          if (!node || !controller) return;
          if (shouldPinActiveLabel(controllerMode) && id === activeBranchId) {
            applyCapsuleTravel(node, controller);
            return;
          }
          clearCapsuleTravel(node);
        });
      };

      pin();
      window.addEventListener('resize', pin);
      return () => window.removeEventListener('resize', pin);
    }, [activeBranchId, controllerMode]);

    const handleLeave = useCallback(() => {
      if (!expanded) return;
      const focused = document.activeElement;
      const stillOnButton = BRANCHES.some(
        (branch) => cellRefs.current[branch.id] === focused,
      );
      if (!stillOnButton) setHighlight(0);
    }, [expanded]);

    const moveHighlight = useCallback(
      (index) => {
        if (!expanded || locked) return;
        setHighlight(index);
      },
      [expanded, locked],
    );

    return (
      <div
        ref={controllerRef}
        className={`controller ${controllerMode}${highlight > 0 ? ' is-dim' : ''}`}
        data-highlight={highlight}
        role="group"
        aria-label="Scene state controller"
        onPointerMove={(event) => {
          trackGlass(event);
          onPointerMove?.(event);
        }}
        onPointerLeave={handleLeave}
      >
        <div className="glass track" />
        <div className="glass capsule" />
        <div className="cells">
          <div className="cell cell-label">{SELECT_LABEL}</div>
          {BRANCHES.map((branch, index) => {
            const isActive = activeBranchId === branch.id;
            const hidden = isBranchControlHidden({
              selected,
              collapsed,
              reversing,
              isActive,
            });
            const disabled = isBranchControlDisabled({
              locked,
              ready: pairReady[branch.id],
              selected,
              collapsed,
              reversing,
              isActive,
            });
            return (
              <button
                key={branch.id}
                type="button"
                ref={(node) => {
                  cellRefs.current[branch.id] = node;
                }}
                className={`cell${isActive ? ' is-active' : ' is-other'}`}
                disabled={disabled}
                aria-hidden={hidden ? 'true' : undefined}
                tabIndex={hidden ? -1 : 0}
                onMouseEnter={() => moveHighlight(index + 1)}
                onFocus={() => moveHighlight(index + 1)}
                onClick={(event) => {
                  setHighlight(0);
                  onBranchClick(branch.id, event.currentTarget);
                }}
              >
                {shouldShowReset(controllerMode, isActive) ? RESET_LABEL : branch.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

SceneController.displayName = 'SceneController';

export default SceneController;
