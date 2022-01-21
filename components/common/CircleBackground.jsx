const CircleBackground = ({ background, left, size, top }) => (
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
      background,
      zIndex: '-1',
    }}
  ></div>
);

CircleBackground.defaultProps = {
  background: '#FAFAFA',
  left: '-12rem',
  size: '50rem',
  top: '-6rem',
};

export default CircleBackground;
