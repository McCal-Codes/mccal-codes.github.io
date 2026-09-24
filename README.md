# mccal-codes.github.io

The organisation's GitHub Pages root. It holds one page, which sends visitors to
[mccal.dev](https://mccal.dev), where the technical portfolio lives
([McCal-Codes/mccal.dev](https://github.com/McCal-Codes/mccal.dev)).

## Why this repository has no custom domain, and must not get one

Project Pages sites in this organisation are served at `mccal-codes.github.io/<repo>/`. Some of
those URLs are pinned inside shipped software: Folio's supporter source is the constant
`SUPPORTER_SOURCE = "https://mccal-codes.github.io/folio-keyd/"` in a released build, and the
Market's HTTP client rejects a redirect to an insecure link.

Setting a custom domain on *this* repository makes GitHub redirect every
`mccal-codes.github.io/<repo>/` URL to that domain over **http**, which those clients refuse. It
is not recoverable by enabling HTTPS enforcement; the origin redirect stays on http.

So this host stays plain. It is the stable namespace for signed sources, and the portfolio's
domain lives on its own repository where it cannot reach this one.
