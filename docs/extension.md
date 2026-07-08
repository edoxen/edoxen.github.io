# Meeting Extension

A **MeetingExtension** is the profile mechanism — the way adopters
extend the [generic core](/docs/architecture) without modifying it.
Every core entity has an `extensions: MeetingExtension[0..*]` slot.

This is the ISO 8601-2 §15 profile mechanism. Adopters register a
profile namespace (e.g. `legco`, `us-congress`, `ietf`, `oiml`) and
define `kind` values within it.

## Anatomy (1.0+)

```ruby
# Profile-scoped extension carrying a list of typed key/value pairs.
class MeetingExtension
  attribute :profile, :string       # "legco", "ietf", "us-congress"
  attribute :kind, :string          # in-profile discriminator
  attribute :ref, :string           # URN of profile document
  attribute :attributes, ExtensionAttribute, collection: true
end
```

`ExtensionAttribute` is polymorphic on value type — six typed variants
plus a `type` discriminator so consumers don't have to re-parse
strings back into Int/Float/Bool/Date:

```ruby
class ExtensionAttribute
  attribute :key, :string

  # String variant — wire name `value` (1.0 back-compat).
  attribute :value, :string

  # Typed variants (1.0).
  attribute :integer_value, :integer
  attribute :float_value, :float
  attribute :boolean_value, :boolean
  attribute :date_value, :date
  attribute :date_time_value, :date_time

  # Wire discriminator: "string" | "integer" | "float" | "boolean" |
  # "date" | "datetime".
  attribute :type, :string

  def typed_value
    case type
    when "integer"  then integer_value
    when "float"    then float_value
    when "boolean"  then boolean_value
    when "date"     then date_value
    when "datetime" then date_time_value
    else value  # default to string (1.0 back-compat)
    end
  end
end
```

The 1.0 tighten (per the post-launch audit,
[TODO 47](https://github.com/edoxen/edoxen-model/blob/main/TODO.refactor/47-tighten-meeting-extension.md))
made three changes:

1. **Documented `kind` and `ref` semantics.** `kind` is the
   in-profile discriminator; `ref` is the URN of an external profile
   document.
2. **Removed the recursive `extensions[]` slot.** No documented use
   case. Profiles needing nesting use dotted keys
   (`vote.count`, `vote.method`) in `attributes[]`.
3. **Polymorphized `ExtensionAttribute.value`.** Was String-only;
   now six typed variants + a `type` discriminator.

## How adopters use it

1. Pick a `profile` name (lowercase, hyphen-separated).
2. Pick a `kind` for the extension type within that profile.
3. Provide either `ref` (URN to external data) or `attributes[]` (inline).
4. For each attribute, set `type` and populate the matching value field.

```yaml
extensions:
  - profile: legco
    kind: vote_block
    ref: urn:legco:vote-block:2024-01-15:item-5
  - profile: ietf
    kind: wg_meeting_meta
    attributes:
      - key: wg_name
        type: string
        value: quic
      - key: draft_name
        type: string
        value: draft-ietf-quic-v2
      - key: quorum
        type: integer
        integer_value: 7
      - key: live_stream
        type: boolean
        boolean_value: true
      - key: start
        type: datetime
        date_time_value: 2026-07-04T10:00:00Z
```

Read the typed payload in Ruby via `#typed_value`:

```ruby
attr = extension.attributes.find { |a| a.key == "quorum" }
attr.type            # => "integer"
attr.integer_value   # => 7
attr.typed_value     # => 7
```

## 1.0 back-compat

The bare `value: String` wire shape still parses — the gem routes it
into the string variant, with `type` defaulting to `"string"`. Old
fixtures don't need migration.

## Why this design?

- **Generic core stays generic.** Standards-body, parliamentary, technical,
  and corporate domains all share the same Meeting/Decision/Motion types.
- **Adopters own their extensions.** A profile is a single namespace;
  no coordination needed with the core.
- **Discoverability.** Consumers can ignore profile extensions they
  don't understand; they can list all extensions for a profile they do.
- **Typed values.** No more `int_value: "7"` parsing on read — the
  type is preserved end-to-end.
- **No recursion.** YAGNI; dotted keys cover the same ground without
  the complexity.

## Reference profiles

- [HK LegCo profile](https://github.com/edoxen/edoxen-model/blob/main/references/profiles/legco.adoc)

## See also

- [Architecture](/docs/architecture) — generic core + profile extensions.
- [TODO 47: tighten audit](https://github.com/edoxen/edoxen-model/blob/main/TODO.refactor/47-tighten-meeting-extension.md).
