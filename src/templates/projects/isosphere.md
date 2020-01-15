---
title: Isosphere
slug: isosphere
linkHref: https://codepen.io/tr0pical1nternet/full/rqPZwq
linkText: codepen.io
layout: layouts/post.njk
order: 2
tags: [ Canvas Animation ]
cover:
    slug: isosphere_cover
    alt: Isosphere
---
{% looper 'isosphere', 'An interactive canvas animation of a sphere rendered in isometric perspective' %}

This is my first experiment with the <code>&lt;canvas&gt;</code> element. If you're not familiar it's a defined region where you can draw using JavaScript instructions. I wanted to use it to create an animated point graph of a sphere. I chose a sphere because I think they're pretty and I have a grasp on the trigonometry required to render them.

Out of the box, canvas does not support higher DPI screens, so I used the following code snippet which I found online somewhere and will probably use in every canvas project from here on out.
``` js
// Canvas adjustment for high DPI displays
function setupCanvas( canvas ) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;

  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();

  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var context = canvas.getContext( '2d' );
  
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  context.scale(dpr, dpr);
  return context;
}
```
