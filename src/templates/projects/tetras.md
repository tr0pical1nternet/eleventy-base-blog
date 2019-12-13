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

Tetras is a generative landscape proliferated with chromatic radiation. Created with [Snap.svg](http://snapsvg.io). My first approach in making this was to map it in a three dimensional coordinate space and then render it isometrically. As I was sketching it out on paper, however, I realized I could approximate it as a stack of flat shapes and simplify the process significantly.

{% textBlock %}
{% postFigure 'tetras_tile-sketch', 'A sketch of the underlying map tiles.', 'post-figure-right' %}
The first step was to create a map of rhombus-shaped tiles to serve as a coordinate system for placing the tetrahedrons. I've been calling them "tetras" for short. The number of columns and rows are calculated so that the map is always slightly larger than the viewport.
{% endtextBlock %}

{% textBlock %}
{% postFigure 'tetras_tetra-sketch', 'A sketch of a single tetra object.', 'post-figure-right' %}
The tetras themselves are generated as two shapes and use a randomizing function to create a little variety and give them a little personality. They increase in size towards the top of the viewport and a color function creates a sense of distance through atmospheric perspective.
{% endtextBlock %}





