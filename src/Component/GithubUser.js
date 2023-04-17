import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GithubUserSearch() {
  const [username, setUsername] = useState('Sadia-Malik'); // Set default username to "Sadia-Malik"
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    handleSearch(); // Automatically search for default user on component mount
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUser(response.data);
      setErrorMessage('');
    } catch (error) {
      setUser(null);
      setErrorMessage('User not found. Please try a different username.');
    }
  };

  return (
    <div className='container d-flex justify-content-evenly p-5 bg-secondary'>
      <div className='col-lg-6 text-center'>
        <h5> Search GitHub users:</h5>
        <label className='mt-3 mb-3 w-75'>
          <input className='w-100' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button onClick={handleSearch}>Search</button>

        {errorMessage && <p>{errorMessage}</p>}
        {user && (
          <div className='text-center border mt-5 mb-5'>
            {/* <h2>{user.name}</h2> */}
            <img className='rounded-circle text-center mt-3 mb-3' src={user.avatar_url} alt={user.avatar_url} />
            {/* <img src={user.avatar_url} alt={user.avatar_url} /> */}
            <h2 className='fs-4 text-dark'><a className='fs-4 text-primary' href={user.html_url}>{user.name}</a></h2>
            <h5 className='text-dark'>{user.bio}</h5>
            {user.company ? <p className='mt-2 fs-5 text-dark'>Company: {user.company}</p> : <p className='mt-2 fs-6'>No company information available.</p>}
            <p>Number of public repositories: {user.public_repos}</p>
            <div className='d-flex justify-content-center fs-5 text-dark'>
              <p>Followers: {user.followers}</p>
              <p className='ms-4 fs-5 text-dark '>Following: {user.following}</p>
            </div>
            {user.public_repos === 0 ? <p>No public repositories found.</p> : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default GithubUserSearch;
