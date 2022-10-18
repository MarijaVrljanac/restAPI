import React, { useState, useEffect } from "react";
import "./HomePage.css"
import gitLogo from './R.png';
import axios from "axios";
import User from "./User";
import { GrPrevious, GrNext } from "react-icons/gr";



const HomePage = () => {

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  //Per page
  const [limit, setLimit] = useState(10);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handlePreviousPage = () => {
    console.log("Radi")
    setPage (page => {
      if(page == 1) return page;
      else return page - 1;
    })
  };

  const handleNextPage = () => {
    setPage (page => page + 1);
  };

  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`https://api.github.com/search/users?q=${query}`);
      console.log(data?.items);
      return data?.items;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const displayUsersOnChange = async () => {
      if(query) {
        const items = await fetchUsers();
        setUsers(items);
      }
    }
    displayUsersOnChange();
  }, [page,limit]);

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
          <button onClick={ handleSearchUsers }>Search</button>
          <br/>
          <div className="users-per-page">
            <label>
              <small>Users per page: </small>
              <select onChange={ handlePageLimit }>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </label>
            <div className="pagination">
              <button onClick={ handlePreviousPage }><GrPrevious/> </button>
              <button onClick={ handleNextPage }><GrNext/></button>
            </div>
          </div>
        <div className="search-results">
          
          { users ? users.map(user => {
            return <User user = { user } key={ user.id }/>
          }) : (<h2>There is nothing to display...</h2>) }
        </div>
      </div>
    )
}

export default HomePage;