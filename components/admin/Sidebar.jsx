import { adminMenu, contentMenu, normalMenu } from '@/data/adminMenu';
import { getRoleStateFromStore, storeMenuState } from '@/utils/localStorage';
import { UserContext } from 'context/user';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useRouter } from 'next/router';
import HighrachyLogo from '../utils/HighrachyLogo';
import { USER_ROLE } from '@/utils/constants';

const Sidebar = ({ isFolded, setIsFolded, isDesktop }) => {
  const handleMenuState = () => {
    const newState = !isFolded;
    setIsFolded(newState);
    isDesktop && storeMenuState(newState);
  };

  const allMenus = {
    [USER_ROLE.ADMIN]: adminMenu,
    [USER_ROLE.CONTENT]: contentMenu,
    [USER_ROLE.NORMAL]: normalMenu,
  };

  const currentRole = getRoleStateFromStore();
  const currentMenu = allMenus[currentRole] || normalMenu;

  const { doLogout } = useContext(UserContext);
  const router = useRouter();
  return (
    <div className={` ${isFolded ? 'sidebar-folded' : 'sidebar-open'}`}>
      <nav className="dashboard-sidebar">
        <div className="sidebar-header">
          {!isFolded &&
            (isDesktop ? (
              <HighrachyLogo />
            ) : (
              <h5 className="text-dark">Menu</h5>
            ))}
          <div
            className={`sidebar-toggler ${!isDesktop ? 'icon-md' : ''}`}
            onClick={handleMenuState}
          >
            {isFolded ? <FiMenu /> : <FiX />}
          </div>
        </div>
        <div className="sidebar-body">
          <ul className="nav">
            {Object.entries(currentMenu).map(([title, icon], index) => (
              <li key={index} className="nav-item">
                {title !== 'Logout' ? (
                  <Link href={`/admin/${title.toLowerCase()}`} passHref>
                    <a className="nav-link">
                      <span className="link-icon">{icon}</span>
                      {!isFolded && <span className="link-title">{title}</span>}
                    </a>
                  </Link>
                ) : (
                  <div
                    onClick={() => {
                      doLogout();
                    }}
                    className="nav-link"
                  >
                    <span className="link-icon">{icon}</span>
                    {!isFolded && <span className="link-title">Logout</span>}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
