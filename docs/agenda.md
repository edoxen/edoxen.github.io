---
title: Agenda
---

# Agenda

An **Agenda** is the ordered list of items a `Meeting` works through.
It lives on the `Meeting` itself, with its own status, source document
pointer, and per-item structure.

```yaml
agenda:
  status: final
  source_doc: 22nd-CIML-September-2025-Agenda-Final.pdf
  items:
    - { label: '1',   kind: opening,    title: 'Opening of the meeting' }
    - { label: '2',   kind: header,     title: 'Procedural matters' }
    - { label: '3.1', kind: numbered,   title: 'Approval of the agenda', outcome: adopted }
    - { label: '4',   kind: header,     title: 'Substantive matters' }
    - { label: '4.2', kind: numbered,   title: 'Budget for the 2027–2028 financial period',
      outcome: deferred_to_subcommittee }
    - { label: '10',  kind: numbered,   title: 'Any other business' }
    - { label: '11',  kind: closing,    title: 'Closing of the meeting' }
```

## Agenda fields

| Field | Type | Description |
|---|---|---|
| `identifier` | `StructuredIdentifier[0..*]` | Optional formal identifier(s) — some bodies publish numbered agendas. |
| `status` | `AgendaStatus` | Lifecycle state of this version (see below). |
| `source_doc` | `String` | Pointer (filename or URL) to the original agenda PDF. |
| `items` | `AgendaItem[0..*]` | The items. Order is the order of business. |
| `opening_session` | `ScheduleItem` | Optional: the meeting's opening session, if scheduled. |
| `closing_session` | `ScheduleItem` | Optional: the meeting's closing session, if scheduled. |

### AgendaStatus

| Value | When |
|---|---|
| `draft` | Working copy, may change. |
| `final` | Issued, in force at start of meeting. |
| `amended` | Modified during the meeting (rare; usually means a re-issue). |
| `cancelled` | Meeting cancelled — agenda preserved for record. |
| `superseded` | Replaced by a later agenda for the same meeting. |

## AgendaItem

| Field | Type | Description |
|---|---|---|
| `label` | `String` | The printed number (`"4.2"`, `"10.a"`). May be empty for headers. |
| `kind` | `AgendaItemKind` | One of `numbered`, `unnumbered`, `header`, `opening`, `closing`. |
| `title` | `String` | Short title as printed. |
| `description` | `String` | Optional body / context. |
| `references` | `Reference[0..*]` | Supporting documents (background papers, prior resolutions). |
| `outcome` | `AgendaItemOutcome` | What happened with this item. |
| `resolution_ref` | `String` | If the item produced a resolution, its identifier. |

### AgendaItemKind

| Value | Meaning |
|---|---|
| `numbered` | Normal agenda item, has a label and resolved (or not) by the meeting. |
| `unnumbered` | Talking-point only, no formal outcome. |
| `header` | A section divider inside the agenda ("Procedural matters"). |
| `opening` | The opening of the meeting (greetings, roll call, etc.). |
| `closing` | The closing of the meeting. |

The `kind` field is **enum-restricted** — the wire format cannot drift
to free-form values. This is what lets schema validation catch agenda
renames that look right but break downstream parsing.

### AgendaItemOutcome

Captures what the meeting did with this item. The exact enum is
defined in `edoxen-model`; the canonical values are:

- `adopted` — meeting approved the item as-is
- `amended` — meeting approved with amendments
- `deferred` — pushed to a later meeting
- `deferred_to_subcommittee` — sent to a working group / sub-committee
- `noted` — discussed, recorded, no formal action
- `rejected` — meeting did not adopt
- `withdrawn` — proponent withdrew

## References

`Reference` is a small lightweight citation attached to agenda items.

| Field | Type | Description |
|---|---|---|
| `ref` | `String` | URL or document path. |
| `kind` | `String` | Free-form descriptor (`pdf`, `docx`, `web`). |
| `title` | `String` | Human-readable label. |

Use this when the agenda item cites background papers. For the
multi-language source PDFs of a meeting itself, prefer
`Meeting.source_urls[]` (per-language signed URLs).

## ScheduleItem

A time-of-day entry on a sitting day. Distinct from `AgendaItem` —
the agenda is what gets done, the schedule is when.

| Field | Type | Description |
|---|---|---|
| `date` | `Date` | Calendar day. |
| `time` | `String` | Time-of-day (free text — some bodies write "14:30", some "2:30 PM", some "after agenda item 5"). |
| `event` | `String` | One-line summary. |
| `description` | `String` | Optional fuller text. |
| `room` | `String` | Room or hall name. |

A `Meeting` carries a `schedule[]` array of these — one per slot in
the running order over the meeting's date range. The agenda tells
you what; the schedule tells you when.

## Deadline

Submission or response deadlines that are tied to the meeting (e.g.
"national position papers due 30 days before"):

| Field | Type | Description |
|---|---|---|
| `kind` | `String` | Free-form label — use the body's own terminology. |
| `date` | `Date` | The deadline itself. |
| `description` | `String` | What is owed by this date. |

## See also

- [Meeting Collection](/docs/meeting-collection) — the parent entity
- [Resolution Collection](/docs/resolution-set) — the parallel container; a `Meeting` references Resolutions via `resolution_refs[]`
- [`metanorma/edoxen-model`](https://github.com/metanorma/edoxen-model) — canonical LutaML/UML definitions
