import React from "react";
import "./User.css";
// import { useState, useEffect } from 'react';


const User = ( { user } ) => {

    // const [avatar_url, setAvatarUrl] = useState("");
    // const [login, setLogin] = useState("");

    const { avatar_url, login, html_url } = user;

    return(
      <div className="card">
            <img src={ avatar_url } alt="avatar"></img>
            <p>{ login }</p>
            {/* <Link to={`/user/${ login }`} className="loginbtn">User Detail</Link>  */}
            <a href={ html_url }><button className="user-detail-btn">User Detail</button></a>
    </div>
    )
};

export default User;