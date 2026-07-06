---
title: EntityRef
---

# EntityRef

An **EntityRef** is a typed cross-reference between entities. It replaces
the bare `String` cross-references used in v2.0 for URN/identifier joins
(e.g., `Motion.resultingDecision`, `Decision.aboutTopics`, etc.).

Single identity: exactly one of `urn`, `identifier`, or `local_ref`
should be set. The Ruby class's `#valid?` and `#resolved_identity`
enforce / pick whichever is set.

```yaml
# Motion → Decision (the decision adopted when the motion carried)
resulting_decision_ref:
  urn: urn:oiml:doc:ciml:decision:2025-4
  kind: resulting
  role: outcome

# Topic → Motion (a motion raised on this topic)
motion_refs:
  - identifier: { prefix: CIML, number: '2025-M01' }
    kind: raised_on
    role: procedural

# Within-file reference (e.g., to an agenda item in the same file)
local_ref: agenda-item-4.2
```

## Fields

| Field | Type | Description |
|---|---|---|
| `urn` | `String` | Canonical URN (`urn:oiml:doc:…`). Format-validated. |
| `identifier` | `StructuredIdentifier` | Alternative — `{prefix, number}` pair. |
| `local_ref` | `String` | Within-file reference (e.g., `agenda-item-4.2`). |
| `kind` | `String` | Discriminator for the reference's purpose within its profile (e.g., `resulting`, `brought_by`, `votes_on`). |
| `role` | `String` | Semantic role of the reference (e.g., `outcome`, `source`). |
| `note` | `String` | Free-form annotation. |

**At least one** of `urn`, `identifier`, or `local_ref` must be set.

## Why EntityRef replaces bare String

In v2.0, cross-entity references used bare `String` fields:

```yaml
# v2.0 — String-typed (no type safety, no URN validation, no metadata)
resulting_decision: urn:oiml:doc:ciml:decision:2025-4
```

With EntityRef:

```yaml
# v2.2+ — typed (URN format validated, identity scheme explicit, metadata carried)
resulting_decision_ref:
  urn: urn:oiml:doc:ciml:decision:2025-4
  kind: resulting
  role: outcome
```

## Migration path

EntityRef fields are being introduced alongside the existing String
fields (non-breaking). The String fields will be removed in v3.0.

| v2.0 String field | v2.2+ EntityRef field |
|---|---|
| `Motion.resultingDecision: String` | `Motion.resultingDecisionRef: EntityRef` |
| `Decision.broughtByMotions: String[]` | `Decision.broughtByMotionRefs: EntityRef[]` (planned) |
| `Meeting.seriesRef: String` | `Meeting.seriesRefEntity: EntityRef` (planned) |

## See also

- [Structured Identifier](/docs/structured-identifier) — the `{prefix, number}` type used in `identifier`
- [Motion](/docs/motion) — pilot entity for EntityRef
- [Architecture](/docs/architecture) — cross-grain pointer overview
