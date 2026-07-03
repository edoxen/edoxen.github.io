---
title: Minutes
---

# Minutes

A **Minutes** document is the narrative record of a `Meeting` — what
was said, by whom, in what order, with what outcome. It is **distinct
from the Agenda** (the forward-looking business order drafted before
the meeting) and **from the ResolutionCollection** (the formal
decisions adopted). Where the Agenda says *what will be discussed*
and the Resolutions say *what was decided*, the Minutes say *what
was actually said*.

A `Meeting` carries `minutes[0..*]` — typically one Minutes document
per language, since the narrative is naturally monolingual.

```yaml
minutes:
  - identifier: { prefix: CIML, number: "2025-09-minutes" }
    urn: urn:oiml:doc:ciml:minutes:2025-09
    language_code: eng
    script: Latn
    source_doc: 22nd-CIML-September-2025-Minutes.pdf
    source_pages: 1-84
    sections:
      - number: '1'
        title: Opening of the meeting
        narrative: |
          The Chair called the meeting to order at 09:15. The Secretary
          confirmed quorum with 47 of 50 voting members present…
        page_start: 1
        page_end: 3
      - number: '4.2'
        title: Budget for the 2027–2028 financial period
        narrative: |
          The Director introduced the proposal. After discussion, the
          Committee adopted Resolution OIML/2025/4 by roll-call vote
          (42 in favour, 3 against, 2 abstentions).
        page_start: 41
        page_end: 47
        references:
          - { ref: 'OIML/2025/4', kind: 'resolution', title: 'Budget adoption' }
```

## Minutes fields

| Field | Type | Description |
|---|---|---|
| `identifier` | `StructuredIdentifier[1..*]` | Formal identifier(s) for this Minutes document. |
| `urn` | `String` | Canonical URN (`urn:oiml:doc:ciml:minutes:2025-09`). |
| `language_code` | `String` | ISO 639-3 — Minutes are monolingual; one `Minutes` per language. |
| `script` | `String` | ISO 15924 four-letter code (`Latn`, `Cyrl`, `Hant`). |
| `source_doc` | `String` | Pointer (filename or URL) to the original PDF. |
| `source_pages` | `String` | Page range in `source_doc` covered by this Minutes document. |
| `sections` | `MinutesSection[0..*]` | The narrative, sliced by agenda item. |

Minutes themselves carry `language_code` directly (rather than nesting
a `localizations[]` array) because the narrative is *one continuous
text per language*. A bilingual meeting publishes two `Minutes`
documents — one `eng`, one `fra` — each linked to its own source PDF.
This is the same model newspapers use for bilingual proceedings.

## MinutesSection

One slice of the narrative, typically tied to an agenda item by its
`number` field.

| Field | Type | Description |
|---|---|---|
| `number` | `String` | Agenda-item label this section corresponds to (`"4.2"`, `"10.a"`). |
| `title` | `String` | Section heading as printed. |
| `narrative` | `String` | The body — **Markdown** (the format the GLM-OCR pipeline emits). |
| `page_start` | `Integer` | First page in `source_doc` covered by this section. |
| `page_end` | `Integer` | Last page. |
| `references` | `Reference[0..*]` | Supporting documents (prior resolutions, background papers). |

## The agenda-item join

The load-bearing design choice: **`MinutesSection.number` joins to
`AgendaItem.label`**. With this single key, a consumer can pivot any
two of {Agenda, Minutes, Resolution} by agenda-item number:

```
AgendaItem.label "4.2"
    │
    ├──→ MinutesSection.number "4.2"  → narrative of what was said
    │
    └──→ Resolution.agenda_item "4.2" → formal decision adopted
```

So a reader asking *"what was decided on item 4.2 and why?"* gets a
three-way join from one string. That is the whole reason the
`number` field exists on `MinutesSection` — it is the foreign key
into both `AgendaItem` and `Resolution`.

## Provenance

Every `MinutesSection` carries `page_start` + `page_end`, plus
optional `references[]`. This lets a reader follow any narrative
claim back to the source PDF without leaving the data file. Combined
with the parent `Minutes.source_doc` and `source_pages`, every
assertion in the Minutes has a citable anchor in the original
document.

## See also

- [Meeting Collection](/docs/meeting-collection) — the parent entity
- [Agenda](/docs/agenda) — the forward-looking business order
- [Attendance](/docs/attendance) — who was at the meeting
- [Resolution Collection](/docs/decision-collection) — the formal decisions
- [Schema](/docs/schema) — what the JSON Schema enforces
