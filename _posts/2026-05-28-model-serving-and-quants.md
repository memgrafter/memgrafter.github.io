---
layout: post
title: "Model Serving & Quants"
date: 2026-05-28 17:11:57 -0700
categories: blog
published: true
---
Provenance: **Handwritten**

I've been working with a lot of different GPUS and a lot of different quantizations of Qwen 3.6 27B this month.

The art of circumscribing a well-formed question is the art of iteratively describing (and hopefully refining) the answer space.  Here's my current form.

Today, I have a question. There is nowhere to answer this question on this blog.

Can I functionally differentiate these? This evaluation is for RTX PRO 6000 WS (blackwell).

* [https://huggingface.co/cyankiwi/Qwen3.6-27B-AWQ-BF16-INT4](https://huggingface.co/cyankiwi/Qwen3.6-27B-AWQ-BF16-INT4)
* [https://huggingface.co/QuantTrio/Qwen3.6-27B-AWQ](https://huggingface.co/QuantTrio/Qwen3.6-27B-AWQ)

I see a small difference in my test data, but it's possibly noise. Cyankiwi seems to win due to mtp=2 having 10 point higher MTP acceptance (85% vs 75%), comes out to 450 tps across c=8 whereas QuantTrio hits 400 tps.

I did not find a NVFP4 I like. The only fast NVFP4 I found runs faster than the AWQ quants (data isn't that good) BUT probably has degraded benchmarking from a finetune (hermes dataset). Not sure on prefill, but I probably have stored gauges and prometheus metrics. Carnice NVFP4 run is not apples to apples, not sure if tps will beat at c=8 but not testing due to benchmark fails / uncertain finetune. Carnice prefill was VERY fast compared to the other 2.

I used the qwen official NVFP4 with MTP=2, tps matched QuantTrio (worst of the bunch) but prefill tps did not match Carnice, which is super frustrating!  Maybe NVFP4 Carnice has something wrong with it causing the speedup (overquantized or something that should not be).

Cyankiwi was 2nd best prefill tps as well.

I've included some config partials used in some scripts I let a LLM drive.  Those would evolve into a service if it was a business.

* [https://github.com/memgrafter/vast-ai-provisioning/blob/main/config/models/qwen3.6-27b-awq.pro6000ws-performance-256k-mtp2.json](https://github.com/memgrafter/vast-ai-provisioning/blob/main/config/models/qwen3.6-27b-awq.pro6000ws-performance-256k-mtp2.json)
* [https://github.com/memgrafter/vast-ai-provisioning/blob/main/config/models/qwen3.6-27b-awq.quanttrio-pro6000ws-performance-256k-bf16kv-mtp2.json](https://github.com/memgrafter/vast-ai-provisioning/blob/main/config/models/qwen3.6-27b-awq.quanttrio-pro6000ws-performance-256k-bf16kv-mtp2.json)
* [https://github.com/memgrafter/vast-ai-provisioning/blob/main/config/models/carnice-v2-27b-nvfp4-text-mtp.pro6000ws-performance-256k-mtp3.json](https://github.com/memgrafter/vast-ai-provisioning/blob/main/config/models/carnice-v2-27b-nvfp4-text-mtp.pro6000ws-performance-256k-mtp3.json)

Dataset is answering pregenerated leetcode questions (fanout on local).  Very little prefill, tons of decode (thinking && output).
