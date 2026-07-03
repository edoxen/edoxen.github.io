# Meeting Component

A **MeetingComponent** is a flat sub-event of a
[Meeting](/docs/meeting-collection): a track, a session, a debate, a
breakout, a keynote, an opening, a closing, a break, a reception, etc.

Replaces v0.x `ScheduleItem`. Components are **flat by design** (no
nesting) per the 2026-07 architectural decision — nested tracks become
hard to query and render.

## Kinds

`COMPONENT_KIND` covers both substantive and procedural sub-events:

| Group | Kinds |
|---|---|
| Substantive | `track`, `session`, `debate`, `breakout`, `bof`, `plenary_session`, `working_group_session`, `committee_of_the_whole`, `keynote`, `address`, `statement`, `question_time` |
| Procedural | `opening`, `closing`, `break`, `reception`, `registration`, `networking` |
| Open | `other` |

## Fields

| Field | Type | Description |
|---|---|---|
| `identifier` | string | Local identifier. |
| `urn` | string | URN. |
| `kind` | enum | See table above. |
| `title` | string | Component title. |
| `description` | string | Longer description. |
| `starts_at` | datetime | Start time. |
| `ends_at` | datetime | End time. |
| `venue_refs` | string[] | URNs of [Venues](/docs/venue) used by this component. |
| `chair` | `Person` | Component-level chair (distinct from meeting-level chair). |
| `agenda_ref` | string | URN of an [Agenda](/docs/agenda) entry this component covers. |
| `minutes_ref` | string | URN of a [Minutes](/docs/minutes) section. |
| `attendance_refs` | string[] | URNs of [Attendance](/docs/attendance) entries scoped to this component. |
| `localizations` | `ComponentLocalization[]` | Per-language content. |

`#duration_seconds` returns the seconds between `starts_at` and
`ends_at` (nil when either is missing).

## Example

```yaml
components:
  - identifier: plenary-opening
    kind: opening
    title: Plenary opening
    starts_at: 2026-03-15T09:00:00-05:00
    ends_at: 2026-03-15T10:30:00-05:00
    venue_refs:
      - urn:acme:board:venue:main-room
    chair:
      name: Ms. Eleanor Vance
    agenda_ref: urn:acme:board:agenda:item-1
  - identifier: committee-of-the-whole
    kind: committee_of_the_whole
    title: Committee of the Whole — Budget Review
    starts_at: 2026-03-15T14:00:00-05:00
    ends_at: 2026-03-15T17:00:00-05:00
    chair:
      name: Dr. Marcus Hale
```

## See also

- [Meeting Collection](/docs/meeting-collection)
- [Agenda](/docs/agenda)
- [Minutes](/docs/minutes)
- [Venue](/docs/venue)
