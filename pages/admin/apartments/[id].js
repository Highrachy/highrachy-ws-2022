import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Button from '@/components/forms/Button';
import Modal from '@/components/ui/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import {
  BathIcon,
  BedIcon,
  LocationIcon,
  ToiletIcon,
} from '@/components/common/Icons';
import { TenantsRowList } from '../tenants';

const pageOptions = {
  key: 'apartment',
  pageName: 'Apartment',
};

const SingleApartment = () => {
  const router = useRouter();
  const { id } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/apartments/${id}`,
    axiosOptions: {
      params: {
        populate: '*',
      },
    },
  });

  return (
    <Backend>
      <ContentLoader
        Icon={adminMenu['Apartments']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <ApartmentDetail {...result?.attributes} id={id} query={query} />
      </ContentLoader>
    </Backend>
  );
};

const ApartmentDetail = ({
  tenants,
  id,
  slug,
  name,
  query,
  type,
  location,
  description,
  address,
  totalUnits,
  availableUnits,
  baths,
  beds,
  toilets,
  availableSoon,
}) => (
  <div className="container-fluid">
    <section className="pb-4 border-bottom">
      <h3 className="text-gray">
        {type} - {name}
      </h3>

      <section className="mt-3">
        <Button
          color="none"
          className="btn-xs btn-outline-dark"
          href={{
            pathname: '/apartments/[slug]',
            query: { slug },
          }}
        >
          View on Website
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          color="none"
          className="btn-xs btn-outline-primary"
          href={{
            pathname: '/admin/apartments/new',
            query: { id, action: 'edit' },
          }}
        >
          Edit Apartment
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          color="dark"
          className="btn-xs"
          href={{
            pathname: '/admin/apartments/new',
            query: { id, action: 'duplicate' },
          }}
        >
          Duplicate Apartment
        </Button>
        &nbsp;&nbsp;&nbsp;
        <ProcessApartment id={id} availableSoon={availableSoon} query={query} />
      </section>

      <section>
        <div className="text-muted">
          <LocationIcon /> {address}
        </div>
        <ul className="list-inline text-muted">
          <li className="list-inline-item pe-4">
            <BedIcon /> Bed: {beds}
          </li>
          <li className="list-inline-item pe-4">
            <BathIcon /> Bath: {baths}
          </li>
          <li className="list-inline-item pe-4">
            <ToiletIcon /> Toilet: {toilets}
          </li>
        </ul>
      </section>

      <p className="text-muted">
        {availableUnits} units available out of {totalUnits}{' '}
        <span
          className={`badge rounded-pill bg-${
            availableSoon ? 'success' : 'dark'
          }`}
        >
          {availableSoon ? 'Available Soon' : 'Not Available'}
        </span>
      </p>
    </section>

    <section className="py-6 border-bottom">
      <h3>Total tenants: {tenants?.data?.length || 0}</h3>
      {tenants?.data?.length > 0 && (
        <TenantsRowList
          results={tenants.data}
          offset={0}
          hideApartments={true}
        />
      )}
    </section>
  </div>
);

export default SingleApartment;

export const ProcessApartment = ({ availableSoon, id, query }) => {
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const currentData = query?.data?.data;

  const processApartment = () => {
    setLoading(true);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/apartments/${id}`,
        { data: { availableSoon: !availableSoon } },
        {
          headers: { Authorization: getTokenFromStore() },
        }
      )
      .then(function (response) {
        const { status, data } = response;
        if (statusIsSuccessful(status)) {
          toast.success('The apartment has been successfully closed');
          setLoading(false);
          setShowModal(false);
          query.mutate({ ...currentData, availableSoon: !availableSoon });
        }
      })
      .catch(function (error) {
        toast.error(getError(error));
        setLoading(false);
      });
  };

  const currentState = availableSoon ? 'Not Available' : 'Available Soon';
  const currentStateButton = availableSoon ? 'primary' : 'success';

  return (
    <>
      <Button
        color={currentStateButton}
        className="btn-xs"
        onClick={() => setShowModal(true)}
      >
        {currentState}
      </Button>

      {/* Close Apartment  Modals */}
      <Modal
        title={`Mark as ${currentState}`}
        show={showModal}
        onHide={() => setShowModal(false)}
        showFooter={false}
      >
        <section className="row">
          <div className="col-md-12 my-3 text-center">
            <h5 className="my-2 confirmation-text">
              Are you sure you want to mark this aparment as {currentState}
            </h5>
            <Button
              color={currentStateButton}
              onClick={processApartment}
              loading={loading}
            >
              {currentState} Apartment
            </Button>
          </div>
        </section>
      </Modal>
    </>
  );
};
