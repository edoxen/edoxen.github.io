---
title: Meeting Collection
---

# Meeting Collection

A **MeetingCollection** is the top-level container for meetings — the
parallel of [ResolutionCollection](/docs/resolution-set) for
meeting-level data. It corresponds to one publication batch or one
event horizon, e.g. all OIML CIML meetings for a financial period,
or all ISO/TC 154 plenary sessions across a quadrennium.

```yaml
metadata:
  title: 22nd CIML meetings (2025–2028 financial period)
  source: OIML CIML Secretariat
meetings:
  - identifier: { prefix: CIML, number: "2025-09" }
    type: CIML
    year: 2025
    date_range: { start: '2025-10-13', end: '2025-10-17' }
    venue: Berlin, Germany
    city: BER
    country_code: DE
    chair: { given_name: '[…]', family_name: '[…]' }
    secretary: { given_name: '[…]', family_name: '[…]' }
    agenda:
      status: final
      items:
        - { label: '1', kind: numbered, title: 'Opening' }
        - { label: '4.2', kind: numbered, title: 'Budget for 2027–2028 financial period' }
    localizations:
      - { language_code: eng, script: Latn, title: '2025 CIML September Session' }
      - { language_code: fra, script: Latn, title: 'Session de septembre 2025 du CIML' }
```

## Fields

| Field | Type | Description |
|---|---|---|
| `metadata` | `MeetingCollectionMetadata` | The publication-level header (title, source). |
| `meetings` | `Meeting[0..*]` | The list of meetings. Order is signficant — by ordinal/date. |

## MeetingCollectionMetadata

| Field | Type | Description |
|---|---|---|
| `title` | `String` | Publication title (e.g. period or program name). |
| `source` | `String` | Originating body (e.g. "OIML CIML Secretariat"). |

## Meeting

The atomic entity in a MeetingCollection. A `Meeting` describes one
sitting — its dates, location, chair, agenda items, and resolutions
adopted.

### Identity

| Field | Type | Description |
|---|---|---|
| `identifier` | `StructuredIdentifier[1..*]` | A composite {prefix, number} pair. Most bodies have a stable prefix (CIML, COCO, TC154). A meeting may carry several identifiers across publishing histories. |
| `urn` | `String` | Canonical URN (e.g. `urn:oiml:doc:ciml:meeting:2025-09`). |
| `ordinal` | `Integer` | Sequential ordering within the year, when applicable. |
| `type` | `MeetingType` | e.g. `plenary`, `working_group`, `sub_committee`. |
| `status` | `MeetingStatus` | `draft`, `scheduled`, `in_session`, `concluded`, `cancelled`. |
| `year` | `Integer` | The four-digit calendar year. |

### When and where

| Field | Type | Description |
|---|---|---|
| `date_range` | `DateRange` | The sitting window. Single-day meetings use one bound. |
| `venues` | `Location[0..*]` | Physical venues (some meetings span buildings — `Location` has the full address). |
| `general_area` | `String` | Human-readable locale description ("Berlin, Germany"). |
| `city` | `String` | IATA three-letter code (`BER`, `PAR`, `TYO`). |
| `country_code` | `String` | ISO 3166-1 alpha-2 (`DE`, `FR`, `JP`). |
| `virtual` | `Boolean` | True if held online. |
| `committee` | `String` | Owning committee (e.g. "ISO/TC 154"). |
| `committee_group` | `String` | Sub-committee / working group. |

### People

| Field | Type | Description |
|---|---|---|
| `chair` | `Person` | Chair of the meeting. |
| `secretary` | `Person` | Recording secretary. |
| `host` | `String` | Host organization. |
| `hosts` | `HostRef[0..*]` | Multi-party hosting (hosting committee + secretariat, etc.). |

### Links

| Field | Type | Description |
|---|---|---|
| `source_urls` | `SourceUrl[0..*]` | One per official PDF — the deliverable(s) of the meeting. |
| `landing_url` | `String` | Public summary page. |
| `registration_url` | `String` | Where attendees register. |

### Body content

| Field | Type | Description |
|---|---|---|
| `agenda` | `Agenda` | The meeting's agenda (see [Agenda](/docs/agenda)). |
| `schedule` | `ScheduleItem[0..*]` | Time-of-day ordering on each sitting day. |
| `deadlines` | `Deadline[0..*]` | Submission / response deadlines tied to the meeting. |
| `localizations` | `MeetingLocalization[0..*]` | Per-language content (see below). |
| `relations` | `MeetingRelation[0..*]` | Links to other meetings (follows / supersedes / convenes-from). |
| `resolution_refs` | `String[0..*]` | Identifiers of the resolutions adopted at this meeting. |

### Reading the tree

A `Meeting` reads as a single sitting: *who met, when, where, about
what, and what came out*. The descriptive parts (committee, chair,
dates) live here and are **declared once**. Anything translatable —
title, practical info, general area in the local language — lives in
`localizations[]`. Anything about what happened at the meeting —
agenda items, deadlines, schedule slots, resolutions adopted — lives
in dedicated child entities.

The hard rule: **anything translatable lives below a `MeetingLocalization`.**
Anything administrative and language-agnostic lives above it.

## MeetingLocalization

Per-language rendering of a `Meeting`. Mirrors the glossarist
`LocalizedConcept` pattern.

| Field | Type | Required | Description |
|---|---|---|---|
| `languageCode` | `Iso639ThreeCharCode` | yes | ISO 639-3 three-letter code (`eng`, `fra`, `deu`). |
| `script` | `Iso15924Code` | no | ISO 15924 four-letter (`Latn`, `Cyrl`, `Hant`). |
| `title` | `String` | no | Localized meeting title. |
| `general_area` | `String` | no | Localized human description of where the meeting sits. |
| `practical_info` | `String` | no | Logistics the local team needs to communicate. |

## MeetingRelation

| Field | Type | Description |
|---|---|---|
| `source` | `StructuredIdentifier` | One end of the relation. |
| `destination` | `StructuredIdentifier` | The other end. |
| `type` | `MeetingRelationType` | `precedes`, `supersedes`, `convenes_into`, `parallel_to`, `child_of`, etc. |

A simple example: a CIML March meeting is followed by a CIML September
meeting of the same year. Encoding `precedes` makes the chain visible
in tools without parsing dates.

## See also

- [Agenda](/docs/agenda) — agenda items, schedule slots, deadlines
- [Resolution Collection](/docs/resolution-set) — the parallel container for resolutions
- [Structured Identifier](/docs/structured-identifier) — the {prefix, number} type
- [Multilingual support](/docs/multilingual) — the `localizations[]` pattern in detail
- [`metanorma/edoxen-model`](https://github.com/metanorma/edoxen-model) — the LutaML/UML source of truth
