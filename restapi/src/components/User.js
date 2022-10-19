import React from "react";
import "./User.css";
// import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const User = ( { user } ) => {

    // const [avatar_url, setAvatarUrl] = useState("");
    // const [login, setLogin] = useState("");

    const { avatar_url, login, html_url } = user;

    return(
      <div className="card">
      <div className="image">
        <img src={avatar_url} alt={login} />
      </div>
      <div className="user-info">
        <h4>{login}</h4>
      </div>
      <div className="user-detail">
        <Link to={`/user/${login}`}><button className="user-detail-btn">User Detail</button></Link>
        </div>
    </div>
    )
};

export default User;