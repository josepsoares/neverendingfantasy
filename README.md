<p align="center">
  <img src="/public/favicons/android-chrome-256x256.png"
    alt="Neverending Fantasy Logo">
</p>

<h1 align='center'>
Neverending Fantasy
</h1>

<p align="center">
  <img src='https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white' alt='Yarn' />
  <img src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' alt='Typescript' />
  <img src='https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white' alt='Node.js' />
  <img src='https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white' alt='Next.js' />
  <img src='https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white' alt='Redux Toolkit' />
  <img src='https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white' alt='Chakra UI' />
  <img src='https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white' alt='Eslint' />
  <img src='https://img.shields.io/badge/code_style-prettier-18ffff.svg?style=for-the-badge&labelColor=grey' alt='Prettier' />
</p>

## About

This is the repository containing the Next.js webapp - Neverending Fantasy - a simple fan made website about the Final Fantasy Franchise and its games.

## Requirements

- [Git](https://git-scm.com)
- [Node.js v16^](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com)

## Developing

To develop:

```bash
## first install dependencies
$ yarn install
## then start the local server
$ yarn dev
```

To build the webapp:

```bash
$ yarn build
```

## File Structure

- 📁 /components
- 📁 /hooks
- 📁 /pages
- 📁 /redux
- 📁 /services
- 📁 /styles
- 📁 /ts
- 📁 /utils

## Features

- View and filter data about the [Final Fantasy franchise video games](https://eu.finalfantasy.com), specially the MMORPG [Final Fantasy XIV](https://eu.finalfantasyxiv.com), via APIs:

  - [Rawg API](https://api.rawg.io/docs/)
  - [XIV API](https://xivapi.com)
  - [FFXIV Collect API](https://ffxivcollect.com)
  - [Another Triple Triad API](https://triad.raelys.com)
    &nbsp;

- Typing with [TypeScript](https://github.com/microsoft/TypeScript)
- [Next.js](https://nextjs.org) (React.js framework) frontend with optimized data fetching and [SEO](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [RTK (Redux toolkit)](https://redux-toolkit.js.org) and [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) usage for state manipulation and data fetching
- [Chakra UI](https://chakra-ui.com) theming and [Iconify](https://iconify.design) for icons usage
- Linting with [ESLint](https://eslint.org)
- [Prettier](https://github.com/prettier/prettier) code formatter

## Deployment

The deployment of this webapp is done automatically via [Vercel](https://vercel.com)

## Author

[josepsoares](https://josepsoares.vercel.app)
