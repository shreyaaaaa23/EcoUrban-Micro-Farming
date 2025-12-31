
export interface Kit {
  id: string;
  name: string;
  type: 'microgreens' | 'herb' | 'medicinal';
  status: 'growing' | 'ready' | 'dormant';
  health: number; // 0-100
  waterLevel: number; // 0-100
  lightHours: number;
  plantedDate: string;
  image: string;
}

export interface GeneticMarker {
  id: string;
  name: string;
  description: string;
  impact: string;
}

export interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  image?: string;
}

export interface TradeItem {
  id: string;
  owner: string;
  name: string;
  description: string;
  distance: string;
  type: 'produce' | 'seeds' | 'equipment';
}

export interface BlockchainTransaction {
  hash: string;
  type: 'CO2_OFFSET' | 'WATER_SAVED' | 'LOCAL_TRADE' | 'ENERGY_EFFICIENCY' | 'FOOD_MILES';
  amount: number;
  unit: string;
  description: string;
  timestamp: string;
  credits: number;
}
