import React, { useState } from 'react';
import { Rocket, Plus, TrendingUp, Users, DollarSign, Sparkles } from 'lucide-react';
import { CoinCreator } from './components/CoinCreator';
import { TradingMarket } from './components/TradingMarket';
import { Portfolio } from './components/Portfolio';

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
