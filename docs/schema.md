---
title: Schema reference
---

# Schema reference

Edoxen validates YAML data against JSON Schema (Draft 7) definitions.
There are two schema files — one for **Decision** data (formal
decisions adopted by meetings) and one for **Meeting** data (the
meetings themselves, including embedded agendas, minutes,
attendance, and votes).

## Schema files

### Decision Collection

Validates `DecisionCollection` YAML files — the resolution-grain data
that captures formal decisions (resolutions, orders, recommendations)
and their per-language localizations.

```yaml
# Root type: DecisionCollection
metadata:
  title: Resolutions of the 17th OIML Conference
  dates:
    - { date: 2025-10-14, type: meeting }
  source_urls:
    - { ref: 'https://oiml.org/…/english.pdf', format: pdf, language_code: eng }
decisions:
  - identifier:
      - { prefix: OIML, number: '2025/1' }
    kind: resolution
    status: decided
    doi: 10.63493/resolutions/conf202501
    dates:
      - { date: 2025-10-14, type: adoption }
    localizations:
      - language_code: eng
        script: Latn
        title: Approval of the agenda
        actions:
          - type: approves
            message: Approves the agenda for the 17th International Conference.
```

**Key invariants enforced:**

- Every `DecisionCollection` must have a non-empty `decisions[]`.
- Every `Decision` must have `identifier[]` (1+) and `localizations[]` (1+).
- `language_code` matches `^[a-z]{3}$` (ISO 639-3).
- `script` matches `^[A-Z][a-z]{3}$` (ISO 15924).
- `kind` is one of `resolution | order | ruling | determination | recommendation | statement | finding | opinion | other`.
- `status` is one of `draft | proposed | under_consideration | decided | negatived | withdrawn | deferred`.
- `additionalProperties: false` on every object — typos surface as errors.

Download the full schema: [decision-collection.yaml](/schemas/decision-collection.yaml)
([source in model repo](https://github.com/edoxen/edoxen-model/blob/main/schema/decision-collection.yaml)).

### Meeting / MeetingCollection

Validates `Meeting` or `MeetingCollection` YAML files — the
meeting-grain data that captures the full lifecycle: venue, officers,
agenda, schedule, deadlines, attendance, minutes, decisions, motions,
votings, and per-language localizations.

```yaml
# Root type: Meeting (single) or MeetingCollection (wrapper)
identifier:
  - { prefix: CIML, number: '56' }
urn: urn:oiml:ciml:meeting:ciml-56
type: plenary
status: completed
date_range:
  start: 2025-10-13
  end: 2025-10-17
venues:
  - kind: physical
    name: Hotel Mercure Paris Montmartre
    unlocode: FRPAR
    country_code: FR
officers:
  - role: chair
    person:
      name: Roman Schwartz
agenda:
  status: final
  items:
    - { label: '1', kind: opening, title: Opening of the meeting }
    - { label: '4.2', kind: numbered, title: Budget for 2027-2028 }
attendance:
  - person: { name: Dr. Anaya Muller }
    status: present
decisions:
  - identifier:
      - { prefix: OIML, number: '2025/4' }
    kind: resolution
    status: decided
    localizations:
      - language_code: eng
        title: Budget adoption
        actions:
          - type: decides
            message: The Committee decides to adopt the budget.
```

**Key invariants enforced:**

- `type` is one of 17 values (`plenary`, `working_group`, ..., `other`).
- `status` is one of `upcoming | completed | cancelled`.
- `venue.kind` is `physical | virtual` (polymorphic dispatch).
- `officer.role` is one of `chair | vice_chair | secretary | ... | other`.
- `attendance.status` is one of `present | absent | apologies | observer | excused`.
- `agenda.status` is one of `draft | final | amended | cancelled | superseded`.
- `agenda.items[].kind` is one of `numbered | unnumbered | header | opening | closing`.
- `agenda.items[].outcome` is one of `discussed | resolved | deferred | adopted | withdrawn`.
- `additionalProperties: false` on every object.

Download the full schema: [meeting.yaml](/schemas/meeting.yaml)
([source in model repo](https://github.com/edoxen/edoxen-model/blob/main/schema/meeting.yaml)).

### Agenda (embedded in Meeting)

The `Agenda` is not a standalone schema — it is a child of `Meeting`.
But adopters who work with agenda-only data can validate the `agenda`
section in isolation by referencing the `Agenda` and `AgendaItem`
definitions from the meeting schema.

```yaml
# An Agenda in isolation (extracted from a Meeting)
status: final
source_doc: https://oiml.org/.../56-ciml-agenda.pdf
items:
  - { label: '1',   kind: opening,  title: Opening of the meeting,  outcome: adopted }
  - { label: '2',   kind: numbered, title: Approval of the agenda,  outcome: adopted }
  - { label: '4.2', kind: numbered, title: Budget for 2027-2028,    outcome: resolved }
```

**Key invariants:**

- `status` enum: `draft | final | amended | cancelled | superseded`.
- `items[].kind` enum: `numbered | unnumbered | header | opening | closing`.
- `items[].outcome` enum: `discussed | resolved | deferred | adopted | withdrawn`.
- `items[].decision_ref` links to the Decision adopted on this item.

## Using the schemas

### From Ruby

```ruby
require 'json_schemer'
require 'yaml'

schema = YAML.safe_load(File.read('schema/decision-collection.yaml'))
schemer = JSONSchemer.schema(schema)

data = YAML.safe_load(File.read('decisions/ciml-56.yaml'))
errors = schemer.validate(data).to_a
puts errors.empty? ? 'VALID' : errors.map { |e| e['data_pointer'] }
```

### From the CLI

```sh
# Validate decisions
edoxen validate decisions/*.yaml

# Validate meetings (including embedded agendas)
edoxen validate-meetings meetings/*.yaml
```

### From any JSON Schema validator

The schema files are standard JSON Schema (Draft 7). Use `ajv`,
`python-jsonschema`, or any compliant validator.

## Schema extension points

To customize Edoxen for your organization, fork the schema and
either:

- Extend any enum (add a `MeetingType`, `DecisionKind`, etc.).
- Add custom `metadata.*` fields (and drop `additionalProperties: false`
  on the metadata object).
- Use the `MeetingExtension` slot on every entity for profile-specific
  attributes.

## See also

- [Architecture](/docs/architecture) — the information model overview
- [Decision Collection](/docs/decision-collection) — entity reference
- [Meeting Collection](/docs/meeting-collection) — entity reference
- [Agenda](/docs/agenda) — entity reference
- [Migration v1 to v2](/docs/migration-v2) — breaking changes guide
