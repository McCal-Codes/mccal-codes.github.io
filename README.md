# mccal-codes.github.io

The organisation's GitHub Pages root. It holds one page, which sends visitors to
[mccal.dev](https://mccal.dev), where the technical portfolio lives
([McCal-Codes/mccal.dev](https://github.com/McCal-Codes/mccal.dev)).

## Why this repository has no custom domain, and must not get one

Project Pages sites in this organisation are served at `mccal-codes.github.io/<repo>/`. Some of
those URLs are pinned inside shipped software: Folio's supporter source is the constant
`SUPPORTER_SOURCE = "https://mccal-codes.github.io/folio-keyd/"` in a released build, and the
Market's HTTP client rejects a redirect to an insecure link before it ever checks the source's
pinned key.

Setting a custom domain on *this* repository makes GitHub redirect every
`mccal-codes.github.io/<repo>/` URL to that domain over **http**, which those clients refuse.
Enabling HTTPS enforcement does not fix it; the origin redirect stays on http. This was tried on
24 September 2026 and broke the Folio supporter source until the domain was removed.

So this host stays plain. It is the stable namespace for signed sources, and the portfolio's
domain lives on [McCal-Codes/mccal.dev](https://github.com/McCal-Codes/mccal.dev), where it
cannot reach this one.

### The rule is per repository, not blanket

A custom domain is only dangerous on a repository whose Pages URL something has pinned. Two are
off limits:

| Repository | Custom domain | Why |
| --- | --- | --- |
| `mccal-codes.github.io` (this one) | **never** | redirects every `/<repo>/` path, including the pinned one |
| `folio-keyd` | **never** | redirects `/folio-keyd/` itself, the exact path shipped Folio has pinned |
| `folio` | fine — it serves `folio.mccal.dev` | nothing shipped points at `/folio/` |
| anything else | fine unless a released build pins its path | check before adding one |

Before putting a custom domain on any repository here, grep the Folio sources for its Pages URL.
If a shipped constant or a published source references `mccal-codes.github.io/<that repo>/`, the
answer is no.
