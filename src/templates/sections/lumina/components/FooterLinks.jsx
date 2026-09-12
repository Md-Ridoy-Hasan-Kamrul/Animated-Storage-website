import React from 'react';
import { LINK_COLUMNS } from '../constants';

const FooterLinks = () => (
  <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-7">
    {LINK_COLUMNS.map((column) => (
      <div key={column.id}>
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
          {column.title}
        </h3>
        <ul className="space-y-2 text-xs">
          {column.links.map((label) => (
            <li key={label}>
              <a href="#" className="transition-colors hover:text-white">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default FooterLinks;
