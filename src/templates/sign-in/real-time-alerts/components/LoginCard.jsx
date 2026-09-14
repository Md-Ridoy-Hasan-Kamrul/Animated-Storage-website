import React, { memo } from 'react';
import {
  BADGE_COPY,
  EMAIL_ARIA,
  EMAIL_PLACEHOLDER,
  FOOTER_LEAD,
  FOOTER_LINK,
  START_FREE_HREF,
  GOOGLE_LABEL,
  H1_COPY,
  LOGIN_LABEL,
  OR_LABEL,
  PASSWORD_ARIA,
  PASSWORD_PLACEHOLDER,
  SUB_LEAD,
  SUB_TAIL,
} from '../constants';
import BadgeGlyph from './BadgeGlyph';
import GoogleMark from './GoogleMark';
import LoginArrow from './LoginArrow';

const LoginCard = memo(({ paneRef, cardRef, cardInRef }) => (
  <section className="pane" ref={paneRef}>
    <div className="card" id="card" ref={cardRef}>
      <div className="card-in" id="cardIn" ref={cardInRef}>
        <h1 className="col center" id="h1">
          {H1_COPY}
        </h1>
        <p className="col center" id="sub">
          <b>{SUB_LEAD}</b>
          {SUB_TAIL}
        </p>
        <div className="field" id="email">
          <input type="email" autoComplete="email" aria-label={EMAIL_ARIA} placeholder={EMAIL_PLACEHOLDER} />
        </div>
        <div className="field" id="pw">
          <input
            type="password"
            autoComplete="current-password"
            aria-label={PASSWORD_ARIA}
            placeholder={PASSWORD_PLACEHOLDER}
          />
        </div>
        <button type="button" id="loginBtn">
          <span>{LOGIN_LABEL}</span>
          <LoginArrow />
        </button>
        <div className="divider">
          <i />
          <b>{OR_LABEL}</b>
          <i />
        </div>
        <button type="button" id="gBtn">
          <GoogleMark />
          <span>{GOOGLE_LABEL}</span>
        </button>
        <p id="bottom">
          {FOOTER_LEAD}
          <a href={START_FREE_HREF}>{FOOTER_LINK}</a>
        </p>
      </div>
    </div>
  </section>
));

LoginCard.displayName = 'LoginCard';

export const HeroBadge = memo(() => (
  <div className="badge">
    <BadgeGlyph />
    <span id="badgeTxt">{BADGE_COPY}</span>
  </div>
));

HeroBadge.displayName = 'HeroBadge';

export default LoginCard;
