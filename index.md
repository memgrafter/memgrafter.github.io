---
layout: home
---

<div class="w">
  <ul class="post-list">
    {% for post in site.posts %}
      <li class="post-list-item">
        <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
        <span class="home-date">{{ post.date | date: "%b %-d, %Y" }}</span>
      </li>
    {% endfor %}
  </ul>
</div>
