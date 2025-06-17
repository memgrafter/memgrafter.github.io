#!/bin/bash

MODEL=gemini/gemini-2.5-flash-preview-05-20

# editor whole was causing a lot of problems
aider --model $MODEL \
  --dark-mode \
  --vim \
  --read ./CONVENTIONS.md \
  --file _config.yml
  --editor-format diff \
  --reasoning-effort high \
  --no-show-model-warnings \
  --yes-always \
  --no-git-commit-verify \
  --no-auto-lint
