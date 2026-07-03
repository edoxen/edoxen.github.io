# Meeting Extension

A **MeetingExtension** is the profile mechanism — the way adopters
extend the [generic core](/docs/architecture) without modifying it.
Every core entity has an `extensions: MeetingExtension[0..*]` slot.

This is the ISO 8601-2 §15 profile mechanism. Adopters register a
profile namespace (e.g. `legco`, `us-congress`, `ietf`, `oiml`) and
define `kind` values within it.

## Anatomy

```ruby
# Profile-scoped extension carrying a list of key/value attributes.
class MeetingExtension
  attribute :profile, :string       # "legco", "ietf", "us-congress"
  attribute :kind, :string          # "vote_block", "ballot_status"
  attribute :ref, :string           # URN to external profile record
  attribute :attributes, ExtensionAttribute, collection: true
  attribute :extensions, MeetingExtension, collection: true  # nested
end
```

`ExtensionAttribute` is a simple key/value pair:

```ruby
class ExtensionAttribute
  attribute :key, :string
  attribute :value, :string
end
```

## How adopters use it

1. Pick a `profile` name (lowercase, hyphen-separated).
2. Pick a `kind` for the extension type within that profile.
3. Provide either `ref` (URN to external data) or `attributes[]` (inline).

```yaml
extensions:
  - profile: legco
    kind: vote_block
    ref: urn:legco:vote-block:2024-01-15:item-5
  - profile: ietf
    kind: wg_meeting_meta
    attributes:
      - key: wg_name
        value: quic
      - key: draft_name
        value: draft-ietf-quic-v2
```

## Why this design?

- **Generic core stays generic.** Standards-body, parliamentary, technical,
  and corporate domains all share the same Meeting/Decision/Motion types.
- **Adopters own their extensions.** A profile is a single namespace;
  no coordination needed with the core.
- **Discoverability.** Consumers can ignore profile extensions they
  don't understand; they can list all extensions for a profile they do.

## Reference profiles

- [HK LegCo profile](https://github.com/edoxen/edoxen-model/blob/main/references/profiles/legco.adoc)

## See also

- [Architecture](/docs/architecture) — generic core + profile extensions.
