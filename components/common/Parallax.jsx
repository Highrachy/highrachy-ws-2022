import { useTheme } from 'next-themes';
import React from 'react';

const Parallax = ({ bgImage, children }) => {
  const { resolvedTheme } = useTheme();
  const [hasMounted, setHasMounted] = React.useState(false);
  const isDark = resolvedTheme === 'dark';
  const backgroundImage = isDark
    ? `linear-gradient(0deg, rgba(20,20,20, 0.7), rgba(20,20,20, 0.9)), url(${bgImage})`
    : `linear-gradient(0deg, rgba(61, 61, 61, 0.7), rgba(61, 61, 61, 0.9)), url(${bgImage})`;

  React.useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return (
    <section
      className="parallax z-n2"
      style={{
        backgroundImage,
      }}
    >
      {children}
    </section>
  );
};

export default Parallax;
