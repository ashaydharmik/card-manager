import React, { useEffect, useState } from 'react'
import "./teams.scss"
import axios from "axios"
import TeamModal from '../Modal/TeamModal'
const Teams = () => {

  const[teams, setTeams] = useState([])
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);


  const handleViewTeamClick = (teamId) => {
    setSelectedTeamId(teamId)
    setIsTeamModalOpen(true);
  };

  const handleCloseTeamModal = () => {
    setIsTeamModalOpen(false);
  };

  useEffect(()=>{
    axios.get("http://localhost:4000/getTeams")
    .then(res=>{
      console.log(res.data)
      setTeams(res.data.teams)
    })
    .catch(err=>{
      console.log(err)
    })
  },[])

  return (
    <>
    <section className='teams-container'>
      <div className='teams-heading'>
        <h1>Teams</h1>
      </div>
      <div className='teams-collections'>
        <ol>
        {
  Array.isArray(teams) && teams.map((team, id) => {
    return <li key={id}>
      <p>{team.name}</p>
      <p>

    <button onClick={()=> handleViewTeamClick(team._id)}>View Team</button>
    <button>Delete</button>
      </p>
    </li>
  })
}
          
        </ol>
      </div>
    </section>
    <TeamModal
        isOpen={isTeamModalOpen}
        onClose={handleCloseTeamModal}
        teamId = {selectedTeamId}
      />
    </>
  )
}

export default Teams