import React, { useState } from 'react';
import "./filter.scss";
import axios from 'axios'; 

const Filter = ({ onFilterChange }) => {
  const [domain, setDomain] = useState('');
  const [gender, setGender] = useState('');
  const [available, setAvailable] = useState('');

  const handleFilterChange = async () => {
    try {
      let url = `http://localhost:4000/filterUser?`;
      if (domain) url += `&domain=${domain}`;
      if (gender) url += `&gender=${gender}`;
      if (available) url += `&available=${available}`;

      const response = await axios.get(url);
      onFilterChange(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='filer-container'>
        <div className='Domain-filter'>
          <select onChange={(e) => setDomain(e.target.value)}>
            <option value=''>Select Domain</option>
            <option value='Business Development'>Business Development</option>
            <option value='UI Designing'>UI Designing</option>
            <option value='Management'>Management</option>
            <option value='Marketing'>Marketing</option>
            <option value='Finance'>Finance</option>
            <option value='Sales'>Sales</option>
            <option value='IT'>IT</option>
          </select>
        </div>
        <div className='Gender-filter'>
          <select onChange={(e) => setGender(e.target.value)}>
            <option value=''>Select Gender</option>
            <option value='Agender'>Agender</option>
            <option value='Bigender'>Bigender</option>
            <option value='Female'>Female</option>
            <option value='Genderfluid'>Genderfluid</option>
            <option value='Genderqueer'>Genderqueer</option>
            <option value='Male'>Male</option>
            <option value='Non-binary'>Non-binary</option>
            <option value='Polygender'>Polygender</option>
          </select>
        </div>
        <div className='Availability-filter'>
          <select onChange={(e) => setAvailable(e.target.value)}>
            <option value=''>Select Availability</option>
            <option value='true'>True</option>
            <option value='false'>False</option>
          </select>
        </div>
        <button onClick={handleFilterChange}>
          Apply Filters
        </button>
      </div>
    </>
  )
}

export default Filter;
