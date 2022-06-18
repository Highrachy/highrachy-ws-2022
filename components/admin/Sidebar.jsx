/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';

import {
  FiBox,
  FiDownload,
  FiLogOut,
  FiMail,
  FiMenu,
  FiSettings,
  FiX,
  FiYoutube,
} from 'react-icons/fi';

const Sidebar = ({ isFolded, setIsFolded, isDesktop }) => (
  <div className={` ${isFolded ? 'sidebar-folded' : 'sidebar-open'}`}>
    <nav className="dashboard-sidebar">
      <div className="sidebar-header" onClick={() => setIsFolded(!isFolded)}>
        {!isFolded && (
          <Image
            src="/logo.png"
            alt="Highrachy"
            width={isDesktop ? '142' : '142'}
            height={isDesktop ? '42' : '42'}
          />
        )}
        <div className={'sidebar-toggler'}>
          {isFolded ? <FiMenu /> : <FiX />}
        </div>
      </div>
      <div className="sidebar-body">
        <ul className="nav">
          {menu.map(({ icon, title }, index) => (
            <li key={index} className="nav-item">
              <a href="dashboard.html" className="nav-link">
                <span className="link-icon">{icon}</span>
                {!isFolded && <span className="link-title">{title}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  </div>
);

const menu = [
  {
    icon: <FiBox />,
    title: 'Dashboard',
  },
  {
    icon: <FiDownload />,
    title: 'Downloads',
  },
  {
    icon: <FiMail />,
    title: 'Mail',
  },
  {
    icon: <FiYoutube />,
    title: 'Youtube',
  },
  {
    icon: <FiSettings />,
    title: 'Settings',
  },
  {
    icon: <FiLogOut />,
    title: 'Log out',
  },
];

export default Sidebar;
