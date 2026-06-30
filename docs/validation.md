# Validation

Edoxen ships a JSON Schema (Draft 7) that locks the wire format. Use
it at every system boundary:

- After authoring a new YAML file by hand.
- Before ingesting a YAML file from a third party.
- In CI on every commit that touches `resolutions/*.yaml`.

## CLI

```sh
edoxen validate resolutions/*.yaml
```

Exit code is non-zero on failure. Wire it into your CI:

```yaml
# .github/workflows/ci.yml
- run: bundle exec edoxen validate resolutions/*.yaml
```

## Ruby API

```ruby
require 'json_schemer'
require 'yaml'

schema = YAML.safe_load(File.read('schema/edoxen.yaml'))
schemer = JSONSchemer.schema(schema)

Dir['resolutions/*.yaml'].each do |path|
  data = YAML.safe_load(File.read(path))
  errors = schemer.validate(data).to_a
  next if errors.empty?

  warn "#{path}:"
  errors.each { |e| warn "  #{e['data_pointer']}: #{e['error']}" }
  exit 1
end
```

## Common errors

### "disallowed additional property"

You added a field that's not in the schema. Either:

- Remove the field (it was probably a typo), or
- Open a PR to add the field to the schema with documentation.

### "is not one of: [...]"

You used an enum value not in the allowed list. For action types,
consideration types, approval degrees, etc., the enum is fixed —
add your value to the schema before using it.

### "does not match pattern"

ISO codes (639-3, 15924, 3166-1) have fixed patterns:

- Language: `^[a-z]{3}$` (e.g. `eng`, `fra`)
- Script: `^[A-Z][a-z]{3}$` (e.g. `Latn`, `Cyrl`)
- Country: `^[A-Z]{2}$` (e.g. `FR`, `DE`)

Check your casing.
