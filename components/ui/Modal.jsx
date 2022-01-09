import { Modal as BModal } from 'react-bootstrap';

const Modal = ({ children, content }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <BModal
          size="sm"
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <BModal.Header closeButton>
            <BModal.Title id="example-modal-sizes-title-sm">
              Small Modal
            </BModal.Title>
          </BModal.Header>
          <BModal.Body>{content}</BModal.Body>
        </BModal>
      )}
      <span onClick={() => setShowModal(true)}>{children}</span>
    </>
  );
};

export default Modal;
