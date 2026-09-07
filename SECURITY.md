# Security Policy

This repository publishes a static site. It has no backend, no authentication, no
database, and no runtime data fetching, so the realistic attack surface is the
build pipeline and the published assets rather than a running service.

## Reporting a vulnerability

- Prefer GitHub's private **"Report a vulnerability"** flow on this repository, so
  details stay private until a fix ships.
- If that is unavailable, contact a maintainer directly. Do not post exploit
  details in a public issue.
- Include: affected path, commit hash, reproduction steps, expected versus actual
  behavior, and any logs with secrets redacted.

## Response targets

- Acknowledgment: within 3 business days.
- Triage and mitigation plan: within 7 business days.
- Fix or workaround: best effort within 30 days, depending on severity.

## Scope

In scope: supply-chain issues in the build (dependency compromise, workflow
injection, a malicious action), content injection into the published output, and
secret exposure in the repository or in Actions logs.

Out of scope: social engineering, denial of service against GitHub Pages,
findings that only apply to forks with modified configuration, and the missing
HTTP response headers documented in the README. GitHub Pages cannot set response
headers; that limitation is known, deliberate, and recorded rather than fixed.

## Supported versions

Active branch: `main`. Please retest on `main` before reporting.
