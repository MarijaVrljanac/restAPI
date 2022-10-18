import React from "react";
import "./User.css";
// import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "../axios";
import { useNavigate } from 'react-router-dom';


const User = ( { user } ) => {

    // const [avatar_url, setAvatarUrl] = useState("");
    // const [login, setLogin] = useState("");

    const { avatar_url, login, html_url } = user;

    return(
      <div className="card">
            <img src={ avatar_url } alt="avatar"></img>
            <p>{ login }</p>
            {/* <Link to={`/user/${ login }`} className="btn">User Detail</Link>  */}
            <a href={ html_url }><button>User Detail</button></a>
    </div>
    )
};

export default User;