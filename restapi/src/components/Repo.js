import React from "react";
import "./User.css";
// import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const Repo = ( { repo } ) => {

    const {login, repos_url} = repo;

    return(
      <div className="user-repos">
        <div className="repo">
            <h3>
                <a href="#">{ login }</a>
            </h3>
            <p>
                { repos_url }
            </p>

        </div>   
    </div>
    )
};

export default Repo;