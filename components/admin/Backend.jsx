import useWindowSize from '@/hooks/useWindowSize';
import { getMenuStateFromStore } from '@/utils/localStorage';
import React from 'react';
import { Overlay } from 'react-bootstrap';
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
        className={`content-wrapper px-6 py-5 min-vh-100 bg-light ${
          isFolded ? 'content-folded' : ''
        }`}
      >
        {!isDesktop && (
          <Button onClick={() => setIsFolded(!isFolded)}>Menu</Button>
        )}

        {title && <TopTitle>{title}</TopTitle>}
        {children}
      </div>
    </section>
  );
};
export default Backend;
