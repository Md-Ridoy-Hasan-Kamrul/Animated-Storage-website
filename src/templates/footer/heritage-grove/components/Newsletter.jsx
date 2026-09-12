import React from 'react';
import { LETTER_COPY } from '../constants';
import { ArrowIcon } from './GroveIcons';

const Newsletter = () => (
  <div className="newsletter">
    <h3 className="col-title">The Letter</h3>
    <p>{LETTER_COPY}</p>
    <form className="subscribe" action="#" method="post">
      <label className="sr-only" htmlFor="nl-email">
        Email address
      </label>
      <input
        id="nl-email"
        type="email"
        name="email"
        placeholder="Leave your email"
        autoComplete="email"
        required
      />
      <button type="submit" aria-label="Subscribe">
        <ArrowIcon />
      </button>
    </form>
  </div>
);

export default Newsletter;
