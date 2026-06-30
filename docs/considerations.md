# Considerations

A **Consideration** captures the context that led to a resolution —
what the body observed, recalled, or took into account before
deciding.

```yaml
considerations:
  - type: noting
    message: |
      Notes the report by the CIML President on the activities of 2024.
  - type: recalling
    message: |
      Recalling Resolution CIML/2022/12 on the same subject.
```

## Consideration type vocabulary

`acknowledging`, `according`, `basing`, `considering`, `following`,
`having`, `identifying`, `noting`, `recalling`, `recognises`,
`recognising`, `recognizing`.

## Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | enum | yes | One of the consideration types above. |
| `message` | string | yes | Consideration text (per-language inside a Localization). |
| `subject` | string | no | Optional subject. |
| `dates` | `ResolutionDate[]` | no | Per-consideration dates. |
