---
title: netpd-abstractions
---

## netpd-abstractions
These [abstractions](https://puredata.info/docs/manuals/pd/x2.htm#s7.1) are
provided by **netpd** and are used for creating [instruments](/instruments).
They make sure that the state of an instrument stays synchronized any time
between peers. They convert control (and in some cases audio) data to
outgoing [OSC](https://opensoundcontrol.stanford.edu/) messages and also
incoming OSC messages back to control (and audio) data.

[netpd_head $1 mysynth]
: Every instrument requires exactly one [netpd_head]. It's first argument
must be `$1` (this evaluates to the numeric ID given by [unpatch](../unpatch))
and the second argument sets the instrument name. This is the same name as the
patch's name without the `.pd` suffix.

[netpd_f $1 floatparam]
: Every numeric control parameter of the instrument (slider, toggle, radio,
numberbox [nbx]) uses a [netpd_f] in order to synchronize it between peers.
It outputs the received value through the outlet and updates the state of
the control object (slider, radio, toggle, or numberbox). The second argument
specifies the parameter name, the optional third argument the initial
default value. For the interaction with the GUI object to work, both, the send
and receive symbol of the GUI object need to be set to `$1-floatparam`.
**Note**: Do not use the classic numberbox with [netpd_f], since this one
lacks feedback protection and cannot use the same symbol for send and receive.

[netpd_a $1 listparam]
: Accepts messages of any type: float, symbol, list. However, it does not interact
with any GUI objects directly.

[netpd_t $1 table]
: Syncrhonizes a table. The table to be synchronized needs to be named `$1-table`
and can be of any size between 2 and 2048. [netpd_t] detects any changes applied
by messages, but also manual changes (when you draw into the table with your mouse).

[netpd_text $1 text]
: Synchronizes a [text] object. You can use it almost like the original
[text] object, but operations that modify the state happen asynchronously
because they travel through network before application.

[netpd_sample $1 sample]
: Synchronizes an audio sample. It can record audio through inlet or read audio
from file or from another table. It can hold at most 1 min worth of audio data.
Objects like [tabplay~], [tabread~], etc. can access the audio sample through
the name `$1-sample-table`.

[netpd_s $1 sendname]
: Raw netpd-ized send. Since it lacks any state management, it is useful
only in special instances.

[netpd_r $1 receivename]
: Raw netpd-ized receive. Since it lacks any state management, it is useful
only in special instances.

**Note**: All above abstractions have their own help with more comprehensive
documentation.
