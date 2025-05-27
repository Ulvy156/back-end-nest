# Dependency Management Policy

This document outlines the dependency management policy for this project, which is primarily a [NestJS](https://nestjs.com/) application, using TypeScript and various tools for building, testing, and linting.

---

## 1. General Guidelines

- **Pin Direct Dependencies:** All dependencies in `package.json` should be versioned with care. Use `^` for minor/patch updates only when the package follows semantic versioning and does not introduce breaking changes unexpectedly. Prefer pinning to a specific version (`x.y.z`) for critical dependencies or those that are known to introduce breaking changes in minor/patch releases.
- **Wildcard Usage:** Avoid wildcards (`*`) except for development dependencies that are guaranteed to be compatible or for types-only packages.
- **Update Frequency:** Review dependencies at least once per quarter for security patches and compatibility with the current codebase.

---

## 2. Production Dependencies

- **NestJS Core:** Use the same major version for all `@nestjs/*` packages to avoid incompatibility (e.g., all should be `^11.x.x`).
- **ORM and Database:** Ensure `typeorm`, `@nestjs/typeorm`, and the database driver (`mssql`) are compatible and tested together.
- **Validation & Transformation:** Use `class-validator` and `class-transformer` versions that are known to work with the current NestJS version.
- **Authentication:** Keep `passport`, `passport-jwt`, and `passport-local` up to date but do not upgrade across major versions without full regression testing.
- **RxJS:** Use the RxJS major version compatible with NestJS (as specified in their documentation).
- **Dotenv:** Only update after confirming no breaking changes to environment variable loading.

---

## 3. Development Dependencies

- **TypeScript & Tooling:** Ensure `typescript`, `ts-node`, `ts-loader`, `ts-jest`, and `@types/*` packages are compatible with each other and with the NestJS version in use.
- **Testing:** Use the latest Jest and `@nestjs/testing` compatible releases for reliable test running.
- **Linting & Formatting:** Use paired versions of `eslint`, `@eslint/*`, `eslint-plugin-prettier`, and `prettier` as indicated in their respective compatibility tables.
- **Type Definitions:** Type packages (`@types/*`) should match the runtime package major version.
- **SWC:** Only update after validating compatibility with TypeScript and Jest configurations.

---

## 4. Security & Maintenance

- **Vulnerability Scanning:** Run automated tools (such as `npm audit` or `yarn audit`) on each PR and before every release.
- **Remove Unused Dependencies:** Periodically review and remove unused dependencies from both `dependencies` and `devDependencies`.
- **Lockfile:** Always commit the lockfile (`package-lock.json` or `yarn.lock`) and update it with every dependency change.

---

## 5. Adding or Updating Dependencies

- **Approval Required:** Adding new dependencies or upgrading major versions requires code review and justification in the PR.
- **Compatibility Testing:** Run the full test suite and a manual smoke test after any dependency update.
- **Documentation:** Update this policy if a new class of dependency (e.g., a new database or framework) is introduced.

---

## 6. Example Policy Enforcement

### Allowed:

- `"@nestjs/core": "^11.0.1"` (matches major & minor with framework)
- `"typescript": "^5.7.3"` (up-to-date, widely compatible)
- `"@types/jest": "^29.5.14"` (matches Jest major version)

### Not Allowed:

- `"@nestjs/mapped-types": "*"` (replace with a fixed compatible version)
- `"class-validator": "^0.14.2"` (if NestJS 11 requires a later version, update accordingly)
- `"passport": "^0.7.0"` (do not upgrade to `1.x` without full testing)

---

## 7. Automation

- **Renovate or Dependabot:** Configure to create PRs for dependency updates, but require maintainer review for merges.
- **CI Enforcement:** Ensure CI runs all tests and audits on dependency change PRs.

---

## 8. Documentation

- This policy must be reviewed and updated with each major framework or Node.js runtime upgrade.
- Keep a changelog of dependency updates for traceability.

---

_Last updated: 2025-05-27_