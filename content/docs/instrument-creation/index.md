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

#### Natural habitat of instruments
Instruments work only when loaded by [unpatch](../unpatch). If you're
familiar with UNIX shells, think of it as [unpatch](../unpatch)  setting
some environment variables for the instrument to work properly. It tells the
instrument where to look for loading [netpd-abstractions](../netpd-abstractions)
and its own declared dependencies. Also, [unpatch](../unpatch) assigns a
unique ID to each instrument. This allows many instances of the same instrument
to be loaded in [unpatch](../unpatch). Loading an instrument in Pd directly
most likely triggers a bunch of `.. couldn't create` errors and the patch
fails to work as expected. Thus, also the development of a new (or existing)
instrument needs to happen while being loaded by [unpatch](../unpatch).

### Create the boilerplate
[unpatch](../unpatch) helps you create a new instrument skeleton from scratch.
You just need to come up with a name for your new instrument. Ideally, the
name is easy to type, which makes it easier to load your instrument into
a session. It's established to use lower-case letters, numbers and dashes.

#### Protection mode
Normally, [unpatch](../unpatch) would automatically transfer any open
instruments to other peers when they join the session and don't have a copy themselves.
Since you're going to start  developing your instrument, you might want to prevent
[unpatch](../unpatch) from doing so. You can enable protected mode (where
[unpatch](../unpatch) doesn't interact with other peers) by typing the following
to the [chat](../chat) text input:

```
/unpatch protect on
```

A small umbrella (☂) near the *unpatch* label indicates that [unpatch](../ubpatch)
is running in protected mode now.

#### Start with the template
If you know a name, launch [unpatch](../unpatch) and type the following into the
[unpatch](../unpatch)'s text input (slightly darker area in the center):

```
/new anapoly
```

A new instrument appears in [unpatch](../unpatch)'s lower section with the name
you specified (*anapoly* in our example). Click on it and an empty patch opens.
This is the subpatch where the new instrument's graphical user interface is going
to live. The more interesting part - the main patch - is still hidden. You can
access it through the menu _Window_ -> _Parent Window_.

**Tip**: This applies to all instruments. If you want to study how a certain
instrument works internally, go to its main patch through the _Window_ menu.

Now let's go through some of the elements of your new instrument that every
instrument contains:

#### The Innards
##### ![pd NETPD 2 0](netpd_metatags.png)- The metatags

This is the container for the so-called **netpd** metatags. When loading an instrument
with [unpatch](../unpatch), it will parse the content of this subpatch before
loading the instrument. The numbers `2 0` specify the the metatag format version.
Currently, **netpd** only supports this one version, so it is always `2 0`. If you click
on the object, it will show its contents in a new window.

There you find a message box
![version 0 0 0](netpd_version.png). Whenever you change your instrument, make sure to
bump the version to a higher value. Which one of the three numbers you bump, is up to you.
This tells [unpatch](../unpatch) to transfer your instrument to your peers, if
your version is higher. As said before, the `version` metatag is mandatory and
[unpatch](../unpatch) refuses to load your instrument with an error message if it is
missing.

The subpatch ![pd abslist](netpd_abslist.png) is a container for the declarations of
the dependencies of your instrument. It opens another canvas when you click on it.
If your instruments uses abstractions, you would declare them there by putting
a message box like ![anapoly-voice](netpd_anapoly-voice.png) for each abstraction.
Also, the abstractions of your instrument require a metatag declaration
(![pd NETPD 2 0](netpd_metatags.png)) with at least a version.


##### ![pd $1-anapoly](netpd_gui-canvas.png)- The GUI
This subpatch is displayed when you click on the instrument's name in [unpatch](../unpatch).
In other words: The content of this subpatch is what the users see when using
your instrument. You put everything what controls your instrument in there: sliders,
number boxes, radios, toggles, etc. Remember that also the window position and
size of this canvas is saved with your instrument. You might use to full potential
of your creativity to design this canvas.

The `$1` is a variable set by [unpatch](../unpatch). It is evaluated to the ID, the number
shown near the instrument's name in [unpatch](../unpatch). This number is unique for
each instrument. The part after the `-` must be set to the instrument's name. The combination
`3-anapoly` is the title of the GUI window of your instrument.

##### ![netpd_head $1 anapoly](netpd_head.png)- The state manager
This abstraction is responsible for the communication with the other peers' copy
of your instrument. It also initiates full dumps when saving current state with
[unpatch](../unpatch)'s `save` button. Every instrument requires exactly one
`[netpd_head]`. The first argument is always `$1`. The second argument must be
set to the name of your instrument. The ID and the instrument name are also
used in the OSC messages that are triggered when one of the controls of your
instruments is touched. `[netpd_head]` prepends `/3/anapoly` (ID, name) to the
OSC path of each OSC message generated by your instrument.


##### ![netpd_f $1 param2 120](netpd_f.png)- A numeric parameter
Now, the actual fun begins. `[netpd_f]` is responsible for handling
a numeric parameter of your instrument. It ensures that a value change
is sent to all peers. Each parameter requires an instance of `[netpd_f]`.
The first argument is always `$1` (which evaluates to the ID). The second
argument is the parameter name. You can give it any name, as long as it is
unique within your instrument. The third argument sets the initial value.
When the instrument is loaded, the parameter will be set to this value.


