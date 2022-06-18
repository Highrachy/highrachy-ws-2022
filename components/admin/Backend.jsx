import useWindowSize from '@/hooks/useWindowSize';
import { getMenuStateFromStore } from '@/utils/localStorage';
import React from 'react';
import { Overlay } from 'react-bootstrap';
import Button from '../forms/Button';
import Sidebar from './Sidebar';

const Backend = ({ children }) => {
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
      <div className={`content-wrapper ${isFolded ? 'content-folded' : ''}`}>
        {!isDesktop && (
          <Button onClick={() => setIsFolded(!isFolded)}>Menu</Button>
        )}
        {children}
      </div>
    </section>
  );
};
export default Backend;
