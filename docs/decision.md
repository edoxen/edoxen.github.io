# Decision

A **Decision** is the base type for any formal outcome adopted by a
Meeting: a resolution, an order, a ruling, a determination, a finding,
or an opinion. The same formal concept has many names across bodies —
`Decision.kind` discriminates which.

Carries language-agnostic admin fields (`identifier`, `kind`, `status`,
`doi`, `urn`, `agenda_item`, `dates`) plus a `localizations[]` array
with one entry per language.

```yaml
decisions:
  - identifier:
      - prefix: CIML
        number: "2025-44"
    kind: resolution
    status: decided
    doi: 10.63493/decisions/ciml202544
    urn: urn:oiml:doc:ciml:decision:2025-44
    agenda_item: "16.2"
    dates:
      - { date: '2025-10-13', type: adoption }
    localizations:
      - language_code: eng
        script: Latn
        title: Decision on the renewal of the contract...
        actions:
          - type: decides
            message: |
              The Committee decides to renew the contract of
              Mr Anthony Donnellan as BIML Director.
```

## Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `identifier` | `StructuredIdentifier[]` | yes (≥1) | Authority-prefixed identifier(s). |
| `kind` | enum | no | One of `resolution`, `order`, `ruling`, `determination`, `recommendation`, `statement`, `finding`, `opinion`, `other`. |
| `status` | enum | no | Lifecycle state: `draft`, `proposed`, `under_consideration`, `decided`, `negatived`, `withdrawn`, `deferred`. |
| `doi` | string | no | Digital Object Identifier. |
| `urn` | string | no | Uniform Resource Name per RFC 8141. |
| `agenda_item` | string | no | Agenda item label (e.g. `11.2`). |
| `dates` | `DecisionDate[]` | no | Typed dates (`adoption`, `drafted`, `decided`, `effective`, ...). |
| `categories` | string[] | no | Free-form category tags. |
| `meeting` | `MeetingIdentifier` | no | Reference to the meeting that adopted this decision. |
| `relations` | `DecisionRelation[]` | no | `updates`, `refines`, `replaces`, `considers`, `cites`, `annexOf`, `hasAnnex`. |
| `urls` | `Url[]` | no | Per-decision URLs. |
| `brought_by_motions` | string[] | no | URNs of Motions that brought this Decision. |
| `about_topics` | string[] | no | URNs of Topics this Decision is about. |
| `made_in_component` | string | no | URN of the MeetingComponent where adopted (e.g. a committee-of-the-whole). |
| `localizations` | `Localization[]` | yes (≥1) | One entry per language. See [Localization](/docs/localization). |

## Why localizations[]?

Decision identifiers, DOIs, URNs, and dates are language-agnostic — the
same logical decision has the same DOI whether it's the English or
French rendering. Per-language content (title, subject, considerations,
actions, approvals) lives inside a `Localization` child row.

See [Multilingual support](/docs/multilingual) for the design rationale.

## Procedural lifecycle

A Decision is the *outcome* of procedure. To trace how it got there,
follow the linked [Motion](/docs/motion) and [Voting](/docs/voting):

1. A [Motion](/docs/motion) is introduced (`introduced` → `seconded` →
   `debating` → `question_put` → `voting`).
2. A [Voting](/docs/voting) instance captures the vote (`called` →
   `in_progress` → `decided`).
3. If carried, the Motion's `resulting_decision` URN points here.
