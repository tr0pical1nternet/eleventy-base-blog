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

I wanted to create a geometric mountain range proliferated with chromatic radiation. When I first imagined this it was as an isometric rendering, so it would start with 3D coordinate space and then convert to 2D for the screen. As I started drawing sketches and planning it out, I realized that I could approximate it as a stack of flat shapes and simplify the process significantly.

<figure class="diagram">
    {% include ../../svg/tetras_tile-plane.svg %}
</figure>

The first step was to create a map of rhombus-shaped tiles to serve as a coordinate system for placing the tetrahedral mountains. I've been calling them "tetras" for short. The number of columns and rows are calculated so that the map is always slightly larger than the viewport.

The tetras themselves are generated as two shapes and use a randomizing function to create a little variety and give them a little personality. They increase in size towards the top of the viewport and a color function creates a sense of distance through atmospheric perspective. 