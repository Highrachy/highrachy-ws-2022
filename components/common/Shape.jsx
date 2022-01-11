const Shape = ({ className }) => (
  <div
    className={`shape shape-bottom-100 shape-fluid-x ${
      className ? className : 'text-white'
    }`}
    style={{
      bottom: '0',
      left: 0,
      right: 0,
      pointerEvents: 'none',
      position: 'absolute',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 1920 100.1"
    >
      <path
        fill="currentColor"
        d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
      ></path>
    </svg>
    {/* <svg
    viewBox="0 0 2880 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
      fill="currentColor"
    ></path>
  </svg>{' '} */}
    {/*
    with css:
    border-radius: 0 0 100% 100%/0% 0% 330px 330px;
    */}
  </div>
);

export default Shape;
