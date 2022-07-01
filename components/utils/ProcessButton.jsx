import React from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/forms/Button';
import Modal from '@/components/ui/Modal';
import axios from 'axios';
import { getTokenFromStore } from '@/utils/localStorage';
import { toast } from 'react-toastify';
import { getError, statusIsSuccessful } from '@/utils/helpers';

const ProcessButton = ({
  afterSuccess,
  api,
  buttonClassName,
  buttonColor,
  children,
  data,
  modalContent,
  modalTitle,
  successMessage,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const handleProcess = () => {
    setLoading(true);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${api}`,
        { data },
        {
          headers: { Authorization: getTokenFromStore() },
        }
      )
      .then((response) => {
        const { status, data } = response;
        if (statusIsSuccessful(status)) {
          afterSuccess();
          setLoading(false);
          setShowModal(false);
          toast.success(successMessage);
        }
      })
      .catch((error) => {
        toast.error(getError(error));
        setLoading(false);
        setShowModal(false);
      });
  };

  return (
    <>
      <Button
        color={buttonColor}
        className={buttonClassName}
        onClick={() => setShowModal(true)}
      >
        {children}
      </Button>

      {/* Modals */}
      <Modal
        title={modalTitle}
        show={showModal}
        onHide={() => setShowModal(false)}
        showFooter={false}
      >
        <section className="row">
          <div className="col-md-12 my-3 text-center">
            <h5 className="my-2 confirmation-text">{modalContent}</h5>
            <Button
              color={buttonColor}
              onClick={handleProcess}
              loading={loading}
            >
              {children}
            </Button>
          </div>
        </section>
      </Modal>
    </>
  );
};

ProcessButton.defaultProps = {
  afterSuccess: () => {},
  buttonClassName: 'btn-xs',
  buttonColor: 'primary',
  data: {},
  modalContent: 'Are you sure you want to continue?',
  modalTitle: 'Action Modal',
  successMessage: 'Your action has been successfully completed',
};

ProcessButton.propTypes = {
  afterSuccess: PropTypes.func,
  api: PropTypes.string.isRequired,
  buttonClassName: PropTypes.string,
  buttonColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  data: PropTypes.object,
  modalContent: PropTypes.string,
  modalTitle: PropTypes.string,
  successMessage: PropTypes.string,
};
export default ProcessButton;
