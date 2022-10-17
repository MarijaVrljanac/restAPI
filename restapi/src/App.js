import React, { Component, useState, useEffect } from 'react';
import './App.css';

class App extends Component {

    state = {
      loading: true,
      user: null,
    };



  async componentDidMount(){
      const query = "Marija";
    // const query = document.getElementById("input-field").value;

    const response = await fetch(`https://api.github.com/search/users?q=${query}`);
    const data = await response.json();
    this.setState({user: data.items[0], loading: false });
    console.log(data.items[0]);
  }
  
  render (){
    if (this.state.loading || !this.state.user){
      return (
        <div className="container">
        <div className="image-div">
            <img src="assets/R.png" alt="git-icon"/>
        </div>    
        <input id="input-field" type="text" placeholder="Search for GitHub user"/>
        <br/>
    </div>  
      );
    }
    return (
      <div>
        
    <div id="users">
        <div id="user">
            <div>
              <img src={ this.state.user.avatar_url }/>
              <div>{ this.state.user.login }</div>
         </div> 
        </div>    
      </div>     
    </div>
    );

    
  }
    
}

export default App;
