# Meeting Series

A **MeetingSeries** is the parent of recurring
[Meetings](/docs/meeting-collection): ISO/TC 154 Plenary Series, the
Apache Board monthly meeting series, IETF meeting series, Crossref
proceedings series, etc.

Carries a [Recurrence](/docs/recurrence) rule (ISO 8601-2 §13) and a
list of member meeting URNs.

## Fields

| Field | Type | Description |
|---|---|---|
| `identifier` | `StructuredIdentifier[]` | Series identifier(s). |
| `urn` | string | URN. |
| `name` | string | Series name (e.g. "ISO/TC 154 Plenary Series"). |
| `description` | string | Longer description. |
| `recurrence` | `Recurrence` | Recurrence rule. |
| `term` | string | Term label (e.g. "2024-2026"). |
| `organizer` | `Person` | Series organizer. |
| `hosts` | `HostRef[]` | Hosting bodies. |
| `kind` | string | Free-form kind discriminator. |
| `meeting_refs` | string[] | URNs of member Meetings. |

## Example

```yaml
identifier:
  - prefix: ISO/TC154
    number: PlenarySeries
urn: urn:iso:tc154:series:plenary
name: ISO/TC 154 Plenary Series
description: |
  Annual plenary series of ISO/TC 154 — Processes, data elements
  and documents in commerce, industry and administration.
recurrence:
  freq: yearly
  interval: 1
term: "2024-2026"
organizer:
  name: ISO/TC 154 Secretariat
hosts:
  - ref: sac
    type: national_body
meeting_refs:
  - urn:iso:tc154:meeting:plenary-41
  - urn:iso:tc154:meeting:plenary-42
  - urn:iso:tc154:meeting:plenary-43
```

## See also

- [Meeting Collection](/docs/meeting-collection)
- [Recurrence](/docs/recurrence)
