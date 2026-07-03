# Motion

A **Motion** is a procedural act that brings a [Decision](/docs/decision).
The textual "I move that..." proposal, distinct from the formal outcome
(Decision) and from any text document ([TopicDocument](/docs/topic))
behind it.

A Motion does **not** require any document. A member moves verbally; the
secretary records the text; the chair puts the question; if carried, a
Decision results.

## State machine

```
introduced → seconded → debating → question_put → voting
                                              ├── carried   (resulting_decision set)
                                              ├── negatived
                                              ├── withdrawn
                                              └── lapsed
```

## Fields

| Field | Type | Description |
|---|---|---|
| `identifier` | string | Local identifier within the meeting. |
| `urn` | string | URN cross-reference. |
| `text` | string | The motion text ("I move that..."). |
| `mover` | `Person` | The member who introduced the motion. |
| `seconders` | `Person[]` | Members who seconded. |
| `status` | enum | See state machine above. |
| `introduced_at` | datetime | When introduced. |
| `proposed_decision` | string | URN of the Decision this motion would produce (set at introduction). |
| `resulting_decision` | string | URN of the Decision that resulted (set when carried). |
| `votings` | string[] | URNs of [Voting](/docs/voting) instances called on this motion. |

## Example

```yaml
motions:
  - identifier: motion-dividend-2026-q1
    urn: urn:acme:board:motion:2026-q1-dividend
    text: |
      I move that the Board declare a quarterly dividend of $0.45
      per share, payable on April 15, 2026, to shareholders of
      record as of March 31, 2026.
    mover:
      name: Ms. Sofia Reyes
    seconders:
      - { name: Ms. Eleanor Vance }
      - { name: Dr. Marcus Hale }
    status: carried
    introduced_at: 2026-03-15T10:30:00-05:00
    proposed_decision: urn:acme:board:decision:2026-q1-dividend
    resulting_decision: urn:acme:board:decision:2026-q1-dividend
    votings:
      - urn:acme:board:voting:2026-q1-dividend
```

## See also

- [Voting](/docs/voting) — vote state machine for a Motion.
- [Decision](/docs/decision) — the formal outcome when a Motion carries.
- [Topic](/docs/topic) — the subject a Motion concerns.
