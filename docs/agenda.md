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
| `urn` | `String` | First-class URN, hierarchical under the parent meeting URN (`{meetingUrn}:agenda:{label}`). Optional in source data — computable via `Edoxen::UrnFor.agenda_item` (see below). |
| `label` | `String` | The printed number (`"4.2"`, `"10.a"`). May be empty for headers. |
| `kind` | `AgendaItemKind` | One of `numbered`, `unnumbered`, `header`, `opening`, `closing`. |
| `title` | `String` | Short title as printed. |
| `description` | `String` | Optional body / context. |
| `references` | `Reference[0..*]` | Supporting documents (background papers, prior resolutions). |
| `outcome` | `AgendaItemOutcome` | What happened with this item. |
| `decision_ref` | `String` | URN of the decision this item produced, if any. |
| `topics` | `Topic[0..*]` | The subject(s) of discussion at this item. |
| `components` | `String[0..*]` | MeetingComponent identifiers covering this item. |

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

Captures what the meeting did with this item. The enum is
**authoritative** — wire values are kept in lockstep with
`Edoxen::Enums::AGENDA_ITEM_OUTCOME`:

- `discussed` — meeting talked about it; no formal outcome yet
- `resolved` — meeting reached a decision (resolution adopted or
  resolution-rejected — check the linked `Resolution` to see which)
- `deferred` — pushed to a later meeting
- `adopted` — meeting adopted the proposal as presented
- `withdrawn` — proponent withdrew the item

### AgendaItem URNs

An item's `urn` is derived from the parent meeting URN plus the item
label — `{meetingUrn}:agenda:{label}`. It is optional in source data;
the gem computes it on demand and can backfill a whole agenda:

```ruby
Edoxen::UrnFor.agenda_item(meeting_urn: "urn:oiml:ciml:meeting:ciml-60", label: "6.2")
# => "urn:oiml:ciml:meeting:ciml-60:agenda:6.2"

Edoxen::UrnFor.parse("urn:oiml:ciml:meeting:ciml-60:agenda:6.2")
# => { meeting_urn: "urn:oiml:ciml:meeting:ciml-60", label: "6.2" }

Edoxen::UrnFor.assign_to_agenda!(meeting.agenda, meeting.urn)
# sets urn on every item that doesn't already carry one
```

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
| `event` | `String` | One-line summary (default language). |
| `description` | `String` | Optional fuller text (default language). |
| `room` | `String` | Room or hall name. |
| `localizations` | `ScheduleItemLocalization[0..*]` | Per-language event name + description. |

A `Meeting` carries a `schedule[]` array of these — one per slot in
the running order over the meeting's date range. The agenda tells
you what; the schedule tells you when. Per-language content (event
name in EN vs FR) lives in `localizations[]`; structural fields
(date, time, room) are language-agnostic on the parent.

### ScheduleItemLocalization

| Field | Type | Description |
|---|---|---|
| `language_code` | `String` (ISO 639-3) | Three-letter code. |
| `script` | `String` (ISO 15924) | Four-letter code. |
| `event` | `String` | Localized event name. |
| `description` | `String` | Localized description. |

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
- [Resolution Collection](/docs/decision-collection) — the parallel container; a `Meeting` references Resolutions via `resolution_refs[]`
- [`edoxen/edoxen-model`](https://github.com/edoxen/edoxen-model) — canonical LutaML/UML definitions
