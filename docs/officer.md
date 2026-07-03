# Officer

An **Officer** is a person holding a structural role in a
[Meeting](/docs/meeting-collection): chair, secretary, treasurer,
parliamentarian, etc. The list of officers is open — adopters may add
new role values via the `OfficerRole` enum's `other` discriminator.

This replaces v0.x `Meeting.chair` and `Meeting.secretary` direct
shortcuts. One list, role discriminates.

## Fields

| Field | Type | Description |
|---|---|---|
| `role` | enum | `chair`, `vice_chair`, `deputy_chair`, `secretary`, `treasurer`, `parliamentarian`, `presiding_officer`, `sergeant_at_arms`, `other`. |
| `person` | `Person` | The officer. |
| `term_start` | `Date` | When their term began. |
| `term_end` | `Date` | When their term ends. |

`#current?(date = Date.today)` is true when `date` falls inside the term
window (or when no term is set).

## Meeting helpers

`Meeting#chair` and `Meeting#secretary` look up the matching officer
and return the `Person`:

```ruby
meeting = Edoxen::Meeting.from_yaml(...)
meeting.chair       # => #<Edoxen::Person name: "Ms. Vance">
meeting.secretary   # => #<Edoxen::Person name: "Mr. Okafor">
meeting.officers_with_role(:treasurer)  # => [#<Officer ...>]
```

## Example

```yaml
officers:
  - role: chair
    person:
      name: Ms. Eleanor Vance
      kind: member
      affiliation: Acme Corporation Board
  - role: vice_chair
    person:
      name: Dr. Marcus Hale
  - role: secretary
    person:
      name: Mr. James Okafor
      kind: public_officer
      email: secretary@acme.com
  - role: treasurer
    person:
      name: Ms. Sofia Reyes
  - role: parliamentarian
    person:
      name: Mr. David Lin
    term_start: 2024-01-01
    term_end: 2025-12-31
```

## See also

- [Meeting Collection](/docs/meeting-collection) — officers attach to a Meeting.
- [Attendance & Votes](/docs/attendance) — officers are also tracked as attendees.
