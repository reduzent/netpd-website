---
title: ' '
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

![netpd in action](images/netpd-in-action.png)

---
## news

### website overhaul

The website at https://netpd.org has experienced a major revision. It's
now based on [Hugo](https://gohugo.io/) (static website builder)
and the [whisper](https://github.com/zerostaticthemes/hugo-whisper-theme.git) theme.

### ripple - a sample-based synthesizer

[ripple](instruments/ripple) records audio samples and plays them back in three different
modes. Finally an instrument that fully uses [unpunch](docs/unpunch)'s features.

### ep-mk2 - an e-piano emulation

Originally written by Mike Moreno, this physical modelling based instrument
was ported to netpd. Check [ep-mk2](instruments/ep-mk2).

### [Discourse](https://www.discourse.org/) for the community

Please check https://untalk.netpd.org, the place for the netpd community
to get help and discuss matters.

