import React, { memo } from 'react';
import {
  BAZAAR_COPY,
  BAZAAR_HEADING,
  BRIDGE_COPY,
  BRIDGE_FACTS,
  BRIDGE_HEADING,
  NOTE_BUTTON,
} from '../constants';

export const StoryPanelBridge = memo(() => (
  <section className="story-panel story-panel-bridge" id="bridge" aria-label="Old Bridge details">
    <h2>{BRIDGE_HEADING}</h2>
    <p>{BRIDGE_COPY}</p>
    <dl className="facts">
      {BRIDGE_FACTS.map((fact) => (
        <div key={fact.dt}>
          <dt>{fact.dt}</dt>
          <dd>{fact.dd}</dd>
        </div>
      ))}
    </dl>
  </section>
));

StoryPanelBridge.displayName = 'StoryPanelBridge';

export const StoryPanelBazaar = memo(() => (
  <section className="story-panel story-panel-bazaar" id="bazaar" aria-label="Old town details">
    <h2>{BAZAAR_HEADING}</h2>
    <p>{BAZAAR_COPY}</p>
    <button type="button" className="note-button">
      <span aria-hidden="true">↗</span>
      <span>{NOTE_BUTTON}</span>
    </button>
  </section>
));

StoryPanelBazaar.displayName = 'StoryPanelBazaar';
