import React, { useState } from 'react';
import { Upload, Image, Coins, DollarSign, Info } from 'lucide-react';

interface CoinCreatorProps {
  onCreateCoin: (coinData: any) => void;
}

export const CoinCreator: React.FC<CoinCreatorProps> = ({ onCreateCoin }) => {
  const [coinName, setCoinName] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinDescription, setCoinDescription] = useState('');
  const [coinImage, setCoinImage] = useStateuseStateuseState<string | null>(null);
  const [imageFile, setImageFile] = useStateuseStateuseState<File | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be smaller than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoinImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCoin = async () => {
    if (!coinName || !coinSymbol) {
      alert('Please fill in coin name and symbol');
      return;
    }

    setIsCreating(true);

    try {
      const coinData = {
        name: coinName,
        symbol: coinSymbol.toUpperCase(),
        description: coinDescription,
        image: coinImage,
        imageFile: imageFile,
        createdAt: new Date().toISOString(),
        id: Date.now().toString(),
        mintingFee: 0.11, // All-inclusive fee
      };

      onCreateCoin(coinData);
      
      // Reset form
      setCoinName('');
      setCoinSymbol('');
      setCoinDescription('');
      setCoinImage(null);
      setImageFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('coin-image') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Error creating coin:', error);
      alert('Error creating coin. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
            <Coins className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Create Your Coin</h2>
            <p className="text-gray-400 text-sm">Professional coin minting</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-400">0.11 SOL</p>
          <p className="text-xs text-gray-400">All fees included</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Coin Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Coin Image (Optional)
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="file"
                id="coin-image"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="coin-image"
                className="flex items-center justify-center w-20 h-20 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
              >
                {coinImage ? (
                  <img
                    src={coinImage}
                    alt="Coin preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                    <span className="text-xs text-gray-400">Upload</span>
                  </div>
                )}
              </label>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400">
                Upload a logo for your coin (PNG, JPG, GIF)
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Max size: 5MB • Recommended: 512x512px
              </p>
            </div>
          </div>
        </div>

        {/* Coin Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Coin Name *
          </label>
          <input
            type="text"
            value={coinName}
            onChange={(e) => setCoinName(e.target.value)}
            placeholder="e.g., My Awesome Coin"
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            maxLength={50}
          />
        </div>

        {/* Coin Symbol */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Coin Symbol *
          </label>
          <input
            type="text"
            value={coinSymbol}
            onChange={(e) => setCoinSymbol(e.target.value.toUpperCase())}
            placeholder="e.g., MAC"
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            maxLength={10}
          />
        </div>

        {/* Coin Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description (Optional)
          </label>
          <textarea
            value={coinDescription}
            onChange={(e) => setCoinDescription(e.target.value)}
            placeholder="Describe your coin's purpose and features..."
            rows={3}
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
            maxLength={500}
          />
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreateCoin}
          disabled={isCreating || !coinName || !coinSymbol}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
        >
          {isCreating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Creating Coin...</span>
            </>
          ) : (
            <>
              <DollarSign className="w-5 h-5" />
              <span>Create Coin - 0.11 SOL</span>
            </>
          )}
        </button>
      </div>

      {/* All-Inclusive Pricing Info */}
      <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-green-400 font-medium text-sm mb-2">
              💰 All-Inclusive Pricing - No Hidden Fees!
            </p>
            <div className="space-y-1 text-xs text-gray-300">
              <div className="flex justify-between">
                <span>Platform fee:</span>
                <span>0.10 SOL</span>
              </div>
              <div className="flex justify-between">
                <span>Blockchain fees:</span>
                <span>0.01 SOL</span>
              </div>
              <div className="flex justify-between border-t border-green-500/20 pt-1 font-medium text-green-400">
                <span>Total cost:</span>
                <span>0.11 SOL</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Revenue to your wallet: Du5MvYV3VvLjVRpxR5cj2c6AWzNCVdEADKSE3wwoUi6h
            </p>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <h4 className="text-blue-400 font-medium text-sm mb-2">✅ What's Included:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
          <div>• Token creation on Solana</div>
          <div>• Custom image/logo</div>
          <div>• Metadata storage</div>
          <div>• Trading compatibility</div>
          <div>• All network fees</div>
          <div>• Instant deployment</div>
        </div>
      </div>
    </div>
  );
};
