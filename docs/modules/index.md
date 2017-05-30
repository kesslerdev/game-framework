---
layout: page
title: Quarkit core modules
permalink: /modules/
menu: main
order: 2
---

Quarkit __modules__ provide decorators to add features on yours games objects, such as a production behavior or an usable object.

### Built-in modules

{% assign modules = site.data.modules %}
{% for module in modules %}

## [{{module.name | capitalize }}]({{module.name}})

{{module.description | markdownify | remove:"<p>" | remove: "</p>"}}

{% if module.mixins %}
Mixins:
{% for mixin in module.mixins %}

* [{{mixin.name}}]({{module.name}}#{{mixin.name | slugify}}) - {{mixin.description | markdownify | remove:"<p>" | remove: "</p>"}}
 
{% endfor %}
{% endif %}
{% endfor %}