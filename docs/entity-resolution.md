---
title: Entity resolution
---

# Entity resolution

[Contact](/docs/contact), [Venue](/docs/venue), and
[Body](/docs/body) share a **three-tier resolution pattern**. Wherever
one of these entities appears (a meeting's chair, a component's venue,
a meeting's committee), the field holds either the data itself or a
reference to where the data lives:

| Tier | Discriminator | Resolves against |
|---|---|---|
| **1. Inline** | neither `ref` nor `local_ref` set | the entity itself — it IS the data |
| **2. Document-scoped** | `local_ref` set | the containing document's scoped collection (`Meeting#contacts[]`, `Meeting#venues[]`, `Meeting#bodies[]`) |
| **3. Global register** | `ref` set | the top-level register document ([ContactRegister](/docs/contact-register), [VenueRegister](/docs/venue-register), [BodyRegister](/docs/body-register)) |

The `reference?` predicate on each entity is true when `ref` **or**
`local_ref` is set. When either is set, the other fields are ignored.

```yaml
# Tier 1 — inline
contact:
  kind: person
  name:
    - spelling: eng
      value: { formatted: Dr. Anaya Müller }

# Tier 2 — document-scoped: local_ref matches the urn of an entry in
# this same Meeting's contacts[] collection
contact: { local_ref: urn:edoxen:contact:isotc154:anaya-muller }
contacts:
  - urn: urn:edoxen:contact:isotc154:anaya-muller
    kind: person
    name:
      - spelling: eng
        value: { formatted: Dr. Anaya Müller }

# Tier 3 — global register: ref resolves against a ContactRegister
# document (a separate file, shared across meetings)
contact: { ref: urn:edoxen:contact:isotc154:anaya-muller }
```

Tier 2 keeps repeated people/places/bodies DRY *within* one file;
tier 3 shares them *across* files via a published register.

## Matching keys

- **Contact / Venue** — scoped-collection members are matched on their
  `urn`; register members are matched on `urn` (`find_by_urn`).
- **Body** — has no `urn` attribute. Scoped members are matched on
  `code`; `BodyRegister#find_by_urn` matches a member's `code` **or**
  `ref`. See [Body Register](/docs/body-register#lookup-matched-by-code-or-ref).

> **Note:** `local_ref` here is an entity-resolution pointer on
> Contact/Venue/Body. The [EntityRef](/docs/entity-ref) type also has a
> `local_ref` field — a within-file pointer between structural entities
> (e.g. to an agenda item). Same name, different mechanism.

## `Edoxen::EntityResolver`

The gem ships a service that walks the tier hierarchy for you. It is
**pure** — no mutation — and returns the resolved entity or `nil` when
a reference matches nothing.

```ruby
resolver = Edoxen::EntityResolver.new(
  scoped:    { Edoxen::Contact => meeting.contacts },
  registers: { Edoxen::Contact => contact_register },
)

# One entity — inline entities pass through unchanged
resolver.resolve(meeting.contact)
# => #<Edoxen::Contact ...> (or nil if the reference doesn't resolve)

# A mixed list of inline and referenced entities
resolver.resolve_all(meeting.attendance.map(&:person))
```

Resolution order inside `resolve`:

1. `reference?` false → return the entity as-is (tier 1).
2. `local_ref` set → look up in the scoped collection registered for
   the entity's class, matching member `urn` against `local_ref`
   (tier 2).
3. `ref` set → look up in the global register registered for the
   entity's class via `find_by_urn` (tier 3).
4. No match → `nil`.

Both the `scoped:` and `registers:` hashes are keyed by entity class
(`Edoxen::Contact`, `Edoxen::Venue`, `Edoxen::Body`; a subclass such as
`Edoxen::Person` falls back to its superclass's entry), so one resolver
instance can serve all three entity types:

```ruby
resolver = Edoxen::EntityResolver.new(
  scoped: {
    Edoxen::Contact => meeting.contacts,
    Edoxen::Venue   => meeting.venues,
    Edoxen::Body    => meeting.bodies,
  },
  registers: {
    Edoxen::Contact => contact_register,
    Edoxen::Venue   => venue_register,
    Edoxen::Body    => body_register,
  },
)
```

## See also

- [Contact](/docs/contact) / [Venue](/docs/venue) / [Body](/docs/body) — the resolvable entities
- [Contact Register](/docs/contact-register) / [Venue Register](/docs/venue-register) / [Body Register](/docs/body-register) — the tier-3 registers
- [EntityRef](/docs/entity-ref) — typed cross-references between structural entities (Motion → Decision, etc.)
