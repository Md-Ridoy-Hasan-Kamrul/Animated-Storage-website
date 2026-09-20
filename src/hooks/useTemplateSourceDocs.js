import { useEffect, useMemo, useState } from 'react';
import {
  fetchCodeSource,
  resolveTemplateSourceDocs,
} from '../utils/resolveTemplateSourceDocs';

/**
 * Resolves Usage / Code / Skill.md for a template card.
 * Usage + Skill are sync; Code may hydrate from /effects/{id}.{js,html}.
 */
export function useTemplateSourceDocs(template) {
  const base = useMemo(() => resolveTemplateSourceDocs(template), [template]);
  const [code, setCode] = useState(base.code);
  const [codeStatus, setCodeStatus] = useState(base.code ? 'ready' : 'loading');

  useEffect(() => {
    let cancelled = false;
    setCode(base.code);
    if (base.code) {
      setCodeStatus('ready');
      return undefined;
    }
    if (!template?.id) {
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
  }, [template, base.code]);

  return {
    usage: base.usage,
    code,
    skill: base.skill,
    codeStatus,
    componentName: base.componentName,
  };
}
