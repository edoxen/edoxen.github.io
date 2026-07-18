---
title: Contact Register
---

# ContactRegister

A registry of [Contacts](/docs/contact) indexed by scoped URN. Members
carry `urn: urn:edoxen:contact:{scope}:{local-id}`; the register's
`scope` MUST match the scope segment in member URNs.

Other documents (Meeting, MeetingComponent, HostRef, etc.) reference
contacts via `ref: urn:edoxen:contact:{scope}:{local-id}` and resolve
against the matching ContactRegister. See
[Entity resolution](/docs/entity-resolution) for the full three-tier
pattern (inline / document-scoped / register).

```yaml
scope: isotc154
title:
  - spelling: eng
    value: ISO/TC 154 Contacts
contacts:
  - urn: urn:edoxen:contact:isotc154:jianfang-zhang
    kind: person
    role: secretary
    name:
      - spelling: zho-Hans
        value: { formatted: 张建方, family: 张, given: 建方 }
      - spelling: eng
        value: { formatted: Jianfang Zhang }
    contact_methods:
      - { kind: email, value: zhangjf@cnis.gov.cn }
  - urn: urn:edoxen:contact:isotc154:roman-schwartz
    kind: person
    name:
      - spelling: eng
        value: { formatted: Roman Schwartz }
```

## Fields

| Field | Type | Description |
|---|---|---|
| `scope` | `String` | Registry scope (matches URN scope segment on members). |
| `title` | `LocalizedString[0..*]` | Display title (localized). |
| `contacts` | `Contact[0..*]` | Registry members. |
| `extensions` | `MeetingExtension[0..*]` | Profile-specific extensions. |

## Storage patterns

A ContactRegister can be stored as:

1. **Single YAML file** — typical for small registries (10–1000 contacts).
2. **YAML Stream** — one Contact per document, separated by `---`,
   for large registries that need partial updates. Glossarist-style.

Stream loading is a service-layer concern (file-system I/O); the model
owns only the (de)serialisation of one register.

## Ruby helpers

```ruby
register = Edoxen::ContactRegister.from_yaml(File.read("contacts.yaml"))
register.find_by_urn("urn:edoxen:contact:isotc154:jianfang-zhang")
# => #<Edoxen::Contact urn=... name=[...]>
```

## See also

- [Contact](/docs/contact) — member shape
- [Entity resolution](/docs/entity-resolution) — how `ref` / `local_ref` / inline resolve
- [Venue Register](/docs/venue-register) — parallel registry for Venues
- [Body Register](/docs/body-register) — parallel registry for Bodies
- [Localization](/docs/localization) — spelling codes
