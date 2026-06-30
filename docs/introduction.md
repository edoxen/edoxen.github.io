# Introduction

Edoxen is a Ruby gem + JSON Schema for representing formal resolutions
in a structured, machine-readable, multilingual format.

## What problem does it solve?

Different organizations publish resolutions and decisions in different
formats. Some use PDFs, some use Word documents, some use custom XML.
Even within a single organization, the format can drift over the years.

**Edoxen** provides:

1. A **common information model** that captures the universal elements
   of any formal resolution — its identifier, its date, who approved
   it, what was considered, what was decided.
2. A **YAML wire format** that is human-readable, easy to diff, and
   easy to edit.
3. A **JSON Schema** that locks the format so consumers can validate
   what they receive.
4. A **Ruby library** for parsing, building, and serializing
   resolution data programmatically.

## Quick example

```yaml
metadata:
  title: Resolutions of the 17th OIML Conference, Paris, France
  dates:
    - start: '2025-10-14'
      end: '2025-10-15'
      kind: meeting
  venue: Paris, France
  city: PAR
  country_code: FR
  source_urls:
    - ref: https://oiml.org/.../17th-conference-english.pdf
      format: pdf
      language_code: eng

resolutions:
  - identifier: Conference/2025/01
    doi: 10.63493/resolutions/conf202501
    urn: urn:oiml:doc:conf:resolution:17.01
    dates:
      - start: '2025-10-14'
        kind: decision
    localizations:
      - language_code: eng
        script: Latn
        title: Approval of the agenda for the 17th International Conference
        subject: OIML Conference
        actions:
          - type: approves
            message: Approves the agenda for the 17th International Conference.
```

## Where to next?

- [Architecture](/docs/architecture) — the three-layer model, the
  round-trip pipeline, and the EN+FR plumbing, with diagrams.
- [Installation](/docs/installation) — set up the gem in your project.
- [Schema](/docs/schema) — see the full JSON Schema reference.
- [Multilingual support](/docs/multilingual) — how to author EN/FR
  (or any language pair) resolution sets.
- [Localization sync (deep-dive)](/docs/localization-sync) — how EN+FR
  alignment is preserved inside a single file.
- [CLI](/docs/cli) — `edoxen validate` and `edoxen normalize` from
  the command line.
