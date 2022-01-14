import services from '@/data/services';
import { LinkedInIcon } from '../common/Icons';
import { TwitterIcon } from '../common/Icons';
import { InstagramIcon } from '../common/Icons';
import { FacebookIcon } from '../common/Icons';
import { RightAngleIcon } from '../common/Icons';
import Section from '../common/Section';

const helpfulLinks = [
  'Highrachy WeProtect',
  'Careers',
  'Sitemap',
  'Our Projects',
  'Download Brochure',
  'Existing Business Relationships',
];

const Footer = () => (
  <footer className="bg-dark text-white">
    <Section noPaddingBottom>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <h6 className="text-white">About Us</h6>
            <p className="small">
              We pride ourselves in our excellent service delivery standards in
              line with our core competencies. These competencies are;
            </p>
            <ul className="text-white list-unstyled">
              {Object.values(services).map(({ title }) => (
                <li key={title}>
                  <a className="text-reset small" href="#">
                    <RightAngleIcon /> {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-6">
            <h6 className="text-white">Helpful Links</h6>
            <ul className="text-white list-unstyled">
              {helpfulLinks.map((text) => (
                <li key={text}>
                  <a className="text-reset small" href="#">
                    <RightAngleIcon /> {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <h6 className="text-white">Contact Us</h6>
            <div className="small">
              <p>
                5th Floor, Ibukun House, <br />
                No. 70 Adetokunbo Ademola Street, <br />
                Victoria Island, Lagos.
              </p>
              <p>Email: nnamdi@highrachy.com</p>
              <p>
                <span>Phone:</span> +234 802 833 7440
              </p>
            </div>
            <ul className="list-inline text-white ms-auto">
              <li className="list-inline-item">
                <a className="text-reset" href="#">
                  <FacebookIcon />
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-reset" href="#">
                  <TwitterIcon />
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-reset" href="#">
                  <LinkedInIcon />
                </a>
              </li>
              <li className="list-inline-item">
                <a className="text-reset" href="#">
                  <InstagramIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-5 pt-5 pb-3">
          <div className="col-12 text-center">
            <p>&copy; 2022 Highrachy. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </Section>
  </footer>
);

export default Footer;
