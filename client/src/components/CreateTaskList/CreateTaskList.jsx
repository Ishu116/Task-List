import React, { useEffect, useState } from 'react'
import "./CreateTaskList.css"
import { Link } from "react-router-dom";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const CreateTaskList = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    GetList()
  }, []);


  function GetList() {
    const apiUrl = "http://localhost:5000/api/tasklist";
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error))
  }
  // const PostData = async (e) => {
  //   e.preventDefault();
  //   const itemId = e.target.value;
  //   const res = await fetch("/delete", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       itemId
  //     })
  //   });
  //   await res.json();
  // }

  const PostData = async (e, itemId) => {
    e.preventDefault();
    // const itemId = e.current.value; 
    const apiUrl = `http://localhost:5000/delete/${itemId}`;
    await fetch(apiUrl, {
      method: "DELETE"
    }).then(() => {
      GetList();
    }).catch((error) => {
      console.error(error);
    })
  }

  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (itemId) => {
    setCheckedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const filteredTasks = data.filter(item => {
    return item.taskname.toLowerCase().includes(search.toLowerCase());
  });
  

  return (
    <>
      <div className='main'>
        <div className='Heading'><div>Task List</div>
          <div className='Link'>
            <Link className='Links' to="/">Home</Link>
            <Link className='Links' to="/List">Task List</Link>
          </div>
        </div>
        <form className='form-input' >
          <input type="text" onChange={handleChange} placeholder='Search Task' className='input-search'></input>
        </form>
        <div className='List'>
          {
            filteredTasks.map((item) => {
              const { _id, taskname, completed, description, duedate, period } = item;
              const date = new Date(duedate);
              const istDate = date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
              const isChecked = checkedItems[_id];
              return (
                <div className='container'>
                  <div className={isChecked ? 'checked container-list' : "container-list"}>
                    <div className='list--container'>
                      <span>Task Name : {taskname}</span>
                      <span>Due date : {istDate}</span>
                      <span>Period Type : {period}</span>
                      <span>Description : {description}</span>
                      <div>
                        <button className='button--List' type='submit' onClick={(e) => { PostData(e, _id) }} name='submit' value={_id}><DeleteForeverIcon /></button>
                      </div>
                    </div>
                    <div>
                      <form className='form--List' method='POST'>
                        <div className='checkbox-div'>
                          <input className='checkbox-btn' type="checkbox" onChange={() => handleCheckboxChange(_id)} />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default CreateTaskList;
