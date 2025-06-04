# Security Policy

## Supported Versions

Security updates and vulnerability patches are only provided for the latest main branch of this project. Please always use the most recent version for the best security.

| Version        | Supported          |
| -------------- | ----------------- |
| Latest (main)  | :white_check_mark: |
| Older versions | :x:               |

---

## Reporting a Vulnerability

If you discover a security vulnerability in this project, **do not create a public issue**. Instead, please report it privately using the following method:

- **Contact:** [security@example.com](mailto:security@example.com)
- Include as much detail as possible, such as:
  - Description of the vulnerability
  - Steps to reproduce the issue
  - Potential impact
  - Suggested fix or mitigation (if known)

We aim to acknowledge receipt within **3 business days** and work with you to quickly address the issue. Public disclosure will be coordinated with you and only after a patch is available.

---

## Security Best Practices

To help keep your deployment secure:

- **Keep Dependencies Updated:**  
  Regularly update all dependencies in `package.json` and `devDependencies` to incorporate the latest security fixes. Consider using tools such as `npm audit` or `yarn audit`.
- **Avoid Wildcard Versions:**  
  Do not use `"*"` for dependencies (e.g., `"@nestjs/mapped-types": "*"` should be pinned to a specific compatible version).
- **Environment Variables:**  
  Store sensitive credentials, secrets, and configuration in environment variables (e.g., in a `.env` file) and never commit them to version control.
- **Authentication:**  
  Always enable and properly configure authentication and authorization using packages such as `@nestjs/jwt`, `@nestjs/passport`, and `passport-*`.
- **Input Validation:**  
  Use `class-validator` and `class-transformer` to validate and sanitize all incoming data.
- **Rate Limiting:**  
  Use `@nestjs/throttler` to prevent brute-force attacks.
- **Production Environment:**  
  Ensure that you do not use development secrets or debugging options in production.
- **Testing:**  
  Run tests (including coverage and e2e) regularly to catch regressions and vulnerabilities.

---

## Dependency Scanning

- Run `npm audit` or `yarn audit` before every deployment.
- Review audit results and address high/critical vulnerabilities immediately.
- Consider enabling Dependabot or Renovate for automated dependency updates.

---

## Disclosure Policy

We strive to fix confirmed vulnerabilities within **14 days** of disclosure. If a fix cannot be implemented in that timeframe, we will notify the reporter with an estimated timeline.

---

Thank you for helping make this project more secure!
