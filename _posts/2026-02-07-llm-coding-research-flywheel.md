---
layout: post
title: "LLM Research Digest Autocatalysis"
date: 2026-02-07 21:35:00 -0800
categories: blog
published: true
---
Provenance: **Handwritten**

Around 120 machine-learning-adjacent arxiv papers are published every day.

Only a machine can get through that much context.

## Autocatalysis

Autocatalysis is a self reinforcing feedback loop.

## Research Digestion Loop

1. Process papers via agentic workflows via [research discovery pipeline](https://github.com/memgrafter/research-crawler-flatagents/tree/main/discovery_pipeline). Store the papers in [analysis repo](https://github.com/memgrafter/analysis/).
2. Ask questions. Fire up gpt-5.3-codex in [pi coding agent](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent) and orient myself to the landscape.
3. Listen and learn. Paste individual digests or detailed analysis into [Speech Central](https://apps.apple.com/us/app/speech-central-ai-voice-reader/id1127349155) and get a bit of depth.
4. Rinse and repeat. Use my improved understanding to ask better questions, reimplement my agent workflows, and keep spinning up the llm applications flywheel.

## Picaresque: Discovery Flywheel for "Coding Assistant"

I am currently building a term cloud (a list of terms) related to "coding assistant". My process is simply to use **the flywheel** on the research. I will feed the terms back into the corpus to find the top X papers for llm coding (from 2025-now). The corpus will then give better results for the topic. 

## Outcomes: Who judges the judge?

*Spoiler alert: it's too expensive and doesn't work*

I have learned some really interesting guidelines by following this research flywheel.

One example is the [judge](https://github.com/memgrafter/research-crawler-flatagents/blob/main/research_paper_analysis_v2/config/completeness_judge.yml):

### Guidelines 

* **Scoring is unreliable**. You can't use scoring in a vacuum. However, you can use it if you have some comparisons.
* **Abysmal scores are useful**. The judge is best used to gauge *adherence to general expectations* such as layout; not factual accuracy or detail quality.
* **Weaker models make good judges (and routers)**
* **Discard nonconforming output**. Don't try to repair/recast simple output, usually something went wrong (mdap/maker paper)

I haven't directly analyzed judge capabilities with the coding agent, so I think I will do that next. I have only done part of the flywheel.

For an example of a more detailed analysis, read these [lm council](https://github.com/memgrafter/analysis/tree/main/lm_council_methodology) documents.

## Unplanned Capabilities

Regarding the term cloud -- it's amazing what you can see without multi agent workflows. I didn't really expect codex-5.3(high) in pi to generate me this PNG file... what the hell? Anyways, this is what goes back through the research search. Next analysis is on programming assistants.

![coding assistant word cloud](/assets/coding_assistant_wordcloud_dark.png)

## Regarding Flywheel

I originally titled this post "LLM Research Flywheel" but **a flywheel is a stone battery**, and I just didn't want to reuse that broken analogy.

I have seen MANY such flywheel analogies from management over the years.

I think the analogy is broken; you can only take energy you put into a flywheel, it doesn't accelerate you. It's a stone battery.

But, you get what they mean immediately, and that's what matters.
