import React from 'react';
import PropTypes from 'prop-types';
import {
  EmailShareButton,
  FacebookShareButton,
  // LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  // LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

const CONTENT_BODY = `Hi there! Join Ballers today -- the easiest way to become a Landlord`;

const Sharer = ({ shareUrl, content, shareText }) => (
  <ul className="list-inline icon-md">
    {shareText && <li className="list-inline-item">{shareText}</li>}
    <li className="list-inline-item">
      <FacebookShareButton quote={content} url={shareUrl}>
        <FacebookIcon round width="48" />
      </FacebookShareButton>
    </li>
    <li className="list-inline-item">
      <TwitterShareButton title={CONTENT_BODY} url={shareUrl}>
        <TwitterIcon round width="48" />
      </TwitterShareButton>
    </li>
    {/* <li>
      <LinkedinShareButton source={shareUrl} summary={content} title="Ballers">
        <LinkedinIcon round width="48" />
      </LinkedinShareButton>
    </li> */}
    <li className="list-inline-item">
      <WhatsappShareButton separator=":: " title={content} url={shareUrl}>
        <WhatsappIcon round width="48" />
      </WhatsappShareButton>
    </li>
    <li className="list-inline-item">
      <EmailShareButton
        body={content}
        subject={`Hey Friend! Check out Highrachy ${shareUrl}`}
      >
        <EmailIcon round width="48" />
      </EmailShareButton>
    </li>
  </ul>
);

Sharer.propTypes = {
  content: PropTypes.string,
  shareUrl: PropTypes.string,
};

Sharer.defaultProps = {
  content: CONTENT_BODY,
  shareUrl: 'https://duvlive.com',
};
export default Sharer;
