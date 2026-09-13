import React, { memo } from 'react';
import { PANELS } from '../constants';

const PanelStack = memo(({ panelRefs, onNavigate }) => (
  <main className="panels">
    {PANELS.map((panel, index) => (
      <section
        key={panel.id}
        className="panel"
        data-panel
        id={panel.id}
        ref={(node) => {
          panelRefs.current[index] = node;
        }}
      >
        <p className="eyebrow">
          {panel.eyebrow.map((part, partIndex) => (
            <span key={part}>
              {partIndex > 0 ? <span>&middot;</span> : null}
              {part}
            </span>
          ))}
        </p>
        <h1>
          {panel.titleLines.map((line, lineIndex) => (
            <span key={line}>
              {lineIndex > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </h1>
        <p className="sub">{panel.sub}</p>
        <div className="cta">
          <a
            className="pill"
            href={panel.ctaHref}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(panel.ctaHref);
            }}
          >
            {panel.ctaLabel}
          </a>
        </div>
      </section>
    ))}
  </main>
));

PanelStack.displayName = 'PanelStack';

export default PanelStack;
