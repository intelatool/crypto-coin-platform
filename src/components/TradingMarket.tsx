import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ShoppingCart } from 'lucide-react';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  description: string;
  image: string | null;
  createdAt: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  holders: number;
}

interface TradingMarketProps {
  coins: Coin[];
  onTrade: (coinId: string, type: 'buy' | 'sell', amount: number) => void;
}

export const TradingMarket: React.FC<TradingMarketProps> = ({ coins, onTrade }) => {
  const [selectedCoin, setSelectedCoin] = useStateuseStateuseState<Coin | null>(null);
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradeType, setTradeType] = useStateuseStateuseState<'buy' | 'sell'>('buy');

  const handleTrade = () => {
    if (!selectedCoin || !tradeAmount) return;
    
    const amount = parseFloat(tradeAmount);
    if (amount <= 0) return;

    onTrade(selectedCoin.id, tradeType, amount);
    setTradeAmount('');
    setSelectedCoin(null);
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Trading Market</h2>
      
      {coins.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No Coins Available</h3>
          <p className="text-gray-500">Create the first coin to start trading!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {coins.map((coin) => (
            <div key={coin.id} className="bg-black/30 rounded-lg border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {coin.symbol.charAt(0)}
                    </span>
                  </div>
                  <div>
                            <h3 className="font-medium text-white">{coin.name}</h3>
                    <p className="text-gray-400 text-sm">{coin.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">${coin.price.toFixed(4)}</p>
                  <div className={`flex items-center space-x-1 ${
                    coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {coin.change24h >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm">
                      {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCoin(coin)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCoin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl border border-white/10 p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">{selectedCoin.name}</h3>
              <button
                onClick={() => setSelectedCoin(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    tradeType === 'buy'
                      ? 'bg-green-600 text-white'
                      : 'bg-black/30 text-gray-400 hover:text-white'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    tradeType === 'sell'
                      ? 'bg-red-600 text-white'
                      : 'bg-black/30 text-gray-400 hover:text-white'
                  }`}
                >
                  Sell
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amount (SOL)
                </label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <button
                onClick={handleTrade}
                disabled={!tradeAmount || parseFloat(tradeAmount) <= 0}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedCoin.symbol}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
