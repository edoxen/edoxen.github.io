# Origin

"Edoxen" is how all resolutions of Ancient Athens started:

> *"It was the opinion of... (the people and city that...)"*

The word originates from the Ancient Greek **edokeō** (ἔδοξεν), meaning
"it was the opinion of" or "it seemed good to". This term was used in
the context of formal resolutions and decisions made by the Athenian
assembly, reflecting the collective will and judgment of the citizens.

## Why we picked the name

Modern meetings publish thousands of records every year. Standards
bodies (ISO, IEC, ITU, BIPM, OIML, ILO), parliaments (UK Hansard, HK
LegCo, US Congress), technical communities (IETF, W3C, Apache),
academic conferences, corporate boards — each has its own document
convention, its own workflow, its own data model.

Edoxen is the common substrate: the **shared opinion** of how a
meeting record looks, regardless of the body that issued it. The
generic core stays generic; domain-specific concepts live in profile
extensions.

## Prior art

Edoxen builds on:

- **lutaml-model** — the Ruby serialization framework it uses for
  YAML/JSON round-tripping.
- **LutaML UML** — the formal information-model notation used in
  [edoxen-model](https://github.com/edoxen/edoxen-model).
- **Glossarist** — the multilingual concept-model framework whose
  `LocalizedConcept` pattern inspired Edoxen's `localizations[]`.
