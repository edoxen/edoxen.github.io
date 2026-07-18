---
title: Body
---

# Body

A **Body** is a committee, subcommittee, working group, or other
organised body that owns meetings and decisions. It carries a short
`code` (e.g. `ISO/TC 154`, `CIML`) and a localised full name.

Body replaces the bare `String` previously used for
`Meeting.committee` and `Meeting.committee_group` — those fields are
now typed `Body`, so a committee can carry its own localised name,
kind, and parent body instead of a label.

```yaml
# Inline — the Body carries full data
committee:
  code: CIML
  kind: committee
  name:
    - spelling: eng
      value: International Committee of Legal Metrology
    - spelling: fra
      value: Comité international de métrologie légale
```

## Reference vs inline

Like [Contact](/docs/contact) and [Venue](/docs/venue), a Body field
follows the three-tier [entity resolution](/docs/entity-resolution)
pattern:

```yaml
# 1. Inline — full data, neither ref nor local_ref set (above)

# 2. Document-scoped — local_ref matches the code of a Body in the
#    same document's bodies[] collection (e.g. Meeting#bodies)
committee: { local_ref: CIML }
bodies:
  - code: CIML
    name:
      - spelling: eng
        value: International Committee of Legal Metrology

# 3. Global register — ref resolves against a BodyRegister
committee: { ref: urn:edoxen:body:oiml:ciml }
```

The `reference?` predicate is true when `ref` **or** `local_ref` is
set; when either is set, other fields are ignored.

Unlike Contact and Venue, **Body has no `urn` attribute** — a Body is
identified by its `code` (or by a full URN carried in `ref`). See
[Body Register](/docs/body-register) for how lookups match.

## Fields

| Field | Type | Description |
|---|---|---|
| `ref` | `String` | URN reference into a [BodyRegister](/docs/body-register) (alternative to inline data). |
| `local_ref` | `String` | Document-scoped reference — matches the `code` of an entry in the document's own `bodies[]`. |
| `code` | `String` | Short code of the body (`CIML`, `ISO/TC 154`). |
| `name` | `LocalizedString[0..*]` | Localized full name. |
| `kind` | `String` | What kind of body: `committee`, `subcommittee`, `working_group`, etc. Free-form. |
| `parent_ref` | `EntityRef` | The parent body (e.g. a working group's parent committee). |
| `extensions` | `MeetingExtension[0..*]` | Profile-specific attributes. |

## Where Body is used

| Entity | Field | Context |
|---|---|---|
| `Meeting` | `committee` | Owning committee. |
| `Meeting` | `committee_group` | Sub-committee / working group. |
| `Meeting` | `bodies[]` | Document-scoped bodies for `local_ref` resolution. |
| `BodyRegister` | `bodies[]` | Registry members. |
| `Body` | `parent_ref` | Parent body (as an EntityRef). |

## See also

- [Body Register](/docs/body-register) — scoped registry of Bodies
- [Entity resolution](/docs/entity-resolution) — the three-tier pattern
- [Contact](/docs/contact) / [Venue](/docs/venue) — the parallel resolvable entities
- [EntityRef](/docs/entity-ref) — the `parent_ref` type
- [Meeting Collection](/docs/meeting-collection) — where `committee` and `bodies[]` attach
