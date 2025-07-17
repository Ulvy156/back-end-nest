# KIVA BACK-END NEST JS

A scalable server-side application built using [NestJS](https://nestjs.com/) with TypeScript, TypeORM, and robust developer tooling for CI/CD, linting, formatting, and testing.

---

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Development](#development)
- [Testing](#testing)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Dependency Policy](#dependency-policy)
- [License](#license)

---

## Features
```base
- **NestJS v11**: Modular and scalable Node.js framework.
- **TypeScript**: Strong typing and modern JS features.
- **TypeORM**: ORM with support for MSSQL and other databases.

- **JWT with HttpOnly**: JWT and Local authentication strategies.
- **cookie-parser**: enable parsing cookies from front-end.

- **Rate Limiting**: Built-in throttler.
- **Environment Configuration**: Via dotenv and @nestjs/config.
- **Validation**: Using class-validator and class-transformer.
- **Testing**: Jest, Supertest, E2E config included.
- **Linting & Formatting**: ESLint and Prettier.
- **Modern Build Tools**: SWC, ts-node, ts-loader.
```
---

## Requirements
```base
- Node.js v18+
- npm v9+ or yarn
- MS SQL Server (or compatible database for TypeORM)
- (Optional) Docker for containerized development
```
---

## Installation

```bash
git clone <your-repo-url>
cd back-end-nest
npm install
# or
yarn install
```

---

## Development

Start the development server with hot-reload:

```bash
npm run start:dev
# or
yarn start:dev
```

Start in debug mode:

```bash
npm run start:debug
```

Build for production:

```bash
npm run build
```

Start the built app:

```bash
npm run start:prod
```

---

## Testing

Run all tests:

```bash
npm test
# or
yarn test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run coverage report:

```bash
npm run test:cov
```

Run E2E tests:

```bash
npm run test:e2e
```

---

## Linting & Formatting

Automatically fix lint issues:

```bash
npm run lint
```

Format all code:

```bash
npm run format
```

---

## Scripts

| Script          | Description                                 |
|-----------------|---------------------------------------------|
| `start`         | Start the app                               |
| `start:dev`     | Start in development mode (hot reload)      |
| `start:debug`   | Start in debug mode                         |
| `start:prod`    | Start built app in production               |
| `build`         | Build the app                               |
| `test`          | Run tests                                   |
| `test:watch`    | Run tests in watch mode                     |
| `test:cov`      | Run test coverage                           |
| `test:e2e`      | Run end-to-end tests                        |
| `lint`          | Lint and auto-fix code                      |
| `format`        | Format code with Prettier                   |

---

## Project Structure

```
📦src
 ┣ 📂branch-report-dashboard
 ┣ 📂cml-user
 ┣ 📂cmp-report-dashboard
 ┣ 📂common
 ┃ ┣ 📂enums
 ┃ ┗ 📂utils
 ┣ 📂config
 ┣ 📂contact-account
 ┣ 📂hpo-dashboard-report
 ┣ 📂lo-report-dashboard
 ┣ 📂loan-delinquency
 ┣ 📂loan-ovedue
 ┣ 📂locations
 ┣ 📂middleware
 ┣ 📂notifications
 ┣ 📂Procedure ( main procedure)
 ┣ 📂recovery-team-dashboard
 ┣ 📂throttler
 ┣ 📂view-branch-permission
 ┣ 📂zone-report-dashboard
 ┣ 📜app-imports.module.ts
 ┣ 📜app.controller.ts
 ┣ 📜app.module.ts
 ┣ 📜app.service.ts
 ┗ 📜main.ts
```

---

## Dependency Policy
```base
- All `@nestjs/*` packages use the same major version.
- Use pinned or caret (`^`) versions for stability, but avoid `*` except where absolutely necessary (replace `"@nestjs/mapped-types": "*"` as soon as possible).
- Update dependencies regularly and review for security issues.
- Prefer semantic versioning, test thoroughly after major upgrades.
- Lockfile (`package-lock.json` or `yarn.lock`) must be committed and kept up to date.
```
---

## License

This project is **UNLICENSED**. See `package.json` for details.

---
