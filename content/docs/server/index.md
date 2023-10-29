---
title: netpd-server
---

## netpd-server

**TODO**: The content of this page partially overlaps with content of
[protocol](../protocol). Better separation of topics is needed.

Basically, the netpd-server acts as an OSC ([Open Sound Control](https://opensoundcontrol.org/introduction-osc))
packet relay service: it forwards incoming OSC packets to one or many
clients. The first field of the OSC address of an OSC packet from a client
is considered to be the receiver ID. This may be a number that identifies a
connected client, but some more receiver IDs with special meanings are
valid, too. The netpd-server reads this field and forwards the message
accordingly. While doing so, the netpd-server replaces the receiver ID by
the sender ID, i. e. the socket number of the sender of the packet. The
receiving client might just read the first field of the address to know where the OSC packet originated. 

```
list of valid receivers
-----------------------

/b          broadcast:     OSC packet is forwarded to all connected clients

/s          server:        OSC packet is forwarded to the server (or any additional server module)

/<socket>   socket number: OSC packet is forwarded to the client with specified socket number.
                           there are some restrictions about the socket number format:
                             - it must be an integer (floats are ignored)
                             - it must not contain any other characters than digits from 0 -> 9
                             - it must not exceed 6 digits (due to pd's way of representing high numbers)
                             - it can contain preceding zeros as long as above requirements are met
```

#### Modules

The server is intended to provide minimum functionality needed for a working
setup. However, the functionality of this server can be expanded by modules.
Modules are patches, that are started within the same instance of pd as the
server patch. the server patch provides a simple API, so that methods provided
by modules can be called transparently. each module is addressed by the second
field of the OSC address. if there is a module `log` listening on `/log` on
the server, it can be addressed from the client with `/s/log`.

#### Server methods

The server patch provides its methods on `/server`, respectively on `/s/server`
(from the clients perspective).

```
list of server methods
----------------------

CLIENT      /s/server/socket            request the own socket number
SERVER      /server/socket <socket>     server sends this packet only to the requesting client

CLIENT      /s/server/ip
SERVER      /server/ip <ip address>     the ip address is formatted as a list with four numbers

SERVER      /server/num_of_clients <num_of_clients>
                                           this message is broadcasted to all clients without being requested
                                           (push)

```


