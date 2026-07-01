# Schema

The Edoxen schema is published as a JSON Schema (Draft 7) YAML file
in [`schema/edoxen.yaml`](https://github.com/edoxen/edoxen/blob/main/schema/edoxen.yaml)
in the Ruby gem repo.

## Loading

```ruby
require 'json_schemer'
require 'yaml'

schema = YAML.safe_load(File.read('schema/edoxen.yaml'))
schemer = JSONSchemer.schema(schema)

data = YAML.safe_load(File.read('resolutions/ciml-39-decisions.yaml'))
errors = schemer.validate(data).to_a
puts errors.empty? ? 'VALID' : errors.map { |e| e['data_pointer'] }
```

## CLI

```sh
edoxen validate resolutions/*.yaml
```

## Key invariants enforced

- A `ResolutionCollection` must have a non-empty `resolutions` array.
- Every `Resolution` must have an `identifier` (one or more
  [`StructuredIdentifier`](/docs/structured-identifier) entries) and
  at least one `localizations[]` entry.
- Every `Localization` must have a `language_code` matching
  `^[a-z]{3}$` (ISO 639-3).
- `Action.type`, `Consideration.type`, `Approval.type`,
  `Approval.degree`, `ResolutionDate.kind` are enum-restricted.
- `source_urls[].ref` is required.
- Per-object `additionalProperties: false` keeps the wire shape
  minimal — typos surface as schema errors, not silent ignores.

## Schema extension points

To customize Edoxen for your organization, fork the schema and
either:

- Extend the `Action.type` / `Consideration.type` enum.
- Add new `ResolutionDate.kind` values.
- Add custom `metadata.*` fields (and drop `additionalProperties: false`
  on the metadata object).
