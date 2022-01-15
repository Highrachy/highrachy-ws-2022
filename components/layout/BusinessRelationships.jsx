import { allClients, topClients } from '@/data/clients';
import Image from 'next/image';
import React from 'react';
import Section from '../common/Section';

const BusinessRelationships = ({ topClientsOnly }) => {
  const clientsToShow = topClientsOnly ? topClients : allClients;
  return (
    <Section title="Our Business Relationships" centered>
      <div className="container">
        <div className="row">
          {clientsToShow.map((client) => (
            <ClientCard key={client} client={client} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default BusinessRelationships;

const ClientCard = ({ client }) => (
  <div className="col-sm-3">
    <div className="card-client card card-body card-hover pb-4 mx-2 mb-5">
      <Image
        src={`/assets/img/clients/${client}.png`}
        className="d-block mx-auto my-2"
        width="285"
        height="85"
        alt={client}
      />
    </div>
  </div>
);
