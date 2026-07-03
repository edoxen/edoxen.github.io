# Decision Collection

A **DecisionCollection** is the top-level container for decisions. It
corresponds to one meeting or one publication batch — for example, all
the decisions adopted at the 17th OIML Conference.

```yaml
metadata:
  title: Decisions of the 17th OIML Conference
  ...
decisions:
  - identifier:
      - prefix: OIML
        number: "2016/1"
    kind: resolution
    status: decided
    doi: 10.63493/decisions/conf201601
    ...
```

## Fields

| Field | Type | Description |
|---|---|---|
| `metadata` | `DecisionMetadata` | Information about the meeting / publication. |
| `decisions` | `Decision[1..*]` | The list of decisions. At least one required. |

## DecisionMetadata

| Field | Type | Description |
|---|---|---|
| `title` | `String` | Collection title (e.g. "Decisions of the 17th OIML Conference"). |
| `title_localized` | `Localization[]` | Per-language title records for multilingual collections. |
| `date` | `Date` | Meeting date. |
| `source` | `String` | Issuing secretariat. |
| `source_urls` | `SourceUrl[]` | One per official PDF — per-language canonical sources. |
| `city` | `String` | UN/LOCODE of host city (5-char). |
| `country_code` | `String` | ISO 3166-1 alpha-2 of host country. |
| `meeting_urn` | `String` | URN back-reference to the Meeting that produced this collection. |

## The parallel top-level: MeetingCollection

A related container, [`MeetingCollection`](/docs/meeting-collection),
sits at the meeting-grain instead of the decision-grain. A `Meeting` in
a MeetingCollection carries its `decisions[]`, `motions[]`, and
`votings[]` directly; the DecisionCollection is the standalone form
when you only want to publish decisions without meeting-level detail.

Use `DecisionCollection` when you have a flat file of decisions. Use
`MeetingCollection` when the agendas, attendance, and procedural record
are part of the story you want to tell.

## See also

- [Decision](/docs/decision)
- [Meeting Collection](/docs/meeting-collection)
- [Schema](/docs/schema) — what the JSON Schema enforces
