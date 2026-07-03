# Installation

Edoxen is distributed as a Ruby gem.

## Prerequisites

- Ruby 3.0 or newer
- Bundler 2.0 or newer

## Install via Bundler

Add to your `Gemfile`:

```ruby
gem 'edoxen'
```

Then run:

```sh
bundle install
```

## Install via RubyGems

```sh
gem install edoxen
```

## Verify

```sh
edoxen --version
edoxen help
```

You should see the available commands:

```
Commands:
  edoxen help [COMMAND]               # Describe available commands or one specific
  edoxen normalize YAML_FILE_PATTERN  # Normalize YAML files using Edoxen schema
  edoxen validate YAML_FILE_PATTERN   # Validate YAML files against Edoxen schema
```

## Next steps

- Walk through the [Introduction](/docs/introduction).
- Read the [CLI docs](/docs/cli) to learn `validate` and `normalize`.
- Browse the [data model](/docs/decision-collection).
