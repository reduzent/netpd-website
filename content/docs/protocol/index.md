---
title: protocol
---

# Protocol

## Transport

### OSC
The protocol employed by **netpd** to connect client and server is based on
the [OSC 1.1](https://opensoundcontrol.stanford.edu/spec-1_1.html) protocol specification.
Some additional rules were applied on top of that specification that were
necessary for certain goals of the netpd framework. Those rules are described
on this page.

### OSC-over-TCP
The netpd framework is heavily dependent on a reliable message system where
data integrity can be ensured throughout. This requirement makes the
employment of UDP as the underlying network delivery protocol unsuitable
for the netpd framework, though it is widely used for OSC delivery. Since TCP
guarantees data integrity (messages are never lost, messages are received in
the same order as they have been sent), **netpd** builds on top of OSC-over-TCP.

### SLIP
For a packet oriented protocol like OSC to be delivered over a stream-oriented
protocol like TCP, a mechanism for separating individual packets is necessary.
The version 1.1 of the OSC specification establishes the use of
[SLIP](http://www.rfc-editor.org/rfc/rfc1055.txt) to solve that problem, which is
also used by **netpd**.

*Note*: The older 1.0 specification proposes to prepend a byte-count header to each
OSC packet before it is delivered over the stream-oriented protocol. This does not
work with **netpd**, as it strictly uses [SLIP](http://www.rfc-editor.org/rfc/rfc1055.txt).

### OSC Bundles
The OSC standard defines a way to pack one or several OSC messages into a so-called
*OSC bundle* which additionally has a built-in time stamp feature. Those *OSC bundles*
are not supported by **netpd** and support for them is yet not planned. At this time,
when sending an *OSC bundle* to the [netpd-server](/docs/server), the server will
silently disregard it. Only plain OSC messages are supported. Please refer to the
[OSC specification](https://opensoundcontrol.stanford.edu/spec-1_1.html) for the detailed definitions
of *OSC message* and *OSC bundle*.

### Layers
The following diagram illustrates how the several involved protocols are layered:

```
+-------------------------------------------------+
|  --------------------------------------------   |
| |   -------------------------------------    |  |
| |  |   -----------------------------     |   |  |
| |  |  |           NETPD             |    |   |  |
| |  |   -----------------------------     |   |  |
| |  |              OSC                    |   |  |
| |   -------------------------------------    |  |
| |                 SLIP                       |  |
|  --------------------------------------------   |
|                   TCP                           |
+-------------------------------------------------+
```

----------------------------------------------------------------------


## Message Format

### Notation
OSC is a binary protocol and a way to represent OSC messages in a string format
is needed for ease of use. It seems practical to use a similar message format as
it is understood by the ![packOSC] object class in Pd. The several elements of an
OSC message are separated by spaces. Numeric OSC data elements are assumed to be
Pd floats and thus are floats or ints in OSC, all others are considered Pd symbols
(OSC strings).

Example:

```
|OSC Address       | |OSC Data     |
|                  | |s | |s | |f  |
/this/is/the/address some data 12.34
```

### Receiver ID
The first field in the OSC address sent to the server is defined as the receiver ID.
The netpd-server checks this field of the incoming OSC message and forwards to the client
with that ID. There are special receiver IDs, including one for the server itself and
one for broadcasting OSC messages to all peers.

Every client in netpd is identified by an integer number (socket number), which is
assigned by the server at connection time (*Note*: the client needs to request that number
in order to know about it). Clients can send OSC messages to each other by prepending the
recipient's ID to the OSC address. Or they can send message to all other peers by prepending
`/b` to the OSC address of the message.

```
list of valid receivers IDs
---------------------------

/b          broadcast:     OSC message is forwarded to all connected clients

/s          server:        OSC message is forwarded to the server (or any additional server module)

/l          local:         OSC message is not sent to the server, but forwarded locally

/<socket>   socket number: OSC message is forwarded to the client with specified socket number.
```

**Note**: The receiver ID */l* is directly re-routed by the netpd-client and thus a message with this
receiver ID never reaches the server.

**Note**: Messages with invalid receiver ID are still sent to the server, but are discarded. The client
does not perform any receiver ID validation.

### Sender ID
When receiving an OSC message from the server, the first field in the OSC address is the sender ID.
This field actually is not useful for routing, but it can be used to know about the sender of the
OSC message. [[netpd-client]](../netpd-client) automatically removes that field, but tells its value
through an extra message (see [netpd-client])

To illustrate that with an example, we assume client 6 sends this OSC message to the server:

```
/3/megasynth/osc1/filter/freq 364.109
```

The server forwards the slightly modified message to client 3:

```
/6/megasynth/osc1/filter/freq 364.109
```

------------------------------------------

## Server methods

Besides acting as an OSC proxy for its clients, the server supports a small set of management features.
Mainly, it assigns a number - the client ID - to each of its clients. The clients need to request their
ID in order to know about it.  They do so by sending a message addressed to the server, which will be
responded by the server accordingly. Here an overview of all methods currently supported by the server
is shown:

```
list of server methods
----------------------

CLIENT      /s/server/socket                request the own socket number
SERVER      /s/server/socket <socket>       server sends this packet only to the requesting client

CLIENT      /s/server/ip                    request the own IP address
SERVER      /s/server/ip <ip address>       the ip address is formatted as a list with four numbers

CLIENT      /s/server/num_of_clients        request the number of currently connected clients
SERVER      /s/server/num_of_clients <num_of_clients>
                                            this message is broadcasted to all clients without being requested
                                            (push), whenever the number of connected clients changes

CLIENT      /s/server/protocol_version      request the protocol version
SERVER      /s/server/protocol_version <major> <minor>
```


