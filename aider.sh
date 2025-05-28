#!/bin/bash

MODEL=gemini/gemini-2.5-flash-preview-05-20

aider --model $MODEL \
  --dark-mode \
  --vim \
  --read ./CONVENTIONS.md \
  --edit-format whole \
  --no-show-model-warnings \
  --yes-always \
  --no-git-commit-verify \
  --no-auto-lint
