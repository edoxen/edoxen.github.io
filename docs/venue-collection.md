---
title: Venue Collection
---

# VenueCollection

A registry of [Venues](/docs/venue) indexed by scoped URN. Mirrors
[ContactCollection](/docs/contact-collection).

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
collection = Edoxen::VenueCollection.from_yaml(File.read("venues.yaml"))
collection.find_by_urn("urn:edoxen:venue:isotc154:fairmont-house-hkma")
```

## See also

- [Venue](/docs/venue) — member shape
- [ContactCollection](/docs/contact-collection) — parallel registry for Contacts
- [Localization](/docs/localization) — spelling codes
