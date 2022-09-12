export interface ITripleTriadApiResponse {
  query: any;
  count: number;
}

export interface ICard {
  id: number;
  name: string;
  description: string;
  stars: number;
  patch: string;
  sell_price: number;
  order_group: number;
  order: number;
  deck_order: number;
  number: string;
  icon: string;
  image: string;
  link: string;
  stats: {
    numeric: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
    formatted: {
      top: number;
      right: number;
      bottom: number;
      left: string;
    };
  };
  type: {
    id: number;
    name: string;
    image: null;
  };
  owned: string;
  sources?: {
    npcs: INpc[];
    packs: IPack[];
    drops: string[];
    purchase: null;
  };
}

export interface ICardsResponse extends ITripleTriadApiResponse {
  results: ICard[];
}

export interface INpc {
  id: number;
  resident_id: number;
  name: string;
  difficulty: string;
  patch: string;
  link: string;
  location: {
    name: string;
    region: string;
    x: number;
    y: number;
  };
  quest?: {
    id: number;
    name: string;
    link: string;
  };
  rules: string[];
  rule_ids: number[];
  rewards?: ICard[];
}

export interface INpcsResponse extends ITripleTriadApiResponse {
  results: INpc[];
}

export interface IPack {
  id: number;
  name: string;
  cost: number;
  link: string;
  cards?: ICard[];
}
