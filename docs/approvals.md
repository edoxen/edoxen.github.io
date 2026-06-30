# Approvals

An **Approval** records how a resolution was formally adopted —
whether by unanimous consent, by ballot, by majority, etc.

```yaml
approvals:
  - type: affirmative
    degree: unanimous
    message: Approved without objection.
```

## Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | enum | no | `affirmative` or `negative`. |
| `degree` | enum | no | `unanimous`, `majority`, or `minority`. |
| `message` | string | no | Free-form details about the approval process. |
