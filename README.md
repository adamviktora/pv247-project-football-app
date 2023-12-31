# Football manager app

This is an repository with NextJS application for managment of football results.

Applicaiton has two modes: `defaullt` and `admin`.

In `defaullt mode`, anyone can observer detailed results of various Football Leagues.

In `admin mode`, admin can input data about played matches or even create completely new leagues. Admin can be loged in with `email` and `password`.

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
