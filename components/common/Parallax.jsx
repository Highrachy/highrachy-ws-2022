import Overlay from './Overlay';

const Parallax = ({ bgImage, children }) => (
  <section
    className="parallax z-n2"
    style={{
      backgroundImage: `linear-gradient(0deg, rgba(61, 61, 61, 0.8), rgba(61, 61, 61, 1)), url(${bgImage})`,
    }}
  >
    {children}
  </section>
);

export default Parallax;
