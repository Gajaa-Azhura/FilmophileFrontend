import React from 'react';
import ReactDOM from 'react-dom';
import '../css/Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

// Usage example (place this in your parent component):
// <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//   <LoginForm />
// </Modal>

export default Modal;