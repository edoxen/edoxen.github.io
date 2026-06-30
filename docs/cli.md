# CLI

The `edoxen` command provides utilities for working with resolution
data files.

## Commands

```sh
edoxen help
# Commands:
#   edoxen help [COMMAND]               # Describe available commands or one specific
#   edoxen normalize YAML_FILE_PATTERN  # Normalize YAML files using Edoxen schema
#   edoxen validate YAML_FILE_PATTERN   # Validate YAML files against Edoxen schema
```

## validate

```sh
# Single file
edoxen validate resolutions.yaml

# Multiple files
edoxen validate file1.yaml file2.yaml file3.yaml

# Glob
edoxen validate "resolutions/*.yaml"
```

Sample output:

```
🔍 Validating 3 file(s)...
  resolutions.yaml... ✅ VALID
  file1.yaml......... ✅ VALID
  file2.yaml......... ❌ INVALID
    - Line 15: Invalid action type 'invalid_type'

📊 Validation Summary:
  Valid files: 2
  Invalid files: 1
  Success rate: 66.7%
```

Exit code is non-zero if any file fails. Useful for CI.

## normalize

Loads YAML files through the Edoxen model classes and re-emits them
in canonical form — fixes whitespace, sorts keys, drops unknown
properties.

```sh
# Output to a directory
edoxen normalize "*.yaml" --output normalized/

# In-place (no backup — be careful!)
edoxen normalize "data/*.yaml" --inplace
```

Sample output:

```
🔄 Normalizing 2 file(s)...
  resolutions.yaml... ✅ NORMALIZED → /path/to/output/resolutions.yaml
  meeting-notes.yaml... ✅ NORMALIZED → /path/to/output/meeting-notes.yaml

📊 Normalization Summary:
  Successful: 2
  Failed: 0
  Success rate: 100.0%
  Output directory: /path/to/output
```
