import React, { useState, useEffect } from "react";
import "./User.css";
// import { useState, useEffect } from 'react';
import { Link,useParams } from "react-router-dom";
import axios from "axios";
import Repo from "./Repo";

const User = () => {

    // const [avatar_url, setAvatarUrl] = useState("");
    // const [login, setLogin] = useState("");

    const { login, html_url } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [repos, setRepos] = useState([]);


    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await Promise.all([
                    axios.get(`/users/${ login }`),
                    axios.get(`/users/${ login }/${repos}`)
    
                ]);
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
         <div className="card">
            <Link to="/">Go back</Link>
                <img src={ userInfo?.avatar_url } alt="avatar"></img>
                <p>{ userInfo?.login }</p>
                <h3>{ userInfo?.followers_url }</h3>
                <h3>{ userInfo?.following_url }</h3>
                <h3>{ userInfo?.repos_url }</h3>
                <Link to={`/user/${ login }`} className="loginbtn">User Detail</Link> 
                {/* <a href={ html_url }><button className="user-detail-btn">User Detail</button></a> */}
                <div className="user-repos">
                    {   
                        repos ? repos.map(repo => {
                            return <Repo repo={ repo } key={ repo.id }></Repo>
                        }) : (<h2>User doesn't have any public repositories yet.</h2>)
                    }
                </div>
        </div>
    );
};

export default User;