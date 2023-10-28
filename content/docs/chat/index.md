---
title: chat
---

## chat


![chat](chat.png)

**chat** lets you talk to other netpd users. Click into the symbol box and type
your message.

### chat's user interface

online (resp. offline)
: indicates whether chat is connected to a server or not. Use it to connect or
disconnect. **chat** will automatically try to connect the configured
[server](../server) when started.

list
: prints a list of all connected peers. Each entry also indicated whether
the respective peer has [unpatch](../unpatch) active.

pref
: opens dialog window to configure your [netpd-preferences](../netpd-preferences).

mute
: mutes and unmutes chat sounds (a bing when peers join or leave and a  click
on new chat messages).

dsp
: turns on and off Pd's audio computation. You can use it to turn any sound off

unpatch
: launches the [unpatch](../unpatch) instrument manager, it toggles it on and off.
By closing [unpatch](../unpatch) you terminate the running session on your end.
That means all your instruments will be closed and their state lost.


