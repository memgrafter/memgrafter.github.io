---
layout: post
title: "Markdown Elements Test Post"
date: 2026-02-07 21:40:00 -0800
categories: [Test, Markdown]
tags: [markdown, syntax, demo]
published: false
---
Status: *draft test post*

This post is a markdown syntax sandbox to test rendering of common elements.

---

## Headings

# H1 Heading (inside content)
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

## Paragraphs and Line Breaks

This is a normal paragraph with **bold**, *italic*, and ***bold italic*** text.

This line ends with two spaces for a line break.  
This should appear on the next line.

~~Strikethrough~~ and `inline code` are included too.

## Blockquotes

> This is a blockquote.
>
> > This is a nested blockquote.
>
> Back to the first level.

## Lists

### Unordered

- Item one
- Item two
  - Nested item two.a
  - Nested item two.b
- Item three

### Ordered

1. First
2. Second
   1. Second.a
   2. Second.b
3. Third

### Task List

- [x] Done task
- [ ] Open task

## Links

Inline link: [Memgrafter](https://memgrafter.github.io/)

Reference link: [GitHub][gh]

Autolink: <https://jekyllrb.com>

[gh]: https://github.com

## Images

Image:

![Coding assistant word cloud](/assets/coding_assistant_wordcloud_dark.png)

Linked image:

[![Word cloud thumbnail](/assets/coding_assistant_wordcloud_dark.png)](https://memgrafter.github.io/)

## Code Blocks

```js
function hello(name) {
  return `Hello, ${name}`;
}
console.log(hello("markdown"));
```

```bash
echo "Testing markdown rendering"
ls -la
```

    This is an indented code block.
    It should render as preformatted text.

## Table

| Column A | Column B | Column C |
|:---------|:--------:|---------:|
| left     | center   | right    |
| one      | two      | three    |

## Horizontal Rule

---

## Footnote

Here is a sentence with a footnote.[^1]

[^1]: This is the footnote content.

## Definition List (Kramdown)

Markdown
: Lightweight markup language.

Jekyll
: Static site generator.

## Escaping Characters

Use a backslash to escape markdown syntax: \*not italic\*, \# not a heading.

## Abbreviation (Kramdown)

The HTML specification is large.

*[HTML]: HyperText Markup Language

## Raw HTML

<details>
  <summary>Click to expand</summary>
  <p>This is raw HTML inside markdown.</p>
</details>

## End

If all sections render correctly, markdown support is working well.
