import { allClients, topClients } from '@/data/clients';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Section from '../common/Section';

const BusinessRelationships = ({ topClientsOnly }) => {
  const clientsToShow = topClientsOnly ? topClients : allClients;
  return (
    <Section
      title="Our Business Relationships"
      centered
      id="business-relationships"
    >
      <div className="container">
        <div className="row">
          {clientsToShow.map((client) => (
            <ClientCard key={client} client={client} />
          ))}
        </div>
        {topClientsOnly && (
          <div className="text-end">
            <Link href="/about-us#business-relationships" passHref>
              <a className="">View All Business Relationships</a>
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
};

export default BusinessRelationships;

const ClientCard = ({ client }) => (
  <div className="col-sm-3 col-6 g-1">
    <div className="card-client card card-body card-hover pb-4 mx-2 mb-3">
      <Image
        src={`/assets/img/clients/${client}.png`}
        className="d-block mx-auto my-2"
        width="400"
        height="300"
        alt={client}
      />
    </div>
  </div>
);
