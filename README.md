# PIN-Kings Monorepo

This repository contains an initial scaffold for the PIN-Kings MVP. It uses a pnpm + Turborepo workspace to manage the API (NestJS), mobile app (Expo), web admin (Next.js), and shared packages.

## Structure

```
apps/
  api/      # NestJS API with Prisma schema and placeholder modules
  app/      # Expo React Native client with navigation + location prompt
  web/      # Next.js admin dashboard using the shared UI package
packages/
  shared/   # Zod schemas shared between clients and the API
  ui/       # Reusable UI primitives (React)
infra/      # Infrastructure assets (placeholder)
```

## Getting started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Run a specific app:

   ```bash
   # API
   pnpm --filter @pin-kings/api dev

   # Web admin
   pnpm --filter @pin-kings/web dev

   # Mobile app
   pnpm --filter @pin-kings/app start
   ```

3. Generate the Prisma client and run database migrations once a PostgreSQL instance is available:

   ```bash
   pnpm --filter @pin-kings/api exec prisma generate
   pnpm --filter @pin-kings/api exec prisma migrate dev
   pnpm --filter @pin-kings/api exec ts-node prisma/seed.ts
   ```

## Testing

- API tests: `pnpm --filter @pin-kings/api test`
- Shared package tests: `pnpm --filter @pin-kings/shared test`

## Linting & formatting

- `pnpm lint` runs eslint across workspaces via Turborepo.
- `pnpm format` applies Prettier to the repository.

## Next steps

The scaffold follows the product brief and leaves room for future work:

- Implement authentication, role-based guards, and real Prisma queries in the API modules.
- Expand the Expo app with RSVP, check-in, and leader flows.
- Build full moderation tables and actions in the Next.js admin.
- Add Docker Compose, CI workflows, and infrastructure definitions under `infra/`.
