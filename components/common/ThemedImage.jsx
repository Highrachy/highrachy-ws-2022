import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const ThemedImage = ({ alt, src, darkSrc, width, height }) => {
  return (
    <div>
      {/* When the theme is dark, hide this span */}
      <span data-hide-on-theme="dark">
        <Image alt={alt} src={src} width={width} height={height} />
      </span>

      {/* When the theme is light, hide this span */}
      <span data-hide-on-theme="light">
        <Image alt={alt} src={darkSrc} width={width} height={height} />
      </span>
    </div>
  );
};

ThemedImage.propTypes = {
  src: PropTypes.string.isRequired,
  darkSrc: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default ThemedImage;
