import React from 'react';

const FooterColumn = ({ title, ariaLabel, links }) => (
  <nav className="col" aria-label={ariaLabel}>
    <h3 className="col-title">{title}</h3>
    <ul className="link-list">
      {links.map((label) => (
        <li key={label}>
          <a href="#">{label === "Where's My Order" ? "Where\u2019s My Order" : label}</a>
        </li>
      ))}
    </ul>
  </nav>
);

export default FooterColumn;
