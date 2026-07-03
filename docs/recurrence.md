# Recurrence

A **Recurrence** is the structured representation of an ISO 8601-2 §13
recurring time interval. Adopted by [MeetingSeries](/docs/meeting-series)
and inline by [Meeting](/docs/meeting-collection) for in-meeting patterns
(e.g. coffee breaks every 90 minutes).

Unlike iCalendar `RRULE` (an opaque string), the structured form is
**queryable** — each `BYxxx` part is its own attribute, so consumers can
filter, project, and reason about recurrence without re-implementing the
RFC 5545 grammar.

## Fields

| Field | Type | Description |
|---|---|---|
| `freq` | enum | `secondly`, `minutely`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`. |
| `interval` | integer | Default `1`. `2` = every other. |
| `count` | integer | Maximum occurrences. |
| `until` | datetime | Cutoff datetime. |
| `by_day` | `RecurrenceByDay[]` | Days of week, optionally ordinal (`+1` for first, `-1` for last). |
| `by_month_day` | integer[] | Day of month (1-31, or negative). |
| `by_month` | integer[] | Month (1-12). |
| `by_week_no` | integer[] | Week of year (1-53). |
| `by_year_day` | integer[] | Day of year (1-366). |
| `by_hour` | integer[] | Hour (0-23). |
| `by_minute` | integer[] | Minute (0-59). |
| `by_second` | integer[] | Second (0-60). |
| `by_set_pos` | integer[] | Set-position filter (e.g. `-1` for last of set). |
| `week_start` | string | `MO` (default), `SU`, `SA`. |

## RecurrenceByDay

| Field | Type | Description |
|---|---|---|
| `ordinal` | integer | `null` for "every", `+1` for first, `-1` for last. |
| `weekday` | string | 2-letter day code (`MO`, `TU`, `WE`, `TH`, `FR`, `SA`, `SU`). |

## Examples

Every year:
```yaml
recurrence:
  freq: yearly
  interval: 1
```

First Monday of every quarter:
```yaml
recurrence:
  freq: monthly
  interval: 3
  by_day:
    - ordinal: 1
      weekday: MO
```

Daily at 09:00 and 14:00 for 10 occurrences:
```yaml
recurrence:
  freq: daily
  count: 10
  by_hour: [9, 14]
  by_minute: [0]
```

## See also

- [ISO 8601-2 reference](https://www.iso.org/standard/70907.html) (canonical).
- [references/iso8601-2](https://github.com/edoxen/edoxen-model/blob/main/references/iso8601-2.adoc)
  in the model repo.
