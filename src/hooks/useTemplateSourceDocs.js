import { useEffect, useMemo, useState } from 'react';
import {
  fetchCodeSource,
  resolveTemplateSourceDocs,
} from '../utils/resolveTemplateSourceDocs';

/**
 * Resolves Usage / Code / Skill.md for a template card.
 * Usage + Skill are sync; Code hydrates from codeUrl only when requested
 * (avoids downloading multi-MB HTML while the user is still on Usage).
 *
 * @param {object} template
 * @param {{ loadCode?: boolean }} [options]
 */
export function useTemplateSourceDocs(template, options = {}) {
  const loadCode = options.loadCode === true;
  const base = useMemo(() => resolveTemplateSourceDocs(template), [template]);
  const [code, setCode] = useState(base.code);
  const [codeStatus, setCodeStatus] = useState(
    base.code ? 'ready' : loadCode ? 'loading' : 'idle',
  );

  useEffect(() => {
    let cancelled = false;
    setCode(base.code);

    if (base.code) {
      setCodeStatus('ready');
      return undefined;
    }

    if (!loadCode) {
      setCodeStatus('idle');
      return undefined;
    }

    if (!template?.id && !template?.codeUrl && !template?.sourceUrl) {
      setCodeStatus('empty');
      return undefined;
    }

    setCodeStatus('loading');
    fetchCodeSource(template).then((body) => {
      if (cancelled) return;
      setCode(body);
      setCodeStatus(body ? 'ready' : 'empty');
    });

    return () => {
      cancelled = true;
    };
  }, [template, base.code, loadCode]);

  return {
    usage: base.usage,
    code,
    skill: base.skill,
    codeStatus,
    componentName: base.componentName,
  };
}
