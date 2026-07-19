---
layout: post
title: "Reuse, Reduce, Recycle"
date: 2026-03-01 20:59:00 -0800
categories: blog
published: true
---
Provenance: **Handwritten**

We can do a better job verifying software than ever, and I think it will be a defining skill of this era of coding.

People have stopped using some libraries, instead choosing to implement their own.

How can we compare the cost of verifying software against the cost of writing new software?



## Do we already verify software?

Yes. At least, sometimes, for some cases, yes.

Essentially, no. We don't really verify software.

There are 3 or so formal methods for verifying software, which are pretty expensive. I'm not expert in formal verification.

Verifying software will be a defining skill of this era of coding.

In the past, we all used some really sloppy heuristics and general tools for verifying software.

I'll list some out quickly: popularity, author marketing, readable code, large test suite, burn-in, first-hand experience, source-code analysis.


## What Software Will Stick?



1. readable and maintainable: 
2. 


## On Writing Software

Writing software has changed a lot for me in the past three years.

I was not, at first, an "innovator" of llm coding technologies, partly because of work policies, and perhaps because my approach: I am likely an "early adopter" by habit, pragmatically waiting for the innovators to strike gold.

I stopped writing 99% of code by hand in April 2025, partly because I left a job with a strict policy against machine-generated code, and partly because the llm coding tooling started to hit on deep cases. it was, and is, still a casino.

## My LLM Coding Progression

- 2023-2024: I prompted the LLM to give me a general "form" (with many errors) and then manually wrote software off the form with my own expertise, reducing cognitive load by shedding my "view" of the layout, although I did have to envision it. Sometimes I could manually fix a general form then move it into a file.
- 2025 April: I used Aider, manually running shell !commands to provide the LLM context, added whole files, and allowed the LLM to add whole files to the context via a small page-ranked guide called a "repo map". Aider effectively had write, edit, whole-file-read, and human-managed-bash.
- 2025 November: I moved to claude code. The LLM can access the shell itself via "agentic tool use". It can add context faster and with more precision than me. The level of waste it generates is significantly lower than the unnecessary parts of files and bash commands from my pathetic human fingers.
- 2025 December: I wrote the first version of [flatagents+flatmachines](https://github.com/memgrafter/flatagents), a truly spec-driven software for LLMs to code LLM workflows. This is my take on an agentic orchestrator and deserves its own post.
- 2026 January: I moved to pi.  Pi uses the same 4 tools as Aider, now all managed by the LLM: bash, read, write, edit. The human can still run bash !commands, but it's much more infrequent.  Pi is more flexible software and will last longer.


