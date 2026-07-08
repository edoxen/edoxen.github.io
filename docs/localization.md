---
title: Localization
---

# Localization

**Every translatable field is `Localized<String/Name>[0..*]`** — one
entry per ISO 24229 spelling/conversion system code. There is no
separate `Localization[]` collection; each field carries its own
language tags directly.

This is the 1.0 design (the v2.x `Localization` object pattern was
removed). Per-field localization:

- **Composes with romanization/transliteration** — the same Contact
  can carry 张建方 (`zho-Hans`) and a Pinyin romanization
  (`acadsin:zho-Hani:Latn:2002`) as parallel entries.
- **Scales to N languages** without duplicating the entity's other
  admin fields.
- **Always verbose** — single-language data uses the same
  `[{ spelling, value }]` shape as multi-language data. No scalar
  shorthand.

## The `spelling` field

`spelling` is an ISO 24229 code. Two formats are accepted:

### Spelling system code

`{lang}-{script}[-{country}][-{extension}]`

Examples:
- `eng` (English)
- `zho-Hans` (Chinese in Han Simplified)
- `zho-Hant` (Chinese in Han Traditional)
- `ind-Latn-pre1972` (Indonesian, pre-1972 orthography)
- `bos-Arab` (Bosnian in Arabic script)

### Conversion system code

`{authority}:{source-spelling}:{target-spelling}:{identifying-segment}`

Examples:
- `acadsin:zho-Hani:Latn:2002` (Academia Sinica's Tongyong Pinyin, 2002)
- `UN:ara-Arab:Latn:2017` (UN romanization of Arabic, 2017)
- `BGN-PCGN:chn-Hans:Latn:1979` (BGN/PCGN 1979 romanization of Chinese)
- `ALA-LC:mal-Mlym:Latn:2012` (ALA-LC for Malayalam)
- `ISO:Cyrl:Latn:9-1995` (ISO 9:1995 Cyrillic→Latin)

## LocalizedString

```yaml
title:
  - spelling: eng
    value: 42nd Plenary Meeting
  - spelling: fra
    value: 42e réunion plénière
  - spelling: zho-Hans
    value: 第42届全体会议
```

| Field | Type | Description |
|---|---|---|
| `spelling` | `String` (required) | ISO 24229 spelling/conversion system code. |
| `value` | `String` (required) | The localized string value. |
| `extensions` | `MeetingExtension[0..*]` | Profile-specific extensions. |

## LocalizedName

Same shape as LocalizedString, but `value` is a structured `Name`
(VCARD N + FN) instead of a String.

```yaml
name:
  - spelling: zho-Hans
    value:
      formatted: 张建方
      family: 张
      given: 建方
  - spelling: acadsin:zho-Hani:Latn:2002
    value:
      formatted: Chien-Fang Chang
      family: Chang
      given: Chien-Fang
  - spelling: eng
    value:
      formatted: Jianfang Zhang
```

## Ruby helpers

The gem provides ergonomic read access on entities that have localized
fields:

```ruby
meeting.title_in("eng")                  # => "42nd Plenary Meeting"
meeting.title_in("zho-Hans", fallback: false)
contact.name_in("eng").display           # => "Jianfang Zhang"
contact.localized_value(:affiliation, "eng")
```

## JavaScript helpers

The `@edoxen/edoxen` package exposes:

```ts
import { pickLocalizedValue, pickLocalized, buildSpelling } from '@edoxen/edoxen'

const title = pickLocalizedValue(meeting.title, 'eng')   // '42nd Plenary Meeting'
const entry = pickLocalized(meeting.title, 'deu', false) // null when no German
const spelling = buildSpelling('zho-Hans')               // branded Spelling
```

## See also

- [ISO 24229 reference site](https://iso24229.github.io/) — spelling/conversion system codes
- [Contact](/docs/contact) — Contact.name is `LocalizedName[0..*]`
- [Meeting Collection](/docs/meeting-collection) — Meeting.title etc. are `LocalizedString[0..*]`
