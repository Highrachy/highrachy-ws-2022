/* eslint-disable @next/next/no-img-element */
import { adminMenu } from '@/data/adminMenu';
import { storeMenuState } from '@/utils/localStorage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = ({ isFolded, setIsFolded, isDesktop }) => {
  const handleMenuState = () => {
    const newState = !isFolded;
    setIsFolded(newState);
    isDesktop && storeMenuState(newState);
  };

  return (
    <div className={` ${isFolded ? 'sidebar-folded' : 'sidebar-open'}`}>
      <nav className="dashboard-sidebar">
        <div className="sidebar-header" onClick={handleMenuState}>
          {!isFolded && (
            <Image
              src="/logo.png"
              alt="Highrachy"
              width={isDesktop ? '142' : '71'}
              height={isDesktop ? '42' : '21'}
            />
          )}
          <div className={'sidebar-toggler'}>
            {isFolded ? <FiMenu /> : <FiX />}
          </div>
        </div>
        <div className="sidebar-body">
          <ul className="nav">
            {Object.entries(adminMenu).map(([title, icon], index) => (
              <li key={index} className="nav-item">
                <Link href={`/admin/${title.toLowerCase()}`} passHref>
                  <a className="nav-link">
                    <span className="link-icon">{icon}</span>
                    {!isFolded && <span className="link-title">{title}</span>}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
