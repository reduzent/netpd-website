---
title: FAQ
---

## FAQ

---

### How can I change my name?

Configure the `name` field in [netpd-preferences](../netpd-preferences)

---

### Can I use my live guitar playing in netpd?
Yes, you can use [evil](/instruments/evil) for live audio input.

---

### Can I use my Yamaha DX-7 with netpd?
Does it have MIDI? You could use it as midi-controller. You could
buildsomething like [pcr-30](/instruments/pcr-30) for it.

---

### Why do I get warnings from my firewall / AV protection?
Pure Data runs separate DSP and GUI processes which communicate through
a network socket over localhost. Make sure your firewall allows this
connection. (This mainly applies to Windows. There are no reports
from other OSs with that specific problem)

---

### What concern should I have about netpd's security issues?
Consider it insecure and read about [security](../security).

---

### Can I use samples in netpd?
Yes, there is a [netpd_sample] abstraction that synchronizes an audio
sample between peers. Check [simplesample](/instruments/simplesample)
or [ripple](/instruments/ripple) as examples that makes use of audio samples.

---

### Can I use netpd offline?
Sure. When you're not connected to a server, you still can do everything
without interference from other people.

---

### Are there other "rooms" to not disturb anyone while jamming?
**netpd** has (yet) no concept of rooms. All clients connected to the same
[server](../server) are in the same "room". However, it's easy to run many
[server](../server)s on different ports (or even different hosts).

---

### Can I change an existing instrument and increase the version tag?
Technically, yes. It would be polite to ask the original author for
consent, though. You could also give your version of the instrument a
different name. Reuse of patches and ideas is actually encouraged
in netpd. So, feel free to build your own stuff based on what you can
find.

---

### I'm rich and I love netpd. How can i support the project?
I don't know.

---

### A patch I want to port to netpd uses an external that isn't included in any standard Pd flavour. Can i still port it?
Yes, but it is unlikely the instrument will work out of-the-box for
other people. When everyone has the external installed, it is no problem.

---

### I recorded a great song with netpd. Can I upload it somewhere?
There are tons of sites for publishing audio material. If you really want,
you can put it to the [list of recorded sessions](/sessions/?C=N;O=D). Ask
[Roman](mailto:roman@netpd.org) to do it for you.

---

### What are good audio settings for netpd?
First, don't tune your system for low-latency when using netpd. Instead,
try to configure large buffers. Many operations in netpd are not real-time safe
and will trigger drop-outs (audible clicks), such as loading instruments
or effects. The tighter your buffer settings the more likely such
operations will generate audible clicks. By using large buffers, say 200ms
or even more, in Pd's audio dialog (`delay (msec)`), you give Pd time
to load files from disk without causing interruptions to the audio output.
Also, make sure to leave the `callback` setting disabled. Enabling
this is only useful for lowlatency setup. Enabling this while using JACK
will completely disable any buffers.

Another important parameter is the samplerate. The instruments dealing with
samples and live audio (like [ripple](/instruments/ripple) or
[evil](/instruments/evil)) don't perform any resampling. Thus, it's crucial
that all peers use a common samplerate. For historic reasons, **netpd** settled
on 44100 Hz. Recent versions of **netpd** warn when a different sr is detected.
