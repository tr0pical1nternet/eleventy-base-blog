---
title: Fun with Arrays
slug: fun-with-arrays
layout: layouts/post.njk
order: 4
linkHref: https://svelte.dev/repl/805300f5895f4ea89b73ba75de393db8?version=3.16.0
linkText: svelte.dev/repl
cover:
    slug: fun-with-arrays_cover
    alt: Fun with Arrays
tags: [ Svelte.js, Public Speaking ]
---
<video class="post-video" width="720" height="480" loop="true" controls>
    <source src="/videos/fun-with-arrays.mp4" type="video/mp4">
    Sorry, your browser doesn't support embedded videos.
</video>

Fun with Arrays is an array visualizer I spun up on stage at #FrontEndParty, a monthly meetup in New Orleans. The talk I gave was an introduction to [Svelte.js](https://svelte.dev). If you’re not familiar, it’s a component framework similar to Vue or React, with the notable difference that it compiles at build time into vanilla JavaScript and relies. I wrote this as a project I could live-code in 7 minutes to demonstrate how easy it is to bind data to elements in Svelte (the styles were written ahead of time).  With minimal effort I was able to add transitions and FLIP animations to help illustrate the behavior of some popular JavaScript array methods. The app runs extremely fast and ends up weighing less than 37kB which is around half the size it would be in Vue, and a quarter of what it would be in React.
