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
  </button>`;

const documentStyles = getComputedStyle(document.documentElement);
const borderWidth = documentStyles.getPropertyValue('--border-width').trim();
const borderColor = documentStyles.getPropertyValue('--color-text').trim();
const borderRadius = documentStyles.getPropertyValue('--border-radius').trim();
const boxShadowOffsetX = documentStyles.getPropertyValue('--box-shadow-offset-x').trim();
const boxShadowOffsetY = documentStyles.getPropertyValue('--box-shadow-offset-y').trim();
const boxShadowColor = documentStyles.getPropertyValue('--color-shadow').trim();

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

// Takes in object with four nodes: wrap, media, close, and clickPlate
function grow(imhance) {
    const windowWidth = html.getBoundingClientRect().width;
    const windowHeight = window.innerHeight;

    // const wrap = img.parentNode;
    // const close = wrap.querySelector('.imhance-close');
    // const clickPlate = wrap.querySelector('.imhance-click-plate');

    const mediaOffset = imhance.media.getBoundingClientRect();
    const mediaTop = mediaOffset.top;
    const mediaLeft = mediaOffset.left;
    const mediaWidth = mediaOffset.width;
    const mediaHeight = mediaOffset.height;
  
    const closeHeight = imhance.close.getBoundingClientRect().height;

    const windowAspect = windowHeight / windowWidth;  
    const mediaAspect = mediaHeight / mediaWidth;
  
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
    if (mediaAspect < maxGrowAspect) {
        growWidth = maxGrowWidth;
        growHeight = growWidth * mediaAspect;
    } else {
        growHeight = maxGrowHeight;
        growWidth = growHeight / mediaAspect;
    }
  
    // Calculate properties of enlarged media element
    const growShiftY = -mediaTop + (windowHeight - mediaHeight - closeHeight - (closeMargin * 2)) / 2 ;
    const growShiftX = -mediaLeft + (windowWidth - mediaWidth) / 2;
    const growScale = growHeight / mediaHeight;
    const growTop = (windowHeight - growHeight - closeHeight - (closeMargin * 2)) / 2;
    const growLeft = (windowWidth - growWidth) / 2;
    const growBorder = `calc(${borderWidth} * ${Math.max(growScale, 2)}) solid ${borderColor}`;
    const growBorderRadius = `calc(${borderRadius} * ${growScale})`;
    const growShadow = `calc(${boxShadowOffsetX} * ${growScale}) calc(${boxShadowOffsetY} * ${growScale}) 0 ${boxShadowColor}`;

    const closeTop = (windowHeight + growHeight - closeHeight - closeMargin) / 2;

    // if (growScale > 1.125) {
        // Keep wrap from collapsing when contents is removed
        imhance.figure.setAttribute('style', `width: ${mediaWidth}px; height: ${mediaHeight}px`);
        imhance.wrap.classList.add('grow');

        // Define styles to tranform image to grow size
        let mediaStyle = `position: fixed; transition: transform ${durationCSS} ease; top: ${mediaTop}px; left: ${mediaLeft}px; width: ${mediaWidth}px; transform: translate(${growShiftX}px, ${growShiftY}px) scale(${growScale}); z-index: 2;`;

        // Style accomodation for scrolling elements
        if (imhance.wrap.classList.contains('img-scroll')) {
            mediaStyle = `${mediaStyle} padding-bottom: ${mediaHeight - (2 * borderWidth)}px`;
        }

        // Start transform
        imhance.media.setAttribute('style', mediaStyle);
        imhance.media.setAttribute('tabindex', '-1');
        imhance.close.setAttribute('style', 'display: block');
        imhance.close.focus();
        imhance.clickPlate.style.display = 'block';

        // Repace transformed version with full size image
        setTimeout(function () {
            imhance.media.setAttribute('style', `position: fixed; top: ${growTop}px; left: ${growLeft}px; transform: unset; width: ${growWidth}px; height: ${growHeight}px; border: ${growBorder}; border-radius: ${growBorderRadius}; box-shadow: ${growShadow}; z-index: 2;`);
        }, durationJS);

        // Slight delay for fade in for elements that were previously display: none
        setTimeout(function() {
            imhance.close.setAttribute('style', `display: block; top: ${closeTop}px; opacity: 1;`);
            imhance.clickPlate.style.opacity = '.375';
        }, 20);

        // window.addEventListener('scroll', shrink(wrap, img, close, clickPlate));
    // }
}

function shrink(imhance) {
    const mediaOffset = imhance.media.getBoundingClientRect();
    const mediaTop = mediaOffset.top;
    const mediaLeft = mediaOffset.left;
    const mediaWidth = mediaOffset.width;
    const mediaHeight = mediaOffset.height;

    const figureOffset = imhance.figure.getBoundingClientRect();
    const figureTop = figureOffset.top;
    const figureLeft = figureOffset.left;
    const figureWidth = figureOffset.width;
    const figureHeight = figureOffset.height;

    const growScale = mediaWidth / figureWidth;
    const shrinkScale = figureWidth / mediaWidth;
    const shrinkShiftX = -mediaLeft + figureLeft + (figureWidth - mediaWidth) / 2;
    const shrinkShiftY = -mediaTop + figureTop + (figureHeight - mediaHeight) / 2;
    const shrinkBorder = `calc(${borderWidth} * ${growScale}) solid ${borderColor}`;
    const shrinkBorderRadius = `calc(${borderRadius} * ${growScale})`;
    const shrinkShadow = `calc(${boxShadowOffsetX} * ${growScale}) calc(${boxShadowOffsetY} * ${growScale}) 0 ${boxShadowColor}`;

    let shrinkStyle = `position: fixed; top: ${mediaTop}px; left: ${mediaLeft}px; width: ${mediaWidth}px; border: ${shrinkBorder}; border-radius: ${shrinkBorderRadius}; box-shadow: ${shrinkShadow}; transform: translate(${shrinkShiftX}px, ${shrinkShiftY}px) scale(${shrinkScale}); transition: transform ${durationCSS} ease; z-index: 2;`;

    imhance.media.setAttribute('style', shrinkStyle);
    imhance.close.style.opacity = 0;
    imhance.clickPlate.style.opacity = 0;

    setTimeout(() => {
        imhance.media.setAttribute('style', 'position: relative; transition: unset');
        imhance.media.setAttribute('tabindex', '0');
        imhance.media.focus(); 
        imhance.close.removeAttribute('style');
        imhance.wrap.classList.remove('grow');
        imhance.figure.removeAttribute('style');
        imhance.clickPlate.setAttribute('style', 'display: none;');
    }, durationJS);
}

function toggleGrow(imhance) {
    if (imhance.wrap.classList.contains('grow')) {
        shrink(imhance);
    } else {
        grow(imhance);
    }
}

// Start the thing
wraps.forEach(function(wrap) {
    const imhance = new Object;
    imhance.wrap = wrap;
    imhance.figure = wrap.querySelector('figure');
    // imhance.scrollWrap = wrap.querySelector('.img-scroll-window-wrap');
    imhance.media = wrap.querySelector('.img-scroll-window-wrap, img');
    imhance.media.classList.add('media');
    const template = document.createElement('template');

    // Create caption
    template.innerHTML = '<div class="imhance-caption">click to enlarge</div>';
    imhance.wrap.append(template.content.firstChild);

    // Create close button
    template.innerHTML = closeButton;
    imhance.wrap.append(template.content.firstChild);
    imhance.close = imhance.wrap.querySelector('.imhance-close');

    // Create click plate
    template.innerHTML = '<div class="imhance-click-plate" style="display: none"></div>';
    imhance.wrap.prepend(template.content.firstChild);
    imhance.clickPlate = imhance.wrap.querySelector('.imhance-click-plate');

    // Add event listeners
    // img.addEventListener('load', function() {
    imhance.media.addEventListener('click', () => toggleGrow(imhance));
    imhance.media.addEventListener('keyup', openKeys);
    imhance.media.setAttribute('tabindex', '0');      
    imhance.close.addEventListener('click', () => shrink(imhance));
    imhance.close.addEventListener('keydown', () => closeKeys(imhance));
    imhance.clickPlate.addEventListener('click', () => shrink(imhance));
    // });
});

