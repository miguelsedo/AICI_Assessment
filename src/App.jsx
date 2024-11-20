import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [counter, setCounter] = useState(1); 
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users/";

    fetch(url + counter)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUserData(data); 
      })
      .catch(error => {
        setError(error.message);
      });
  }, [counter]); 

  const handleAdd = () => {
    if (counter < 10) setCounter(counter + 1);
  };

  const handleSubtract = () => {
    if (counter > 1) setCounter(counter - 1);
  };

  const handleReset = () => setCounter(1);

  return (
    <div className="div1">
      <h1>Fetch User Data</h1>
      <div>
        <button onClick={handleSubtract} disabled={counter === 1}>-1</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleAdd} disabled={counter === 10}>+1</button>
        <h1>User ID: {counter}</h1>
      </div>
      {error && <p>{error}</p>}
      {userData ? (
        <div className="div2">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Website:</strong> {userData.website}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p className="phone"><strong>Phone:</strong> {userData.phone}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default App;
