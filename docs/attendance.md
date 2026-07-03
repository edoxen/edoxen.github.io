---
title: Attendance & Votes
---

# Attendance & Votes

Two record-keeping entities sit alongside the [Meeting](/docs/meeting-collection)
model. Both are array-valued on `Meeting`:

- **`Attendance`** — who was at the meeting, and in what capacity.
- **`VoteRecord`** — how each person voted on each Resolution.

Together they answer the two questions auditors ask of any formal
sitting: *who was in the room?* and *how did they vote?*

## Attendance

One attendance record per person present (or accounted-for absent).

```yaml
attendance:
  - person:
      name: Dr. Anaya Müller
      role: CIML President
      affiliation: PTB (Germany)
      email: a.muller@ptb.de
    status: present
  - person:
      name: Mr. Jean Dupont
      affiliation: BIML
    status: present
    role: Secretary
  - person:
      name: Dr. Sofia Rossi
      affiliation: INRiM (Italy)
    status: absent
    notes: "Excused — sent written comments on items 4.2 and 7."
  - person:
      name: Ms. Halima Tan
      affiliation: SIRIM (Malaysia)
    status: present
    proxy_for:
      name: Mr. Karim Bin Abdullah
      affiliation: SIRIM (Malaysia)
    notes: "Proxy vote for Mr. Bin Abdullah (item 8 only)."
```

### Fields

| Field | Type | Description |
|---|---|---|
| `person` | `Person` | Who attended. Carries name, role, affiliation, contact. |
| `status` | `ParticipationStatus` | One of `present`, `absent`, `apologies`, `observer`, `excused`. |
| `affiliation` | `String` | National body / liaison / committee the person represented. |
| `proxy_for` | `Person` | If this person held a proxy, the absent member they stood in for. |
| `notes` | `String` | Free-form annotations — excusal reason, scope limits, etc. |

### ParticipationStatus

| Value | Meaning |
|---|---|
| `present` | In the room (or on the call) and counted toward quorum. |
| `absent` | Did not attend. |
| `apologies` | Sent notice of absence before the meeting. |
| `observer` | Present but without voting rights (liaisons, guests). |
| `excused` | Pre-arranged absence with the chair's agreement. |

## VoteRecord

A single vote by a single person on a single Resolution. A
`Resolution` adopted by roll-call has one `VoteRecord` per voting
member; the array lives on the `Meeting` (not the `Resolution`)
because the meeting is the context in which votes happen.

```yaml
vote_records:
  - resolution_ref: OIML/2025/4
    person:
      name: Dr. Anaya Müller
      affiliation: PTB (Germany)
    vote: affirmative
  - person:
      name: Mr. Jean Dupont
      affiliation: BIML
    resolution_ref: OIML/2025/4
    vote: affirmative
  - person:
      name: Dr. Sofia Rossi
      affiliation: INRiM (Italy)
    resolution_ref: OIML/2025/4
    vote: negative
    notes: "Concerns about the budget surplus allocation (item 4.2)."
  - person:
      name: Ms. Halima Tan
      affiliation: SIRIM (Malaysia)
    resolution_ref: OIML/2025/4
    vote: abstain
```

### Fields

| Field | Type | Description |
|---|---|---|
| `resolution_ref` | `String` | Identifier of the Resolution this vote concerns (matches `Resolution.identifier`). |
| `person` | `Person` | Who voted. |
| `affiliation` | `String` | National body / liaison / committee at the time of the vote. |
| `vote` | `VoteType` | One of `affirmative`, `negative`, `abstain`, `absent`, `not_applicable`. |
| `notes` | `String` | Free-form context (the reason for an abstention, etc.). |

### VoteType

| Value | Meaning |
|---|---|
| `affirmative` | Voted in favour. |
| `negative` | Voted against. |
| `abstain` | Deliberately did not vote either way. |
| `absent` | Not in the room when the vote was called. |
| `not_applicable` | Observer / non-voting member; no vote recorded by design. |

## The Resolution join

`VoteRecord.resolution_ref` joins to `Resolution.identifier`. Because
`Resolution.identifier` is a `StructuredIdentifier[1..*]`, the join
key is the **string form** of one identifier — typically the
canonical one printed on the resolution (e.g. `"OIML/2025/4"`).

A consumer computing vote totals for a Resolution:

```ruby
meeting.vote_records
        .select  { |v| v.resolution_ref == "OIML/2025/4" }
        .group_by(&:vote)
        .transform_values(&:count)
# => {"affirmative"=>42, "negative"=>3, "abstain"=>2, "absent"=>3}
```

## See also

- [Meeting Collection](/docs/meeting-collection) — the parent entity
- [Minutes](/docs/minutes) — narrative record of the same meeting
- [Resolution Collection](/docs/decision-collection) — what was voted on
- [Structured Identifier](/docs/structured-identifier) — the join-key type
