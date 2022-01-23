import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

const ImageBlock = ({ image, children, title, altBg }) => (
  <div className="container position-relative">
    <div className="row">
      <div
        className={classNames('col-lg-8 p-0', {
          'order-lg-first': !altBg,
          'order-lg-last': !!altBg,
          'offset-lg-4': !!altBg,
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
        className={classNames('col-lg-4 img-block__text p-lg-5 p-4 rounded', {
          'order-lg-first alt': !!altBg,
          'order-lg-last': !altBg,
        })}
      >
        {children}
      </div>
    </div>
  </div>
);

export default ImageBlock;
