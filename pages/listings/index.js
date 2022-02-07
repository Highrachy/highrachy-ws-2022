import { BathIcon } from '@/components/common/Icons';
import { BedIcon } from '@/components/common/Icons';
import { ToiletIcon } from '@/components/common/Icons';
import { LocationIcon } from '@/components/common/Icons';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Label from '@/components/forms/Label';
import Select from '@/components/forms/Select';
import Switch from '@/components/forms/Switch';
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
  const [showOccupied, setShowOccupied] = React.useState(false);
  const handleSubmit = (values, actions) => {
    setTimeout(() => {
      setListings(() =>
        currentListings.filter(([_, listing]) => {
          return Object.keys(values).every((key) => {
            if (!values[key] && values[key] !== 0) return true;
            return listing[key].toString() === values[key].toString();
          });
        })
      );
      actions.setSubmitting(false);
    }, 100);
  };

  const handleShowOccupied = () => {
    setShowOccupied(!showOccupied);
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
          buttonText="Find Apartments"
          buttonColor="dark"
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
          <div className="row">
            <div className="mb-4">
              <div className="form-check form-switch">
                <input
                  aria-describedby="availableUnits"
                  className="form-check-input"
                  name="availableUnits"
                  type="checkbox"
                  onChange={handleShowOccupied}
                />
                <Label
                  name="availableUnits"
                  className="form-check-label"
                  hideOptionalText
                  optional
                  text="Show Occupied Apartments"
                  floatingLabel
                />
              </div>
            </div>
          </div>
        </FormikForm>
        <ul className="list-group mt-5">
          {listings.map(
            ([key, listing], index) =>
              (listing.availableUnits > 0 || showOccupied) && (
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
                      {listing.availableUnits > 0 ? (
                        <a className="btn btn-dark btn-wide text-uppercase stretched-link">
                          Apply Now
                        </a>
                      ) : (
                        <span className="btn text-danger btn-wide text-uppercase stretched-link">
                          Occupied
                        </span>
                      )}
                    </Link>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
    </Section>
  );
};
export default Listings;
