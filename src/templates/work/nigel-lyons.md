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
{% imgScroll 'nigel-lyons_home', 'Home page of nigelyons.com' %}

Nigel Lyons is an independent video producer in Washington, DC. In 2015, with Sediment Press, I designed his logo, business card and a portfolio site using WordPress. In 2019 we redesigned the site as a static single page that would highlight some of his best work. The main design considerations we had were that the site needed to: 

 - Effectively showcase his video portfolio.
 - Build off of his current branding.
 - Look natively designed for any device that used it.

As a single page site, a CMS would have added a lot of overhead. I used Node to build the site to gain the benefit of some modern development tools. I used Pug for the templates, Stylus as a CSS preprocessor, Gulp as an asset bundler, and browserSync for live reloading. This stack allowed me to retain developer conveniences without giving up granular control over the finished product.

There were a few different things I needed to do to make the site responsive. Create a flexible margin system, use grid to reconfigure the header, and use grid to intrinsically layout the video portfolio.

One of the biggest challenges with responsive design is keeping margins proportionate across a wide variety of devices. I used CSS custom properties to create a margin system that coordinated margin increases as screen sizes increased.

I really liked the way the header looked on a vertical mobile screen, infact it almost looked identical to his business card, which seemed like a nice touch. On a horizontal screen, however, it didn't work at all. The logo was HUGE and it required a great deal of scrolling just to get to the content. CSS Grid to the rescue. Using grid areas I totally reconfigured the header into another arrangement that better fit horizontal screens.





<!-- The first major issue I ran into was the performance of the video embeds. The site had 7 videos hosted on YouTube and Vimeo embedded in iframes. Each video loaded over 300kB of javascript including a mess of cookies and trackers. The total was over 2MB for the entire site.

[ more content to come ] -->
