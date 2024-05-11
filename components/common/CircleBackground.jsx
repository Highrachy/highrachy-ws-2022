import { useTheme } from 'next-themes';
import React from 'react';
const CircleBackground = ({ background, backgroundDark, left, size, top }) => {
  const { resolvedTheme } = useTheme();
  const [hasMounted, setHasMounted] = React.useState(false);
  const isDark = resolvedTheme === 'dark';
  const circleBackground = isDark ? backgroundDark : background;

  React.useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return null;

  return (
    <div
      className="rounded-circle d-inline-block position-absolute"
      style={{
        position: 'absolute',
        width: size,
        height: size,
        maxHeight: '125vw',
        maxWidth: '125vw',
        left,
        top,
        background: circleBackground,
        zIndex: '-1',
      }}
    ></div>
  );
};

CircleBackground.defaultProps = {
  background: '#FAFAFA',
  backgroundDark: '#2b2b2b',
  left: '-10rem',
  size: '50rem',
  top: '-5rem',
};

export default CircleBackground;
