// Get elements
const html = document.querySelector('html');
const wraps = document.querySelectorAll('.imhance');
const closeButton =
  `<button class="button imhance-close" >
    <svg role="img"
        class="svg-icon"
        aria-labelledby="close-title"
        focusable="false"
        width="32"
        height="32">
        <title id="close-title">Close Image</title>
        <use xlink:href="#close-button" />
    </svg>
  </button>`
const borderWidth = 1;

// Convert duration custom property to milliseconds ('0.1s' => 100)
const durationCSS = getComputedStyle(document.documentElement).getPropertyValue('--duration');
const durationJS = 1000 * Number(durationCSS.slice(0, -1));

function openKeys(wrap, img, close, clickPlate) {
    if (event.keyCode === 13) {
        grow(wrap, img, close, clickPlate);
    }
}

function closeKeys(wrap, img, close, clickPlate) {
    if ([9, 13, 27, 32].includes(event.keyCode)) {
        event.preventDefault();
        shrink(wrap, img, close, clickPlate);
    }
}

function grow(wrap, img, close, clickPlate) {
    console.log(wrap, img, close, clickPlate);

    const windowWidth = html.getBoundingClientRect().width;
    const windowHeight = window.innerHeight;

    // const wrap = img.parentNode;
    // const close = wrap.querySelector('.imhance-close');
    // const clickPlate = wrap.querySelector('.imhance-click-plate');

    const imgOffset = img.getBoundingClientRect();
    const imgTop = imgOffset.top;
    const imgLeft = imgOffset.left;
    const imgWidth = imgOffset.width;
    const imgHeight = imgOffset.height;
  
    const closeHeight = close.getBoundingClientRect().height;

    const windowAspect = windowHeight / windowWidth;  
    const imgAspect = imgHeight / imgWidth;
  
    let windowMargin, closeMargin;
    if (windowAspect <= 1) {
        windowMargin = .15 * windowHeight;
        closeMargin = 16 + .04 * windowHeight;
    } else {
        windowMargin = .15 * windowWidth;
        closeMargin = 16 + .04 * windowWidth; 
    }

    // Determine maximum size for image
    const maxGrowWidth = windowWidth - (windowMargin * 2);
    const maxGrowHeight = windowHeight - windowMargin - closeHeight - (closeMargin * 2);
    const maxGrowAspect = maxGrowHeight / maxGrowWidth;

    let growWidth, growHeight;

    // Chooses whether to use window width or height as the constraining dimension
    if (imgAspect <= maxGrowAspect) {
        growWidth = maxGrowWidth;
        growHeight = growWidth * imgAspect;
    } else {
        growHeight = maxGrowHeight;
        growWidth = growHeight / imgAspect;
    }
  
    const growShiftY = -imgTop + (windowHeight - imgHeight - closeHeight - (closeMargin * 2)) / 2 ;
    const growShiftX = -imgLeft + (windowWidth - imgWidth) / 2;
    const growScale = growHeight / imgHeight;

    const closeTop = (windowHeight + growHeight - closeHeight - closeMargin) / 2;

    if (growScale > 1.125) {
        wrap.setAttribute('style', `width: ${imgWidth}px; height: ${imgHeight}px`);
        wrap.classList.add('grow');

        let imgStyle = `position: fixed; transition: transform ${durationCSS} ease; top: ${imgTop}px; left: ${imgLeft}px; width: ${imgWidth}px; transform: translate(${growShiftX}px, ${growShiftY}px) scale(${growScale}); z-index: 2;`;

        // Accomodation for scrolling elements
        if (wrap.classList.contains('work-scroll')) {
            imgStyle = `${imgStyle} padding-bottom: ${imgHeight - (2 * borderWidth)}px`;
        }

        img.setAttribute('style', imgStyle);
        img.setAttribute('tabindex', '-1');
        close.setAttribute('style', 'display: block');
        close.focus();
        clickPlate.style.display = 'block';
        setTimeout(function() {
            close.setAttribute('style', `display: block; top: ${closeTop}px; opacity: 1;`);
        }, 20);

        // window.addEventListener('scroll', shrink(wrap, img, close, clickPlate));
    }
}

function shrink(wrap, img, close, clickPlate) {
    // const wrap = img.parentNode;
    // const close = wrap.querySelector('.imhance-close');
    // const clickPlate = wrap.querySelector('.imhance-click-plate');

    const imgTop = Number(img.style.top.slice(0, -2));
  
    const wrapOffset = wrap.getBoundingClientRect();
    const wrapTop = wrapOffset.top;

    const growShiftX = 0;
    const growShiftY = wrapTop - imgTop;
    const growScale = 1;

    img.style.transform = `scale(${growScale}) translate(${growShiftX}px, ${growShiftY}px)`;
    close.style.opacity = 0
    clickPlate.setAttribute('style', 'display: none');

    setTimeout(function () {
    // const imgPosition = wrap.classList.contains('work-scroll') ? 'relative'

        img.setAttribute('style', 'position: relative; transition: unset');
        img.setAttribute('tabindex', '0');
        img.focus(); 
        close.removeAttribute('style');
        wrap.classList.remove('grow');
        wrap.removeAttribute('style');

    }, durationJS);
}

function toggleGrow(wrap, img, close, clickPlate) {
    if (wrap.classList.contains('grow')) {
        shrink(wrap, img, close, clickPlate);
    } else {
        grow(wrap, img, close, clickPlate);
    }
}

// Start the thing
wraps.forEach(function(wrap) {
    const img = wrap.querySelector('figure, img');

    // Create close button
    const template = document.createElement('template');
    template.innerHTML = closeButton;
    wrap.append(template.content.firstChild);
    const close = wrap.querySelector('.imhance-close');

    // Create click plate
    template.innerHTML = `<div class="imhance-click-plate" style="display: none"></div>`;
    wrap.prepend(template.content.firstChild);
    const clickPlate = wrap.querySelector('.imhance-click-plate');

    // Add event listeners
    // img.addEventListener('load', function() {
    console.log(wrap, img, close, clickPlate);
    img.addEventListener('click', () => toggleGrow(wrap, img, close, clickPlate));
    img.addEventListener('keyup', openKeys);
    img.setAttribute('tabindex', '0');      
    close.addEventListener('click', () => shrink(wrap, img, close, clickPlate));
    close.addEventListener('keydown', () => closeKeys(wrap, img, close, clickPlate));
    clickPlate.addEventListener('click', () => shrink(wrap, img, close, clickPlate));
    // });
});

