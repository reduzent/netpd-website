---
title: 'evil'
---

## evil

![evil](evil.png)

**evil** transmits live audio input to all connected clients. On the receiving
end, audio is played back with a pre-defined delay so that audio input
is musically aligned to the other instruments.

### Usage


For each loaded instance of  **evil**, there can only be one client acting as
sender, while the transmitted stream is received by all clients, the
sender included. For becoming a sender, three conditions need to be met:

- [master](../master) (the master clock) needs be running
- DSP needs to be turned on
- ownership needs to be assigned to the sending client

You can claim ownership by clicking *owner* in the gui. Once those conditions
are met, the *transmit* button (top left square) turns from black to dark green
to indicated readiness. Sending audio starts as soon as the *transmit* button is
pressed. A receiving stream is indicated by the green *buffer* progress bar
filling up. The orange *playback* bar displays the audio level of the received
audio. As long as the *transmit* button is green, the stream is running. The
streaming is stopped by clicking the *trasmit* button again.

### Some notes


#### Bandwidth

**evil** transmits one channel as 16bit PCM at Pd's current sampling rate. This
amounts to roughly 100 kB/s at 44.1 kHz each way.

#### Congestion

**evil** makes sure that all clients receive the stream in time. If one client
experiences a buffer underrun, it notifies the sender instance, which then
immediately stops transmitting. If transmission keeps stopping often soon
after start, this could mean that at least one client doesn't have enough
bandwidth for evil to work properly. It could also mean that one client's
clock is ahead in time. Make sure that all participating client's [master](../master)
is in sync.

#### Correct timing

**evil** tries to start playback exactly aligned to the generated instruments,
offset by the delay in the *delay* parameter. This only works correctly, if
the effective round-trip audio latency is configured correctly in
[netpd-preferences](/docs/netpd-preferences).

