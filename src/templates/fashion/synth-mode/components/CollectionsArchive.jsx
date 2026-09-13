import React from 'react';
import { COLLECTIONS, DRAWER_COLLECTIONS_SUB } from '../constants';

const CollectionsArchive = () => (
  <div>
    <p className="synth-body mb-6 font-jakarta font-semibold uppercase tracking-[0.18em] text-gray-500">
      {DRAWER_COLLECTIONS_SUB}
    </p>
    <ul className="space-y-6">
      {COLLECTIONS.map((item) => (
        <li key={item.id} className="border-b border-gray-200 pb-4">
          <p className="font-orbitron text-sm uppercase tracking-[0.08em]">{item.title}</p>
          <p className="synth-body mt-2 font-jakarta text-gray-600">{item.body}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default CollectionsArchive;
