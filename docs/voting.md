# Voting

A **Voting** is the state machine for a single vote on a
[Motion](/docs/motion). Multiple votings can occur on the same motion
(e.g. unclear voice vote → chair calls a division → second Voting
instance with `voting_method: division`).

## State machine

```
called → in_progress → decided
                     ├── withdrawn
                     └── deferred
```

When `decided`, `result` holds the outcome:

| Result | Meaning |
|---|---|
| `passed` | Ayes exceed the threshold. |
| `negatived` | Noes meet or exceed the threshold. |
| `tied` | Ayes == noes; chair's casting vote may break it. |
| `withdrawn` | Motion withdrawn before result declared. |

## Fields

| Field | Type | Description |
|---|---|---|
| `identifier` | string | Local identifier. |
| `urn` | string | URN. |
| `on_motion` | string | URN of the [Motion](/docs/motion) being voted on. |
| `status` | enum | See state machine above. |
| `voting_method` | enum | `voice`, `division`, `show_of_hands`, `roll_call`, `electronic`, `secret_ballot`, `unanimous_consent`, `consensus`. |
| `called_by` | `Person` | The officer (usually chair) who called the vote. |
| `called_at` | datetime | When called. |
| `result_declared_at` | datetime | When the chair declared the result. |
| `result` | enum | `passed`, `negatived`, `tied`, `withdrawn`. |
| `counts` | `VotingCounts` | Tally: ayes / noes / abstentions / absent. |
| `casting_vote` | `VoteRecord` | Chair's casting vote, used to break a tie. |
| `vote_records` | `VoteRecord[]` | Per-member vote records (for roll_call, division). |

## VotingCounts

| Field | Type | Description |
|---|---|---|
| `ayes` | integer | Votes in favour. |
| `noes` | integer | Votes against. |
| `abstentions` | integer | Members present but abstaining. |
| `absent` | integer | Members not present (with cause). |

Derived: `#total`, `#margin` (ayes − noes), `#tied?`.

## Example

```yaml
votings:
  - identifier: voting-dividend-2026-q1
    urn: urn:acme:board:voting:2026-q1-dividend
    on_motion: urn:acme:board:motion:2026-q1-dividend
    status: decided
    voting_method: roll_call
    called_by:
      name: Ms. Eleanor Vance
    called_at: 2026-03-15T11:00:00-05:00
    result_declared_at: 2026-03-15T11:05:00-05:00
    result: tied
    counts:
      ayes: 3
      noes: 3
      abstentions: 0
      absent: 1
    casting_vote:
      person: { name: Ms. Eleanor Vance }
      decision_ref: urn:acme:board:decision:2026-q1-dividend
      vote: affirmative
      role: teller
```

## See also

- [Motion](/docs/motion) — the procedural act being voted on.
- [Decision](/docs/decision) — the formal outcome when result is `passed`.
- [Attendance & Votes](/docs/attendance) — per-member vote records.
