import React from "react";
import "./Repo.css";
// import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const Repo = ( { repo } ) => {

    const { name, html_url, description, language } = repo;

    return(
        <div className="repo">
            <h3 className="repo-name">
                <a href={html_url} >{name}</a>
            </h3>
            <p>
                {description}
            </p>
        { language && <small>• {language}</small>}
    </div>
    )
};

export default Repo;