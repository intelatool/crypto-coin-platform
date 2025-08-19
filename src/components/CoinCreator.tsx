import React, { useState } from 'react';

const CoinCreator: React.FC = () => {
    const [coinName, setCoinName] = useState('');
    const [coinSymbol, setCoinSymbol] = useState('');

    const handleCreateCoin = () => {
        // Logic to create a coin
        console.log(`Creating coin: ${coinName} (${coinSymbol})`);
    };

    return (
        <div>
            <h1>Create Your Coin</h1>
            <input 
                type="text" 
                placeholder="Coin Name" 
                value={coinName} 
                onChange={(e) => setCoinName(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Coin Symbol" 
                value={coinSymbol} 
                onChange={(e) => setCoinSymbol(e.target.value)} 
            />
            <button onClick={handleCreateCoin}>Create Coin</button>
        </div>
    );
};

export default CoinCreator;