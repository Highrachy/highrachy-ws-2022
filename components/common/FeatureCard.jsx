import humanize from 'humanize-plus';
import { IconWithBackground } from './Icons';

const FeatureCard = ({ children, icon, title }) => (
  <section className="col-sm-6 col-12">
    <div className="feature-card card w-100 h-100 text-center px-4 py-5">
      <div className="mx-auto mb-2">
        <IconWithBackground icon={icon} size={5} />
      </div>
      <div className="card-body">
        <div className="card-text">
          <h5 className="text-color">{title} </h5>
          <p className="text-lg">{children}</p>
        </div>
      </div>
    </div>
  </section>
);

export default FeatureCard;
