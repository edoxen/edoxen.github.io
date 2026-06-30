# Metadata

`Metadata` describes the meeting or publication that the resolution
set belongs to.

```yaml
metadata:
  title: Resolutions of the 17th OIML Conference, Paris, France
  title_localized:
    - { language_code: eng, script: Latn, title: Resolutions of the 17th OIML Conference }
    - { language_code: fra, script: Latn, title: Résolutions de la 17e Conférence OIML }
  identifier: oiml-conference-17
  dates:
    - { start: '2025-10-14', end: '2025-10-15', kind: meeting }
  source: OIML Conference Secretariat (BIML)
  venue: Paris, France
  city: PAR
  country_code: FR
  source_urls:
    - ref: https://oiml.org/en/.../17th-conference-english.pdf
      format: pdf
      language_code: eng
    - ref: https://oiml.org/fr/.../17th-conference-french.pdf
      format: pdf
      language_code: fra
```

## Fields

| Field | Type | Description |
|---|---|---|
| `title` | string | Canonical title (English by convention). |
| `title_localized` | `Localization[]` | Per-language title variants. |
| `identifier` | string | Meeting identifier (e.g. `2019-01`). |
| `dates` | `ResolutionDate[]` | Meeting dates. |
| `source` | string | Source organization or secretariat. |
| `venue` | string | Human-readable venue. |
| `city` | string | IATA 3-letter city code (e.g. `PAR`, `BER`, `CPT`). |
| `country_code` | string | ISO 3166-1 alpha-2 country code (e.g. `FR`, `DE`). |
| `source_urls` | `SourceUrl[]` | Per-language source PDF URLs. |
| `chair` | string | Meeting chair (optional). |
| `urls` | `Url[]` | Generic reference URLs. |

See [SourceUrl](/docs/source-url) for the per-language URL structure.
