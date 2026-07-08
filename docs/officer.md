---
title: Officer
---

# Officer

An **Officer** is a person (or role-bound Contact) holding a structural
role in a [Meeting](/docs/meeting-collection) or
[MeetingComponent](/docs/meeting-component): chair, secretary,
treasurer, parliamentarian, etc. The list of officers is open —
adopters may add new role values via the `OfficerRole` enum's `other`
discriminator.

This replaces legacy `Meeting.chair` and `Meeting.secretary` direct
shortcuts. One list, role discriminates.

## Fields

| Field | Type | Description |
|---|---|---|
| `role` | `OfficerRole` | `chair`, `vice_chair`, `deputy_chair`, `secretary`, `treasurer`, `parliamentarian`, `presiding_officer`, `sergeant_at_arms`, `other`. |
| `person` | `Contact` (or `Person`) | The officer. May be inline data or a `{ ref: urn:... }` URN reference. |
| `term_start` | `Date` | When their term began. |
| `term_end` | `Date` | When their term ends. |
| `extensions` | `MeetingExtension[0..*]` | Profile-specific extensions. |

`#current?(date = Date.today)` is true when `date` falls inside the term
window (or when no term is set).

## Meeting / Component helpers

Both `Meeting#chair` and `MeetingComponent#chair` look up the matching
officer and return the `Contact`:

```ruby
meeting = Edoxen::Meeting.from_yaml(...)
meeting.chair                       # => #<Edoxen::Person name=[...]>
meeting.secretary                   # => #<Edoxen::Person name=[...]>
meeting.officers_with_role(:treasurer)  # => [#<Officer ...>]

component = meeting.components.first
component.chair                     # => #<Edoxen::Person name=[...]>
```

## Example (1.0)

```yaml
officers:
  - role: chair
    person:
      ref: urn:edoxen:contact:isotc154:eleanor-vance
  - role: vice_chair
    person:
      name:
        - spelling: eng
          value: { formatted: Dr. Marcus Hale }
  - role: secretary
    person:
      name:
        - spelling: eng
          value: { formatted: Mr. James Okafor }
      contact_methods:
        - { kind: email, value: secretary@acme.com }
  - role: parliamentarian
    person:
      name:
        - spelling: eng
          value: { formatted: Mr. David Lin }
    term_start: 2024-01-01
    term_end: 2025-12-31
```

## See also

- [Meeting Collection](/docs/meeting-collection) — officers attach to a Meeting
- [MeetingComponent](/docs/meeting-component) — officers attach to a component
- [Contact](/docs/contact) — Officer.person type
- [ContactCollection](/docs/contact-collection) — registry for URN references
