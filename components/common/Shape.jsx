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
    {/* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" width={1440} height={150} preserveAspectRatio="none" viewBox="0 0 1440 150">
  <g mask="url(&quot;#SvgjsMask1022&quot;)" fill="none">
    <path d="M 0,58 C 144,73 432,131.8 720,133 C 1008,134.2 1296,77.8 1440,64L1440 250L0 250z" fill="rgba(255, 255, 255, 1)" />
  </g>
  <defs>
    <mask id="SvgjsMask1022">
      <rect width={1440} height={250} fill="#ffffff" />
    </mask>
  </defs>
</svg> */}
  </div>
);

export default Shape;

// const Shape = ({ className }) => (
//   <div
//     className={`shape shape-bottom-100 shape-fluid-x ${
//       className ? className : 'text-white'
//     }`}
//     style={{
//       bottom: '0',
//       left: 0,
//       right: 0,
//       pointerEvents: 'none',
//       position: 'absolute',
//     }}
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       xmlnsXlink="http://www.w3.org/1999/xlink"
//       width="100%"
//       height="96px"
//       viewBox="0 0 100 100"
//       version="1.1"
//       preserveAspectRatio="none"
//       className="injected-svg"
//       data-src="assets/img/dividers/divider-2.svg"
//     >
//       <path d="M0,0 C16.6666667,66 33.3333333,99 50,99 C66.6666667,99 83.3333333,66 100,0 L100,100 L0,100 L0,0 Z" />
//     </svg>
//   </div>
// );

// export default Shape;
