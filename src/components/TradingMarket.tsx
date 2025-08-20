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
        <>
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
          
