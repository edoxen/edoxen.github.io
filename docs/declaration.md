---
title: Declaration
---

# Declaration

A **Declaration** is a formal declaration made by one or more meeting
members during a meeting. It covers the two BS 0:2006 §7.6 declaration
types via the `kind` discriminator:

| Kind                  | Meaning                                                        |
|-----------------------|----------------------------------------------------------------|
| `conflict_of_interest`| A member declares a conflict of interest on a target.          |
| `ipr`                 | A member declares an IPR position (e.g. a patent) on a target. |

## IPR-specific fields

The `ipr_subject_ref` and `ipr_target_ref` fields are populated only
when `kind == "ipr"`. Both are typed `EntityRef` — validated
cross-references that resolve via URN, StructuredIdentifier, or
local_ref.

- `ipr_subject_ref` — the IPR item that applies (e.g. a patent
  declaration on a specific patent).
- `ipr_target_ref` — the published standard or work in progress that
  the IPR declaration applies to.

## Attachment points

- **`Meeting#declarations[]`** — per-meeting declarations.
- **`Topic#declarations[]`** — standing CoI/IPR positions on the
  topic (travel with the topic across meetings).

## Wire shape

```yaml
declarations:
  - kind: conflict_of_interest
    description:
      - spelling: eng
        value: "Member declares a conflict on agenda item 5.2."
    party:
      - kind: person
        name:
          - spelling: eng
            value:
              formatted: John Smith

  - kind: ipr
    description:
      - spelling: eng
        value: "Member declares a patent on clause 7."
    party:
      - kind: person
        name:
          - spelling: eng
            value:
              formatted: Jane Doe
    ipr_subject_ref:
      urn: urn:edoxen:ipr-subject:iso-patent-policy:2024
    ipr_target_ref:
      identifier:
        prefix: ISO
        number: "8601-1:2019"
```

## i18n

`description` is `LocalizedString[0..*]` — one entry per ISO 24229
spelling code. See [Localization](localization.md).

## Reference

- BS 0:2006 §7.6 — BSI committee minutes standard (source).
- [EntityRef](entity-ref.md) — typed cross-reference type.
