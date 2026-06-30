# Localization

A **Localization** is a monolingual rendering of a `Resolution`. It
mirrors the glossarist `LocalizedConcept` pattern: language-agnostic
fields live on the parent; per-language content lives here.

## Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `language_code` | string (ISO 639-3) | yes | 3-letter language code, e.g. `eng`, `fra`, `deu`. Pattern: `^[a-z]{3}$`. |
| `script` | string (ISO 15924) | no | 4-letter script code, e.g. `Latn`, `Cyrl`, `Hant`, `Arab`. Pattern: `^[A-Z][a-z]{3}$`. |
| `title` | string | no | Localized resolution title. |
| `subject` | string | no | Localized subject or scope. |
| `message` | string | no | Localized resolution message (when the resolution has a single body rather than discrete actions). |
| `considering` | string | no | Localized "considering" clause. |
| `considerations` | `Consideration[]` | no | Localized considerations. |
| `actions` | `Action[]` | no | Localized actions. |
| `approvals` | `Approval[]` | no | Localized approvals. |

## Language code conventions

| Code | Language |
|---|---|
| `eng` | English |
| `fra` | French |
| `deu` | German |
| `spa` | Spanish |
| `jpn` | Japanese |
| `rus` | Russian |
| `ara` | Arabic |
| `zho` | Chinese |

See the [ISO 639-3 registry](https://iso639-3.sil.org/) for the full list.

## Script code conventions

| Code | Script |
|---|---|
| `Latn` | Latin |
| `Cyrl` | Cyrillic |
| `Hant` | Traditional Chinese |
| `Hans` | Simplified Chinese |
| `Arab` | Arabic |

See the [ISO 15924 registry](https://www.unicode.org/iso15924/) for the full list.

## Example

```yaml
localizations:
  - language_code: eng
    script: Latn
    title: Decision on the renewal of the contract of Mr Anthony Donnellan
    subject: CIML
    actions:
      - type: decides
        message: |
          The Committee decides to renew the contract of
          Mr Anthony Donnellan as BIML Director.
  - language_code: fra
    script: Latn
    title: Décision sur le renouvellement du contrat de M. Anthony Donnellan
    subject: CIML
    actions:
      - type: decides
        message: |
          Le Comité décide de renouveler le contrat de
          M. Anthony Donnellan en tant que Directeur du BIML.
```
