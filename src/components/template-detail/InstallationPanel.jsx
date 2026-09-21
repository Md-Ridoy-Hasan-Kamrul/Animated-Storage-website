import React, { memo, useCallback, useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';
import {
  KMOTION_PACKAGE,
  KMOTION_STACKS,
  getKmotionNpmSnippet,
} from '../../utils/kmotionNpmSnippet';
import HighlightedCode from './HighlightedCode';

export const PACKAGE_MANAGERS = [
  { id: 'npm', label: 'npm', command: (pkg) => `npm install ${pkg}` },
  { id: 'pnpm', label: 'pnpm', command: (pkg) => `pnpm add ${pkg}` },
  { id: 'bun', label: 'bun', command: (pkg) => `bun add ${pkg}` },
  { id: 'yarn', label: 'yarn', command: (pkg) => `yarn add ${pkg}` },
];

const COPY_ICON_SIZE = 16;

/** Drop the shared `npm install` line — framework snippets differ only after that. */
export function usageBodyForStack(templateId, stack) {
  const full = getKmotionNpmSnippet(templateId, stack);
  const lines = full.split('\n');
  return lines.slice(2).join('\n');
}

function CopyIconButton({ copied, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="shrink-0 cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-white/5 hover:text-white"
    >
      {copied ? (
        <Check size={COPY_ICON_SIZE} className="text-emerald-400" />
      ) : (
        <Copy size={COPY_ICON_SIZE} />
      )}
    </button>
  );
}

function StepMarker({ n, last }) {
  return (
    <div className="flex w-7 shrink-0 flex-col items-center">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-[#161616] text-[13px] font-medium text-white"
        aria-hidden
      >
        {n}
      </span>
      {last ? null : <span className="mt-2 w-px flex-1 bg-white/10" aria-hidden />}
    </div>
  );
}

/**
 * Two-step install under the live preview.
 * Step 1 is the same package for every framework (npm / pnpm / bun / yarn).
 * Step 2 is the framework-specific Preview import.
 */
const InstallationPanel = memo(function InstallationPanel({ templateId }) {
  const [manager, setManager] = useState('npm');
  const [stack, setStack] = useState('react');
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedUsage, setCopiedUsage] = useState(false);

  const installCommand = useMemo(() => {
    const active = PACKAGE_MANAGERS.find((item) => item.id === manager) || PACKAGE_MANAGERS[0];
    return active.command(KMOTION_PACKAGE);
  }, [manager]);

  const usageBody = useMemo(
    () => (templateId ? usageBodyForStack(templateId, stack) : ''),
    [templateId, stack],
  );

  const copyInstall = useCallback(async () => {
    try {
      await copyTextToClipboard(installCommand);
      toast.success('Install command copied');
      setCopiedInstall(true);
      window.setTimeout(() => setCopiedInstall(false), 1600);
    } catch {
      toast.error('Copy failed');
    }
  }, [installCommand]);

  const copyUsage = useCallback(async () => {
    if (!usageBody) return;
    try {
      await copyTextToClipboard(usageBody);
      toast.success('Import copied');
      setCopiedUsage(true);
      window.setTimeout(() => setCopiedUsage(false), 1600);
    } catch {
      toast.error('Copy failed');
    }
  }, [usageBody]);

  return (
    <section className="pt-1" aria-labelledby="installation-heading">
      <h2
        id="installation-heading"
        className="text-[28px] font-semibold tracking-tight text-white sm:text-[32px]"
      >
        Installation
      </h2>

      <div className="relative mt-6 flex gap-4">
        <StepMarker n="1" />
        <div className="min-w-0 flex-1 pb-8">
          <h3 className="text-[17px] font-medium text-white">Install the package</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-zinc-500">
            Add <code className="text-zinc-300">{KMOTION_PACKAGE}</code> to your project. The
            package is the same for React, Vue, Svelte, Solid, and JS:
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0C]">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-3 sm:px-4">
              <div
                className="flex min-w-0 items-center gap-4 overflow-x-auto"
                role="tablist"
                aria-label="Package manager"
              >
                {PACKAGE_MANAGERS.map(({ id, label }) => {
                  const selected = manager === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setManager(id)}
                      className={
                        selected
                          ? 'relative cursor-pointer py-3 text-[13px] font-medium text-white after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-white'
                          : 'cursor-pointer py-3 text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-300'
                      }
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <CopyIconButton
                copied={copiedInstall}
                label="Copy install command"
                onClick={copyInstall}
              />
            </div>
            <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-zinc-100 sm:text-[14px]">
              <code>{installCommand}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="relative flex gap-4">
        <StepMarker n="2" last />
        <div className="min-w-0 flex-1 pb-2">
          <h3 className="text-[17px] font-medium text-white">Import the preview</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-zinc-500">
            Install stays the same. Only the import changes by framework:
          </p>

          <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0C]">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-3 sm:px-4">
              <div
                className="flex min-w-0 items-center gap-4 overflow-x-auto"
                role="tablist"
                aria-label="Preview framework"
              >
                {KMOTION_STACKS.map(({ id, label }) => {
                  const selected = stack === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setStack(id)}
                      className={
                        selected
                          ? 'relative cursor-pointer py-3 text-[13px] font-medium text-white after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-white'
                          : 'cursor-pointer py-3 text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-300'
                      }
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <CopyIconButton copied={copiedUsage} label="Copy import" onClick={copyUsage} />
            </div>
            <div className="px-4 py-4">
              <HighlightedCode source={usageBody} tabId="usage" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

InstallationPanel.displayName = 'InstallationPanel';

export default InstallationPanel;
