import classNames from 'classnames';
import Image from 'next/image';
import React from 'react';

const ImageBlock = ({ image, children, title, altBg }) => (
  <div className="container position-relative">
    <div className="row">
      <div
        className={classNames('col-sm-8', {
          'order-first': !altBg,
          'order-last': !!altBg,
          'offset-sm-4': !!altBg,
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
        className={classNames('col-sm-4 img-block__text p-5 rounded', {
          'order-first': !!altBg,
          'order-last': !altBg,
        })}
      >
        {children}
      </div>
    </div>
  </div>
);

export default ImageBlock;
