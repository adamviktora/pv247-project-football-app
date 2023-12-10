# TODO:

- Admin mode
- Login system
- Responsive design
  - Main menu - DONE
  - Game detail - DONE (fix margin)
  - Club list - DONE
  - Games list - DONE
  - Leaderboard - DONE
  - Club detail
  - Player detail
  - Top panel
- Admin mode:
  - ClubCreation - DONE
  - ClubSeasonCreation - DONE
  - GameCreation
  - GoalCreation
  - LeagueCreation - DONE
  - LeagueSeasonCreation - DONE
  - PlayerCreation - In progress
  - PlayerSeasonCreation  
- Player detail
- Club detail (seasons table)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Backend

- `src/server` folder is a repository layer, it is using Prisma to directly access a database. Should be accessed from server components
- `src/app/api` folder is a REST controller layer defining API endpoints and methods. It accesses the repository layer. Should be accessed from client components.
- `src/fetch-helper/CRUD.ts` is a helper for client components to easily `add` entities without having to write fetch with content-type json etc. It calls fetch on an API endpoint internally.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
