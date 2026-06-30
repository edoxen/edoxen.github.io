---
layout: home

hero:
  name: Edoxen
  text: Structured resolution and decision information models
  tagline: A common framework for representing formal resolutions — used by ISO, IEC, ITU, BIPM, OIML, ILO and more.
  actions:
    - theme: brand
      text: Get started
      link: /docs/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/metanorma/edoxen

features:
  - title: Multilingual first
    details: Every translatable field is wrapped in a per-language Localization row. ISO 639-3 language codes and ISO 15924 script codes throughout.
    link: /docs/multilingual
  - title: Schema-validated
    details: A JSON Schema locks the wire format. The Ruby gem validates any YAML file with a single CLI command.
    link: /docs/schema
  - title: Built on lutaml-model
    details: Round-trip YAML/JSON serialization via the lutaml-model framework — no hand-rolled to_yaml / from_yaml.
    link: https://github.com/lutaml/lutaml-model
  - title: Real-world tested
    details: Powers the OIML Resolutions archive (1,640 resolutions across 28 meetings in EN + FR).
    link: https://github.com/oimlsmart/resolutions-data
  - title: CLI tools
    details: Validate and normalize YAML files at the command line. Batch-process whole directories.
    link: /docs/cli
  - title: Open standard
    details: 2-Clause BSD license. Sponsored by Ribose. Open to community contributions.
    link: https://github.com/metanorma/edoxen
---
