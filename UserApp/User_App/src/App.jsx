import React from 'react';
import axios from 'axios';

import { useState } from "react";
import { useEffect } from "react";

function App(){
  const [users,setUsers] = useState([]);
  const [form,setform] = useState({name:"",email:""});
  
  useEffect(()=>{
    axios.get("http://localhost:5000/users")
    .then(response =>setUsers(response.data))
    .catch(err => console.log(err));
  },[]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:5000/users",form)
    .then(res => setUsers([...users,res.data]))
    .catch(err => console.log(err));
  }

  return(
    <div style={{padding:"20px"}}>
      <h1>React + Express + MongoDb</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" 
        placeholder="Name"
        value={form.name}
        onChange={e =>setform({...form,name:e.target.value})}
        />

        <input type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setform({...form,email:e.target.value})}
        />
        <button type="submit">Click Here</button>
        </form>
        <h2>
          Users:
        </h2>
        <ul>
          {
            users.map((u,i)=>(
              <li key={i}>
                <h2>{u.name}</h2>
                <h5>{u.email}</h5>
              </li>
            ))
          }
        </ul>
    </div>
  )
}


export default App;