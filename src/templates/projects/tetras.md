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
{% looper 'tetras', 'A generative tetrahedral landscape proliferated with chromatic radiation' %}

A generative tetrahedral landscape proliferated with chromatic radiation. Created with [Snap.svg](http://snapsvg.io).

I wanted to create a geometric mountain range proliferated with chromatic radiation. When I first imagined this it was as an isometric rendering, so it would start with 3D coordinate space and then convert to 2D for the screen. As I started drawing sketches and planning it out, however it became apparent that to generate it directly as a stack of flat shapes would greatly simplify the process.

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