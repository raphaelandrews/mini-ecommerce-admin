# PeachMango Admin

## Clone

```bash
git clone https://github.com/raphaelandrews/peach-mango-admin.git
cd peach-mango-admin
code .
pnpm install
```

## Setup .env files
### You can use .env.example

```bash

#clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

#database
DATABASE_URL=

#store
FRONTEND_STORE_URL=

#stripe
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

#uploadthing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

## Generate types and push the schema

```bash
npx prisma generate
npx prisma db push
```

## Run the App

```bash
pnpm dev
```
