---
title: Body Vocabulary
---

# Body Vocabulary

A **BodyVocabularyEntry** maps a free-form `bodyType` string (e.g.,
"CIML Meeting", "Plenary") to a short canonical value (e.g.,
`plenary`). Bodies declare their vocabulary on the collection
metadata; consumers look up the canonical type via the parent
collection's vocabulary.

This is the mechanism that lets organisations use their own
terminology while mapping to the Edoxen canonical enum — declared
once per dataset, not repeated on every entity.

```yaml
metadata:
  title: 22nd CIML meetings (2025–2028)
  body_vocabulary:
    - { body_type: "International Conference",  canonical_type: plenary }
    - { body_type: "CIML Meeting",              canonical_type: governing }
    - { body_type: "Technical Committee",       canonical_type: working }
    - { body_type: "Project Group",             canonical_type: working }

meetings:
  - body_type: "CIML Meeting"    # ← type: governing inherited from vocabulary
    identifier: { prefix: CIML, number: '2025-09' }
  - body_type: "Technical Committee"
    identifier: { prefix: TC48, number: '2025' }
```

## BodyVocabularyEntry fields

| Field | Type | Description |
|---|---|---|
| `body_type` | `String` | The organisation-specific label (the key). |
| `canonical_type` | `String` | The Edoxen canonical type it maps to (e.g., `plenary`, `governing`, `working`, `advisory`). |
| `definition` | `String` | Optional description of what the body_type means in the org's context. |

## How resolution works

1. A `Meeting` sets `body_type: "CIML Meeting"`.
2. The consumer looks up the parent collection's `body_vocabulary[]`.
3. Finds the entry with `body_type: "CIML Meeting"` → `canonical_type: governing`.
4. The Meeting's effective `type` is `governing`.

If no vocabulary entry matches, the gem returns the `body_type` string
itself (permissive mode). Strict mode is a v3.x concern.

## Where it's declared

`body_vocabulary` lives on the collection metadata:

| Collection | Field |
|---|---|
| `MeetingCollectionMetadata` | `body_vocabulary: BodyVocabularyEntry[0..*]` |
| `DecisionMetadata` | (planned for v2.3) |

## Canonical type values

The canonical `MeetingType` enum has been shortened to abstract
function-based values:

| Canonical type | Captures |
|---|---|
| `plenary` | Full-body decision meeting |
| `governing` | Manages between plenaries |
| `working` | Does the work |
| `advisory` | Recommends, no decisions |

Plus body-specific terms may still appear in the enum (for backward
compatibility): `working_group`, `task_group`, `ad_hoc`, `joint`,
`general_assembly`, `committee`, `subcommittee`, `conference`,
`workshop`, `seminar`, `webinar`, `hearing`, `markup`, `board_meeting`,
`annual_general_meeting`, `other`.

## See also

- [Meeting Collection](/docs/meeting-collection) — Meeting.body_type field
- [Architecture](/docs/architecture) — the generic-core design
