import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

const ImageBlock = ({ image, children, title, altBg }) => (
  <div className="container position-relative">
    <div className="row">
      <div
        className={classNames('col-md-8 p-0', {
          'order-md-first': !altBg,
          'order-md-last': !!altBg,
          'offset-md-4': !!altBg,
        })}
      >
        <Image
          src={image}
          alt={title}
          className="img-fluid"
          height="800"
          width="1200"
        />
      </div>
      <div
        className={classNames('col-md-4 img-block__text p-md-5 p-4 rounded', {
          'order-md-first alt': !!altBg,
          'order-md-last': !altBg,
        })}
      >
        {children}
      </div>
    </div>
  </div>
);

export default ImageBlock;
