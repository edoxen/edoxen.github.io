---
title: Meeting Collection
---

# Meeting Collection

A **MeetingCollection** is the top-level container for meetings — the
parallel of [ResolutionCollection](/docs/decision-collection) for
meeting-level data. It corresponds to one publication batch or one
event horizon, e.g. all OIML CIML meetings for a financial period,
or all ISO/TC 154 plenary sessions across a quadrennium.

```yaml
metadata:
  title: 22nd CIML meetings (2025–2028 financial period)
  source: OIML CIML Secretariat
meetings:
  - identifier: { prefix: CIML, number: "2025-09" }
    urn: urn:oiml:doc:ciml:meeting:2025-09
    type: plenary
    status: completed
    year: 2025
    date_range: { start: '2025-10-13', end: '2025-10-17' }
    committee: CIML
    venues:
      - { name: 'Hotel Berlin', address: 'Berlin, Germany' }
    city: BER
    country_code: DE
    chair:    { name: 'Dr. Anaya Müller',    affiliation: PTB }
    secretary: { name: 'Mr. Jean Dupont',     affiliation: BIML }
    agenda:
      status: final
      items:
        - { label: '1',   kind: opening,  title: 'Opening of the meeting' }
        - { label: '4.2', kind: numbered, title: 'Budget for 2027–2028 financial period' }
    attendance:
      - { person: { name: 'Dr. Anaya Müller' }, status: present }
      - { person: { name: 'Dr. Sofia Rossi'  }, status: absent, notes: 'Excused' }
    vote_records:
      - { resolution_ref: 'OIML/2025/4', person: { name: 'Dr. Anaya Müller' }, vote: affirmative }
      - { resolution_ref: 'OIML/2025/4', person: { name: 'Dr. Sofia Rossi'  }, vote: negative }
    minutes:
      - identifier: { prefix: CIML, number: "2025-09-minutes" }
        language_code: eng
        script: Latn
        source_doc: 22nd-CIML-September-2025-Minutes.pdf
        sections:
          - { number: '4.2', title: 'Budget', narrative: 'The Director introduced…', page_start: 41, page_end: 47 }
    localizations:
      - { language_code: eng, script: Latn, title: '2025 CIML September Session' }
      - { language_code: fra, script: Latn, title: 'Session de septembre 2025 du CIML' }
    resolution_refs:
      - OIML/2025/4
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
| `type` | `MeetingType` | One of `plenary`, `working_group`, `task_group`, `ad_hoc`, `joint`, `conference_session`. |
| `status` | `MeetingStatus` | One of `upcoming`, `completed`, `cancelled`. |
| `year` | `Integer` | The four-digit calendar year. |

### When and where

| Field | Type | Description |
|---|---|---|
| `scheduled_date_range` | `DateRange` | The planned sitting window (day precision). Single-day meetings use one bound. |
| `occurred_date_range` | `DateTimeRange` | When the meeting *actually* ran (sub-day precision, e.g. 09:00–11:30). BS 0:2006 §7.6. See [BS 0 Minutes](/docs/bs0-minutes). |
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
| `attendance` | `Attendance[0..*]` | Who was at the meeting (see [Attendance & Votes](/docs/attendance)). |
| `vote_records` | `VoteRecord[0..*]` | How each person voted on each Resolution. |
| `minutes` | `Minutes[0..*]` | The narrative record of the meeting (see [Minutes](/docs/minutes)). One `Minutes` per language. |
| `declarations` | `Declaration[0..*]` | Formal declarations (CoI / IPR) made at this meeting (BS 0:2006 §7.6). See [BS 0 Minutes](/docs/bs0-minutes). |
| `localizations` | `MeetingLocalization[0..*]` | Per-language content (see below). |
| `relations` | `MeetingRelation[0..*]` | Links to other meetings (follows / supersedes / convenes-from). |
| `resolution_refs` | `String[0..*]` | Identifiers of the resolutions adopted at this meeting. |

### Reading the tree

A `Meeting` reads as a single sitting: *who met, when, where, about
what, and what came out*. The descriptive parts (committee, chair,
dates) live here and are **declared once**. Anything translatable —
title, practical info, general area in the local language — lives in
`localizations[]`. Anything about what happened at the meeting —
agenda items, deadlines, schedule slots, attendance, votes, the
narrative minutes, resolutions adopted — lives in dedicated child
entities.

The hard rule: **anything translatable lives below a `MeetingLocalization`
(or a `Minutes` document, which carries its own `language_code`).**
Anything administrative and language-agnostic lives above it.

## MeetingLocalization

Per-language rendering of a `Meeting`. Mirrors the glossarist
`LocalizedConcept` pattern.

| Field | Type | Required | Description |
|---|---|---|---|
| `language_code` | `String` (ISO 639-3) | yes | Three-letter code (`eng`, `fra`, `deu`). |
| `script` | `String` (ISO 15924) | no | Four-letter (`Latn`, `Cyrl`, `Hant`). |
| `title` | `String` | no | Localized meeting title. |
| `general_area` | `String` | no | Localized human description of where the meeting sits. |
| `practical_info` | `String` | no | Logistics the local team needs to communicate. |

## MeetingRelation

| Field | Type | Description |
|---|---|---|
| `source` | `StructuredIdentifier` | One end of the relation. |
| `destination` | `StructuredIdentifier` | The other end. |
| `type` | `MeetingRelationType` | One of `continues_from`, `continues_to`, `joint_with`, `supersedes`, `superseded_by`, `rescheduled_from`, `rescheduled_to`. |

A simple example: a CIML March meeting is followed by a CIML September
meeting of the same year. Encoding `continues_from` on the September
meeting makes the chain visible in tools without parsing dates.

## See also

- [Agenda](/docs/agenda) — agenda items, schedule slots, deadlines
- [Minutes](/docs/minutes) — the narrative record of a meeting
- [BS 0:2006 Minutes](/docs/bs0-minutes) — statements, declarations, and occurred times
- [Attendance & Votes](/docs/attendance) — who was there and how they voted
- [Resolution Collection](/docs/decision-collection) — the parallel container for resolutions
- [Structured Identifier](/docs/structured-identifier) — the {prefix, number} type
- [Multilingual support](/docs/multilingual) — the `localizations[]` pattern in detail
- [`edoxen/edoxen-model`](https://github.com/edoxen/edoxen-model) — the LutaML/UML source of truth
