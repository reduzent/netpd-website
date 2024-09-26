---
title: 'untik'
---

## untik

**untik** provides a clock for clock consumers like sequencers, etc. It is an
evolution of the previous standard clock instrument [master](../master/) as
it extends the notion of what a clock does and is.

### bars, beats, ticks
Besides ticks, it divides time in divisions ("bars") and subdivisions ("beats").
This allows clock consumers to express time intervals in more human-friendly
formats (e.g. 16 bars is easier to deal with than 256 ticks).

### time patterns
Beside the typical ticks with a steady time interval, **untik** allows you
to create time patterns with irregular time intervals and with adjustable
number of ticks per settable number of regular ticks (of the main clock).
**untik** plays all active patterns in sync and clock consumers may pick one.
You can have instruments play ternary rhythms while other instruments play
quaternary rhythms at the same time. You can create a simple 4-tick pattern
where the fourth tick is a tad bit late. Time patterns offer a lot of
possibilities and are much more versatile than the shuffle parameter and
the poly implementation of [master](../master/).

### unified interface
**untik** is not only a new clock, it is a clock system with a unified
interface for clock consumers and clock providers. Since **untik** offers
many clocks to pick from (if you activate and edit time patterns), clock
consumers need a way to select one. This is handled with a single abstraction
called `[untik-clock-consumer]`. It makes it really easy to integrate your
clock consuming instrument into the **untik** system. There is also
`[untik-clock-provider]` for instruments that generate their own clock
and want it to make available to clock consumers.


### main section
![untik](untik.png)

start/stop (square on the left)
: start and stop the clock.

bpm
: set the speed in beats per minute.

beats
: defines how many beats a bar consists of.

ticks
: defines how many ticks a beat consists of. This also affects the tick rate
for a given tempo. The more ticks the higher the rate so that the higher number
of ticks fits into the same beat length.

pos
: displays the current clock position (with zero-based counting)

bar
: displays the current bar (with one-based counting). A bar is beats\*ticks long.

beat
: displays the current beat within a bar (with one-based counting).
A beat is tick\*ticks long.

tick
: displays the current tick within a beat (with one-based counting).

sync delay
: displays the the sync delay to the peer with the most advanced clock. When
`auto`is enabled, delays above 300ms trigger a sync adjustment, which means that
our clock jumps forward to compensate for the delay. Whenever this happens, a
message is printed to the Pd console. The sync delay is never negative as
by definition the most advanced clock among peers is the reference time. With
auto syncing disabled, you can still compensate the delay by clicking on the
number. `ms` / `ticks` defines whether the measured delay is shown in clock ticks
or in milliseconds.

pattern editor
: opens another window that hosts the pattern editor.

loop editor
: opens another window that hosts the loop editor.


### pattern editor
![untik-pattern-editor](untik-pattern-editor.png)

pattern selection
: sjdklfa jksdf ksajlfd

pattern editing
: sjkls dfa sdjklsafd

pattern properties
: jklsd jkslfdskjdlf sdkl

### loop editor
![untik-loop-editor](untik-loop-editor.png)

enable start from
: jskdlf asjdklas dfjkl

from
: sdjlk sdjklsd fjkl

: sdjlksd fjklsd

enable loop for
: sjdlkas df

loop length
: jlksd sjklsdf jklsdf

loop length unit
: sdkjl asdjklas fdjkasdfjlk

**TODO**
