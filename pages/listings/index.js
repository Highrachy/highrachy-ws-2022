import { BathIcon } from '@/components/common/Icons';
import { BedIcon } from '@/components/common/Icons';
import { ToiletIcon } from '@/components/common/Icons';
import { LocationIcon } from '@/components/common/Icons';
import Section from '@/components/common/Section';
import Footer from '@/components/layout/Footer';
import { PageHeader } from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { allListings } from '@/data/listings';
import Link from 'next/link';
import React from 'react';

const Listings = () => {
  return (
    <>
      <Navigation />
      <PageHeader title="Listings" bgImage="/assets/img/bg/listings.jpg" />
      <AvailableListings />
      <Footer />
    </>
  );
};

const AvailableListings = () => (
  <Section title="Available Listings" centered altBg id="available-positions">
    <div className="container">
      <ul className="list-group">
        {Object.entries(allListings).map(([key, listing], index) => (
          <li key={key} className="list-group-item">
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
                <a className="btn btn-secondary btn-wide text-uppercase stretched-link">
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
export default Listings;
