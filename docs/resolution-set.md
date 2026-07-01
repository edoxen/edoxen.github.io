# Resolution Collection

> **Note:** the class was previously named `ResolutionSet` in the
> README and earlier docs. The canonical LutaML model now calls it
> `ResolutionCollection`. Functionally identical — same two top-level
> fields, same shape. New code should use `ResolutionCollection`.

A **ResolutionCollection** is the top-level container for resolutions.
It corresponds to one meeting or one publication batch — for example,
all the resolutions adopted at the 17th OIML Conference.

```yaml
metadata:
  title: Resolutions of the 17th OIML Conference
  ...
resolutions:
  - identifier: { prefix: OIML, number: "2016/1" }
    type: resolution
    doi: 10.63493/resolutions/conf201601
    ...
```

## Fields

| Field | Type | Description |
|---|---|---|
| `metadata` | `ResolutionMetadata` | Information about the meeting / publication. |
| `resolutions` | `Resolution[1..*]` | The list of resolutions. At least one required. |

## ResolutionMetadata

| Field | Type | Description |
|---|---|---|
| `title` | `String` | Collection title (e.g. "Resolutions of the 17th OIML Conference"). |
| `dates` | `ResolutionDate[1..*]` | Publication window. |
| `venue` | `String` | Where the meeting was held (e.g. "Paris, France"). |
| `city` | `String` | IATA city code (`PAR`). |
| `country_code` | `String` | ISO 3166-1 alpha-2 (`FR`). |
| `source_urls` | `SourceUrl[1..*]` | One per official PDF — the deliverable(s) for each language. |

## The parallel top-level: MeetingCollection

A related container, [`MeetingCollection`](/docs/meeting-collection),
sits at the meeting-grain instead of the resolution-grain. A `Meeting`
in a MeetingCollection references the Resolutions it adopted through
its `resolution_refs[]` field; those Resolutions, in turn, point back
to the Meeting through `Resolution.meeting: MeetingIdentifier`. The
two collections capture the same events from opposite directions.

Use `ResolutionCollection` when you have a flat file of decisions
without meeting-level detail. Use `MeetingCollection` when the
agendas, schedules, and chair-person assignments are part of the
story you want to tell.

## See also

- [Resolution](/docs/resolution)
- [Meeting Collection](/docs/meeting-collection)
- [Schema](/docs/schema) — what the JSON Schema enforces
