import { BathIcon } from '@/components/common/Icons';
import { BedIcon } from '@/components/common/Icons';
import { ToiletIcon } from '@/components/common/Icons';
import { LocationIcon } from '@/components/common/Icons';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Select from '@/components/forms/Select';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { allListings } from '@/data/listings';
import { valuesToOptions } from '@/utils/helpers';
import humanize from 'humanize-plus';
import Link from 'next/link';
import React from 'react';

const Listings = () => {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Find Apartments"
        bgImage="/assets/img/bg/listings.jpg"
      />
      <AvailableListings />
      <Footer />
    </>
  );
};

const AvailableListings = () => {
  const currentListings = Object.entries(allListings);
  const filterType = ['name', 'type', 'baths', 'beds', 'toilets', 'location'];

  const filters = Object.values(allListings).reduce((acc, item) => {
    filterType.forEach((type) => {
      acc[type] = acc[type]
        ? acc[type].add(item[type])
        : new Set().add(item[type]);
    });
    return acc;
  }, {});

  const [listings, setListings] = React.useState(currentListings);
  const handleSubmit = (values, actions) => {
    setTimeout(() => {
      setListings(() =>
        currentListings.filter(([_, listing]) => {
          return Object.keys(values).every((key) => {
            return listing[key].toString() === values[key].toString();
          });
        })
      );
      actions.setSubmitting(false);
    }, 100);
  };

  return (
    <Section
      title="Available Apartments"
      centered
      altBg
      id="available-positions"
    >
      <div className="container">
        <FormikForm
          schema={{}}
          handleSubmit={handleSubmit}
          name="listings-form"
          showFormikState
        >
          <div className="row">
            {filterType.map((key) => (
              <Select
                formGroupClassName="col-md-4"
                name={key}
                key={key}
                label={humanize.capitalize(key)}
                optional
                options={valuesToOptions(
                  [...filters[key]].sort(),
                  `Select ${key}`
                )}
              />
            ))}
          </div>
        </FormikForm>
        <ul className="list-group">
          {listings.map(([key, listing], index) => (
            <li key={index} className="list-group-item">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start position-relative p-4">
                <div>
                  <h5 className="mb-0">
                    {listing.type} - {listing.name}
                  </h5>
                  <div className="text-muted">
                    <LocationIcon /> {listing.address}
                  </div>
                  <ul className="list-inline text-muted">
                    <li className="list-inline-item pe-4">
                      <BedIcon /> {listing.beds}
                    </li>
                    <li className="list-inline-item pe-4">
                      <BathIcon /> {listing.baths}
                    </li>
                    <li className="list-inline-item pe-4">
                      <ToiletIcon /> {listing.toilets}
                    </li>
                  </ul>
                </div>
                <Link
                  passHref
                  href={{
                    pathname: '/listings/[property]',
                    query: { property: key },
                  }}
                >
                  <a className="btn btn-outline-secondary btn-wide text-uppercase stretched-link">
                    Apply Now
                  </a>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
export default Listings;
