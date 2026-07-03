# Topic

A **Topic** is the subject of discussion at a [Meeting](/docs/meeting-collection).
A topic may have:

- **Documents** — text-bearing materials ([TopicDocument](#topicdocument)): bill text, ISO draft, report.
- **Assets** — non-text materials ([TopicAsset](#topicasset)): image, dataset, model.
- **References** — external pointers ([Reference](/docs/structured-identifier)).
- **Motions** — URNs of [Motions](/docs/motion) raised about this topic.
- **Decisions** — URNs of [Decisions](/docs/decision) made on this topic.

A Topic is **distinct** from a Decision (formal outcome) and from a
Motion (procedural act). One topic may produce many motions, many
decisions, and resume across multiple meetings.

## Cross-meeting threading

`resumption_of` is a URN pointer to a prior Topic in a prior Meeting
where this subject was first raised. This pattern (from the HK LegCo
OData schema) lets consumers walk a topic's history across meetings.

## Fields

| Field | Type | Description |
|---|---|---|
| `identifier` | string | Local identifier. |
| `urn` | string | URN. |
| `title` | string | Topic title. |
| `description` | string | Longer description. |
| `status` | enum | `open`, `under_discussion`, `decided`, `deferred`, `withdrawn`. |
| `resumption_of` | string | URN of a prior Topic this resumes. |
| `documents` | `TopicDocument[]` | Text-bearing materials. |
| `assets` | `TopicAsset[]` | Non-text materials. |
| `references` | `Reference[]` | External pointers. |
| `motions` | string[] | URNs of Motions. |
| `decisions` | string[] | URNs of Decisions. |

## TopicDocument

Text-bearing document about a topic.

| Field | Type | Description |
|---|---|---|
| `identifier` | string | Doc ID (e.g. ISO/CD 9735-11). |
| `title` | string | Doc title. |
| `version` | string | Version label (v2, 4th CD). |
| `status` | string | Status (draft, final, withdrawn). |
| `url` | string | Canonical URL. |
| `format` | string | Format (pdf, html, docx). |
| `language_code` | string | ISO 639-3 (eng, fra). |

## TopicAsset

Non-text resource about a topic.

| Field | Type | Description |
|---|---|---|
| `identifier` | string | Asset ID. |
| `title` | string | Asset title. |
| `kind` | string | Free-form discriminator (image, dataset, model, video). |
| `url` | string | URL. |
| `format` | string | Format (png, csv, glb). |

## Example

```yaml
topics:
  - identifier: acme-topic-q4-financials
    urn: urn:acme:topic:q4-2025-financials
    title: Q4 2025 Financial Performance
    status: decided
    documents:
      - identifier: acme-doc-q4-financials
        title: Q4 2025 Financial Report
        url: https://intra.acme.com/board/q4-2025-financials.pdf
        format: pdf
        language_code: eng
    motions:
      - urn:acme:board:motion:q4-financials-approval
    decisions:
      - urn:acme:board:decision:q4-financials-approval
```

## See also

- [Motion](/docs/motion) — procedural acts raised on this topic.
- [Decision](/docs/decision) — outcomes on this topic.
- [Agenda](/docs/agenda) — topics appear as `agenda.items[].topics[]`.
