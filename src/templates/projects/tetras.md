---
title: Tetras
slug: tetras
linkHref: https://cocohost.co/tetras
linkText: cocohost.co/tetras
layout: layouts/post.njk
order: 3
tags: [Snap.svg, SVG Animation]
cover:
    slug: tetras_cover
    alt: Tetras
---
{% looper 'tetras', 'A generative tetrahedral landscape proliferated with chromatic radiation.' %}

This is a recreation of a design I made while taking Color and Design at the New Orleans Academy of Fine Arts. The original I drew with a ruler and a compass. It was illustrated with gouache, using subtle color mixing to create the illusion of transparency. Even if it wasn't animated, it gave the impression that there was a process happening over time. To create the scene in SVG I followed more or less the same steps as I did sketching it by hand, just with a lot more attention paid to coordinates.

<figure class="diagram">
    {% include ../../svg/tetras_tile-plane.svg %}
</figure>

The first step was to create a map of rhombus-shaped tiles to serve as a coordinate system for placing the tetrahedral mountains (I'll be referring to them as "tetras" for short). The number of columns and rows are calculated so that the map is always slightly larger than the viewport.

<figure class="diagram">
    {% include ../../svg/tetras_tetra.svg %}
</figure>

The tetras themselves are generated as two polygons that share a side. They increase in height towards the top of the viewport and employ a color function to create a sense of depth through atmospheric perspective.

<figure class="diagram">
    {% include ../../svg/tetras_ellipse.svg %}
</figure>

In the original compass-drawn design, the ellipses were approximated using a construction of circular arcs. After trying and failing to create this by adding and intersecting circles, I referred to the SVG documentation. It turns out SVG has a path syntax specifically for describing curves as a series of elliptical arcs.

<figure class="diagram">
    {% include ../../svg/tetras_radiation.svg %}
</figure>

Each of these ellipses becomes a band in a radiation field. The epicenter is chosen from a random valley (at the corner of four tetras) where one band radiates every two seconds. It expands until it reaches a maximum size and then it returns to the bottom of the stack to radiate again.

## Lessons Learned
Snap.svg animates using JavaScript, which is great and fine for many use cases, really any situation that doesn't demand GPU acceleration. In this case, because the ellipses grow so large, on larger screens I see noticeable performance lagging and animation artifacts. If one was inclined they could rebuild this in a way that uses CSS or canvas animation which both natively take advantage of hardware acceleration. 