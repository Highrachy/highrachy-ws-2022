import React from 'react';
import Backend from '@/components/admin/Backend';
import { adminMenu } from '@/data/adminMenu';
import { ContentLoader } from '@/components/utils/LoadingItems';
import { useRouter } from 'next/router';
import { useSWRQuery } from '@/hooks/useSWRQuery';
import Button from '@/components/forms/Button';
import ReactMarkdown from 'react-markdown';
import { SectionHeader } from '@/components/common/Section';
import { TenantInfo } from 'pages/careers';
import { ApplicantsRowList } from '../applicants';
import Modal from '@/components/ui/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getTokenFromStore } from '@/utils/localStorage';
import { getError, statusIsSuccessful } from '@/utils/helpers';
import { LocalImage } from '@/components/common/Image';
import { Card } from 'react-bootstrap';
import { getShortDate } from '@/utils/date-helpers';

const pageOptions = {
  key: 'tenant',
  pageName: 'Tenant',
};

const SingleTenant = () => {
  const router = useRouter();
  const { id } = router.query;

  const [query, result] = useSWRQuery({
    name: id ? [pageOptions.key, id] : id,
    endpoint: `api/tenants/${id}`,
    axiosOptions: {
      params: {
        populate: '*',
      },
    },
  });

  return (
    <Backend>
      <ContentLoader
        Icon={adminMenu['Tenants']}
        query={query}
        results={result}
        name={pageOptions.pageName}
      >
        <TenantDetail {...result?.attributes} id={id} query={query} />
      </ContentLoader>
    </Backend>
  );
};

const TenantDetail = ({
  firstName,
  middleName,
  lastName,
  mobileTelephone,
  homeTelephone,
  personalEmail,
  workEmail,
  dateOfBirth,
  tenantFullName,
  title,
  tenantProfileImage,
  status,
}) => (
  <div className="container-fluid">
    <section className="pb-4 border-bottom">
      <h3 className="text-gray">
        {tenantFullName} &nbsp;
        <span
          className={`badge rounded-pill bg-${
            status === 'APPLIED' ? 'success' : 'dark'
          }`}
        >
          {status}
        </span>
      </h3>

      <Card className="mt-4">
        <div className="text-center my-4">
          <LocalImage
            src={tenantProfileImage}
            name={`${tenantFullName}`}
            className="icon-md me-2"
            width="120"
            rounded
            height="120"
          />
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>Tenant Name</td>
                <td>
                  {title} {tenantFullName}
                </td>
              </tr>
              <tr>
                <td>Names</td>
                <td>
                  {title} {firstName} {lastName} {middleName}
                </td>
              </tr>
              <tr>
                <td>Mobile Telephone</td>
                <td>{mobileTelephone}</td>
              </tr>
              <tr>
                <td>Home Telephone</td>
                <td>{homeTelephone}</td>
              </tr>
              <tr>
                <td>Personal Email</td>
                <td>{personalEmail}</td>
              </tr>
              <tr>
                <td>Work Email</td>
                <td>{workEmail}</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>{getShortDate(dateOfBirth)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  </div>
);

export default SingleTenant;

export const ProcessTenant = ({ available, id, query }) => {
  const [loading, setLoading] = React.useState(false);
  const [showApprovalModal, setShowApprovalModal] = React.useState(false);
  const currentData = query?.data?.data;

  const processTenant = () => {
    setLoading(true);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tenants/${id}`,
        { data: { available: !available } },
        {
          headers: { Authorization: getTokenFromStore() },
        }
      )
      .then(function (response) {
        const { status, data } = response;
        if (statusIsSuccessful(status)) {
          toast.success('The tenant has been successfully closed');
          setLoading(false);
          setShowApprovalModal(false);
          query.mutate({ ...currentData, available: !available });
        }
      })
      .catch(function (error) {
        toast.error(getError(error));
        setLoading(false);
      });
  };

  const currentState = available ? 'Close' : 'Open';
  const currentStateButton = available ? 'primary' : 'success';

  return (
    <>
      <Button
        color={currentStateButton}
        className="btn-xs"
        onClick={() => setShowApprovalModal(true)}
      >
        {currentState} Tenant
      </Button>

      {/* Close Tenant  Modals */}
      <Modal
        title={`${currentState} Tenant`}
        show={showApprovalModal}
        onHide={() => setShowApprovalModal(false)}
        showFooter={false}
      >
        <section className="row">
          <div className="col-md-12 my-3 text-center">
            <h5 className="my-2 confirmation-text">
              Are you sure you want to {currentState} this tenant?
            </h5>
            <Button
              color={currentStateButton}
              onClick={processTenant}
              loading={loading}
            >
              {currentState} Tenant
            </Button>
          </div>
        </section>
      </Modal>
    </>
  );
};
export const RichTextSection = ({ title, text }) => (
  <PaddedSection title={title}>
    <ReactMarkdown>{text}</ReactMarkdown>
  </PaddedSection>
);

const PaddedSection = ({ children, title }) => (
  <section className="pb-5">
    <div className="row">
      <div className="col-sm-12">
        {title && <SectionHeader small>{title}</SectionHeader>}
        {children}
      </div>
    </div>
  </section>
);
