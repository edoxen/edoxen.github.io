# Introduction

Edoxen is a Ruby gem + JSON Schema for representing **any meeting** —
its agenda, motions, votings, decisions, attendance, minutes, and
recurrence — in a structured, machine-readable, multilingual format.

## What problem does it solve?

Different meeting-publishing domains have invented their own formats:
PDFs of parliamentary Hansard, Word documents of ISO resolutions, XML
for IETF meetings, custom databases for board portals. Even within one
domain, formats drift across years and vendors.

**Edoxen** provides:

1. A **generic core information model** that captures the universal
   elements of *any* meeting — its identifier, venues, officers,
   agenda, the procedural record (motions, votings), and the formal
   outcomes (decisions).
2. A **profile mechanism** (ISO 8601-2 §15) so adopters can extend the
   core for their domain — parliamentary (LegCo, Congress), standards
   (ISO, OIML), technical (IETF, W3C), corporate governance — without
   forking the core.
3. A **YAML wire format** that is human-readable, easy to diff, and
   easy to edit.
4. A **JSON Schema** that locks the format so consumers can validate
   what they receive.
5. A **Ruby library** for parsing, building, and serializing meeting
   data programmatically.

## Who is it for?

- **Standards bodies** (ISO, IEC, ITU, BIPM, OIML, ILO) publishing
  formal decisions.
- **Parliamentary bodies** (UK Hansard, HK LegCo, US Congress) modeling
  bills, motions, divisions, and votes.
- **Technical communities** (IETF, W3C, Apache) tracking WG meetings and
  draft approvals.
- **Academic conferences** (Crossref-registered) with peer-reviewed
  proceedings.
- **Corporate boards** with quarterly governance cycles.
- **Anyone** who needs a structured record of who met, what they
  discussed, how they voted, and what they decided.

## Quick example

```yaml
identifier:
  - prefix: ACME
    number: "2026-Q1-Board"
urn: urn:acme:board:meeting:2026-q1
type: board_meeting
status: completed
visibility: confidential

date_range:
  start: 2026-03-15
  end: 2026-03-15

venues:
  - kind: physical
    name: Acme Boardroom
    unlocode: USNYC
    country_code: US
  - kind: virtual
    name: Video Conference
    uri: https://teams.microsoft.com/l/meetup-join/acme-board
    features: [audio, video, screen]

officers:
  - role: chair
    person: { name: Ms. Eleanor Vance }
  - role: secretary
    person: { name: Mr. James Okafor }

motions:
  - identifier: motion-dividend-2026-q1
    text: |
      I move that the Board declare a quarterly dividend of $0.45
      per share.
    status: carried
    resulting_decision: urn:acme:board:decision:2026-q1-dividend

votings:
  - on_motion: urn:acme:board:motion:2026-q1-dividend
    status: decided
    voting_method: roll_call
    result: passed
    counts: { ayes: 4, noes: 2 }

decisions:
  - identifier:
      - prefix: ACME
        number: "2026-Q1-001"
    kind: order
    status: decided
    urn: urn:acme:board:decision:2026-q1-dividend
    localizations:
      - language_code: eng
        title: Board Order Declaring Q1 2026 Dividend
        actions:
          - type: orders
            message: |
              The Board orders a quarterly dividend of $0.45
              per share, payable April 15, 2026.
```

## Where to next?

- [Architecture](/docs/architecture) — the generic-core-plus-profile
  design, the procedural state machines, and the multilingual plumbing.
- [Migration to 1.0](/docs/migration) — coming from legacy (Resolution →
  Decision rename + new entities).
- [Installation](/docs/installation) — set up the gem in your project.
- [Meetings](/docs/meeting-collection) — the event-grain container.
- [Procedural core](/docs/motion) — Motion → Voting → Decision.
- [Profile mechanism](/docs/extension) — how adopters extend the core.
- [Schema](/docs/schema) — the full JSON Schema reference.
- [CLI](/docs/cli) — `edoxen validate` and `edoxen normalize` from
  the command line.
