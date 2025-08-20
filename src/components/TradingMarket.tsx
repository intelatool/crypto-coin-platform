import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface TradingMarketProps {
  coins: any[];
  onTrade: (coinId: string, type: string, amount: number) => void;
}

export const TradingMarket = ({ coins, onTrade }: TradingMarketProps) => {
  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Trading Market</h2>
      <div className="text-center py-12">
        <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-400 mb-2">Trading Coming Soon</h3>
        <p className="text-gray-500">Feature under development</p>
      </div>
    </div>
  );
};

