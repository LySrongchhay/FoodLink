# Feature Specification: Automated Vercel Hosting & Deployment Pipeline

**Feature Branch**: `011-vercel-hosting-deployment`  
**Created**: 2026-10-31  
**Status**: Specified  
**Input**: User query: "hosting in vercel for me"

---

## Overview & Background

In Feature `010-dual-hosting-links`, the project was architected for dual-portal hosting on Vercel:
- **Customer Portal**: Consumer food rescue discovery & checkout (`VITE_PORTAL_MODE=customer`).
- **Merchant Portal**: Bakery kitchen operations & verification (`VITE_PORTAL_MODE=merchant`).

The user now requests: *"hosting in vercel for me"*.

To accomplish this seamlessly from within the environment, we must provide:
1. **Automated Vercel CLI Deploy Commands**: Enable one-command deployment (`npm run deploy:customer`, `npm run deploy:merchant`) directly from the workspace using the Vercel CLI.
2. **Automated GitHub Actions CI/CD Workflow**: A turnkey GitHub Actions workflow (`.github/workflows/deploy-vercel.yml`) that continuously builds and deploys both dedicated portals to Vercel upon every push to `main`.
3. **Turnkey Interactive & Token-Based Authentication Support**: Support both browser-based CLI authentication and standard `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` environment variable injection.
4. **Live URL Verification**: An automated check verifying that both deployed endpoints return HTTP 200 and serve their dedicated portal views without 404 reload errors.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - One-Command Vercel CLI Deployment (Priority: P1) [MVP]

As a developer or reviewer,  
I want to run `npm run deploy:customer` and `npm run deploy:merchant` (or execute an automated deployment script),  
So that Vercel builds and hosts both production sites without manual dashboard configuration.

**Why this priority**: Directly satisfies the user request to deploy the project immediately from the codebase.

**Independent Test**: Execute deployment script or command inside `foodlink-ui/`. Verify that Vercel CLI successfully packages `dist/` and returns live deployment URLs for both Customer and Merchant portals.

**Acceptance Scenarios**:
1. **Given** `foodlink-ui/`, **When** `npm run deploy:customer` is executed, **Then** Vercel CLI builds with `VITE_PORTAL_MODE=customer` and deploys to the customer project.
2. **Given** `foodlink-ui/`, **When** `npm run deploy:merchant` is executed, **Then** Vercel CLI builds with `VITE_PORTAL_MODE=merchant` and deploys to the merchant project.
3. **Given** authentication credentials (or active session), **When** deploying, **Then** the CLI completes without prompting for ambiguous interactive answers.

---

### User Story 2 - GitHub Actions Automated CI/CD Pipeline (Priority: P2)

As a repository maintainer,  
I want a GitHub Actions workflow that automatically deploys both portals to Vercel whenever commits are pushed to `main`,  
So that future improvements to Foodlink deploy automatically without running local CLI commands.

**Why this priority**: Best practice for zero-maintenance continuous delivery on GitHub.

**Independent Test**: Inspect `.github/workflows/deploy-vercel.yml`. Validate that it contains distinct jobs for `deploy-customer` and `deploy-merchant` referencing `foodlink-ui` with proper build modes.

**Acceptance Scenarios**:
1. **Given** a push to `main`, **When** the GitHub Action triggers, **Then** it builds and deploys the customer site using `npm run build:customer`.
2. **Given** a push to `main`, **When** the GitHub Action triggers, **Then** it builds and deploys the merchant site using `npm run build:merchant`.
3. **Given** missing secrets, **When** checked, **Then** the workflow provides clear, actionable instructions on setting `VERCEL_TOKEN`.

---

### User Story 3 - Live Production URL Health & Persona Audit (Priority: P3)

As a project stakeholder,  
I want to verify that both live Vercel links resolve properly, display their designated personas, and have zero role switchers,  
So that the demo links are certified ready for external presentation.

**Why this priority**: Guarantees end-to-end quality and compliance with Foodlink Constitution v1.2.0.

**Independent Test**: Perform an HTTP GET or browser check against both generated Vercel URLs. Verify that the customer link mounts CustomerApp and the merchant link mounts MerchantApp without console or 404 errors.

**Acceptance Scenarios**:
1. **Given** the customer live URL, **When** requested, **Then** it returns HTTP 200 with `<title>FoodLink</title>` and customer UI at root `/`.
2. **Given** the merchant live URL, **When** requested, **Then** it returns HTTP 200 with merchant UI at root `/`.
3. **Given** deep route navigation on either link, **When** the browser is refreshed, **Then** `vercel.json` rewrites prevent 404 errors.

---

## Edge Cases

- **Authentication Gate**: If Vercel CLI is not yet logged in or lacks `VERCEL_TOKEN`, the deployment runner must gracefully guide the user on authenticating (`vercel login` or providing `VERCEL_TOKEN`) without crashing or hanging.
- **Monorepo Root Directory**: Vercel must be instructed to build specifically inside `foodlink-ui` so that root files (`customer/`, `merchant/`, `server/`) are ignored.
- **Prebuilt Deployments**: Utilizing `vercel deploy --prebuilt` ensures that local/CI build outputs (`dist/`) match local tests with 100% fidelity.

---

## Functional Requirements

- **FR-001**: System MUST provide deployment npm scripts in `foodlink-ui/package.json`:
  - `"deploy:customer"`: builds and deploys the customer portal to Vercel.
  - `"deploy:merchant"`: builds and deploys the merchant portal to Vercel.
- **FR-002**: System MUST provide an automated Node deployment script (`foodlink-ui/scripts/deploy-vercel.js`) supporting both token-based and interactive deployment.
- **FR-003**: System MUST provide a GitHub Actions workflow (`.github/workflows/deploy-vercel.yml`) configuring continuous dual-link deployment to Vercel.
- **FR-004**: System MUST ensure both deployment targets respect `foodlink-ui/vercel.json` SPA rewrites.
- **FR-005**: System MUST maintain 100% adherence to Foodlink Constitution v1.2.0 and keep `customer/`, `merchant/`, and `server/` untouched.

---

## Success Criteria

- **SC-001**: One-command deployment scripts configured and validated for both portals.
- **SC-002**: CI/CD GitHub Actions workflow committed and ready to auto-deploy on push.
- **SC-003**: Both customer and merchant build artifacts verified ready for immediate Vercel hosting.
- **SC-004**: Zero code modifications outside of `foodlink-ui/` and `.github/`.
