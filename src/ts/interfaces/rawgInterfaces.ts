export interface IRawgApiResponse {
  count: number;
  next: string;
  previous: string;
}

export interface IGame {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image: string | null;
  background_image_additional: string | null;
  dominant_color: string;
  saturated_color: string;
  rating: number;
  rating_top: number;
  ratings: {
    id: number;
    title: string;
    count: number;
    percent: number;
  }[];
  ratings_count: number;
  reviews_count: number;
  reviews_text_count: string;
  added: number;
  added_by_status: {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  };
  metacritic: number;
  playtime: number;
  short_screenshots: { id: number; image: string }[];
  suggestions_count: number;
  updated: string;
  esrb_rating: { id: number; name: string; slug: string };
  platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
      image: string | null;
      year_end: null;
      year_start: null;
      games_count: number;
      image_background: string;
    };
    released_at: string;
    requirements: {
      minimum: string;
      recommended: string;
    };
  }[];
  parent_platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
  stores: {
    id: number;
    url: string;
    store: {
      id: number;
      name: string;
      slug: string;
      domain: string;
      games_count: number;
      image_background: string;
    };
  }[];
  genres: ITagGenre[];
  tags: ITagGenre[];
}

export interface IGamesResponse extends IRawgApiResponse {
  results: IGame[];
}

export interface IGameDetail extends IGame {
  detail?: string;
  name_original: string;
  description: string;
  description_raw: string;
  metacritic_platforms: {
    metascore: number;
    url: string;
    platform: {
      platform: number;
      name: string;
      slug: string;
    };
  }[];
  website: string;
  reactions: {
    [key: string]: number;
  };
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  ratings_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: 0;
  game_series_count: number;
  user_game: null;
  developers: IDeveloperPublisher[];
  publishers: IDeveloperPublisher[];
}

export interface IGameStore {
  id: number;
  game_id: number;
  store_id: number;
  url: string;
}

export interface IGameStoresResponse extends IRawgApiResponse {
  results: IGameStore[] | [];
}

export interface IGameScreenshot {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
}

export interface IGameScreenshotsResponse extends IRawgApiResponse {
  results: IGameScreenshot[] | [];
}

export interface IGameMovie {
  id: number;
  name: string;
  preview: string;
  data: { '480': string; max: string };
}

export interface IGameMoviesResponse extends IRawgApiResponse {
  results: IGameMovie[] | [];
}

export interface IDeveloperPublisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  background_image: string;
  description: string;
}

export interface IPublishersDevelopersResponse extends IRawgApiResponse {
  results: IDeveloperPublisher[];
}

export interface ITagGenre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  description: string;
}

export interface ITagsGenresResponse extends IRawgApiResponse {
  results: ITagGenre[];
}
