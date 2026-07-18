---
title: Schema reference
---

# Schema reference

Edoxen validates YAML data against JSON Schema (Draft 7) definitions.
There are two schema files — one for **Decision** data (formal
decisions adopted by meetings) and one for **Meeting** data (the
meetings themselves, including embedded agendas, minutes,
attendance, and votes). The decision-side schema also accepts
**ContactRegister**, **VenueRegister**, and **BodyRegister** as
top-level documents (the URN registry pattern); the meeting-side
schema accepts `MeetingCollection`, `Meeting`, and `MeetingSeries`.

## How localization works in 1.0

Every translatable field is `LocalizedString[0..*]` — an array of
`{ spelling, value }` pairs. `spelling` is an ISO 24229 code:

```yaml
title:
  - { spelling: eng,         value: "56th CIML Meeting" }
  - { spelling: fra,         value: "56e réunion du CIML" }
  - { spelling: zho-Hans,    value: "第56届CIML会议" }
```

This replaces the pre-1.0 pattern of a separate `localizations[]` array.
Each field carries its own language tags inline.

## Schema files

### Decision Collection

Validates `DecisionCollection` YAML files — the decision-grain data
that captures formal decisions (resolutions, orders, recommendations)
with per-field localization.

```yaml
metadata:
  title:
    - { spelling: eng, value: "Resolutions of the 17th OIML Conference" }
    - { spelling: fra, value: "Résolutions de la 17e Conférence" }
  dates:
    - { date: 2025-10-14, type: meeting }
  source_urls:
    - { ref: 'https://oiml.org/.../en.pdf', format: pdf, spelling: eng }
decisions:
  - identifier:
      - { prefix: OIML, number: '2025/1' }
    kind: resolution
    status: decided
    doi: 10.63493/resolutions/conf202501
    dates:
      - { date: 2025-10-14, type: adoption }
    title:
      - { spelling: eng, value: "Approval of the agenda" }
      - { spelling: fra, value: "Approbation de l'ordre du jour" }
    actions:
      - type: approves
        message:
          - { spelling: eng, value: "Approves the agenda." }
          - { spelling: fra, value: "Approuve l'ordre du jour." }
```

**Key invariants:**

- Every `DecisionCollection` must have a non-empty `decisions[]`.
- Every `Decision` must have `identifier[]` (1+).
- `kind` enum: `resolution | order | ruling | determination | recommendation | statement | finding | opinion | other`.
- `status` enum: `draft | proposed | under_consideration | decided | negatived | withdrawn | deferred`.
- Per-field localization: `title`, `subject`, `message`, `considering` are each `LocalizedString[0..*]`.
- `Action.type` and `Consideration.type` are open `String` (permissive — extensible per body).
- `additionalProperties: false` on every object.

Download: [decision-collection.yaml](/schemas/decision-collection.yaml)
([source](https://github.com/edoxen/edoxen-model/blob/main/schema/decision-collection.yaml)).

### Meeting / MeetingCollection

Validates `Meeting` or `MeetingCollection` YAML — the full lifecycle:
venue, officers, agenda, components, attendance, minutes, decisions,
motions, votings.

```yaml
identifier:
  - { prefix: CIML, number: '56' }
urn: urn:oiml:ciml:meeting:ciml-56
type: plenary
status: completed
visibility: public
date_range:
  start: 2025-10-13
  end: 2025-10-17
title:
  - { spelling: eng, value: "56th CIML Meeting" }
  - { spelling: fra, value: "56e réunion du CIML" }
venues:
  - kind: physical
    name: Hotel Mercure Paris Montmartre
    unlocode: FRPAR
    country_code: FR
officers:
  - role: chair
    person:
      name: { formatted: "Roman Schwartz" }
agenda:
  status: final
  items:
    - { label: '1', kind: opening, title: "Opening of the meeting" }
    - { label: '4.2', kind: numbered, title: "Budget for 2027-2028" }
decisions:
  - identifier:
      - { prefix: OIML, number: '2025/4' }
    kind: resolution
    status: decided
    title:
      - { spelling: eng, value: "Budget adoption" }
    actions:
      - type: decides
        message:
          - { spelling: eng, value: "The Committee decides to adopt the budget." }
```

**Key invariants:**

- `type` enum: 17 values (`plenary`, `working_group`, …, `other`).
- `status` enum: `upcoming | completed | cancelled`.
- `venue.kind`: `physical | virtual` (polymorphic — physical fields
  and virtual fields coexist; validators enforce kind-consistency).
- `officer.role` enum: `chair | vice_chair | secretary | … | other`.
- `attendance.status` enum: `present | absent | apologies | observer | excused`.
- `agenda.items[].kind` enum: `numbered | unnumbered | header | opening | closing`.
- `agenda.items[].outcome` enum: `discussed | resolved | deferred | adopted | withdrawn`.
- Per-field localization: `title`, `generalArea`, `practicalInfo`, `note` are each `LocalizedString[0..*]`.

Download: [meeting.yaml](/schemas/meeting.yaml)
([source](https://github.com/edoxen/edoxen-model/blob/main/schema/meeting.yaml)).

### Contact Register

Validates `ContactRegister` — a registry of Contacts indexed by
scoped URN. See [Contact Register](/docs/contact-register).

```yaml
scope: oiml
title:
  - { spelling: eng, value: "OIML Contacts Registry" }
contacts:
  - urn: urn:edoxen:contact:oiml:ciml-president
    name: { formatted: "Roman Schwartz" }
    kind: person
    role: chair
    contact_methods:
      - { kind: email, value: "r schwartz@ptb.de", primary: true }
    identifiers:
      - { kind: orcid, value: "0000-0002-1234-5678" }
```

### Venue Register

Validates `VenueRegister` — a registry of Venues indexed by scoped URN.
See [Venue Register](/docs/venue-register).

```yaml
scope: oiml
title:
  - { spelling: eng, value: "OIML Venues Registry" }
venues:
  - urn: urn:edoxen:venue:oiml:hotel-mercure-paris
    kind: physical
    name: Hotel Mercure Paris Montmartre
    unlocode: FRPAR
    country_code: FR
    address: 3 Rue Caulaincourt, 75018 Paris, France
```

### Body Register

Validates `BodyRegister` — a registry of Bodies (committees, working
groups). Members are matched by `code` or `ref` — Body has no `urn`
field. See [Body Register](/docs/body-register).

```yaml
scope: oiml
title:
  - { spelling: eng, value: "OIML Bodies" }
bodies:
  - code: CIML
    kind: committee
    name:
      - { spelling: eng, value: "International Committee of Legal Metrology" }
```

### URN reference pattern

Entity-typed fields (Contact, Venue, Body) follow the three-tier
[entity resolution](/docs/entity-resolution) pattern: inline data
(full object), a document-scoped reference (`{ local_ref: ... }`), or
a register URN reference (`{ ref: urn:edoxen:... }`):

```yaml
# Inline
contact:
  name: { formatted: "Roman Schwartz" }

# Document-scoped (resolves against this document's contacts[])
contact:
  local_ref: urn:edoxen:contact:oiml:ciml-president

# Register reference (resolves against a ContactRegister)
contact:
  ref: urn:edoxen:contact:oiml:ciml-president
```

## Using the schemas

### CLI

```sh
edoxen validate decisions/*.yaml
edoxen validate-meetings meetings/*.yaml
```

### Ruby

```ruby
require 'json_schemer'
require 'yaml'

schema = YAML.safe_load(File.read('schema/decision-collection.yaml'))
schemer = JSONSchemer.schema(schema)

data = YAML.safe_load(File.read('decisions/ciml-56.yaml'))
errors = schemer.validate(data).to_a
puts errors.empty? ? 'VALID' : errors.map { |e| e['data_pointer'] }
```

### Any JSON Schema validator

The schema files are standard JSON Schema (Draft 7). Use `ajv`,
`python-jsonschema`, or any compliant validator.

## See also

- [Architecture](/docs/architecture) — the information model overview
- [Localization](/docs/localization) — the per-field localization pattern
- [Contact Register](/docs/contact-register) — the URN registry pattern
- [Venue Register](/docs/venue-register) — venue registries
- [Body Register](/docs/body-register) — body registries
- [Entity resolution](/docs/entity-resolution) — the three-tier reference pattern
- [Migration guide](/docs/migration) — breaking changes guide
