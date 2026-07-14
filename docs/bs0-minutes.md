---
title: BS 0:2006 Meeting Minutes
---

# BS 0:2006 Meeting Minutes

**BS 0:2006** is the British Standard *A standard for standards* — the
meta-standard that governs how BSI technical committees operate. Its
§7.6 specifies the structure of committee meeting minutes, including
two concepts that every standards body tracks but few models capture
natively: **statements** (who said what) and **declarations** (conflicts
of interest and IPR positions).

Edoxen 1.0 promotes these from a BSI-specific concern to **first-class
core entities**, because ISO, IEC, BIPM, IETF, and every other
standards body needs the same tracking. The BS 0 provenance is kept in
the documentation so adopters can trace the lineage.

## What's new

Three new core entities, plus field changes on Meeting, Topic, and
MinutesSection:

| Entity / change | What it captures | Reference |
|---|---|---|
| **Statement** | A remark by one or more members. Three kinds: `statement`, `comment`, `standpoint`. | [Statement →](/docs/statement) |
| **Declaration** | A formal declaration. Two kinds: `conflict_of_interest`, `ipr`. | [Declaration →](/docs/declaration) |
| **DateTimeRange** | A start + end pair with sub-day precision. | [DateTimeRange →](/docs/date-time-range) |
| **Meeting** changes | `dateRange` renamed `scheduledDateRange`; new `occurredDateRange`; new `declarations[]`. | below |
| **Topic** changes | New `statements[]` (standing) + `declarations[]` (standing). | [Topic →](/docs/topic) |
| **MinutesSection** changes | New `statements[]` (per-meeting) + `topic_ref` (URN back-link). | [Minutes →](/docs/minutes) |

## Statement

A [Statement](/docs/statement) is one remark made by one or more
meeting members. The `kind` discriminator separates three BS 0:2006
types: `statement` (general remark), `comment` (sub-type), and
`standpoint` (a member's position on the topic).

Statements attach at two levels:

- **`MinutesSection.statements[]`** — *per-meeting*: what was said this
  time, in this meeting, on this agenda item.
- **`Topic.statements[]`** — *standing*: a position that travels with
  the topic across meetings.

## Declaration

A [Declaration](/docs/declaration) is a formal declaration by one or
more members. The `kind` discriminator covers `conflict_of_interest`
and `ipr`. IPR declarations carry typed `EntityRef` slots
(`ipr_subject_ref`, `ipr_target_ref`) that the schema validates.

Declarations attach at two levels:

- **`Meeting.declarations[]`** — *per-meeting*: declarations made at
  this sitting.
- **`Topic.declarations[]`** — *standing*: a declaration that travels
  with the topic.

## DateTimeRange

A [DateTimeRange](/docs/date-time-range) is a start + end pair with
sub-day precision — parallel to `DateRange` (day granularity). The two
are intentionally separate types so the granularity is visible at the
type level.

## Meeting time fields

The BS 0 integration renames `Meeting.dateRange` to
`scheduledDateRange` and adds `occurredDateRange`:

| Field | Type | Precision | Description |
|---|---|---|---|
| `scheduled_date_range` | `DateRange` | Day | When the meeting was *planned* to happen. |
| `occurred_date_range` | `DateTimeRange` | Sub-day | When the meeting *actually* ran (e.g. 09:00–11:30). |

This separation matters when a meeting is scheduled for a full day but
only runs three hours, or when a meeting overruns its planned window.

## Example: bilingual committee minutes with BS 0 concepts

This is the `bs0-sample.yaml` fixture from the gem — a BSI TC/1
sitting with bilingual statements, declarations (CoI + IPR), and
scheduled-vs-occurred date ranges:

```yaml
identifier:
  - prefix: BSI
    number: "TC/1/2026/03"
urn: urn:edoxen:meeting:bsi:tc1-2026-03
type: committee
status: completed
title:
  - spelling: eng
    value: BSI TC/1 — March 2026 sitting
  - spelling: fra
    value: BSI TC/1 — séance de mars 2026
scheduled_date_range:
  start: 2026-03-12
  end: 2026-03-12
occurred_date_range:
  start: 2026-03-12T09:00:00+00:00
  end: 2026-03-12T11:45:00+00:00
declarations:
  - kind: conflict_of_interest
    description:
      - spelling: eng
        value: Mr Smith declares a conflict of interest on agenda item 5.2.
      - spelling: fra
        value: M. Smith déclare un conflit d'intérêts sur le point 5.2.
    party:
      - name:
          - spelling: eng
            value:
              formatted: Mr John Smith
  - kind: ipr
    description:
      - spelling: eng
        value: Ms Doe declares a patent on the technology described in clause 7.
    party:
      - name:
          - spelling: eng
            value:
              formatted: Ms Jane Doe
    ipr_subject_ref:
      urn: urn:edoxen:ipr-subject:iso-patent-policy:2024
    ipr_target_ref:
      identifier:
        prefix: ISO
        number: "8601-1:2019"
minutes:
  - identifier:
      - prefix: BSI
        number: "TC/1/2026/03/min"
    spelling: eng
    sections:
      - number: "5.2"
        title:
          - spelling: eng
            value: Patent clause discussion
        narrative:
          - spelling: eng
            value: |
              The committee discussed the patent clause in detail.
        statements:
          - kind: standpoint
            description:
              - spelling: eng
                value: Ms Doe supports the clause as drafted.
            party:
              - name:
                  - spelling: eng
                    value:
                      formatted: Ms Jane Doe
          - kind: comment
            description:
              - spelling: eng
                value: Mr Smith requested his dissent be recorded.
            party:
              - name:
                  - spelling: eng
                    value:
                      formatted: Mr John Smith
        topic_ref: urn:edoxen:topic:bsi:tc1-patent-clause
```

## When to use BS 0 concepts

| If your domain tracks… | Use… |
|---|---|
| Who said what during a meeting | `MinutesSection.statements[]` |
| A committee's long-held position on a subject | `Topic.statements[]` with `kind: standpoint` |
| Conflicts of interest | `Meeting.declarations[]` with `kind: conflict_of_interest` |
| IPR positions (patents, copyright) | `Meeting.declarations[]` with `kind: ipr` + `ipr_subject_ref` / `ipr_target_ref` |
| Actual meeting times (not just scheduled dates) | `Meeting.occurred_date_range` |

## API usage

### Ruby (gem)

```ruby
require 'edoxen'

collection = Edoxen::MeetingCollection.from_yaml(File.read('meeting.yaml'))
meeting = collection.meetings.first

# Scheduled vs occurred times
scheduled = meeting.scheduled_date_range  # => DateRange (day precision)
occurred  = meeting.occurred_date_range   # => DateTimeRange (sub-day)

# Declarations on the meeting
meeting.declarations.each do |decl|
  kind = decl.kind  # => "conflict_of_interest" or "ipr"
  desc = decl.description.find { |l| l.spelling == "eng" }&.value
  puts "[#{kind}] #{desc}"

  if decl.kind == "ipr"
    puts "  subject: #{decl.ipr_subject_ref.urn}"
    puts "  target:  #{decl.ipr_target_ref.identifier.first.number}"
  end
end

# Statements in a minutes section
meeting.minutes.first.sections.each do |section|
  section.statements.each do |stmt|
    kind = stmt.kind  # => "statement", "comment", or "standpoint"
    text = stmt.description.find { |l| l.spelling == "eng" }&.value
    who  = stmt.party.map { |p| p.name.first.value.formatted }.join(", ")
    puts "  [#{kind}] #{who}: #{text}"
  end
end
```

### TypeScript / JavaScript (@edoxen/edoxen)

```typescript
import { validateMeetings } from '@edoxen/edoxen'
import yaml from 'js-yaml'
import fs from 'node:fs'

const doc = yaml.load(fs.readFileSync('meeting.yaml', 'utf-8'))
const result = await validateMeetings(doc)

if (result.valid) {
  const meeting = doc.meetings[0]

  // Scheduled vs occurred
  console.log('scheduled:', meeting.scheduled_date_range)
  console.log('occurred:', meeting.occurred_date_range)

  // Declarations
  for (const decl of meeting.declarations ?? []) {
    console.log(`[${decl.kind}]`, decl.description[0]?.value)
    if (decl.kind === 'ipr') {
      console.log('  subject:', decl.ipr_subject_ref?.urn)
      console.log('  target:', decl.ipr_target_ref?.identifier?.[0]?.number)
    }
  }

  // Statements in minutes sections
  for (const section of meeting.minutes?.[0]?.sections ?? []) {
    for (const stmt of section.statements ?? []) {
      const who = stmt.party?.map(p => p.name?.[0]?.value?.formatted).join(', ')
      console.log(`  [${stmt.kind}] ${who}: ${stmt.description?.[0]?.value}`)
    }
  }
}
```

## See also

- [Statement](/docs/statement) — reference for the Statement entity
- [Declaration](/docs/declaration) — reference for the Declaration entity
- [DateTimeRange](/docs/date-time-range) — reference for the DateTimeRange entity
- [Minutes](/docs/minutes) — the narrative record, now with per-section statements
- [Topic](/docs/topic) — the subject of discussion, now with standing statements + declarations
- [Meeting Collection](/docs/meeting-collection) — the parent entity
- [Schema](/docs/schema) — the JSON Schema that enforces these types
