---
---


## about

**netpd** is a CRNMME (**C**ollaborative **R**ealtime **N**etworked **M**usic **M**aking **E**nvironment)
built in [Pure Data](https://puredata.info/). It allows many users to  have a realtime
jam sessions with each other, connected over the internet.
Users might contribute their own netpd-ized patches a.k.a. instruments
or use pre-existing ones. The set of instruments, as well as the state of
each instrument is synchronized between clients in order to provide identical
experience for every connected user.

**netpd** was designed with music in mind, but it might serve well also
other purposes, where realtime state synchronization is a requirement.

---

## sitemap
[Overview of all pages](/sitemap)

---

![netpd in action](images/netpd-in-action.png)

---
## news

### netpd v2.3.4 released

Features and changes:
* move preferences to `~/.netpd.cnf` so that it survives netpd upgrades
* add pop-up dialog for messages that should not go unnoticed
* warn about some conditions with mentioned pop-up:
  * warn about non-standard samplerate (important for sharing audio)
  * warn about uninitiated disconnects to prevent unnnoticed split-brain situations
* new abstractions:
  * netpd-default: output default value if arg of parent is not specified
  * netpd-error: helper for displaying error messages
  * netpd-warning: helper for displaying warning messages
  * netpd-line-wrapper: allows to display multi-line text on GUI objects
* suppress clock sync messages in debug output
* various other fixes

[Get it](/download) while it's hot!


### untik brings a new clock system

[untik](/instruments/untik) is a new clock that replaces [master](/instruments/master) and
is much more capable. It replaces the poly stuff that was implemented seperately on
different sequencers. [untik](/instruments/untik) allows to play arbitrary patterns with freely
adjustable time intervals and thus covers much more than polyrhythms and shuffle (which was either
or with [master](/instruments/master)). It features a pattern editor where timing invervals
can be adjusted. 

[untik](/instruments/untik) brings a whole new clock system with a unified interface. Each
instrument that consumes a clock can now select a clock source from many available.
[untik](/instruments/untik) provides up to 8 clocks with each providing a separate
timing pattern from which sequencers can choose from. Integrating new instruments into
the untik eco system is as simple as adding two abstractions. Integrating your own
clock provider is almost as simple.

The switch from [master](/instruments/master) to [untik](/instruments/untik) required
changes in all instruments that consume clock data in any form, including sequencers
and many effects. They all have been converted to the [untik](/instruments/untik)
clock system. Those changes are not backwards compatible and the switch means that
old saved session won't be loaded correctly. However, it is possible to fix them
by manually setting the clock source everywhere.

The old [master](/instruments/master) clock is still available, but also has been
converted to the [untik](/instruments/untik) system so that the upgraded instruments can still use it.

### website overhaul

The website at https://netpd.org has experienced a major revision. It's
now based on [Hugo](https://gohugo.io/) (static website builder)
and the [whisper](https://github.com/zerostaticthemes/hugo-whisper-theme.git)
theme. The content is hosted in a [git repository](https://github.com/reduzent/netpd-website).
The old site was moved to [https://old.netpd.org](https://old.netpd.org)

