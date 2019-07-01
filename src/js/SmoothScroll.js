export default function SmoothScrolling(scrollSpeed, smooth) {
    scrollSpeed = scrollSpeed || 120;
    smooth = smooth || 12;
    new SmoothScroll(document, scrollSpeed, smooth)
}
// 120 12

function SmoothScroll(target, speed, smooth) {
    if (target == document)
        target = (document.documentElement || document.body.parentNode || document.body) // cross browser support for document scrolling
    let moving = false
    let pos = target.scrollTop;
    let bodyOffsetHack = 11;
    target.addEventListener('mousewheel', scrolled, false)
    target.addEventListener('DOMMouseScroll', scrolled, false)

    function scrolled(e) {
        console.log('Scrolled');
        e.preventDefault(); // disable default scrolling
        let delta = normalizeWheelDelta(e)

        pos += -delta * speed
        pos = Math.max(0, Math.min(pos, target.scrollHeight - target.clientHeight + bodyOffsetHack)) // limit scrolling BTW THE +11px is a Hack bc that's how much of the page I cant scroll

        if (!moving) update()
    }

    function normalizeWheelDelta(e) {
        if (e.detail) {
            if (e.wheelDelta)
                return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1) // Opera
            else
                return -e.detail / 3 // Firefox
        } else
            return e.wheelDelta / 120 // IE,Safari,Chrome
    }

    function update() {
        moving = true
        let delta = (pos - target.scrollTop) / smooth
        target.scrollTop += delta
        if (Math.abs(delta) > 0.5)
            requestFrame(update)
        else
            moving = false
    }

    let requestFrame = function () { // requestAnimationFrame cross browser
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (func) {
                window.setTimeout(func, 1000 / 50);
            }
        );
    }()
}