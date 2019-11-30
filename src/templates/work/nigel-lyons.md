---
title: Nigel Lyons
slug: nigel-lyons
layout: layouts/post.njk
linkHref: https://nigelyons.com
linkText: nigelyons.com
order: 6
cover:
    slug: nigel-lyons_cover
    alt: nigelyons.com homepage
tags: [Video Portfolio, Static Site, Node.js, Logo Design]
images:
    -   slug: nigel-lyons_home
        alt: Home page of nigelyons.com
        classes: post-image
---
{% workScroll 'nigel-lyons_home', 'Home page of nigelyons.com' %}

Nigel Lyons is an independent video producer in Washington, DC. In 2015, with Sediment Press, I designed his logo, business card and a portfolio site using WordPress. In 2019 we decided to redesign the site as a static single page that would highlight some of his best work. The main design considerations were that the site needed to: 

 - Effectively showcase his video portfolio.
 - Build off of his current branding.
 - Look natively designed for any device that used it.

As a single page site, a CMS would have added a lot of overhead. I used Node to render the site so that I had the benefit of some modern development tools. I used Pug for the template and Stylus as a CSS preprocessor. Gulp bundled the assets, and browserSync updated the view on file change. This stack allowed me to retain developer conveniences without giving up granular control over the finished product.

<!-- The first major issue I ran into was the performance of the video embeds. The site had 7 videos hosted on YouTube and Vimeo embedded in iframes. Each video loaded over 300kB of javascript including a mess of cookies and trackers. The total was over 2MB for the entire site.

[ more content to come ] -->
