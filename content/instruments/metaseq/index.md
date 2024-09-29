---
title: 'metaseq'
---

## metaseq

![metaseq](metaseq.png)

**NOTE** Above images show new version of **metaseq** that is compatible with
[untik](../untik/). However, the documentation below hasn't been (fully ) updated.

**metaseq** is a time-line slicer that acts as a middle man between the [master](../master) clock and a
sequencer. It lets you arrange timeline segments freely in order to create more complex
sequencing structures. Such arrangements are organized in sets. Sets can be chained in
order to build even more complex structures.  All the sequencers in netpd, namely [qseq3](../qseq3),
[unstep](../unstep), and [unpunch](../unpunch), support **metaseq**.


### left-hand part: sets

Sets are added with `|+|` and removed with `|-|`. `master` means that the clock
source of the set is [master](../master), netpd's master clock. Sets can also use the output of
other sets as their input clock. The input clock can be switched by dragging the
left-most area of the set up and down with the mouse. Only sets with a smaller ID can
be used as input clock (set 4 can use set 3, but set 3 cannot use set 5).

#### master as input clock

When master is used as input clock (the default), the whole set with all its segments
is looped infinitely as is. The set length (thus loop length) is defined by the sum of
the length of all segments.

#### chained sets

When a set uses another set as clock input, two numbers appear near the clock input label.
The first is the set offset and the second is the  set length. Those two numbers define the
frame considered by the set. Clock input outside the frame is ignored and does not generate
any output clock. Clock input within the frame is normalized by translating it by the set
offset. For instance, when using *set_offset=256* and *set_length=128*, clock input from
256 to 383 is converted to 0 to 127. Clock input outside that range is ignored. This allows
for setups where one set feeds others that are played serially by having different
framings (set_offset) defined.


### right-hand part: segments

For a set to output anything at all, one or more segments need to exist for that set. 
Each set has its own group of segments. The segemnts of the highlighted set are
displayed on the right-hand side. To see the segments of a different set, simply click
on a different set on the left-hand side. 

Segments are added  with `|+|` and removed wit `|-|`. Each segment is defined by
two numbers, the segment offset and the segment length. There is no limit on the number
of segments per set. The segments define which part of the sequencer (or a chained set,
for that matter) is going to be played. The sum of all segment lengths is displayed in
the header row on the right. If the current set uses master as its input clock, the 
whole group of segments is looped indefinitely and the loop length equal to the 
sum of all segment lengths. 

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
