# Quarkit core quarks
{% for q in quarks %}

{% set quark = quarks[q] %}
## {{ quark.quark | title }}

{% if quark.quarks %}
### Parents
{% for c in quark.quarks %}

* [{{ c }}](#{{ c|lower }})

{% endfor %}
{% endif %}

{% if quark.properties %}
### Properties
{% for name in quark.properties %}

* {{ name }} = {{ quark.properties[name] }}
 
{% endfor %}
{% endif %}

{% if quark.deepProperties %}
### Deep properties
{% for name in quark.deepProperties %}

* {{ name }} = {{ quark.deepProperties[name] }}
 
{% endfor %}
{% endif %}

{% if quark.propertyDescriptors %}
### Properties Descriptors
{% for name in quark.propertyDescriptors %}

* {{ name }} {# = {{ quark.propertyDescriptors[name] | tojson(indent=2) }} #}
 
{% endfor %}
{% endif %}

{% if quark.methods %}
### Methods
{% for name in quark.methods %}

* {{ name }} ( {% for arg in quark.methods[name].args %}{{arg}}{% if not loop.last%}, {% endif %}{% endfor %} )
 
{% endfor %}
{% endif %}

{% if quark.staticProperties %}
### Static Properties 
{% for name in quark.staticProperties %}

* {{ name }}{% if quark.staticProperties[name].args is defined %} ( {% for arg in quark.staticProperties[name].args %}{{arg}}{% if not loop.last%}, {% endif %}{% endfor %} ){% else %} = {{ quark.staticProperties[name] }} {% endif %}
 
{% endfor %}
{% endif %}

{% if quark.deepProperties %}
### Static Deep properties
{% for name in quark.staticDeepProperties %}

* {{ name }} = {{ quark.staticDeepProperties[name] }}
 
{% endfor %}
{% endif %}

{% if quark.staticPropertyDescriptors %}
### Static Properties Descriptors
{% for name in quark.staticPropertyDescriptors %}

* {{ name }} {# = {{ quark.staticPropertyDescriptors[name] | tojson(indent=2) }} #}
 
{% endfor %}
{% endif %}

{% if quark.staticMethods %}
### Static Methods
{% for name in quark.staticMethods %}

* {{ name }}( {% for arg in quark.staticMethods[name] %}{{arg}}{% if not loop.last%}, {% endif %}{% endfor %} )
 
{% endfor %}
{% endif %}

{% if quark.configuration %}
### Configuration
{% for name in quark.configuration %}

* {{ name }} = {{ quark.configuration[name] }}
 
{% endfor %}
{% endif %}

{% if quark.deepConfiguration %}
### Deep configuration
{% for name in quark.deepConfiguration %}

* {{ name }} = {{ quark.deepConfiguration[name] }}
 
{% endfor %}
{% endif %}


{% endfor %}