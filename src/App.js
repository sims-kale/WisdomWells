import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import styled from "styled-components";

const theme = {
  red: {
    default: "red",
    hover: "lightblue"
  },
  blue: {
    default: "blue",
    hover: "lightblue"
  }
};

function App() {
  const [quote, setQuote] = useState('');
  const [challenges, setChallenges] = useState([]);
  const [selectedchallenge, setSelectedChallenge] = useState('');

useEffect(() => {
  fetchRandomQuote();
  }, []); // Empty dependency array to run the effect only once


  // fetch a random quote
  const fetchRandomQuote = () => {
    axios.get('https://api.quotable.io/random')
      .then(response => {
        setQuote(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
      });
  };

  //fetch a daily challenges

  const fetchDailyChallenges = () => {

    const allChallenges = [
      "Gratitude Journal: Write down three things you're grateful for today and reflect on why they are important to you.",
      "Mindful Moment: Take five minutes to practice mindfulness meditation or deep breathing exercises.",
      "Random Act of Kindness: Perform a random act of kindness for someone else and reflect on how it made you feel.",
      "Learn Something New: Spend 15 minutes learning about a topic or skill that interests you but you haven't explored before.",
      "Step Out of Your Comfort Zone: Do something today that challenges you or pushes you out of your comfort zone. It could be speaking up in a meeting, trying a new hobby, or initiating a conversation with a stranger.",
      "Reflect on Successes: Write down three recent accomplishments or successes, no matter how small, and acknowledge the effort you put into achieving them.",
      "Disconnect from Technology: Take a break from screens and spend an hour engaging in an analog activity like reading a book, going for a walk, or spending time with loved ones."
    ];
    // Shuffle the challenges array
    const shuffledChallenges = allChallenges.sort(() => Math.random() - 0.5);

    // Select the first three challenges from the shuffled array
    const selectedChallenges = shuffledChallenges.slice(0, 3);

    // Set the challenges in the state
    setChallenges(selectedChallenges);
  }

  const handleNewQuote = () => {
    fetchRandomQuote();
  };

  const handleDailyChallenges = () => {
    fetchDailyChallenges();
  }

  const handleChallengeSelection = (challenge) => {
    setSelectedChallenge(challenge);
  }

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
      <Button theme="red" onClick={handleNewQuote}>
        Get New Quote
      </Button>
      <h1>
        Your Daily challenge:
      </h1>

      {selectedchallenge ? (
        <div>
          <p> Selected Challenge: {selectedchallenge}</p>
        </div>
      ) : (
        <div>
          <p> Select Your Challenge: </p>
          {challenges.map((challenge, index) => (
            <p key={index}>
              <span> {index +1}. {challenge}</span>
              <Button theme="blue" onClick= {() => handleChallengeSelection(challenge)}>Select</Button>
            </p>
          ))}
        </div>
      )}
      {!selectedchallenge && (
        <Button theme="red" onClick={handleDailyChallenges}>
          Get Your Challenge
          </Button>
      )}
      </div>
  );
}

export default App;
