import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import styled from "styled-components";

// Define the theme object or import it from somewhere
const theme = {
  red: {
    default: "red",
    hover: "lightblue" // Adjusted hover color for the red theme
  }
};

function App() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchRandomQuote();
  }, []); // Empty dependency array to run the effect only once

  const fetchRandomQuote = () => {
    axios.get('https://api.quotable.io/random')
      .then(response => {
        setQuote(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
      });
  };

  const handleNewQuote = () => {
    fetchRandomQuote();
  };

  // Define the styled button component
  const Button = styled.button`
    background-color: ${(props) => theme[props.theme].default};
    color: white;
    padding: 5px 15px;
    border-radius: 5px;
    outline: 0;
    border: 0; 
    text-transform: uppercase;
    margin: 10px 0px;
    cursor: pointer;
    box-shadow: 0px 2px 2px lightgray;
    transition: ease background-color 250ms;
    &:hover {
      background-color: ${(props) => theme[props.theme].hover};
    }
    &:disabled {
      cursor: default;
      opacity: 0.7;
    }
  `;

  return (
    <div className="App">
      <h1>
        Here's an interesting quote for you:
      </h1>
      <p className="Quote">{quote}</p>
      {/* Use the styled button component */}
      <Button theme="red" onClick={handleNewQuote}>
        Get New Quote
      </Button>
    </div>
  );
}

export default App;
