import React from 'react';

const YourBotArmy = ({ selectedBots, releaseBotFromArmy, dischargeBotForever }) => {
  // Function to handle discharging a bot forever
  const handleDischargeForever = (bot) => {
    // Remove the bot from selectedBots
    releaseBotFromArmy(bot);

    // Send a DELETE request to remove the bot from the JSON server
    fetch(`http://localhost:8001/bots/${bot.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Update the availableBots list in the App component
        // (You may need to pass a callback function to update the state in App)
      })
      .catch((error) => {
        console.error('Error deleting bot:', error);
      });
  };

  return (
    <div className="your-bot-army">
      <h2>Your Bot Army</h2>
      <ul>
        {selectedBots.map((bot) => (
          <li key={bot.id}>
            <div className="bot-card">
              <img src={bot.avatar_url} alt={`Avatar of ${bot.name}`} className="bot-image" />
              <div className="bot-details">
                <h3>{bot.name}</h3>
                <button onClick={() => releaseBotFromArmy(bot)}>Release</button>
                <button onClick={() => handleDischargeForever(bot)}>X</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YourBotArmy;