# Create Decisions

How to build a [DecisionCollection](/docs/decision-collection) from
scratch in Ruby and serialize it to YAML.

## Build a single Decision

```ruby
require "edoxen"

decision = Edoxen::Decision.new(
  identifier: [Edoxen::StructuredIdentifier.new(prefix: "ACME", number: "2026-Q1-001")],
  kind: "order",
  status: "decided",
  urn: "urn:acme:board:decision:2026-q1-dividend",
  dates: [Edoxen::DecisionDate.new(date: Date.new(2026, 3, 15), type: "decided")],
  brought_by_motions: ["urn:acme:board:motion:2026-q1-dividend"],
  about_topics: ["urn:acme:topic:2026-q1-dividend"],
  localizations: [
    Edoxen::Localization.new(
      language_code: "eng",
      script: "Latn",
      title: "Board Order Declaring Q1 2026 Dividend",
      subject: "Acme Corporation",
      actions: [
        Edoxen::Action.new(
          type: "orders",
          message: "The Board orders that a quarterly dividend of $0.45 per share be paid..."
        )
      ]
    )
  ]
)
```

## Wrap in a collection

```ruby
collection = Edoxen::DecisionCollection.new(
  metadata: Edoxen::DecisionMetadata.new(
    title: "Decisions of the 47th Acme Board Meeting — Q1 2026",
    date: Date.new(2026, 3, 15),
    source: "Acme Corporation Secretariat",
    meeting_urn: "urn:acme:board:meeting:2026-q1",
    source_urls: [
      Edoxen::SourceUrl.new(
        ref: "https://acme.com/board/2026-q1-decisions.pdf",
        format: "pdf",
        language_code: "eng",
        kind: "decisions_pdf"
      )
    ]
  ),
  decisions: [decision]
)

File.write("acme-2026-q1.yaml", collection.to_yaml)
```

## Round-trip

```ruby
reloaded = Edoxen::DecisionCollection.from_yaml(File.read("acme-2026-q1.yaml"))
reloaded.decisions.first.kind                    # => "order"
reloaded.decisions.first.localizations.first.title
# => "Board Order Declaring Q1 2026 Dividend"
```

## Validate

```ruby
validator = Edoxen::SchemaValidator.new
errors = validator.validate_file("acme-2026-q1.yaml")
errors.empty? or raise "schema validation failed: #{errors.map(&:to_clickable_format)}"
```

See also: [Parsing YAML](/docs/parse-yaml), [Validation](/docs/validation).
