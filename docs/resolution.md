# Resolution

A **Resolution** is a single formal decision adopted by a body. It
carries language-agnostic admin fields (identifier, doi, urn,
agenda_item, dates) plus a `localizations[]` array with one entry
per language.

```yaml
resolutions:
  - identifier: CIML/2025/44
    doi: 10.63493/resolutions/ciml202544
    urn: urn:oiml:doc:ciml:resolution:2025-44
    agenda_item: "16.2"
    dates:
      - { start: '2025-10-13', kind: decision }
    localizations:
      - language_code: eng
        script: Latn
        title: Decision on the renewal of the contract...
        actions:
          - type: decides
            message: |
              The Committee decides to renew the contract of
              Mr Anthony Donnellan as BIML Director.
```

## Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `identifier` | string \| integer | yes | Resolution identifier (e.g. `CIML/2025/44` or `2019-01`). |
| `type` | enum | no | One of `resolution`, `recommendation`, `decision`, `declaration`. |
| `doi` | string | no | Digital Object Identifier. |
| `urn` | string | no | Uniform Resource Name per RFC 8141. |
| `agenda_item` | string | no | Agenda item number this resolution corresponds to (e.g. `11.2`). |
| `dates` | `ResolutionDate[]` | no | Structured dates (decision, effective, etc.). |
| `categories` | string[] | no | Free-form category tags. |
| `meeting` | `MeetingIdentifier` | no | Reference to the meeting that adopted this resolution. |
| `relations` | `ResolutionRelation[]` | no | Supersedes, amends, references, replaces, updates. |
| `urls` | `Url[]` | no | Per-resolution URLs (separate from the meeting-level URLs). |
| `localizations` | `Localization[]` | yes (≥1) | One entry per language. See [Localization](/docs/localization). |

## Why localizations[]?

Resolution identifiers, DOIs, URNs, and dates are language-agnostic —
the same logical resolution has the same DOI whether it's the English
or French rendering. Per-language content (title, subject,
considerations, actions, approvals) lives inside a `Localization`
child row.

This pattern — borrowed from the
[glossarist](https://github.com/glossarist/concept-model) project —
keeps the admin fields declared once, and lets translators work
on each language in isolation while comparing them side-by-side in
the same file.

See [Multilingual support](/docs/multilingual) for the design rationale.
