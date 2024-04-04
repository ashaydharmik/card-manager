import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./teamModal.scss";

const TeamModal = ({ isOpen, onClose, teamId }) => {
  const [membersData, setMembersData] = useState([]);
  const [teamName, setTeamName] = useState("");

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
      width: "83%",
      height: "85%",
      borderRadius: "10px",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  useEffect(() => {
    axios
      .get(`https://card-manager-m4wb.onrender.com/getSingleTeam/${teamId}`)
      .then((res) => {
        console.log(res.data);
        setMembersData(res.data);
        setTeamName(res.data.team.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [teamId]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Logout Modal"
      style={customStyles}
      shouldCloseOnOverlayClick={false}
    >
      <div className="team-details">
        <div className="btn">
          <button onClick={onClose} id="cancel-btn">
            X
          </button>
        </div>
        <h2>{teamName}</h2>
        <div className="card-list">
          {membersData.team &&
            membersData.team.members &&
            membersData.team.members.map((member, id) => (
              <>
                <div className="card" key={id}>
                  <div className="card-info">
                    <div className="left">
                      <p>
                        <img
                          src={member.avatar}
                          alt={`${member.first_name} ${member.last_name}`}
                        />
                      </p>
                      <p>
                        {member.first_name} {member.last_name}
                      </p>
                    </div>
                    <div className="right">
                      <p>Email: {member.email}</p>
                      <p>Gender: {member.gender}</p>
                      <p>Domain: {member.domain}</p>
                      <p>Available: {`${member.available ? "Yes" : "No"}`}</p>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default TeamModal;
