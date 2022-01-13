import Overlay from './Overlay';

const Parallax = ({ bgImage }) => (
  <section
    className="parallax z-n2"
    style={{
      backgroundImage: `url('${bgImage}')`,
    }}
  >
    <Overlay />
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="py-7 text-center">
            <div className="text-white lead pb-5">
              We are here to answer your questions 24/7
            </div>
            <h3 className="h2 text-white pb-5">NEED A CONSULTATION?</h3>
            <a href="contact.html" className="btn btn-primary btn-wide">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Parallax;
