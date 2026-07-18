---
title: Venue Register
---

# VenueRegister

A registry of [Venues](/docs/venue) indexed by scoped URN. Mirrors
[ContactRegister](/docs/contact-register).

Members carry `urn: urn:edoxen:venue:{scope}:{local-id}`; the
register's `scope` MUST match the scope segment in member URNs. See
[Entity resolution](/docs/entity-resolution) for how `ref` /
`local_ref` / inline venues resolve.

```yaml
scope: isotc154
title:
  - spelling: eng
    value: ISO/TC 154 Meeting Venues
venues:
  - urn: urn:edoxen:venue:isotc154:fairmont-house-hkma
    kind: physical
    name:
      - spelling: eng
        value: Fairmont House (HKMA)
    address:
      - spelling: eng
        value: |
          14/F, Fairmont House, 8 Cotton Tree Drive
          Central, Hong Kong, China
    country_code: HK
    unlocode: HKHKG
```

## Fields

| Field | Type | Description |
|---|---|---|
| `scope` | `String` | Registry scope (matches URN scope segment on members). |
| `title` | `LocalizedString[0..*]` | Display title (localized). |
| `venues` | `Venue[0..*]` | Registry members. |
| `extensions` | `MeetingExtension[0..*]` | Profile-specific extensions. |

## Ruby helpers

```ruby
register = Edoxen::VenueRegister.from_yaml(File.read("venues.yaml"))
register.find_by_urn("urn:edoxen:venue:isotc154:fairmont-house-hkma")
```

## See also

- [Venue](/docs/venue) — member shape
- [Entity resolution](/docs/entity-resolution) — how `ref` / `local_ref` / inline resolve
- [Contact Register](/docs/contact-register) — parallel registry for Contacts
- [Body Register](/docs/body-register) — parallel registry for Bodies
- [Localization](/docs/localization) — spelling codes
