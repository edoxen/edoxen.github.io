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

In **v3.0**, every translatable field on Contact (`name`, `title`,
`affiliation`, `address`) is `Localized<String/Name>[0..*]` — each
entry carries its own ISO 24229 `spelling` code. The same Contact can
carry their name in their native script (`zho-Hans`) and a romanized
form (`acadsin:zho-Hani:Latn:2002`) as parallel entries.

```yaml
contact:
  urn: urn:edoxen:contact:isotc154:anaya-muller
  kind: person
  role: local_organizer
  name:
    - spelling: deu-Latn
      value:
        formatted: Dr. Anaya Müller
        family: Müller
        given: Anaya
        prefix: Dr.
  affiliation:
    - spelling: deu-Latn
      value: PTB (Germany)
  contact_methods:
    - { kind: email, value: a.muller@ptb.de, primary: true }
    - { kind: phone, value: '+49 30 3481 0', label: Office }
  identifiers:
    - { kind: orcid, value: '0000-0002-1234-5678' }
  address:
    - spelling: deu-Latn
      value: Abbestrabe 2-12, 10587 Berlin, Germany
```

## Reference vs inline

A Contact field may be either **inline** (full data, as above) or a
**URN reference** to a Contact stored in a
[ContactCollection](/docs/contact-collection):

```yaml
chair:
  ref: urn:edoxen:contact:isotc154:anaya-muller
```

The `ref` field discriminates. When set, other fields are ignored.

## Fields

| Field | Type | Description |
|---|---|---|
| `ref` | `String` | URN reference (alternative to inline data). |
| `urn` | `String` | This contact's registry URN (`urn:edoxen:contact:{scope}:{id}`). |
| `name` | `LocalizedName[0..*]` | Localized structured name (see below). |
| `kind` | `String` | What kind of contact: `person`, `organisation`, `department`, `role`, etc. Free-form. |
| `role` | `String` | The contact's role in context: `local_organizer`, `secretariat`, `liaison`, etc. |
| `title` | `LocalizedString[0..*]` | Honorific or job title (localized). |
| `affiliation` | `LocalizedString[0..*]` | Organisation the contact represents (localized). |
| `contact_methods` | `ContactMethod[0..*]` | Communication channels (NOT localized — phone numbers are language-neutral). |
| `identifiers` | `ContactIdentifier[0..*]` | External identifiers (NOT localized — ORCID is language-neutral). |
| `address` | `LocalizedString[0..*]` | Postal address (localized). |
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

## Localized entries

Per-field localized values use a single `spelling` code per entry. The
`spelling` field is an ISO 24229 code — either a *spelling system*
(`{lang}-{script}[-{country}][-{extension}]`, e.g. `zho-Hans`) or a
*conversion system* (`{authority}:{source-spelling}:{target-spelling}:{identifying}`,
e.g. `acadsin:zho-Hani:Latn:2002`). See [Localization](/docs/localization)
for the full format.

## Where Contact is used

| Entity | Field | Context |
|---|---|---|
| `Meeting` | `contact` | General contact for the meeting. |
| `Officer` | `person` (type: Contact/Person) | Chair, secretary, etc. |
| `Attendance` | `person` (type: Contact/Person) | Who attended. |
| `VoteRecord` | `person` (type: Contact/Person) | Who voted. |
| `HostRef` | `contact` | Host organisation's contact point. |
| `MeetingSeries` | `contact` | Series contact (role discriminator on the Contact). |

## See also

- [ContactCollection](/docs/contact-collection) — scoped URN registry of Contacts
- [Localization](/docs/localization) — how per-field localization works
- [Officer](/docs/officer) — Officer.person is a Contact
- [MeetingExtension](/docs/extension) — profile-specific extensions
