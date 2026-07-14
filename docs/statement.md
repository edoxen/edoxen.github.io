---
title: Statement
---

# Statement

A **Statement** is one remark made by one or more meeting members on
a topic or a minutes section. It carries a per-field Localized
description and a list of members (Person references) who made the
statement.

The `kind` discriminator separates the three BS 0:2006 §7.6 statement
types:

| Kind          | Meaning                                                       |
|---------------|---------------------------------------------------------------|
| `statement`   | A general remark.                                             |
| `comment`     | A sub-type of statement — a member's comment on the topic.    |
| `standpoint`  | A member's position on the topic (e.g. "supports", "opposes").|

Adding a new kind is a one-line `StatementKind` enum extension — the
Statement model itself never needs to change (OCP).

## Attachment points

The same `Statement` class attaches at two points:

- **`MinutesSection#statements[]`** — per-meeting remarks (what was
  said this time).
- **`Topic#statements[]`** — standing positions that travel with the
  topic across meetings.

The semantic distinction comes from where the statement is attached,
not from a subclass.

## Wire shape

```yaml
statements:
  - kind: standpoint
    description:
      - spelling: eng
        value: "We oppose the proposal as drafted."
      - spelling: fra
        value: "Nous nous opposons à la proposition telle que rédigée."
    party:
      - kind: person
        name:
          - spelling: eng
            value:
              formatted: Jane Doe
```

## i18n

`description` is `LocalizedString[0..*]` — one entry per ISO 24229
spelling code. Single-language data uses the same
`[{ spelling, value }]` shape as multi-language data. See
[Localization](localization.md).

## Reference

- BS 0:2006 §7.6 — BSI committee minutes standard (source).
- ISO 24229 — spelling/conversion system codes.
