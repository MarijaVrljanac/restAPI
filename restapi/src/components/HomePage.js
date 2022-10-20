import React, { useState, useEffect } from "react";
import "./HomePage.css"
import gitLogo from './R.png';
import axios from "axios";
import User from "./User";
// import debounce from 'lodash.debounce';
import { GrPrevious, GrNext } from "react-icons/gr";
import { MdSearch } from "react-icons/md";
// import { Octokit } from "octokit";
// import { token } from "./token";



const HomePage = () => {

  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  //Per page
  const [limit, setLimit] = useState(20);

  // let octokit = new Octokit({
  //   auth: ""
  // });

  const reloadPage = () => {
    window.location.reload()
  }

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearchUsers(e);
  };

  const handlePreviousPage = () => {
    console.log("Previous page");
    setPage (page => {
      if(page == 1) return page;
      else return page - 1;
    })
  };

  const handleNextPage = () => {
    console.log("Next page");
    setPage (page => page + 1);
  };

  const handlePageLimit = (e) => {
    const value = e.target.value;
    setLimit(parseInt(value));
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`https://api.github.com/search/users?q=${query}`, { params: {page, per_page: limit}, headers: {
        'Authorization': "{token}",
      } });
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
          <img src={gitLogo} alt="logo" onClick={reloadPage}/>
        </div>
          <div className="input">
            <input id="input-field" value={ query } type="text" placeholder="Search for GitHub user" onChange={ handleQueryInput } />
            {/* <MdSearch className="search-btn" onClick={ handleSearchUsers }/> */}
          </div>
          <div className="users-per-page">
            <label>
              <small>Users per page: </small>
              <select onChange={ handlePageLimit }>
                <option value="20">20</option>
                <option value="24">24</option>
                <option value="28">28</option>
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
          }) : (<h2>There are no users to display...</h2>) }
        </div>
      </div>
    )
}

export default HomePage;