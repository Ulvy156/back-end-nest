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

---

## Requirements

- Node.js v18+
- npm v9+ or yarn
- MS SQL Server (or compatible database for TypeORM)
- (Optional) Docker for containerized development

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
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-branch-report-dashboard.dto.ts
 ┃ ┃ ┗ 📜update-branch-report-dashboard.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜branch-report-dashboard.entity.ts
 ┃ ┣ 📂procedure
 ┃ ┃ ┣ 📜CMLDLQ_GetCollectedAccBM.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetCollectedAmtBM.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetContactAccBranch.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetContactToolsAccBM.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetStaffRecommendAccBM.sql
 ┃ ┃ ┗ 📜CMLDLQ_GetStepTakensAccBM.sql
 ┃ ┣ 📜branch-report-dashboard.controller.ts
 ┃ ┣ 📜branch-report-dashboard.interface.ts
 ┃ ┣ 📜branch-report-dashboard.module.ts
 ┃ ┗ 📜branch-report-dashboard.service.ts
 ┣ 📂cml-user
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-cml-user.dto.ts
 ┃ ┃ ┗ 📜update-cml-user.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜cml-user.entity.ts
 ┃ ┣ 📜cml-user.controller.ts
 ┃ ┣ 📜cml-user.interface.ts
 ┃ ┣ 📜cml-user.module.ts
 ┃ ┗ 📜cml-user.service.ts
 ┣ 📂cmp-report-dashboard
 ┃ ┣ 📂procedure
 ┃ ┃ ┣ 📜CMLDLQ_GetCollectedAccCMP.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetCollectedAmtCMP.sql
 ┃ ┃ ┗ 📜CMLDLQ_GetCollectionParBucketCMP.sql
 ┃ ┣ 📜cmp-report-dashboard.controller.ts
 ┃ ┣ 📜cmp-report-dashboard.interface.ts
 ┃ ┣ 📜cmp-report-dashboard.module.ts
 ┃ ┗ 📜cmp-report-dashboard.service.ts
 ┣ 📂common
 ┃ ┣ 📂enums
 ┃ ┃ ┗ 📜role.enum.ts
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📜exception-utils.ts
 ┃ ┃ ┗ 📜useCombineArray.ts
 ┣ 📂config
 ┃ ┣ 📜config.module.ts
 ┃ ┣ 📜cors.config.ts
 ┃ ┣ 📜jwtConfig.ts
 ┃ ┣ 📜pipes.config.ts
 ┃ ┗ 📜server.config.ts
 ┣ 📂contact-account
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-contact-account.dto.ts
 ┃ ┃ ┗ 📜update-contact-account.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜contact-account.entity.ts
 ┃ ┣ 📜contact-account.controller.ts
 ┃ ┣ 📜contact-account.module.ts
 ┃ ┗ 📜contact-account.service.ts
 ┣ 📂hpo-dashboard-report
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-hpo-dashboard-report.dto.ts
 ┃ ┃ ┗ 📜update-hpo-dashboard-report.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜hpo-dashboard-report.entity.ts
 ┃ ┣ 📜hpo-dashboard-report.controller.ts
 ┃ ┣ 📜hpo-dashboard-report.interface.ts
 ┃ ┣ 📜hpo-dashboard-report.module.ts
 ┃ ┗ 📜hpo-dashboard-report.service.ts
 ┣ 📂lo-report-dashboard
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-lo-report-dashboard.dto.ts
 ┃ ┃ ┗ 📜update-lo-report-dashboard.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜lo-report-dashboard.entity.ts
 ┃ ┣ 📂procedure
 ┃ ┃ ┣ 📜CMLDLQ_GetCollectionParBucketLO.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetContactToolsAccLO.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetStaffRecommendAccLO.sql
 ┃ ┃ ┣ 📜dbo.fn_CMLDLQ_ExtractDayPAR.sql
 ┃ ┃ ┣ 📜dbo.fn_CMLDLQ_IsInRangePAR.sql
 ┃ ┃ ┣ 📜dbo.fn_CMLDLQ_MonthStatus.sql
 ┃ ┃ ┗ 📜interaction.sp.sql
 ┃ ┣ 📜lo-report-dashboard.controller.ts
 ┃ ┣ 📜lo-report-dashboard.module.ts
 ┃ ┗ 📜lo-report-dashboard.service.ts
 ┣ 📂loan-delinquency
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-loan-delinquency.dto.ts
 ┃ ┃ ┗ 📜update-loan-delinquency.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜loan-delinquency.entity.ts
 ┃ ┣ 📜loan-delinquency.controller.ts
 ┃ ┣ 📜loan-delinquency.module.ts
 ┃ ┣ 📜loan-delinquency.service.ts
 ┃ ┣ 📜loan.service.interface.ts
 ┃ ┗ 📜procedure.sql
 ┣ 📂loan-ovedue
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-loan-overdue.dto.ts
 ┃ ┃ ┗ 📜update-loan-ovedue.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜loan-ovedue.entity.ts
 ┃ ┣ 📜loan-ovedue.controller.ts
 ┃ ┣ 📜loan-ovedue.module.ts
 ┃ ┗ 📜loan-ovedue.service.ts
 ┣ 📂locations
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-location.dto.ts
 ┃ ┃ ┗ 📜update-location.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜location.entity.ts
 ┃ ┣ 📜locations.controller.ts
 ┃ ┣ 📜locations.module.ts
 ┃ ┗ 📜locations.service.ts
 ┣ 📂middleware
 ┃ ┣ 📜app.middleware.ts
 ┃ ┗ 📜jwt.middleware.ts
 ┣ 📂notifications
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-notification.dto.ts
 ┃ ┃ ┗ 📜update-notification.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜notification.entity.ts
 ┃ ┣ 📜notifications.controller.ts
 ┃ ┣ 📜notifications.module.ts
 ┃ ┗ 📜notifications.service.ts
 ┣ 📂Procedure
 ┃ ┣ 📜RPT_Loan_Overdue_CHM_2.sql
 ┃ ┗ 📜View_InterfaceRecovery_Sup.sql
 ┣ 📂recovery-team-dashboard
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-recovery-team-dashboard.dto.ts
 ┃ ┃ ┗ 📜update-recovery-team-dashboard.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜recovery-team-dashboard.entity.ts
 ┃ ┣ 📂procedure
 ┃ ┃ ┣ 📜CMLDLQ_GetCollectedAccROTeam.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetCollectedAmtROTeam.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetCollectionParBucketROTeam.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetContactToolAccROTeam.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetStaffRecomsAccROTeam.sql
 ┃ ┃ ┗ 📜CMLDLQ_GetStepTakensAccROTeam.sql
 ┃ ┣ 📜recovery-team-dashboard.controller.ts
 ┃ ┣ 📜recovery-team-dashboard.interface.ts
 ┃ ┣ 📜recovery-team-dashboard.module.ts
 ┃ ┗ 📜recovery-team-dashboard.service.ts
 ┣ 📂throttler
 ┃ ┗ 📜throttler.module.ts
 ┣ 📂view-branch-permission
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-view-branch-permission.dto.ts
 ┃ ┃ ┗ 📜update-view-branch-permission.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜view-branch-permission.entity.ts
 ┃ ┣ 📜view-branch-permission.controller.ts
 ┃ ┣ 📜view-branch-permission.interface.ts
 ┃ ┣ 📜view-branch-permission.module.ts
 ┃ ┗ 📜view-branch-permission.service.ts
 ┣ 📂zone-report-dashboard
 ┃ ┣ 📂dto
 ┃ ┃ ┣ 📜create-zone-report-dashboard.dto.ts
 ┃ ┃ ┗ 📜update-zone-report-dashboard.dto.ts
 ┃ ┣ 📂entities
 ┃ ┃ ┗ 📜zone-report-dashboard.entity.ts
 ┃ ┣ 📂procedure
 ┃ ┃ ┣ 📜CMLDLQ_GetCollectedAccZone.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetCollectedAmtZone.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetContactAccZone.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetContactToolAccZone.sql
 ┃ ┃ ┣ 📜CMLDLQ_GetStaffRecommendAccZone.sql
 ┃ ┃ ┗ 📜CMLDLQ_GetStepTakenAccZone.sql
 ┃ ┣ 📜zone-report-dashboard.controller.ts
 ┃ ┣ 📜zone-report-dashboard.module.ts
 ┃ ┣ 📜zone-report-dashboard.service.ts
 ┃ ┗ 📜zone-report.interface.ts
 ┣ 📜app-imports.module.ts
 ┣ 📜app.controller.ts
 ┣ 📜app.module.ts
 ┣ 📜app.service.ts
 ┗ 📜main.ts
```

---

## Dependency Policy

- All `@nestjs/*` packages use the same major version.
- Use pinned or caret (`^`) versions for stability, but avoid `*` except where absolutely necessary (replace `"@nestjs/mapped-types": "*"` as soon as possible).
- Update dependencies regularly and review for security issues.
- Prefer semantic versioning, test thoroughly after major upgrades.
- Lockfile (`package-lock.json` or `yarn.lock`) must be committed and kept up to date.

---

## License

This project is **UNLICENSED**. See `package.json` for details.

---
