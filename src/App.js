import React, { useState, useEffect } from 'react';
import BotBattlrCollection from './BotBattlrCollection';
import BotBattlrArmy from './BotBattlrArmy';
import './App.css';

export default function App() {
  // Define state variables for available bots and selected bots
  const [availableBots, setAvailableBots] = useState([]);
  const [selectedBots, setSelectedBots] = useState([]);

  // Use useEffect to fetch data from the JSON server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8001/bots');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAvailableBots(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addBotToArmy = (bot) => {
    // Add a bot to the selectedBots array if it's not already selected
    if (!selectedBots.some((selectedBot) => selectedBot.id === bot.id)) {
      setSelectedBots([...selectedBots, bot]);
    }
  };

  const releaseBotFromArmy = (bot) => {
    // Remove a bot from the selectedBots array
    const updatedSelectedBots = selectedBots.filter((selectedBot) => selectedBot.id !== bot.id);
    setSelectedBots(updatedSelectedBots);
  };

  const dischargeBotForever = (bot) => {
    // Remove a bot from both the server and the selectedBots array
    fetch(`http://localhost:8001/bots/${bot.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete bot');
        }
        return response.json();
      })
      .then(() => {
        releaseBotFromArmy(bot);
        updateAvailableBots(bot);
      })
      .catch((error) => console.error('Error deleting bot:', error));
  };

  const updateAvailableBots = (removedBot) => {
    // Update availableBots by filtering out the removed bot
    const updatedBots = availableBots.filter((bot) => bot.id !== removedBot.id);
    setAvailableBots(updatedBots);
  };

  return (
    <div className="App">
      <h1>Bot Battle</h1>
      <div className="container">
        <BotCollection bots={availableBots} addBotToArmy={addBotToArmy} />
        <YourBotArmy
          selectedBots={selectedBots}
          releaseBotFromArmy={releaseBotFromArmy}
          dischargeBotForever={dischargeBotForever}
        />
      </div>
    </div>
  );
}
