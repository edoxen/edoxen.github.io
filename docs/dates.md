# Dates

Edoxen uses a structured `ResolutionDate` type to distinguish the
different kinds of dates a resolution or meeting can have:

```yaml
dates:
  - start: '2025-10-13'
    end: '2025-10-15'
    kind: meeting
  - start: '2025-10-14'
    kind: decision
  - start: '2025-11-01'
    kind: effective
```

## Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `start` | date (ISO 8601) | yes | Start date, or the single date if no range. |
| `end` | date (ISO 8601) | no | End date for ranges. |
| `kind` | enum | yes | See below. |

## Kinds

| Kind | Description |
|---|---|
| `meeting` | When the meeting took place (top-level metadata). |
| `decision` | When the resolution was decided. |
| `effective` | When the resolution takes legal effect. |
| `enactment` | When the resolution was enacted into law/charter. |
| `ballot` | When a ballot was conducted. |
