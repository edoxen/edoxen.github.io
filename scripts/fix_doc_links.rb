#!/usr/bin/env ruby
# One-shot: update internal doc links to use v2 names.

FILES = %w[
  docs/architecture.md
  docs/source-url.md
  docs/structured-identifier.md
  docs/minutes.md
  docs/agenda.md
  docs/installation.md
  docs/meeting-collection.md
  docs/attendance.md
  .vitepress/theme/data/home.ts
].freeze

REPLACEMENTS = {
  "/docs/resolution-set"     => "/docs/decision-collection",
  "/docs/resolution"         => "/docs/decision",
  "/docs/metadata"           => "/docs/decision-metadata",
  "/docs/create-resolutions" => "/docs/create-decisions",
}.freeze

FILES.each do |path|
  next unless File.exist?(path)

  text = File.read(path)
  original = text.dup
  REPLACEMENTS.each { |from, to| text.gsub!(from, to) }
  next if text == original

  File.write(path, text)
  puts "  updated #{path}"
end

puts "done."
