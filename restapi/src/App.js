import React, { useState, useEffect } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import gitLogo from './R.png';
import './App.css';

function App() {

  const [avatar_url, setAvatarUrl] = useState("");
  const [login, setLogin] = useState("");
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  const query = "Marija";

  useEffect(() => {
    fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(data => {
      setData(data);
    });
  }, []);

  const setData = ({ avatar_url, login }) => {
    setAvatarUrl(avatar_url);
    setLogin(login);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/search/users?q=${userInput}`)
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        setError(data.message);
      }else{
        setData(data);
        setError(null);
      }   
    })
  };

  return (
    <div className="App">
      <div className='container'>
        <img src={gitLogo} alt='logo'/>
        <br/>
        <input id="input-field" type="text" placeholder="Search for GitHub user" onChange={ handleSearch } onKeyUp= { handleSubmit }/>
          <br></br>

      </div>
      { error ? (<h1>{error}</h1>) : (
        <div className='card'>
        <Card>
          <Image src={ avatar_url } wrapped ui={false} />
          <Card.Content>
            <Card.Header>{login}</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <button className='userDetails'>User Detail</button>
          </Card.Content>
       </Card>
    </div>
      )}
      
    </div>
  );
}

export default App;
