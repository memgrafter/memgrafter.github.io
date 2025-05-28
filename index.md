---
layout: home
---

<ul class="post-list">
  {% for post in site.posts %}
    <li class="post-list-item">
      <span class="home-date">{{ post.date | date: "%b %-d, %Y" }}</span>
      <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </li>
  {% endfor %}
</ul>
