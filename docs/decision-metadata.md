# Decision Metadata

`DecisionMetadata` describes the meeting or publication that a
[DecisionCollection](/docs/decision-collection) belongs to.

```yaml
metadata:
  title: Decisions of the 17th OIML Conference, Paris, France
  title_localized:
    - { language_code: eng, script: Latn, title: Decisions of the 17th OIML Conference }
    - { language_code: fra, script: Latn, title: Décisions de la 17e Conférence OIML }
  date: 2025-10-14
  source: OIML Conference Secretariat (BIML)
  city: FRPAR
  country_code: FR
  meeting_urn: urn:oiml:conference:17
  source_urls:
    - ref: https://oiml.org/en/.../17th-conference-english.pdf
      format: pdf
      language_code: eng
      kind: decisions_pdf
    - ref: https://oiml.org/fr/.../17th-conference-french.pdf
      format: pdf
      language_code: fra
      kind: decisions_pdf
```

## Fields

| Field | Type | Description |
|---|---|---|
| `title` | string | Default / monolingual title. For multilingual, use `title_localized[]`. |
| `title_localized` | `Localization[]` | Per-language title records. |
| `date` | `Date` | Meeting date. |
| `source` | string | Issuing secretariat. |
| `source_urls` | `SourceUrl[]` | Per-language canonical source PDFs. |
| `city` | string | UN/LOCODE (5-char, e.g. `FRPAR`, `HKHKG`, `THCNM`). |
| `country_code` | string | ISO 3166-1 alpha-2 (e.g. `FR`, `DE`, `US`). |
| `meeting_urn` | string | URN back-reference to the Meeting. |

See [SourceUrl](/docs/source-url) for the per-language URL structure.
