---
title: Structured Identifier
---

# Structured Identifier

A **StructuredIdentifier** is the composite `{prefix, number}` pair
used wherever an entity carries a stable identifier across publishing
histories (a body may have re-numbered, but the prefix stays).

```yaml
identifier: { prefix: CIML, number: "2025-09" }
identifier: { prefix: ISO/TC 154, number: "N 1234" }
identifier: { prefix: OIML, number: "2016/1" }
```

## Fields

| Field | Type | Description |
|---|---|---|
| `prefix` | `String` | Body or context namespace (e.g. `CIML`, `ISO/TC 154`, `OIML`). |
| `number` | `String` | The within-prefix identifier — kept as `String` because prefixes vary widely (slash-separated, year-prefixed, etc.). |

## Why composite, not a single string

If a `Resolution` carried `identifier: "CIML/2025-09"`, you would
struggle to query: *all resolutions from CIML*, *all identifiers
beginning with 2025*, *show me which body this is from*. With a
structured pair, those questions are trivial against the data.

The trade-off: the wire shape is two fields, not one. Validation must
require both for full uniqueness — a bare `number` is not unique
across prefixes, and a bare `prefix` is not an identifier.

## Where it appears

| Entity | Cardinality |
|---|---|
| `Resolution.identifier` | 1..* |
| `Meeting.identifier` | 1..* |
| `Agenda.identifier` | 0..* (optional — not all bodies number their agendas) |
| `MeetingRelation.source`, `MeetingRelation.destination` | each carries one |

`1..*` on `Resolution` and `Meeting` lets a single entity carry multiple
identifiers across publishing histories — the modern canonical one
plus legacy identifiers it used to be referenced by.

## Conventions

| Standard | Used for | Example |
|---|---|---|
| ISO 3166-1 alpha-2 | Country codes | `FR`, `DE`, `JP` |
| IATA | City codes | `PAR`, `BER`, `TYO` |
| ISO 639-3 | Language codes | `eng`, `fra`, `deu` |
| ISO 15924 | Script codes | `Latn`, `Cyrl`, `Hant` |
| ISO 8601 | Date syntax | `2025-10-14`, `2025-10-14/15` |
| (body-local) | `StructuredIdentifier.prefix` | `CIML`, `OIML`, `ISO/TC 154` |

The prefix is **body-local**, not standardized — there is no ISO
registry of body prefixes. Bodies publish their own conventions, and
`edoxen/edoxen-model/references/<body>.adoc` collects them per
body.

## See also

- [Meeting Collection](/docs/meeting-collection)
- [Resolution Collection](/docs/decision-collection)
- [Localization](/docs/localization) — how identifiers interact with `localizations[]`
