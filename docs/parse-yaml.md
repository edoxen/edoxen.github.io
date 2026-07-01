# Parsing YAML

```ruby
require 'edoxen'

yaml_content = File.read('resolutions/ciml-39-decisions.yaml')
set = Edoxen::ResolutionCollection.from_yaml(yaml_content)

# Access metadata
puts set.metadata.title
puts set.metadata.dates.first.start
puts set.metadata.source_urls.first.language_code  # "eng"

# Iterate resolutions
set.resolutions.each do |resolution|
  puts "#{resolution.identifier} (#{resolution.localizations.size} languages)"
  resolution.localizations.each do |loc|
    puts "  #{loc.language_code}/#{loc.script}: #{loc.title}"
    loc.actions.each do |action|
      puts "    [#{action.type}] #{action.message[0..60]}..."
    end
  end
end
```

## From JSON

```ruby
json_content = File.read('resolutions.json')
set = Edoxen::ResolutionCollection.from_json(json_content)
```

## Building programmatically

```ruby
metadata = Edoxen::Metadata.new(
  title: 'Resolutions of the 17th OIML Conference',
  dates: [Edoxen::ResolutionDate.new(kind: 'meeting', start: Date.new(2025, 10, 14))],
  source: 'OIML Conference Secretariat (BIML)',
  venue: 'Paris, France',
  city: 'PAR',
  country_code: 'FR',
)

eng_loc = Edoxen::Localization.new(
  language_code: 'eng',
  script: 'Latn',
  title: 'Approval of the agenda',
  subject: 'OIML Conference',
  actions: [
    Edoxen::Action.new(
      type: 'approves',
      message: 'Approves the agenda for the 17th International Conference.',
    ),
  ],
)

resolution = Edoxen::Resolution.new(
  identifier: 'Conference/2025/01',
  localizations: [eng_loc],
)

set = Edoxen::ResolutionCollection.new(metadata: metadata, resolutions: [resolution])

# Serialize
File.write('out.yaml', set.to_yaml)
File.write('out.json', set.to_json)
```

## Round-trip

YAML → parse → Ruby object → serialize → YAML is a no-op (modulo
whitespace). Same for JSON.
