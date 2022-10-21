import React, { useState, useEffect } from "react";
import "./styles/Users.css";
// import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Repo from "./Repo";
import { TbArrowBackUp } from "react-icons/tb";
import gitLogo from './assets/R.png';
import { GrPrevious, GrNext } from "react-icons/gr";


const Users = () => {

    // const [avatar_url, setAvatarUrl] = useState("");
    // const [login, setLogin] = useState("");

    const { login } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [repos, setRepos] = useState([]);

    const [page, setPage] = useState(1);
    //Per page
    const [limit, setLimit] = useState(1);

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

      

    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await Promise.all([
                    axios.get(`https://api.github.com/users/${login}`),
                    axios.get(`https://api.github.com/users/${login}/repos`, { params: {page, per_page: limit}}),
                ]);
                console.log(response[0].data);
                setUserInfo(response[0].data);
                setRepos(response[1].data);
                console.log(response[0].data);
            } catch (error) {
                console.error(error);
            }  
        };
        fetchUserInformation();
    }, [page, limit]);

    return(
        <div className="users">
            <Link to="/" className="back">
                <img src={gitLogo} className="gitlogo"></img>
            </Link>
        
            <div className="go-back">
                    <Link to="/" className="back">
                        <button className="back-btn"><TbArrowBackUp/> Go Back</button>
                    </Link>
                    
            </div>
            <h3>Check out more details about <i>{userInfo?.login}</i>:</h3>
            <div className="user-card">
                
                <div className="user-information">
                    <div className="image">
                        <img src={userInfo?.avatar_url} />
                    </div>
                    <div className="name">
                        <h2>{userInfo?.name}</h2>
                    </div>
                    <div className="user-content">
                        <h5>@{userInfo?.login}</h5>
                    </div>
                    {userInfo?.bio && (
                    <div className="bio">
                        <p>
                            {userInfo?.bio}
                        </p>
                    </div>
                    )}
                    {userInfo?.company && (
                    <div className="company">
                        <p>
                            Company name: <i>{userInfo?.company}</i>
                        </p>
                    </div>
                    )}
                    {userInfo?.location && (
                        <div className="location">
                        <p>
                            Location: <i>{userInfo?.location}</i>
                        </p>
                    </div>
                    )}

                    {userInfo?.twitter_username && (
                        <div className="twitter_username">
                        <p>
                            Find me on twitter: <i>@{userInfo?.twitter_username}</i>
                        </p>
                    </div>
                    )}
                    
                    <div className="followers">
                        <p>
                        <i>Following:</i> {userInfo?.following}  <i>Followers:</i> {userInfo?.followers}
                        </p>
                    </div>

                    <div className="more-data">
                        <p>
                            <a href={userInfo?.html_url}><button className="visit-btn">Go To GitHub Profile</button></a>
                        </p>
                    </div>
                </div>   
            </div> 
            {repos ? (<div>
                <h3>Check out <i>{userInfo?.login}'s</i> repos:</h3>
                <div className="repos-per-page">
            <label>
              <small>Repos per page: </small>
              <select onChange={ handlePageLimit }>
                {/* <option value="1">1</option>
                <option value="2">2</option> */}
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="8">8</option>
              </select>
            </label>
            <div className="pagination">
              <button onClick={ handlePreviousPage }><GrPrevious/> </button>
              <button onClick={ handleNextPage }><GrNext/></button>
            </div>
          </div>
            <div className="user-repos">                    
                    {repos ? (
                        repos.map((repo) => {
                        return <Repo repo={repo} key={repo.id} />;
                        })
                    ) : (
                        <h2>{userInfo?.login} doesn't have any public repositories yet.</h2>
                    )}
                </div>  

            </div>) : (<h2>{userInfo?.login} doesn't have any public repositories yet.</h2>)
            }   
            
            
        </div> 
    );
};

export default Users;