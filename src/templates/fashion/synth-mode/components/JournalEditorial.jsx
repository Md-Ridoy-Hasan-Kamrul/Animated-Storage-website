import React from 'react';
import { DRAWER_JOURNAL_SUB, JOURNAL } from '../constants';

const JournalEditorial = () => (
  <div>
    <p className="synth-body mb-6 font-jakarta font-semibold uppercase tracking-[0.18em] text-gray-500">
      {DRAWER_JOURNAL_SUB}
    </p>
    <ul className="space-y-6">
      {JOURNAL.map((item) => (
        <li key={item.id} className="border-b border-gray-200 pb-4">
          <p className="synth-micro uppercase text-gray-500">{item.date}</p>
          <p className="font-orbitron mt-1 text-sm uppercase tracking-[0.08em]">{item.title}</p>
          <p className="synth-micro mt-2 uppercase text-gray-500">{item.read}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default JournalEditorial;
