---
title: 'docs'
---

## Get started

### Install dependencies
In order to run **netpd**, you need to have [Pd](http://msp.ucsd.edu/software.html) >= 0.52
and some externals installed.

The following externals are required:
- iemlib
- iemnet
- osc
- slip

Externals are installed through Pd's menu *Help* → *Find Externals*. Search for a
library name and click on the result to install it.

*Note:* **netpd** only supports vanilla [Pure Data](http://msp.ucsd.edu/software.html).
**netpd** does not work with Pd-L2ork, because it introduced incompatibilities with vanilla Pd.

### Install netpd
Download **netpd** from the [download](../download) section. The client software and the
instruments are hosted separately. If you want to make music right away using pre-built
instruments, pick the bundle.

Unpack the archive to any location you have write access. That's it.

### Run netpd:
- Open `netpd/main.pd` with Pd.
  [chat](/docs/chat) automatically connects to the server and you can
  now chat with other peers that are currently online.
  Click *list* to get a list all connected users.
- Click the *unpatch* button in chat to launch
  the [unpatch](../docs/unpatch) instrument manager. If there is already a
  session going on, the [instruments](../instrumets) used in the ongoing
  session are automatically loaded (they are first downloaded from other peers,
  if necessary).
- Load [instruments](../instrumetns) into the current session by clicking on
  any of the instrument names in the upper scroll list.
  Alternatively, just type the name of the instrument (without the
  extension `.pd`) into the input box and hit enter.
- Display an instrument's GUI by clicking on its name in [unpatch](../docs/unpatch).
  You can now manipulate the instrument's parameters. Any changes are instantaneously
  synchronized between clients. Anyone can manipulate anything, so please be
  cautious and considerate when joining an ongoing session.

If you're lucky, someone is online and might help you get started. This is the easiest
and fastest way to get accustomed to all the [instruments](../instruments) and how they
interact with each other. Of course, you can explore the [instruments](../instruments)
on your own as well. Maybe start with [master](../instruments/master) and
[sine](../instruments/sine).

------------------------

## Instruments

### Using instruments

There are a handful of instruments available for netpd. Those are described
in their own [instruments](../instruments) section.

### Creating instruments

**TODO**: Document instrument creation

------------------------

## related topics

- [Paper describing netpd (PDF)](netpd-lac2013-paper.pdf)
- [protocol](../docs/protocol)
- [server](../docs/server)
- [FAQ](../docs/faq)
- [security](../docs/security)


