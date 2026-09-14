import React, { memo } from 'react';
import { CONTACT_ID, CONTACT_LABEL } from '../constants';
import MailIcon from './MailIcon';

const ContactButton = memo(() => (
  <a className="sp-contact" href={`#${CONTACT_ID}`}>
    <MailIcon />
    {CONTACT_LABEL}
  </a>
));

ContactButton.displayName = 'ContactButton';

export default ContactButton;
