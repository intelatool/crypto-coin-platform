
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ShoppingCart, DollarSign, BarChart3, Users } from 'lucide-react';

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
  const [sortBy, setSortBy] = useStateuseStateuseStateuseStateuseState<'price' | 'volume' | 'change'>('volume');

  const sortedCoins = [...coins].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return b.price - a.price;
      case 'volume':
        return b.volume24h - a.volume24h;
      case 'change':
        return b.change24h - a.change24h;
      default:
        return 0;
    }
  });

  const handleTrade = () => {
    if (!selectedCoin || !tradeAmount) return;
    
    const amount = parseFloat(tradeAmount);
    if (amount <= 0) return;

    onTrade(selectedCoin.id, tradeType, amount);
    setTradeAmount('');
    setSelectedCoin(null);
  };

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(6)}`;
    return `$${price.toFixed(4)}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`;
    return `$${volume.toFixed(0)}`;
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Trading Market</h2>
            <p className="text-gray-400 text-sm">Buy and sell community coins</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price' | 'volume' | 'change')}
            className="bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="volume">Sort by Volume</option>
            <option value="price">Sort by Price</option>
            <option value="change">Sort by Change</option>
          </select>
        </div>
      </div>

      {coins.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-400 mb-2">No Coins Available</h3>
          <p className="text-gray-500">Create the first coin to start trading!</p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-black/30 rounded-lg border border-white/10 p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Volume 24h</p>
                  <p className="text-lg font-bold text-white">
                    {formatVolume(coins.reduce((sum, coin) => sum + coin.volume24h, 0))}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-lg border border-white/10 p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Market Cap</p>
                  <p className="text-lg font-bold text-white">
                    {formatVolume(coins.reduce((sum, coin) => sum + coin.marketCap, 0))}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-lg border border-white/10 p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-400" />
                <div>
                      <p className="text-sm text-gray-400">Active Coins</p>
                  <p className="text-lg font-bold text-white">{coins.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-2 text-gray-400 font-medium">Coin</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Price</th>
                            <th className="text-right py-3 px-2 text-gray-400 font-medium">24h Change</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Volume</th>
                  <th className="text-right py-3 px-2 text-gray-400 font-medium">Market Cap</th>
                  <th className="text-center py-3 px-2 text-gray-400 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedCoins.map((coin) => (
                  <tr key={coin.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        {coin.image ? (
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {coin.symbol.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-white">{coin.name}</p>
                          <p className="text-gray-400 text-sm">{coin.symbol}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <p className="font-medium text-white">{formatPrice(coin.price)}</p>
                    </td>
                    <td className="py-4 px-2 text-right">
                                                                <div className={`flex items-center justify-end space-x-1 ${
                        coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {coin.change24h >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="font-medium">
                          {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <p className="text-white">{formatVolume(coin.volume24h)}</p>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <p className="text-white">{formatVolume(coin.marketCap)}</p>
                    </td>
                                <td className="py-4 px-2 text-center">
                      <button
                        onClick={() => setSelectedCoin(coin)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedCoin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl border border-white/10 p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {selectedCoin.image ? (
                  <img
                    src={selectedCoin.image}
                    alt={selectedCoin.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {selectedCoin.symbol.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedCoin.name}</h3>
                  <p className="text-gray-400">{formatPrice(selectedCoin.price)}</p>
                </div>
              </div>
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

              <div className="bg-black/30 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Trading Fee (2%):</span>
                  <span className="text-white">
                    {tradeAmount ? (parseFloat(tradeAmount) * 0.02).toFixed(4) : '0.0000'} SOL
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">You {tradeType === 'buy' ? 'pay' : 'receive'}:</span>
                  <span className="text-white font-medium">
                    {tradeAmount ? (parseFloat(tradeAmount) * (tradeType === 'buy' ? 1.02 : 0.98)).toFixed(4) : '0.0000'} SOL
                  </span>
                </div>
              </div>

              <button
                onClick={handleTrade}
                disabled={!tradeAmount || parseFloat(tradeAmount) <= 0}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
              >
                {tradeType === 'buy' ? 'Buy' : 'Sell'} {selectedCoin.symbol}
              </button>
            </div>

            <div className="mt-4 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <p className="text-purple-300 text-sm">
                💰 <strong>Trading Fee:</strong> 2% goes to platform revenue
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
