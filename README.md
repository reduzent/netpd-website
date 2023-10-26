# https://netpd.org
## now made with hugo

The site at netpd.org has been running as ZWiki instance in an outdated Zope server
running on Python 2 for decades. It's time to retire ZWiki and migrate content
to a contemporary CMS that makes management easier and uses a more responsive
design. This is an attempt to migrate everything to [hugo](https://gohugo.io/).

## Some notes for myself

#### Clone

Check out this repo like this:

```
git clone --recurisve git@github.com:reduzent/netpd-website
```

#### Run hugo as local webserver for live editing

```
hugo server --disableFastRender --noHTTPCache --gc --bind 0.0.0.0
```

There is still a lot I don't understand and I struggled hard to
suppress many of its features. Most likely I do many things in a
non-sensical way. Feel free to suggests improvements.

