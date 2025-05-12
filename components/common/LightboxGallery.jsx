// components/LightboxGallery.js
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { SectionHeader } from './Section';

const FsLightbox = dynamic(() => import('fslightbox-react'), { ssr: false });

const LightboxGallery = ({ images }) => {
  const [toggler, setToggler] = useState(false);
  const [slide, setSlide] = useState(1);

  const openLightboxOnSlide = (index) => {
    setSlide(index + 1);
    setToggler(!toggler);
  };

  if (!images || images.length === 0) {
    return null; // Return null if no images are provided
  }

  return (
    <div>
      <div className="row">
        <h4 className="mb-3 mt-5">Project Gallery</h4>
        {images.map((image, index) => (
          <div className="col-md-4 mb-3" key={index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              className="img-fluid rounded shadow-sm"
              onClick={() => openLightboxOnSlide(index)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
      <FsLightbox
        toggler={toggler}
        sources={images.map((image) => image.src)}
        types={images.map(() => 'image')} // Specify 'image' type for all sources
        slide={slide}
      />
    </div>
  );
};

export default LightboxGallery;
