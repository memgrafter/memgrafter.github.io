---
layout: post
title: "LLM Research Applications Flywheel"
date: 2026-02-07 21:35:00 -0800
categories: blog
published: true
---

Status: *Draft*

Provenance: Handwritten

I am building a llm research applications flywheel. 

There are around 120 arxiv papers related to ML models published every day.

## Flywheel

1. Process papers via agentic workflows via [research discovery pipeline](https://github.com/memgrafter/research-crawler-flatagents/tree/main/discovery_pipeline). Store the papers in [analysis repo](https://github.com/memgrafter/analysis/)
2. Ask questions. Fire up gpt-5.3-codex in [pi coding agent](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent) and orient myself to the landscape.
3. Listen and learn. Paste individual digests or detailed analysis into [Speech Central](https://apps.apple.com/us/app/speech-central-ai-voice-reader/id1127349155) and get a bit of depth.
4. Rinse and repeat. Use my improved understanding to ask better questions, reimplement my agent workflows, and keep spinning up the llm applications flywheel.

---

Picaresque: Discovery Flywheel for "Coding Assistant"

I am currently building a term cloud (e.g. a list of terms) related to "coding assistant". My process is simply to use step 2 above on the research. I will feed this word back into the corpus to find the top X papers for llm coding (from 2025-now).  I will then add these terms to the paper corpus, and I may run the word cloud again at that point, or move on.

---

Outcomes: Who judges the judge?

(Spoiler alert: it's too expensive and doesn't work)

I have learned some really interesting guidelines by following this research flywheel.

One example is the [judge](https://github.com/memgrafter/research-crawler-flatagents/blob/main/research_paper_analysis_v2/config/completeness_judge.yml):

* Scoring is unreliable: you can't use it in a vacuum. However, you can use it if you have some comparisons.
* Abysmal scores are useful: judge is best used to gauge *adherence to general layout/expectations* not factual accuracy or detail quality, especially not quality. You can www, I recently used `pass/repair/fail`, although that isn't based on research..
* Weaker models make good judges (and routers)
* Discard nonconforming output: don't try to repair/recast simple output, usually something went wrong (mdap/maker paper)

I haven't even formally analyzed judge capabilties with a coding agent, so I think I will do this next.

For an example of a more detailed analysis, read these [lm council](https://github.com/memgrafter/analysis/tree/main/lm_council_methodology) documents.

Regarding the word cloud -- it's amazing what you can see without multi agent workflows. I didn't really expect codex-5.3(high) in pi to generate me this PNG file... what the hell? Anyways, this is what goes back through the research search. Next analysis is on programming assistants.

![coding assistant word cloud](/assets/coding_assistant_wordcloud_dark.png)

`/Users/trentrobbins/code/research_crawler/research_paper_analysis_v2/queries/word_clouds/coding_assistant_software_engineering.txt`
