---
title: security
---

## security
**netpd** is inherently insecure, since by design it executes code
written by others. Anyone can upload and run any Pd patch on other
people's computers while they are running **netpd** and connected to
the server. Altough it hasn't been seen in the wild, there is a lot
of harm one could do with a patch.

**netpd**'s security model is the decency of its users. It doesn't try
to become secure by technical means. This is uncommon for a software
that uses the internet nowadays. Please be aware of that.

Consider the following advices when running **netpd**:
- Only jam with people you know.
- Run Pd under a seperate user account or in a container with as
  little privileges as possible. Actually, **netpd** needs write permissions
  to the instruments folder and read permissions for the netpd directory.
- Enable `ask before downloading` in [netpd-preferences](../netpd-preferences)
  and examine what is actually downloaded.
- Make sure to uninstall any external that increases the attack surface,
  namely [command], [shell] and the like.

