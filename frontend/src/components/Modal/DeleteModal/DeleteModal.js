import React from "react";
import Modal from "react-modal";
import "./deleteModal.scss";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const DeleteModal = ({ isOpen, onClose, teamId, handleTeamShow }) => {
  const customStyles = {
    content: {
      position: "fixed",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: "65%",
      height: "35%",
      borderRadius: "10px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const handleDelete = () => {
    axios
      .delete(`https://card-manager-m4wb.onrender.com/deleteTeam/${teamId}`)
      .then((res) => {
        console.log(res.data);
        onClose();
        handleTeamShow();
      })
      .catch((err) => {
        console.error("Error deleting todo:", err);
      });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Delete Team Modal"
        style={customStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div className="delete-modal-container">
          <p>Are you sure you want to Delete?</p>
          <button onClick={handleDelete} id="delete-team">
            Yes, Delete
          </button>
          <button onClick={onClose} id="cancel-team">
            Cancel
          </button>
        </div>
      </Modal>
      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            width: "350px",
            fontSize: "18px",
          },
        }}
      />
    </>
  );
};

export default DeleteModal;
