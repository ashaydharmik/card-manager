import React, { useEffect, useState } from "react";
import "./teams.scss";
import axios from "axios";
import TeamModal from "../Modal/TeamModal/TeamModal";
import DeleteModal from "../Modal/DeleteModal/DeleteModal";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const navigate = useNavigate();

  const handleViewTeamClick = (teamId) => {
    setSelectedTeamId(teamId);
    setIsTeamModalOpen(true);
  };

  const handleCloseTeamModal = () => {
    setIsTeamModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteTeamClick = (teamId) => {
    setSelectedTeamId(teamId);
    setIsDeleteModalOpen(true);
  };

  const handleTeamShow = () => {
    axios
      .get("https://card-manager-m4wb.onrender.com/getTeams")
      .then((res) => {
        console.log(res.data);
        setTeams(res.data.teams);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleTeamShow();
  }, []);

  const handleBackClick = () => {
    navigate("/listUsers");
  };

  return (
    <>
      <section className="teams-container">
        <div className="back-btn">
          <button onClick={handleBackClick}><FaArrowLeft /> Back</button>
        </div>
        <div className="teams-heading">
          <h1>Teams</h1>
        </div>
        <div className="teams-collections">
          <ol>
            {Array.isArray(teams) &&
              teams.map((team, id) => {
                return (
                  <li key={id}>
                    <p>{team.name}</p>
                    <p>
                      <button onClick={() => handleViewTeamClick(team._id)}>
                        View Team
                      </button>
                      <button onClick={() => handleDeleteTeamClick(team._id)}>
                        Delete
                      </button>
                    </p>
                  </li>
                );
              })}
          </ol>
        </div>
      </section>
      <TeamModal
        isOpen={isTeamModalOpen}
        onClose={handleCloseTeamModal}
        teamId={selectedTeamId}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseTeamModal}
        teamId={selectedTeamId}
        handleTeamShow={handleTeamShow}
      />
    </>
  );
};

export default Teams;
