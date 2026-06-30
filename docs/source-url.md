# SourceUrl

A **SourceUrl** is a per-language link to the original PDF or HTML
document that the resolution set was transcribed from.

```yaml
source_urls:
  - ref: https://www.oiml.org/en/structure/ciml/pdf/39-ciml-decisions-english.pdf
    format: pdf
    language_code: eng
  - ref: https://www.oiml.org/fr/structure/ciml/pdf/39-ciml-decisions-french.pdf
    format: pdf
    language_code: fra
```

## Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `ref` | string | yes | The URL. |
| `format` | string | no | Document format: `pdf`, `html`, `docx`, etc. |
| `language_code` | string (ISO 639-3) | no | The language of this source PDF. |

## When to use

Use `metadata.source_urls[]` when a meeting has different source PDFs
per language. Common for OIML, ISO, IEC documents where English and
French versions are published as separate PDFs.

For meetings published as a single bilingual PDF (e.g. CIML 43),
use a single entry with `language_code: mul` (multiple) or omit the
field.

## See also

- [Metadata](/docs/metadata)
- [Localization](/docs/localization)
