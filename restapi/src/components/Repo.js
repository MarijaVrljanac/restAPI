import React from "react";
import "./styles/Repo.css";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const Repo = ( { repo } ) => {

    const { name, html_url, description, language } = repo;
    const [isShown, setIsShown] = useState(false);

    const descButton = document.querySelector(".descBtn");

    const toggleDesc = event => {
        setIsShown(current => !current);
      };

    return(
        <div className="repo">
            <h3 className="repo-name">
                <a href={html_url} >{name}</a>
            </h3>
            {description && <button type="button" className="descBtn" onClick={ toggleDesc }> {isShown ? "Hide description..." : "Show description..."} </button>
           }
            {isShown && (
            <div>
                <p className="desc">
                    {description}
                </p>
            </div>
             )}
                
        { language && <small className="language">• {language}</small>}
    </div>
    )
};

export default Repo;