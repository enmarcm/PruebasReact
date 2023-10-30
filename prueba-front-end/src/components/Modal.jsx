import { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  const handleClose = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={handleClose}>
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;