---
layout: post
title: "Self-Modifying Agents"
date: 2026-07-19 13:48:00 -0700
categories: blog
published: true
---
Provenance: **handwritten**

Has anyone tried self evolving harness? I wrote one in FlatMachines, my personal state machine harness, but I think I am too dumb. What would it possibly do? The harness is just the tools for a canvas.

I feel like a self evolving harness is not in the harness. When I make a hammer, I've self-evolved. I don't have to graft it into my skin and it's highly preferred that I do not... at least, at this tech level...

Extending the analogy, a self evolving agent makes its own tools. So, its just computer use, harness self modification is something different, stronger, and less explored than "hyperagents" or "self-modifying runtime" -- the runtime is just too weak and bounded.

The most useful avenue is probably: "What is a *intentionally* self-modifying human". This put us properly on the trail. A self-modifying human would:

1. measure their context (self + world)
2. forecast the relevant future based on measurements
2. modify their modifiable context based on the forecast
4. repeat

So, what would a self-modifying agent modify?

1. world context
2. self-context
3. underlying model

World context means operating on the world and recording the world state after the operation.

Self-context is what gets into your context window. Agents don't reliably measure this today, but maybe a specialist agent could propose incremental changes for a requesting/approving agent. Humans go into specialist modes and environments to do certain types of work.

Underlying model isn't available for iteration in this loop yet, but that is a really valuable topic. The model building its own RL data is already partially closed, as well. Not necessarily in the above loop.

What do we have in a harness?

1. system prompt: role and model support
2. tools: world CRUD interfaces)
3. AGENTS.md: 1+ specialist contexts
4. post-history instructions: recurring static/dynamic reminders
5. user defined input: arbitrary input from a human or another agent

So, I think a self-modifying agent would probably be a continuous fan-out of contexts intended to climb the world while forecasting and generating tools it needs to continue climbing. Add a layer of goals.

So, a self modifying agent is an extension of openclaw and hermes designed to self-design. I think the challenge is getting all the parts iterable and crud-able.

For example, the meta-agent might launch another agent to gather context and write a report. This is passe, though.

If we can nail down the "spirit" of the meta-agent, then it can be properly designed. The meta-agent isn't a particular instantiation, it's the "potential energy" of the agent fan out over space and time.

Let me know if you've thought about this and where you ended up.
