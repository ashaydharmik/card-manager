import React, { useState } from "react";
import axios from 'axios'; // Import axios
import "./search.scss";
import Filter from "../Filters/Filter";

const Search = ({ setSearchResults }) => { // Receive setSearchResults as prop
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    try {
      const response = await axios.get(`http://localhost:4000/search?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="search">
        <div className="heading">
          <h1>WELCOME</h1>
          <h2>Search the users here...</h2>
          </div>
          <div className="search-bar">
           

            <form >
              <input
                type="search"
                onChange={handleInputChange}
                value={searchQuery}
                placeholder="Search by name..."
              />
              <button type="submit">Search</button>
            </form>

          
          </div>
          
    
      </section>
    </>
  );
};

export default Search;
