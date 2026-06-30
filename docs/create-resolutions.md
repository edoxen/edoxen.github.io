# Creating resolutions

## From an existing template

The fastest way to start is to copy the sample from
[Multilingual support](/docs/multilingual) into a new YAML file and
edit it.

## Building programmatically

```ruby
require 'edoxen'

decision_date = Edoxen::ResolutionDate.new(
  kind: 'decision',
  start: Date.new(2025, 10, 14),
)
effective_date = Edoxen::ResolutionDate.new(
  kind: 'effective',
  start: Date.new(2025, 11, 1),
)

eng_loc = Edoxen::Localization.new(
  language_code: 'eng',
  script: 'Latn',
  title: 'Adoption of new standard',
  subject: 'ISO/TC 154',
  considerations: [
    Edoxen::Consideration.new(
      type: 'considering',
      message: 'reviewed the technical specifications',
    ),
  ],
  actions: [
    Edoxen::Action.new(
      type: 'resolves',
      message: 'to adopt ISO 12345 as a new standard',
      dates: [effective_date],
    ),
  ],
  approvals: [
    Edoxen::Approval.new(
      type: 'affirmative',
      degree: 'unanimous',
      message: 'Approved without objection.',
    ),
  ],
)

resolution = Edoxen::Resolution.new(
  identifier: '2025-01',
  type: 'resolution',
  doi: '10.x/y/2025-01',
  dates: [decision_date],
  localizations: [eng_loc],
)
```

## Serializing

```ruby
set = Edoxen::ResolutionSet.new(
  metadata: metadata,
  resolutions: [resolution],
)

File.write('out.yaml', set.to_yaml)
File.write('out.json', set.to_json)
```

## Validation

Always validate after building:

```ruby
schemer = JSONSchemer.schema(YAML.safe_load(File.read('schema/edoxen.yaml')))
errors = schemer.validate(set.to_h).to_a
raise errors.inspect unless errors.empty?
```

Or use the CLI:

```sh
edoxen validate out.yaml
```
