import React, { useState, useEffect } from 'react';
import { useGlobal } from '../Context/Context';
import Search from '../Search/Search';
import './listUsers.scss';
import Filter from '../Filters/Filter';
import axios from "axios"
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const ListUsers = () => {
  const { users: allUsers, isLoading } = useGlobal();
  const [users, setUsers] = useState(allUsers); 
  const [userPerPage, setUserPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const displayedUsers = searchResults ? searchResults : (filteredUsers || users); 
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const navigate = useNavigate()

  const noOfPages = Math.ceil(displayedUsers.length / userPerPage);
  const pages = [...Array(noOfPages + 1).keys()].slice(1);

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;

  const visibleUsers = displayedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const prevPage=()=>{
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1 );
    }
  }

  const nextPage=()=>{
    if(currentPage !== noOfPages){
      setCurrentPage(currentPage + 1 );
    }
  }

  useEffect(() => {
    if (searchResults) {
      setUsers(searchResults);
    } else {
      setUsers(allUsers);
    }
  }, [searchResults, allUsers]);

  const handleAddTeam = async () => {
    setIsSelectionMode(true);
  
    try {
      // Send POST request to createTeam API
      const response = await axios.post('http://localhost:4000/createTeam', {
        memberIds: selectedUserId // Pass selected user IDs to the API
      });
  
      console.log(response.data);
      toast.success("Team created successfully");
      setTimeout(()=>{
        navigate("/teams")
      },1000)
      
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);

      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred while creating the team.");
      }
    }
  }
  

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
  }

  const handleUserClick = (userId) => {
    if (isSelectionMode) {
      if (selectedUserId.includes(userId)) {
        setSelectedUserId(selectedUserId.filter(id => id !== userId));
      } else {
        setSelectedUserId([...selectedUserId, userId]);
      }
    }
  }

  return (
    <>
      <Search searchResults={searchResults} setSearchResults={setSearchResults}/>
      <div className="filters-teams">
        <div className="filters">
          <Filter onFilterChange={setFilteredUsers} /> 
        </div>
        <div className="teams">
          <button onClick={toggleSelectionMode}>{isSelectionMode ? 'Cancel Selection' : 'Create Teams'}</button>
          {isSelectionMode && selectedUserId.length > 0 && (
            <button onClick={handleAddTeam}>Add Selected Users to Team</button>
          )}
        </div>
      </div>
      <section className='card-container'>
        <div className='card-list'>
          {isLoading ? (
            <div className='loading-container'>
              <div className='loading'>
                loading...
              </div>
            </div>
          ) : (
            visibleUsers.length > 0 ? (
              visibleUsers.map(user => (
                <div className={`card ${isSelectionMode && selectedUserId.includes(user.id) ? 'selected' : ''}`} key={user.id} onClick={() => handleUserClick(user.id)}>
                  <div className='card-info'>
                    <div className='left'>
                      <p><img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} /></p>
                      <p>{user.first_name} {user.last_name}</p>
                    </div>
                    <div className='right'>
                      <p>Email: {user.email}</p>
                      <p>Gender: {user.gender}</p>
                      <p>Domain: {user.domain}</p>
                      <p>Available: {`${user.available ? "Yes":"No"}`}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-user-message">No user found</div> 
            )
          )}
        </div>
        <div className='pagination'>
          <button onClick={prevPage}>Prev</button>
          <p>{pages.map(page => <button key={page} onClick={()=> setCurrentPage(page)} className={`${currentPage === page ? "active": ""}`}>{`${page}`}</button>)}</p>
          <button onClick={nextPage}>Next</button>
        </div>
      </section>
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

export default ListUsers;
