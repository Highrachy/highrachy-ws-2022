import Router from 'next/router';
import React from 'react';

const Logout = () => {
  Router.push('/admin');
  return <div></div>;
};

export default Logout;
