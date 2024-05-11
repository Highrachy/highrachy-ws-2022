import { useTheme } from 'next-themes';
import React from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';

const ThemeChanger = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = React.useState(false);
  const isDark = resolvedTheme === 'dark';

  React.useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return (
    <span
      className={`cursor-pointer ${isDark ? 'text-light' : 'text-dark'}`}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? (
        <>
          <BsSun /> <span className="d-inline d-lg-none">Light Mode</span>
        </>
      ) : (
        <>
          <BsMoon /> <span className="d-inline d-lg-none">Dark Mode</span>
        </>
      )}
    </span>
  );
};

export default ThemeChanger;
