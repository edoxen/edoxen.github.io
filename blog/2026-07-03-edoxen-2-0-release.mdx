---
title: Edoxen v2.0 — a generic meeting, motion, voting, and decision model
date: 2026-07-03
description: "The v2.0 release broadens Edoxen from a standards-body Resolution model to a generic meeting/decision model with profile extensions for every domain."
---

# Edoxen v2.0

Edoxen v2.0 is here, and it's a complete rethink of what the model is
*for*.

v1.0 was a **standards-body Resolution model**. It modelled the OIML,
ISO/TC 154, and ISO/TC 184/SC 4 publication conventions beautifully —
1,640 resolutions across 28 meetings encoded, every code path
exercised. But every time we looked at a new domain — HK LegCo's
parliamentary sittings, an IETF WG meeting, a corporate board portal —
we hit the same wall: the model assumed one specific shape of
"proceedings."

v2.0 changes that. **The core is now generic. Domains extend via
profiles.**

## What's new

### The procedural core: Motion → Voting → Decision

v1.0 had only `Resolution`. v2.0 adds two new first-class entities:

- **Motion** — a procedural act with a state machine:
  `introduced → seconded → debating → question_put → voting →
  carried/negatived/withdrawn/lapsed`.
- **Voting** — a state machine for a single vote on a Motion:
  `called → in_progress → decided`. Captures `voting_method`
  (voice, division, roll_call, secret_ballot, ...), `counts`
  (ayes/noes/abstentions/absent), `casting_vote`, and per-member
  `vote_records`.

A `Decision` is now the **outcome** of a successful Motion, not a
standalone document. The `brought_by_motions[]` field links back.

### Polymorphic Venue

v1.0 had `Meeting.virtual: Boolean` — insufficient. Zoom needs URL +
passcode + dial-in numbers + waiting-room flag. Cisco WebEx needs
something different. A Microsoft Teams link is different again.

v2.0 has **one polymorphic `Venue` base type** with two subtypes:

- **PhysicalVenue** — UN/LOCODE + IATA + address + geo-coordinates.
- **VirtualVenue** — URI + iCalendar features (audio/video/chat/phone/
  screen/feed) + access details.

A Meeting has `venues: Venue[0..*]`. Hybrid meetings have both.
Validators check UN/LOCODE and IATA codes against the canonical
`unlocodes` and `iata` gems.

### Profile mechanism (ISO 8601-2 §15)

Every core entity has an `extensions: MeetingExtension[0..*]` slot.
Adopters register a profile namespace (`legco`, `ietf`, `us-congress`)
and define extension kinds within it. Consumers ignore profiles they
don't understand.

```yaml
extensions:
  - profile: legco
    kind: vote_block
    ref: urn:legco:vote-block:2024-01-15:item-5
  - profile: ietf
    kind: wg_meeting_meta
    attributes:
      - { key: wg_name, value: quic }
```

This is the **ISO 8601-2 §15 profile mechanism** — the same pattern
ISO uses for domain-specific date/time profiles.

### Recurrence (ISO 8601-2 §13)

`MeetingSeries` is the parent of recurring meetings. It carries a
`Recurrence` rule — the **structured** ISO 8601-2 §13 form, not an
opaque iCalendar RRULE string. Each `BYxxx` part is its own attribute,
so consumers can query "all monthly meetings on the first Monday"
without re-implementing the RFC 5545 grammar.

### Five new domains

v2.0 explicitly covers:

- **Standards bodies** (ISO, IEC, ITU, BIPM, OIML, ILO)
- **Parliamentary bodies** (UK Hansard, HK LegCo, US Congress)
- **Technical communities** (IETF, W3C, Apache)
- **Academic conferences** (Crossref-registered)
- **Corporate boards** (governance cycles)
- **Generic web/virtual meetings** (iCalendar semantics)

The HK LegCo profile ships as the first reference profile in
`references/profiles/legco.adoc`.

## Migration

v2.0 is a **breaking release**. The migration is mechanical:

| v0.x | v2.0 |
|------|------|
| `Resolution` | `Decision` with `kind: resolution` |
| `ResolutionCollection` | `DecisionCollection` |
| `Meeting.virtual: Boolean` | `Meeting.venues: Venue[]` |
| `Meeting.chair` / `.secretary` | `Meeting.officers: Officer[]` |
| `Meeting.schedule[]` | `Meeting.components: MeetingComponent[]` |
| `Resolution` alone | `Decision` + `Motion` + `Voting` |

See the [full migration guide](/docs/migration-v2) for details.

## Try it

```sh
gem install edoxen
edoxen validate decisions/*.yaml
edoxen validate-meetings meetings/*.yaml
edoxen unlocode FRPAR    # Paris, France
edoxen iata JFK          # John F. Kennedy International
```

Or read the [introduction](/docs/introduction), walk the
[architecture](/docs/architecture), or browse the
[samples](https://github.com/edoxen/edoxen-model/tree/main/samples).

## What's next

The model and gem are v2.0-stable. Phase D — migrating the three
downstream reference corpora (OIML, ISO/TC 154, ISO/TC 184/SC 4) — is
the next quarter's work, with each repo its own sub-project.

If you'd like to author a profile for your domain, open an issue in
[edoxen-model](https://github.com/edoxen/edoxen-model/issues) and
we'll help you land it.
