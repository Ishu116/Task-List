import React, { useState } from 'react';
import './CreateTask.css';
import {  Link, useNavigate } from 'react-router-dom';
import img from "../images/5b4f15b1ea4aa_thumb900.png"

const CreateTask = () => {
  const navigate = useNavigate();
  const [backend, setBackend] = useState({
    name: "", date: "", description: "", period: ""
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBackend({ ...backend, [name]: value });
  }

  const PostData = async (e) => {
    e.preventDefault();
    const { name, date, description, period } = backend;
    const apiUrl = "http://localhost:5000/api/createtask";
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, date, description, period
      })
    })
    
    await res.json();
  }

  return (
    <div className='main'>
      <div className='Heading'>
        <div>Create Task</div>
        <div className='Link'>
          <Link className='Links' to='/'>
            Home
          </Link>
          <Link className='Links' to='/List'>
            Task List
          </Link>
        </div>
      </div>
      <div className='Form'>
        <form className='form' method='POST'>
          <div>
            <label htmlFor='name'>Name : </label>
            <input className='field' value={backend.name} type='text' name='name' placeholder='Task Name' onChange={handleInputs} required />
          </div>
          <label htmlFor='date'>
            Due date :
            <input type='date' name='date' onChange={handleInputs} required />
          </label>
          <label htmlFor='period'>
            Period Type :
            <select name='period' className='checklist-list' id='period' onChange={handleInputs} required>
              <option value='' >Select Period</option>
              <option value='Monthly' >Monthly</option>
              <option value='Quarterly'>Quarterly</option>
              <option value='Annualy'>Annualy</option>
            </select>
          </label>
          <label htmlFor='description'>Description : </label>
          <textarea className='field' value={backend.description} name='description' id='text' cols='40' rows='5' onChange={handleInputs} required></textarea>
          <button type='submit' onClick={PostData}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;