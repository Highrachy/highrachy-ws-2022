import useWindowSize from '@/hooks/useWindowSize';
import { getMenuStateFromStore } from '@/utils/localStorage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Overlay } from 'react-bootstrap';
import { FiMenu } from 'react-icons/fi';
import Button from '../forms/Button';
import Sidebar from './Sidebar';
import TopTitle from './TopTitle';

const Backend = ({ children, title }) => {
  const { width } = useWindowSize();
  const isDesktop = width > 991;

  const menuState = getMenuStateFromStore();

  const [isFolded, setIsFolded] = React.useState(true);

  React.useEffect(() => {
    isDesktop && setIsFolded(menuState);
  }, [menuState, isDesktop]);

  return (
    <section className="admin-container">
      {!isDesktop && !isFolded && <Overlay />}
      <Sidebar
        isFolded={isFolded}
        setIsFolded={setIsFolded}
        isDesktop={isDesktop}
      />
      <div
        className={`content-wrapper px-3 px-md-6 py-md-5 py-2 min-vh-100 bg-light ${
          isFolded ? 'content-folded' : ''
        }`}
      >
        {!isDesktop && (
          <div className="d-flex justify-content-between pb-2 border-bottom mt-3 mb-4">
            <Link href="/" passHref>
              <a>
                <Image
                  src="/logo.png"
                  alt="Highrachy"
                  width="142"
                  height="42"
                />
              </a>
            </Link>
            <Button
              color="none"
              className="btn-sm ms-auto btn-outline-dark"
              onClick={() => setIsFolded(!isFolded)}
            >
              <FiMenu /> Menu
            </Button>
            &nbsp;&nbsp;
          </div>
        )}

        {title && <TopTitle>{title}</TopTitle>}
        {children}
      </div>
    </section>
  );
};
export default Backend;
