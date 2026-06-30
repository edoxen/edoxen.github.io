# Multilingual support

Edoxen supports multilingual resolution sets using the glossarist-style
`localizations[]` pattern. Each `Resolution` carries its
language-agnostic admin fields (identifier, doi, urn, agenda_item,
dates) plus a `localizations[]` array with one entry per language.

Each `Localization` declares its `language_code` (ISO 639-3
three-letter code) and `script` (ISO 15924 four-letter code), then
carries the monolingual title, subject, message, considerations,
actions, and approvals.

## Why localizations[]

There are three ways to represent multilingual content in a single
YAML file. Edoxen chose the third:

### 1. Per-row language tag

```yaml
resolutions:
  - identifier: X
    language: en
    title: English title
  - identifier: X
    language: fr
    title: Titre français
```

**Cons:** Duplicates the admin fields. Hard to keep EN and FR rows
in sync. Drift is invisible.

### 2. `{content, lang}` arrays on each text field

```yaml
resolutions:
  - identifier: X
    title:
      - { content: English title, lang: en }
      - { content: Titre français,  lang: fr }
    actions:
      - type: decides
        message:
          - { content: English body, lang: en }
          - { content: Corps français, lang: fr }
```

**Cons:** Noisy. Every text field carries the language list. The
verb `type` is canonically English regardless, so the language tag
is redundant on it.

### 3. Glossarist-style `localizations[]` array (Edoxen's choice)

```yaml
resolutions:
  - identifier: X
    doi: 10.x/y
    dates:
      - { start: '2025-10-14', kind: decision }
    localizations:
      - language_code: eng
        script: Latn
        title: English title
        actions:
          - type: decides
            message: English body
      - language_code: fra
        script: Latn
        title: Titre français
        actions:
          - type: decides
            message: Corps français
```

**Pros:**

- Language-agnostic fields declared once.
- Translators can compare EN+FR side-by-side in the same file.
- Adding a third language is one new entry per resolution.
- The action `type` (canonical English verb) is declared once.
- Forward-compatible with any new ISO 639-3 language code.

## Conventions

| Standard | Used for | Example |
|---|---|---|
| ISO 639-3 | Language codes (3-letter) | `eng`, `fra`, `deu`, `jpn` |
| ISO 15924 | Script codes (4-letter) | `Latn`, `Cyrl`, `Hant`, `Arab` |
| ISO 3166-1 alpha-2 | Country codes | `FR`, `DE`, `JP` |
| IATA | City codes (3-letter) | `PAR`, `BER`, `TYO` |

## Sample bilingual YAML

```yaml
metadata:
  title: 39th CIML Meeting — Decisions
  title_localized:
    - { language_code: eng, script: Latn, title: 39th CIML Meeting — Decisions }
    - { language_code: fra, script: Latn, title: 39e réunion du CIML — Décisions }
  dates:
    - { start: '2004-10-26', end: '2004-10-29', kind: meeting }
  venue: Berlin, Germany
  city: BER
  country_code: DE
  source_urls:
    - { ref: https://oiml.org/en/.../english.pdf, format: pdf, language_code: eng }
    - { ref: https://oiml.org/fr/.../french.pdf,  format: pdf, language_code: fra }

resolutions:
  - identifier: CIML/2004/1
    doi: 10.63493/resolutions/ciml200401
    urn: urn:oiml:doc:ciml:resolution:2004-1
    dates:
      - { start: '2004-10-26', kind: decision }
    localizations:
      - language_code: eng
        script: Latn
        title: Approval of the minutes of the 38th CIML Meeting
        subject: CIML
        actions:
          - type: approves
            message: |
              The Committee approved the minutes of its 38th Meeting
              without modification.
      - language_code: fra
        script: Latn
        title: Approbation du procès-verbal de la 38e réunion du CIML
        subject: CIML
        actions:
          - type: approves
            message: |
              Le Comité a approuvé le procès-verbal de sa 38e réunion
              sans modification.
```

## See also

- [Localization model](/docs/localization)
- [SourceUrl model](/docs/source-url)
- [Glossarist concept-model](https://github.com/glossarist/concept-model) — the inspiration for this pattern.
