import React from 'react';

const BotBattlrCollection = ({ bots, addBotToArmy }) => {
  return (
    <div className="bot-collection">
      <h2>Bots Collection</h2>
      <ul>
        {bots.map((bot) => (
          <li key={bot.id}>
            <div className="bot-card">
              <img src={bot.avatar_url} alt={`Avatar of ${bot.name}`} className="bot-image" />
              <div className="bot-details">
                <h3>{bot.name}</h3>
                <button onClick={() => addBotToArmy(bot)}>Add to Army</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BotBattlrCollection;