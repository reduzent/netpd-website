---
title: instrument creation
---
# [DRAFT]
## instrument creation

### What is an instrument?
In **netpd** terminology, an instrument is a [Pure Data](https://puredata.info)
patch that can be loaded by the [unpatch](../unpatch) instrument manager. For
this to work, a patch used as **netpd** instrument needs to fullfil certain
properties which are described in this document. Mostly, you don't need to
understand the inner working of **netpd** in order to create your own
instrument or to convert an existing patch into an **netpd** instrument.
Some more involved ideas might not be realized with ready-made solutions
and require a deeper understanding of the **netpd** framework to be
implemented. In such cases, it is advised to study existing instruments that
are similar or share some concepts. The typical cases, however, are covered
here.

Contrary to its name, an instrument doesn't necessarily produce any sound.
Also sequencers or graphics generators are considered instruments. Common
to all kinds of instruments is that they share their state among peers. The
controllable parameters are synchronized so that the result (sound,
sequence pattern, graphic) is the same on all participants' computers.
Whenever a parameter changes its value, the change is propagated through
the server to all peers. This ensures synchronicity throughout a session.
The origin of the parameter change doesn't matter. Any peer can modify
any parameter at any time and the resulting experience is the same for all
peers. Another property of instruments is that their state is managed.
When a peer joins an already ongoing session, they receive a full state dump
from their peers. This happens transparently and does not have to be
implemented for each instrument separately.

#### Features of instruments
- **Instruments use abstractions** for certain functions, such as state management
and parameter synchronization, and which are provided by **netpd**,  the so called
[netpd-abstractions](../netpd-abstractions).
- **Instruments are versioned.** [unpatch](../unpatch) uses the instrument version to
decide whether the instruments needs to be transferred to a peer or not. Instruments
are only transferred from the peer who initiated the loading of the instrument
to the other peers. If a receiving peer already has the instrument with the same
or higher version, this version of the instrument is kept and the transfer aborted.
- **Instruments can declare dependencies.** Dependencies are abstractions in Pure
Data jargon. Abstractions are re-usable parts that can be instantiated once or
many times in an instrument. The same abstraction can be used by many instruments.
Contrary to instruments, which are saved in `netpd/instruments`, abstractions
are saved in `netpd/instruments/abs`. Abstractions are also versioned and they
can also declare their dependencies. There is no limit to the nesting of
dependency declarations.
- **Instruments have a graphical user interface** which is displayed to the user
when clicking on the instrument's name in [unpatch](../unpatch). When an
instrument is used (as opposed to developed), the guts (the patching required
for the instrument to work) stay hidden.

While the declaration of dependencies is optional, the declaration of a version
is mandatory. This applies to both, instruments and their abstractions.

**Note**: Instruments work only when loaded by [unpatch](../unpatch). If you're
familiar with UNIX shells, think of it as [unpatch](../unpatch)  setting
some environment variables for the instrument to work properly. It tells the
instrument where to look for loading [netpd-abstractions](../netpd-abstractions)
and its own declared dependencies. Also, [unpatch](../unpatch) assigns a
unique ID to each instrument. This allows many instances of the same instrument
to be loaded in [unpatch](../unpatch). Loading an instrument in Pd directly
most likely triggers a bunch of `.. couldn't create` errors and the patch
fails to work as expected. Thus, also the development of a new (or existing)
instrument needs to happen while being loaded by [unpatch](../unpatch).
