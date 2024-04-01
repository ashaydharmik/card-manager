import React from "react";
import "./home.scss";
import { FaAngleDoubleDown } from "react-icons/fa";
import { Link } from "react-router-dom";


const Home = () => {
  return (
    <>
      <section className="home-container">
        <div className="header">
          <h1>Users Collections</h1>
        </div>
        <div className="search-content">
          <div className="search">
            <div className="heading">
  
              <h1>WELCOME</h1>
              <h2>Millions of users to discover. Explore Now.</h2>
            </div>
          </div>
          <div className="footer">
           
              <p>Search users</p>
              <p>
                <FaAngleDoubleDown />
              </p>
       
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
