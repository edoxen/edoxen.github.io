---
title: Meeting Component
---

# MeetingComponent

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

## Fields (v3.0)

| Field | Type | Description |
|---|---|---|
| `identifier` | `String` | Local identifier. |
| `urn` | `String` | URN. |
| `kind` | `enum` | See table above. |
| `body_type` | `String` | Free-form body-specific label (e.g. "Working Group Session"). |
| `title` | `LocalizedString[0..*]` | Localized component title. |
| `description` | `LocalizedString[0..*]` | Localized description. |
| `starts_at` | `DateTime` | Start time. |
| `ends_at` | `DateTime` | End time. |
| `time_label` | `LocalizedString[0..*]` | Free-form time display (e.g. `"9:00–10:30"`). |
| `venue_refs` | `String[0..*]` | URNs of [Venues](/docs/venue) used by this component. |
| `officers` | `Officer[0..*]` | Role-discriminated people leading this component (chair, co-chair, moderator, etc.). Mirrors `Meeting.officers`. |
| `agenda_ref` | `String` | URN of an [Agenda](/docs/agenda) entry this component covers. |
| `minutes_ref` | `String` | URN of a [Minutes](/docs/minutes) section. |
| `attendance_refs` | `String[0..*]` | URNs of [Attendance](/docs/attendance) entries scoped to this component. |
| `extensions` | `MeetingExtension[0..*]` | Profile-specific extensions. |

`#duration_seconds` returns the seconds between `starts_at` and
`ends_at` (nil when either is missing).

## Officer (role-discriminated)

`officers[]` is a list of role-discriminated people. Each entry binds
a [Contact](/docs/contact) (inline or `{ ref: urn:... }`) to a role
(`chair`, `vice_chair`, `secretary`, etc.) — see
[Officer](/docs/officer). Use multiple Officer entries for co-chairs,
moderators, panelists, etc. A derived `MeetingComponent#chair`
accessor returns the first `Officer` with `role=chair`.

## Example

```yaml
components:
  - identifier: plenary-opening
    kind: opening
    title:
      - spelling: eng
        value: Plenary opening
    starts_at: 2026-03-15T09:00:00-05:00
    ends_at: 2026-03-15T10:30:00-05:00
    venue_refs:
      - urn:edoxen:venue:isotc154:plenary-hall
    officers:
      - role: chair
        person:
          ref: urn:edoxen:contact:isotc154:jianfang-zhang
    agenda_ref: urn:edoxen:agenda:isotc154:item-1
  - identifier: committee-of-the-whole
    kind: committee_of_the_whole
    title:
      - spelling: eng
        value: Committee of the Whole — Budget Review
    starts_at: 2026-03-15T14:00:00-05:00
    ends_at: 2026-03-15T17:00:00-05:00
    officers:
      - role: chair
        person:
          name:
            - spelling: eng
              value: { formatted: Dr. Marcus Hale }
```

## See also

- [Meeting Collection](/docs/meeting-collection)
- [Agenda](/docs/agenda)
- [Minutes](/docs/minutes)
- [Venue](/docs/venue)
- [Officer](/docs/officer)
- [Localization](/docs/localization)
