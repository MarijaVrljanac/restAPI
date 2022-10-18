import React, { useState } from "react";
import "./HomePage.css"
import gitLogo from './R.png';
import axios from "axios";
import User from "./User";


const HomePage = () => {

  //Query value picked up from user input
  const [query, setQuery] = useState("");

  //Users fetched from the API
  const [users, setUsers] = useState([]);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    
  }

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`https://api.github.com/search/users?q=${query}`);
      return data?.items;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    if(query) {
      const items = await fetchUsers();
      setUsers(items);
    }else{
      console.log("Query is empty...");
    }
  };

    return (
      <div className="container">
        <div className="logo">
          <img src={gitLogo} alt="logo"/>
          <br/>
        </div>
          <input id="input-field" value={ query } type="text" placeholder="Search for GitHub user" onChange={ handleQueryInput }/>
            <br></br>
          <button className="search-btn" onClick={ handleSearchUsers }>Search</button>
          <br/>
        
        <div className="search-results">
          { users ? users.map(user => {
            return <User user = { user } key={ user.id }/>
          }) : (<h2>There is nothing to display...</h2>) }
        </div>
      </div>
    )
}

export default HomePage;