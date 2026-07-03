# Migration to v2.0

Edoxen v2.0 is a breaking release that broadens the model from a
standards-body-specific Resolution model to a **generic meeting/decision
model** with profile extensions for domain-specific concepts.

This page summarizes the breaking changes and shows the migration path.
Full TODO roadmap: [edoxen-model/TODO.refactor/](https://github.com/edoxen/edoxen-model/tree/main/TODO.refactor).

## TL;DR

| v0.x | v2.0 |
|------|------|
| `Resolution` class | `Decision` class (with `kind: resolution`) |
| `ResolutionType` enum | `DecisionKind` enum (9 values) |
| `ResolutionCollection` | `DecisionCollection` |
| `Meeting.virtual: Boolean` | `Meeting.venues: Venue[]` (polymorphic) |
| `Meeting.chair` / `Meeting.secretary` | `Meeting.officers[]` with role enum |
| `Meeting.schedule[]` (ScheduleItem) | `Meeting.components[]` (MeetingComponent) |
| `Resolution` alone | `Decision` + `Motion` + `Voting` (procedural core) |
| (none) | `Topic` + `TopicDocument` + `TopicAsset` |
| (none) | `MeetingSeries` (recurring meetings) |
| (none) | `MeetingExtension` (profile mechanism) |
| (none) | `Recurrence` (ISO 8601-2 §13 structured) |
| (none) | `Venue` polymorphic via `PhysicalVenue` / `VirtualVenue` subclasses |

## Why v2.0

The original model was designed for standards bodies (ISO, ITU, OIML, ILO,
BIPM). The 2026 broadening extends coverage to:

- **Parliamentary bodies** (UK Hansard, HK LegCo, US Congress)
- **Technical community meetings** (IETF, W3C, Apache Foundation)
- **Academic conferences** (Crossref-registered)
- **Corporate governance** (board meetings)
- **Generic web/virtual meetings** (iCalendar semantics)

The core schema is the *intersection* of all domains. Domain-specific
concepts (Bill, Witness, Petition, Address, Statement, QuorumBell) live
in **profile extensions**, not the core.

See [`references/`](https://github.com/edoxen/edoxen-model/tree/main/references)
for the 9 reference corpora that drive the model.

## Architectural principle: generic core + profile extensions

Every core entity has an `extensions: MeetingExtension[0..*]` slot.
Adopters register their own profile namespace and define extension kinds.

```yaml
extensions:
  - profile: legco
    kind: summoning_bell
    attributes:
      - key: sectionCode
        value: b2d
      - key: timestamp
        value: "2024-01-15T11:30:00Z"
```

This pattern follows ISO 8601-2 §15 (Profiles).

## Polymorphic Venue

The most visible breaking change: `Meeting.virtual: Boolean` is gone.
Replaced by a polymorphic `Venue` base class with two subclasses:

```
class Venue {
  kind: VenueKind  // physical | virtual
  name: String
  ...
}

class PhysicalVenue < Venue {
  unlocode: String
  iata_code: String
  address: String
  ...
}

class VirtualVenue < Venue {
  uri: String
  features: VirtualFeature[]
  passcode: String
  ...
}
```

A meeting can have multiple venues of either kind (hybrid meetings,
multi-room conferences bridged by video, etc.).

UN/LOCODE and IATA codes are validated by the
[`unlocodes`](https://github.com/metanorma/unlocodes) and
[`iata`](https://github.com/metanorma/iata) gems.

## Procedural core: Decision, Motion, Voting

v0.x had only `Resolution`. v2.0 adds `Motion` and `Voting` as distinct
core entities:

- **Motion** — a procedural act ("I move that..."). State machine:
  `introduced → seconded → debating → question_put → voting →
  carried/negatived/withdrawn/lapsed`
- **Voting** — state machine for a single vote on a Motion:
  `called → in_progress → decided/withdrawn/deferred`. Multiple votings
  can occur on the same motion.
- **Decision** — the formal outcome. A `Decision` results from a
  successful `Motion` (was a "draft resolution" before vote; becomes a
  real "resolution" after vote passes).

## Sample YAML

Three samples in
[`samples/`](https://github.com/edoxen/edoxen-model/tree/main/samples):

- `oiml-ciml-56.yaml` — standards body (CIML Meeting 56, unanimous consent)
- `legco-sitting-2024-01-15.yaml` — parliamentary (HK LegCo, division vote)
- `hybrid-board-meeting.yaml` — corporate (roll_call with casting_vote tie-breaker)

## Migration script (TODO)

A `scripts/migrate_v1_to_v2.rb` will be provided before v2.0.0 final.
The transformation rules:

```ruby
# Resolution → Decision
decision.kind = "resolution"  # was implicit
decision.status = "decided"   # was implicit
decision.brought_by_motions = []  # was implicit

# Meeting fields
meeting.venues = []
if meeting.virtual
  meeting.venues << VirtualVenue.new(uri: ...)
end
meeting.venues << PhysicalVenue.new(location.attributes)

# Chair/secretary → officers[]
meeting.officers = []
meeting.officers << Officer.new(role: "chair", person: meeting.chair) if meeting.chair
meeting.officers << Officer.new(role: "secretary", person: meeting.secretary) if meeting.secretary
```

## References

- [TODO.refactor/00-MASTER.md](https://github.com/edoxen/edoxen-model/blob/main/TODO.refactor/00-MASTER.md) — full plan
- [TODO.refactor/PROGRESS.md](https://github.com/edoxen/edoxen-model/blob/main/TODO.refactor/PROGRESS.md) — current status
- [references/iso8601-2.adoc](https://github.com/edoxen/edoxen-model/blob/main/references/iso8601-2.adoc) — date/recurrence standard
- [references/profiles/legco.adoc](https://github.com/edoxen/edoxen-model/blob/main/references/profiles/legco.adoc) — profile example
