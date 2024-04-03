import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from "react-modal";

const TeamModal = ({ isOpen, onClose, teamId  }) => {
const [membersData, setMembersData] = useState([])

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
          width: "70%",
          height: "85%",
          borderRadius: "10px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      };

      useEffect(()=>{
        axios.get(`http://localhost:4000/getSingleTeam/${teamId}`)
        .then(res=>{
            console.log(res.data)
            setMembersData(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
      },[teamId])


      return (
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Logout Modal"
          style={customStyles}
          shouldCloseOnOverlayClick={false}
        >
          <div className='team-details'>
            <button onClick={onClose} id="cancel-btn">X</button>
            <p>{teamId}</p>
      
            {membersData.team && membersData.team.members && membersData.team.members.map((member, id) => (
        <div className="card" key={id}>
          <div className='card-info'>
            <div className='left'>
              <p><img src={member.avatar} alt={`${member.first_name} ${member.last_name}`} /></p>
              <p>{member.first_name} {member.last_name}</p>
            </div>
            <div className='right'>
              <p>Email: {member.email}</p>
              <p>Gender: {member.gender}</p>
              <p>Domain: {member.domain}</p>
              <p>Available: {`${member.available ? "Yes" : "No"}`}</p>
            </div>
          </div>
        </div>
      ))}
          </div>
        </Modal>
      );
      
}

export default TeamModal