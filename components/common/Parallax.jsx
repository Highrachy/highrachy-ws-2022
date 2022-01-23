const Parallax = ({ bgImage, children }) => (
  <section
    className="parallax z-n2"
    style={{
      backgroundImage: `linear-gradient(0deg, rgba(61, 61, 61, 0.7), rgba(61, 61, 61, 0.9)), url(${bgImage})`,
    }}
  >
    {children}
  </section>
);

export default Parallax;
