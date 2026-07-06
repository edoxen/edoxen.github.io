---
title: Contact
---

# Contact

A **Contact** is a VCARD-like abstract contact — generalises `Person`
for cases where the contact may be an individual, an organisation, a
department, a role ("Secretariat"), or any other entity that has a
name and one or more communication channels.

`Person` inherits from `Contact`, adding no fields of its own. The old
`Person.email`, `Person.phone`, and `Person.orcid` fields are replaced
by entries in `contactMethods[]` and `identifiers[]` (inherited from
Contact). This is an OCP refactor — new communication channels and
identifier schemes are added via enums without model changes.

```yaml
contact:
  name:
    formatted: Dr. Anaya Müller
    family: Müller
    given: Anaya
    prefix: Dr.
  kind: person
  role: local_organizer
  affiliation: PTB (Germany)
  contact_methods:
    - { kind: email, value: a.muller@ptb.de, primary: true }
    - { kind: phone, value: '+49 30 3481 0', label: Office }
  identifiers:
    - { kind: orcid, value: '0000-0002-1234-5678' }
  address: Abbestrabe 2-12, 10587 Berlin, Germany
```

## Fields

| Field | Type | Description |
|---|---|---|
| `name` | `Name` | Structured personal/organisational name (see below). |
| `kind` | `String` | What kind of contact: `person`, `organisation`, `department`, `role`, etc. Free-form — bodies extend via extensions. |
| `role` | `String` | The contact's role in context: `local_organizer`, `secretariat`, `liaison`, etc. |
| `title` | `String` | Honorific or job title (e.g., "Director", "CIML President"). |
| `affiliation` | `String` | Organisation the contact represents. |
| `contact_methods` | `ContactMethod[0..*]` | Communication channels — phone, email, fax, etc. (see below). |
| `identifiers` | `ContactIdentifier[0..*]` | External identifiers — ORCID, ISNI, Wikidata QID, etc. (see below). |
| `address` | `String` | Postal address (free text). |
| `extensions` | `MeetingExtension[0..*]` | Profile-specific attributes. |

## Name

Structured personal/organisational name. VCARD conventions (RFC 6350):
separate structured components (N) from a pre-formatted display string (FN).

| Field | Type | Description |
|---|---|---|
| `formatted` | `String` | Pre-built display string ("Dr. Anaya Müller"). |
| `family` | `String` | Family/last name. |
| `given` | `String` | Given/first name. |
| `additional` | `String` | Middle name(s) or additional name components. |
| `prefix` | `String` | Honorific prefix ("Dr.", "Prof.", "Hon."). |
| `suffix` | `String` | Name suffix ("Jr.", "III", "PhD"). |

Either `formatted` or the structured fields may be set — or both.

## ContactMethod

One polymorphic communication channel.

| Field | Type | Description |
|---|---|---|
| `kind` | `ContactMethodKind` | `phone`, `mobile`, `fax`, `email`, `url`, `mail`, `pager`, `message`, `other`. |
| `value` | `String` | The address or number. |
| `label` | `String` | Display hint ("Office", "Front desk", "After hours"). |
| `primary` | `Boolean` | True if this is the preferred channel. |

## ContactIdentifier

One polymorphic external identifier.

| Field | Type | Description |
|---|---|---|
| `kind` | `ContactIdentifierKind` | `orcid`, `isni`, `wikidata`, `ror`, `ringgold`, `github`, `other`. |
| `value` | `String` | The identifier value (e.g., ORCID `0000-0002-1234-5678`). |

## Where Contact is used

| Entity | Field | Context |
|---|---|---|
| `Meeting` | `contact` | General contact for the meeting (replaces the old `localContact`). |
| `Officer` | `person` (type: Contact/Person) | Chair, secretary, etc. |
| `Attendance` | `person` (type: Contact/Person) | Who attended. |
| `VoteRecord` | `person` (type: Contact/Person) | Who voted. |
| `HostRef` | `contact` | Host organisation's contact point. |
| `MeetingSeries` | `organizer` (type: Contact/Person) | Series organiser. |

## See also

- [Meeting Collection](/docs/meeting-collection) — Meeting.contact field
- [Officer](/docs/officer) — Officer.person is a Contact (or Person, which inherits)
- [MeetingExtension](/docs/extension) — profile-specific extensions on Contact
