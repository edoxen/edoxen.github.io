---
title: DateTimeRange
---

# DateTimeRange

A **DateTimeRange** is a start + end pair with sub-day precision. It
is parallel to `DateRange` (which is day-granularity); the two are
intentionally separate types so the granularity is visible at the
type level.

## Where it's used

- `Meeting#occurred_date_range` — the actual start and end times of a
  meeting (e.g. a meeting that ran 09:00–11:30). `Meeting#scheduled_date_range`
  remains a `DateRange` because forward planning is usually at the day
  level.

## Wire shape

```yaml
occurred_date_range:
  start: 2026-03-12T09:00:00+00:00
  end: 2026-03-12T11:45:00+00:00
```

## Why not extend DateRange?

Two parallel types keep the granularity visible at the type level:

- A caller who sees `DateRange` knows it is day-granularity.
- A caller who sees `DateTimeRange` knows sub-day precision is
  available.

`MeetingComponent#starts_at` / `#ends_at` already use DateTime for
sub-day precision at the component level; `DateTimeRange` brings the
same precision to the meeting level without changing the existing
`DateRange` contract.

## Reference

- ISO 8601-1 — date/time format.
