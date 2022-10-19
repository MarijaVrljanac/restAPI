import React, { useState, useEffect } from "react";
import "./Users.css";
// import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Repo from "./Repo";
import { TbArrowBackUp } from "react-icons/tb";
import gitLogo from './R.png';


const Users = () => {

    // const [avatar_url, setAvatarUrl] = useState("");
    // const [login, setLogin] = useState("");

    const { login } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await Promise.all([
                    axios.get(`https://api.github.com/users/${login}`),
                    axios.get(`https://api.github.com/users/${login}/repos`),
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
    }, []);

    return(
        <div className="users">
            <img src={gitLogo}>
            </img>
        
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
                        <i>Followers:</i> {userInfo?.following}  <i>Following:</i> {userInfo?.followers}
                        </p>
                    </div>
                    <div className="more-data">
                        

                        <p>
                            <a href={userInfo?.html_url}><button className="visit-btn">Go To GitHub Profile</button></a>
                        </p>
                    </div>
                </div>
                
                
            </div>    
            <div>
            <h3>Check out <i>{userInfo?.login}'s</i> repos:</h3>
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
        </div> 
    );
};

export default Users;