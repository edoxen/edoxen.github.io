# Actions

An **Action** captures what the body decided to do. Each action has a
semantic `type` (the verb) and a `message` (the full text of the
decision).

```yaml
actions:
  - type: approves
    message: |
      Approves the agenda for the 17th International Conference.
  - type: requests
    message: |
      Requests the BIML Director to prepare the work plan for 2026.
    dates:
      - { start: '2025-10-14', kind: effective }
```

## Action type vocabulary

The schema enforces a fixed enum of action types — present-tense
English verbs in snake_case:

`accepts`, `acknowledges`, `adopts`, `agrees`, `allocates`,
`appoints`, `appreciates`, `approves`, `asks`, `assigns`, `chairs`,
`communicating`, `confirms`, `considers`, `consults`, `creates`,
`decides`, `defines`, `delegates`, `delivering`, `directs`,
`disbands`, `drafting`, `elects`, `empowers`, `encourages`,
`endorses`, `establishes`, `gathering`, `identifies`, `instructs`,
`investigates`, `nominates`, `notes`, `notifies`, `recognises`,
`recognizes`, `recommends`, `registers`, `regrets`, `request`,
`replaces`, `requests`, `resolves`, `restates`, `reminds`, `scopes`,
`secures`, `sends`, `supports`, `thanks`, `welcomes`, `withdraws`.

## Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | enum | yes | One of the action types above. |
| `message` | string | yes | Action text (per-language inside a Localization). |
| `subject` | string | no | Optional action subject. |
| `degree` | enum | no | `unanimous`, `majority`, or `minority`. |
| `dates` | `ResolutionDate[]` | no | Per-action dates (effective, ballot, etc.). |

## Display translations

The action type is a canonical English identifier. To display it in
another language, your application should keep a translation table —
e.g. `thanks` → `Remercie` in French. The
[OIML Resolutions archive](https://github.com/oimlsmart/resolutions-data)
ships one in `browser/src/data/action-types.yaml`.
