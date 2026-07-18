---
title: Body Register
---

# BodyRegister

The authoritative register of [Bodies](/docs/body) — committees,
subcommittees, and working groups. Parallel to
[ContactRegister](/docs/contact-register) and
[VenueRegister](/docs/venue-register).

Other documents (Meeting, MeetingCollection) reference bodies via
`ref: urn:edoxen:body:{scope}:{local-id}` and resolve against the
matching BodyRegister.

```yaml
scope: oiml
title:
  - spelling: eng
    value: OIML Bodies
bodies:
  - code: CIML
    kind: committee
    name:
      - spelling: eng
        value: International Committee of Legal Metrology
      - spelling: fra
        value: Comité international de métrologie légale
  - code: TC18
    kind: technical_committee
    name:
      - spelling: eng
        value: 'TC 18 Instruments of measurement'
    parent_ref:
      urn: urn:edoxen:body:oiml:ciml
```

## Fields

| Field | Type | Description |
|---|---|---|
| `scope` | `String` | Registry scope (matches the scope segment in referencing URNs). |
| `title` | `LocalizedString[0..*]` | Display title (localized). |
| `bodies` | `Body[0..*]` | Registry members. |
| `extensions` | `MeetingExtension[0..*]` | Profile-specific extensions. |

## Lookup: matched by `code` or `ref`

Body has **no `urn` attribute** — a difference from Contact and Venue,
whose register members carry `urn`. `BodyRegister#find_by_urn` therefore
matches the requested value against a member's `code` **or** `ref`:

```ruby
register = Edoxen::BodyRegister.from_yaml(File.read("bodies.yaml"))

register.find_by_urn("CIML")
# => #<Edoxen::Body code="CIML" ...>   (matched on code)

register.find_by_urn("urn:edoxen:body:oiml:ciml")
# => matches a member whose ref is that URN
```

In practice, members are keyed by their short `code`; a member whose
canonical identity is a full URN carries it in `ref`.

## See also

- [Body](/docs/body) — member shape
- [Entity resolution](/docs/entity-resolution) — the three-tier pattern
- [Contact Register](/docs/contact-register) — parallel registry for Contacts
- [Venue Register](/docs/venue-register) — parallel registry for Venues
- [Localization](/docs/localization) — spelling codes
