import { BathIcon } from '@/components/common/Icons';
import { BedIcon } from '@/components/common/Icons';
import { ToiletIcon } from '@/components/common/Icons';
import { LocationIcon } from '@/components/common/Icons';
import Section from '@/components/common/Section';
import FormikForm from '@/components/forms/FormikForm';
import Label from '@/components/forms/Label';
import Select from '@/components/forms/Select';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { valuesToOptions } from '@/utils/helpers';
import humanize from 'humanize-plus';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';
import { GoDotFill } from 'react-icons/go';

const Apartments = ({ apartments }) => {
  return (
    <>
      <NextSeo
        title="Apartments | Real Estate"
        description="Highrachy is a 21st century project-oriented organization setup
        primarily to meet your real estate needs."
        canonical="https://www.highrachy.com/apartments"
      />
      <Navigation />
      <PageHeader
        title="Find Apartments"
        bgImage="/assets/img/bg/apartments.jpg"
      />
      <AvailableApartments apartments={apartments} />
      <Footer />
    </>
  );
};

const AvailableApartments = (props) => {
  const currentApartments = props.apartments;
  const filterType = ['name', 'type', 'baths', 'beds', 'toilets', 'location'];

  const filters = Object.values(currentApartments).reduce(
    (acc, { attributes: apartment }) => {
      filterType.forEach((type) => {
        acc[type] = acc[type]
          ? acc[type].add(apartment[type])
          : new Set().add(apartment[type]);
      });
      return acc;
    },
    {}
  );

  const [apartments, setApartments] = React.useState(currentApartments);
  const [showOccupied, setShowOccupied] = React.useState(true);

  const handleSubmit = (values, actions) => {
    setApartments(() =>
      currentApartments.filter(({ attributes: apartment }) => {
        return Object.keys(values).every((key) => {
          if (!values[key] && values[key] !== 0) return true;
          return apartment[key].toString() === values[key].toString();
        });
      })
    );
    actions.setSubmitting(false);
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
          name="apartments-form"
          showFormikState
          buttonText="Find Apartments"
          buttonColor="info"
          useSubmitButton
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
                  text="Hide apartments that will be available soon"
                  floatingLabel
                />
              </div>
            </div>
          </div>
        </FormikForm>
        <ul className="list-group mt-5">
          {apartments.map(
            ({ id: key, attributes: apartment }) =>
              (apartment.availableUnits > 0 ||
                (showOccupied && apartment.availableSoon)) && (
                <li key={key} className="list-group-item">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start position-relative p-4">
                    <div>
                      <h5 className="mb-0">
                        {apartment.type} - {apartment.name}
                      </h5>
                      <div className="text-muted">
                        <LocationIcon /> {apartment.address}
                      </div>
                      <ul className="list-inline text-secondary">
                        <li className="list-inline-item pe-4">
                          <BedIcon /> {apartment.beds}
                        </li>
                        <li className="list-inline-item pe-4">
                          <BathIcon /> {apartment.baths}
                        </li>
                        <li className="list-inline-item pe-4">
                          <ToiletIcon /> {apartment.toilets}
                        </li>
                      </ul>
                      <div className="d-flex flex-wrap align-items-center my-2 mb-5 small opacity-75">
                        {apartment.availableUnits > 0 ? (
                          <span className="d-flex align-items-center fw-bold text-success">
                            <GoDotFill /> Currently available
                          </span>
                        ) : apartment.availableSoon ? (
                          <span className="d-flex align-items-center fw-bold text-info">
                            <GoDotFill /> This apartment will be available soon
                          </span>
                        ) : (
                          <span className="d-flex align-items-center fw-bold text-danger">
                            <GoDotFill /> This apartment is fully booked
                          </span>
                        )}
                      </div>
                    </div>
                    <Link
                      passHref
                      href={{
                        pathname: '/apartments/[slug]',
                        query: { slug: apartment.slug },
                      }}
                    >
                      {apartment.availableUnits === 0 &&
                      apartment.availableSoon ? (
                        <span className="btn  btn-info">Join Waiting List</span>
                      ) : (
                        <a className="btn btn-primary ">Apply Now</a>
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

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/apartments`);
  const { data } = await res.json();

  return {
    props: {
      apartments: data,
    },
    revalidate: 10,
  };
}

export default Apartments;
