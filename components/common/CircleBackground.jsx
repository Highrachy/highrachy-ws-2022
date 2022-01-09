const CircleBackground = ({ background, left, size, top }) => (
  <div
    className="rounded-circle d-inline-block position-absolute"
    style={{
      position: 'absolute',
      width: size,
      height: size,
      left,
      top,
      background,
      zIndex: '-1',
    }}
  ></div>
);

CircleBackground.defaultProps = {
  background: '#FAFAFA',
  left: '-8rem',
  size: '50rem',
  top: '-8rem',
};

export default CircleBackground;
