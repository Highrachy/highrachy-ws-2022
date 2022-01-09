import React from 'react';
import { RightAngleIcon } from './Icons';

const AngleList = ({ text, active }) => (
  <div className="col-lg-6 col-md-6 col-sm-12">
    <a className="btn-angle-list text-reset" href="#">
      <RightAngleIcon />
      <span>{text}</span>
    </a>
  </div>
);

export default AngleList;
