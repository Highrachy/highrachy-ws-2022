import { IconWithBackground } from './Icons';

const FeatureCard = ({ children, icon, title, size }) => {
  const width = {
    half: 'col-md-6 col-sm-6 col-12',
    'one-third': 'col-lg-4 col-md-6 col-sm-6 col-12',
    'one-fourth': 'col-lg-3 col-md-6 col-sm-6 col-12',
  };
  return (
    <section className={`${width[size]} mb-4`}>
      <div className="feature-card card w-100 h-100 text-center px-4 py-5">
        <div className="mx-auto mb-2">
          <IconWithBackground icon={icon} size={5} iconClassName="icon-md" />
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
};

FeatureCard.defaultProps = {
  size: 'half',
};

export default FeatureCard;
