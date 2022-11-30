# Mon espace collectivité

## Getting Started


```bash
# Install dependencies
npm install
# Setup env variables
cp .env.dist .env
# Setup database
npx prisma migrate dev
# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing pages by modifying `app/**/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Tunnel to database

Run `scalingo --app mon-espace-collectivite db-tunnel SCALINGO_POSTGRESQL_URL`

## Use s3 api

Use profile for this project: `aws --profile=kime:scaleway:mon-espace-collectivite s3api list-buckets`
See: https://www.scaleway.com/en/docs/storage/object/api-cli/object-storage-aws-cli/

Update bucket CORS: `aws --profile=kime:scaleway:mon-espace-collectivite s3api put-bucket-cors --bucket mon-espace-collectivite-attachments --cors-configuration file://~/dev/anct/projets-territoires/src/scaleway/cors.json`

## Interact with container

View logs
`scalingo --app mon-espace-collectivite logs`
`scalingo -—app mon-espace-collectivite run bash`
