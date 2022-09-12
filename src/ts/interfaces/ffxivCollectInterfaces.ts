type SourceProperty = {
  type: string;
  text: string;
  related_type?: string;
  related_id?: number;
};

export interface IFFXIVCollectApiResponse {
  query: any;
  count: number;
}

export interface IAchievement {
  id: number;
  name: string;
  description: string;
  points: number;
  order: number;
  patch: string;
  owned: string;
  icon?: string;
  category?: {
    id: number;
    name: string;
  };
  type?: {
    id: number;
    name: string;
  };
}

export interface IAchievementsResponse extends IFFXIVCollectApiResponse {
  results: IAchievement[];
}

export interface IArmoire {
  id: number;
  name: string;
  order: number;
  patch: string;
  owned: string;
  icon?: string;
  category?: {
    id: number;
    name: string;
  };
  sources?: SourceProperty[];
}

export interface IArmoiresResponse extends IFFXIVCollectApiResponse {
  results: IArmoire[];
}

export interface IFashion {
  id: number;
  name: string;
  description: string;
  order: number;
  patch: string;
  item_id?: number;
  owned: string;
  image?: string;
  icon?: string;
  tradeable: boolean;
  sources?: SourceProperty[];
}

export interface IFashionResponse extends IFFXIVCollectApiResponse {
  results: IFashion[];
}

export interface IHairstyle {
  id: number;
  name: string;
  description?: string;
  patch: string;
  item_id?: number;
  owned: string;
  icon?: string;
  sources?: SourceProperty[];
}

export interface IHairstylesResponse extends IFFXIVCollectApiResponse {
  results: IHairstyle[];
}

export interface IMinion {
  id: number;
  name: string;
  description: string;
  enhanced_description?: string;
  tooltip?: string;
  patch: string;
  item_id?: number;
  behavior?: {
    id: number;
    name: string;
  };
  race?: {
    id: number;
    name: string;
  };
  image?: string;
  icon?: string;
  owned: string;
  sources: SourceProperty[];
  verminion?: {
    cost: number;
    attack: number;
    defense: number;
    hp: number;
    speed: number;
    area_attack: boolean;
    skill: string;
    skill_description: string;
    skill_angle: number;
    skill_cost: number;
    eye: boolean;
    gate: boolean;
    shield: boolean;
    skill_type: {
      id: number;
      name: string;
    };
  };
}

export interface IMinionsResponse extends IFFXIVCollectApiResponse {
  results: IMinion[];
}

export interface IMount {
  id: number;
  name: string;
  description: string;
  enhanced_description: string;
  tooltip: string;
  movement: string;
  seats: number;
  order: number;
  order_group: number;
  patch: string;
  item_id: null;
  owned: string;
  image: string;
  icon: string;
  sources: SourceProperty[];
}

export interface IMountsResponse extends IFFXIVCollectApiResponse {
  results: IMount[];
}

export interface IOrchestrion {
  id: number;
  name: string;
  description: string;
  patch: string;
  item_id?: any;
  tradeable: boolean;
  owned: string;
  number: string;
  icon: string;
  category: {
    id: number;
    name: string;
  };
  sources: SourceProperty[];
}

export interface IOrchestrionResponse extends IFFXIVCollectApiResponse {
  results: IOrchestrion[];
}

export interface IRelicWeapon {
  id: number;
  name: string;
  order: number;
  achievement_id: number;
  icon: string;
  owned: string;
  type: {
    name: string;
    category: string;
    jobs: number;
    order: number;
    expansion: number;
  };
  sources: SourceProperty[];
}

export interface IRelicWeaponResponse extends IFFXIVCollectApiResponse {
  results: IRelicWeapon[];
}

export interface IEmote {
  id: number;
  name: string;
  command: string;
  order: number;
  patch: string;
  item_id?: any;
  tradeable: boolean;
  owned: string;
  icon: string;
  category: {
    id: number;
    name: string;
  };
  sources: SourceProperty[];
}

export interface IEmoteResponse extends IFFXIVCollectApiResponse {
  results: IEmote[];
}
