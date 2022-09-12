const RAWG_API = 'https://api.rawg.io/api';
const FFXIV_API = 'https://xivapi.com';

const apiLinks = [
  { url: 'https://rawg.io', text: 'Rawg' },
  { url: 'https://xivapi.com', text: 'XIV Api' },
  {
    url: 'https://documenter.getpostman.com/view/1779678/TzXzDHM1#754f9294-e1e8-444c-9b52-0d76b2497884',
    text: 'FFXIV Collect'
  },
  {
    url: 'https://triad.raelys.com',
    text: 'Another Triple Triad Tracker'
  },
  {
    url: 'https://karashiiro.moe/xiv-resources/#web-apis',
    text: 'Collection of XIV Resources/APIs'
  }
];

const ffResourcesLinks = [
  { url: 'https://square-enix-games.com/en_EU/home', text: 'Square Enix' },
  {
    url: 'https://finalfantasy.fandom.com/wiki/Final_Fantasy_Wiki',
    text: 'Final Fantasy Wiki'
  },
  {
    url: 'https://open.spotify.com/playlist/37i9dQZF1DWYnGFRu5xvi8',
    text: 'Cool Music'
  },
  { url: 'https://www.speedrun.com/ff', text: 'Speedruns' },
  {
    url: 'https://www.youtube.com/channel/UCJUSr7xT6mgyz0Xj2rMD5CA',
    text: 'Final Fantasy Union Youtube'
  },
  {
    url: 'https://www.youtube.com/watch?v=TQTwp9lAg5c',
    text: 'Which Final Fantasy Game Should You Play First? | Final Fantasy Starter Guide'
  },
  {
    url: 'https://www.youtube.com/watch?v=s3v8aVe0_fQ',
    text: 'Final Fantasy | Where to Start? - Austin Eruption'
  }
];

const testimonials = [
  {
    name: 'Jirard "The Completionist" Khalil',
    img: 'https://pbs.twimg.com/media/FRbxSRUVUAAk9II?format=jpg&name=large',
    profession: 'Youtuber',
    quote:
      "Final Fantasy is a very important franchise to me and who I am as a gamer. Despite my countless efforts I can't complete these bad boys back to back to back but if I could I would."
  },
  {
    name: 'Naoki "YoshiP" Yoshida',
    img: 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRV2MR8FZzKs-iNnNlSwypYIkU2Kdk0BRte_sOP6E6Zz4tsZ0eVzH5FoUNj-mDxkgQh',
    profession: 'Video Game Producer',
    quote:
      'For me, Final Fantasy is about having a deep story, rich game design, the best game audio to accompany those aspects — as well as the inclusion of chocobos, moogles, and summons'
  },
  {
    name: 'Wisecrack',
    img: 'https://yt3.ggpht.com/ytc/AMLnZu_oA9o16B6eCoK9F2o9IKqHQjUyV65w7T4jPjs8PA=s88-c-k-c0x00ffffff-no-rj',
    profession: 'Youtube Channel',
    quote:
      'At its core, Final Fantasy is a series of games that explores the intricacies of dreams, desires, spirituality environmentalism and well, fantasy'
  },
  {
    name: 'James Arnold Taylor',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/James_Arnold_Taylor_%2852260398772%29.jpg/1200px-James_Arnold_Taylor_%2852260398772%29.jpg',
    profession: 'Voice Actor (Tidus VA)',
    quote: 'It was supposed to be a awkward, goofy, dumb laugh'
  },
  {
    name: 'Hironobu Sakaguchi',
    img: 'http://blogs-images.forbes.com/olliebarder/files/2017/06/sakaguchi_headshot_interview.jpg',
    profession: 'Video Game Producer',
    quote:
      "I'm having so much fun with [Final Fantasy 14] that I don't want to get involved in its production. I wouldn't want to learn any inside information, either"
  },
  {
    name: 'Naoki "YoshiP" Yoshida',
    img: 'http://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRV2MR8FZzKs-iNnNlSwypYIkU2Kdk0BRte_sOP6E6Zz4tsZ0eVzH5FoUNj-mDxkgQh',
    profession: 'Video Game Producer',
    quote:
      'In terms of whether Final Fantasy is successfully adapting to industry trends, I believe the series is currently struggling. We’re now at a point where we receive a wide variety of requests regarding the direction of our game design.'
  },
  {
    name: 'Robert Pattison',
    img: 'https://br.web.img3.acsta.net/pictures/19/03/20/16/05/1007568.jpg',
    profession: 'Actor',
    quote:
      "I was in love with Aeris and Tifa. Everybody wants to have both. It's the two sides, it's the two options of girls you can have."
  },
  {
    name: 'Someone on the Internet',
    img: 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder.png',
    profession: 'Unknown',
    quote:
      "I don't think the series is as good as it used to be. Not sure if this is popular or unpopular but it’s definitely divisive"
  }
];

export { RAWG_API, FFXIV_API, apiLinks, ffResourcesLinks, testimonials };
