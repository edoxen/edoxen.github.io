# Resolution Set

A **Resolution Set** is the top-level container. It corresponds to one
meeting or one publication batch — for example, all the resolutions
adopted at the 17th OIML Conference.

```yaml
metadata:
  title: Resolutions of the 17th OIML Conference
  ...
resolutions:
  - ...
  - ...
```

## Fields

| Field | Type | Description |
|---|---|---|
| `metadata` | `Metadata` | Information about the meeting / publication. |
| `resolutions` | `Resolution[]` | The list of resolutions. At least one required. |

## See also

- [Metadata](/docs/metadata)
- [Resolution](/docs/resolution)
