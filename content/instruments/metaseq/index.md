---
title: 'metaseq'
---

## metaseq

![metaseq](metaseq.png)

**NOTE** Above images show new version of **metaseq** that is compatible with
[untik](../untik/). However, the documentation below hasn't been (fully ) updated.

**metaseq** is a time-line slicer that acts as a middle man between the a linear main  clock
(like [untik](../untik)) and a
sequencer. It lets you arrange timeline segments freely in order to create more complex
sequencing structures. Such arrangements are organized in sets. Sets can be chained in
order to build even more complex structures. Since **metaseq** fully integrates into the
[untik](../untik) clock system, it is fully compatible with any existing sequencer.
**metaseq** sets are themselves untik clock consumers and at the same time clock providers
and thus can freely interact with each other.


### left-hand part: sets

There is a fixed number of eight sets available (yeah, the old pre-untik **metaseq** had
virutally infinite sets, which unfortunately was not possible with the new system).
Each set provides the following parameters for editing:

clock selection
: choses any clock from the available clocks. This includes **metaseq** sets with a non-zero
number of segments.

div
: clock divider factor. Makes the input clock slower by an integer factori. For instance,
when div is set to 4, for every forth input tick the set tick is advanced by one.

shift
: shifts the set timing-wise to the right. This means the set starts playing only when the clock
reaches the value of shift.  
**Note**: The shift parameter has only an effect when length is non-zero. The slightly greyed out
color indicates when shift is not active.

length
: sets the length in ticks for which the set is played. When length is 0, the configured
sequences of the set (right-hand part) are looped indefinitely. If the length is greater
than length of the right-hand part (sum of sequences), the right-hand part is looped for
as long as necessary to reach the configured length.

pos
: displays the current tick position within the set (taking div, shift and length into account).
White background indicates that the current tick position is outside the playable
range, yellow background means the current tick is within the sets playable range. A length
of 0 loops indefinitely, thus always has a yellow background.

#### How the current set's tick position is calculated

```
set_tick = input_tick / div - shift
```

Example:  
`div = 2`  
`shift = 16`  
`input_tick = 28`  

```
-2 = ( 28 / 2 ) - 16
```

The set position is at -2, which means it does not yet play.


#### Why limit the playable range in the set?

The params `shift` and `length` are of limited usefuleness, when the set is fed by a
linear clock. The set would be played for only a short section and then never again.
However, when the input clock is looping over a certain range, those parameter can be
used to have different sets play at different times within the overall loop. For instance,
we could have an input clock looping for 32 ticks feeding to sets, one using `shift=0`
and `length=16`, thus playing only for the first half, while the other set is configured
to `shift=16` and `length=16`, which would make it play for the second part of the 32 tick
loop.


### right-hand part: segments

For a set to output anything at all, one or more segments need to exist for that set.
Each set has its own group of segments. The segemnts of the highlighted set are
displayed on the right-hand side. To see the segments of a different set, simply click
on a different set on the left-hand side.

Segments are added  with `|+|` and removed wit `|-|`. Each segment is defined by
two numbers, the segment offset and the segment length. There is no limit on the number
of segments per set. The segments define which part of the sequencer (or a chained set,
for that matter) is going to be played. The sum of all segment lengths is displayed in
the header row on the right.

The first column of buttons sets the range of the active segments. New segments
are added without affecting the playback of the current set. Only when the range
is adapted to include the new segments, the new segments are effectively used.
Note that only the range end and can be defined. The range starts always with the
first segment of the set.

The second column of buttons is used to solo specific segments. Only one segment
can be solo'd at a time. If a segment is solo'd, this segment is looped
indefinitely, disregarding all other segments as long as solo is active.

The third column of buttons mutes specific segments. The length of the segment
is still accounted for in the set, but no clock is output during playback
of a muted set.
