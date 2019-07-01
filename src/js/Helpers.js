
/**
* Contains the initial positions for parallax for relative positions
* @array initialPositions
*/
export let initialPositions = [];

/**
* Creates a Parallax background based on a few data attributes
* If the position is relative use class "relative"
* [data-background, data-depth, data-x, data-offsetY, data-pin]
* @param {ScrollTop}
*/
export function Parallax(scrollTop) {
    $$(".parallax").forEach(function (el, index, array) {
        let depth = Number(el.getAttribute('data-depth')) || 0.25;
        let background = el.getAttribute('data-background');
        let x = el.getAttribute('data-x') || 0;
        let offsetY = el.getAttribute('data-offsetY') || 0;
        let startPin = Number(el.getAttribute('data-pin')) || 0;
        // let isRelative = Number(el.getAttribute('data-relative')) || false;
        let translate3d;


        if ( !el.classList.contains('relative') ){
            initialPositions[index] = null;
        }
        else{
            if ( !initialPositions[index] ){
                initialPositions[index] = { elTop: getRelativePosition(el).y, elHeight: el.getBoundingClientRect().height };
            }
        }

        if(el.classList.contains('relative')){

            let p = 0;
            let elTop = initialPositions[index].elTop;
            let pin = elTop + startPin;
            let limit = elTop + initialPositions[index].elHeight + p;
            let t = (scrollTop - elTop) * depth;

            if (scrollTop > pin && scrollTop <= limit) {
                el.style.top = t + "px";
            }
            else if (scrollTop >= limit) {} 
            else {
                el.style.top = 0 + 'px';
            }
            return;
        }
        else{

            let elTop = getPosition(el).y;
            let pin = elTop + startPin;
            let limit = elTop + el.offsetHeight;
            let t = (scrollTop - elTop) * depth;

            if (scrollTop > pin && scrollTop <= limit) {
                if (background) {
                    el.style.backgroundPosition = x + " " + t + "px";
                }
                else {
                    translate3d = 'translate3d(' + x + ', ' + t + "px, 0)";
                    el.style.transform = translate3d;
                }
            } else {
                if (background) {
                    el.style.backgroundPosition = x + " " + startPin + "px";
                }
                else {
                    translate3d = "translate3d(" + x + ",0,0)";
                    el.style.transform = translate3d;
                }
            }
        }
    });
}


/**
* returns the absolute position of an element regardless of position/float issues
* @param {HTMLElement} el - element to return position for 
* @returns {object} { x: num, y: num }
*/
export function getPosition(el) {

    let x = 0,
        y = 0;

    while (el != null && (el.tagName || '').toLowerCase() != 'html') {
        x += el.offsetLeft || 0;
        y += el.offsetTop || 0;
        el = el.parentElement;
    }

    return { x: parseInt(x, 10), y: parseInt(y, 10) };

}

//Query All Helper - Transforms NodeList to array
export function $$(selector, context) {
    context = context || document;
    let elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
}


/**
* returns the el position relative to the top
* @param {HTMLElement} el - element to return position for
* @returns {object} { x: num, y: num }
*/
export function getRelativePosition(el){

    let elem = el.getBoundingClientRect();
    let win = el.ownerDocument.defaultView;

    return{
        y: elem.top + win.pageYOffset,
        x: elem.top + win.pageXOffset
    }

}

/**
* returns the el position relative to the top
* @returns {Array} An array of objects containing {isInView, el, index, array}
*/
export const isInView = (elems, scrollTop, offset, cb) => {

    let viewArr = [];

    $$(elems).forEach((el,index,array)=>{

        let elPos = getRelativePosition(el).y;
        let elHeight = el.getBoundingClientRect().height;
        let limit = elPos + elHeight;
        var screenSize = window.innerHeight;
    

        // If -> scrollTop > (elementPosition 
        // - windowHeight (Element position in accordance to Window Height)
        // + elementHeight (SO IT'S IN VIEW AFTER ENTIRE ELEMENT HAS ENTERED)  
        // + offSet (Dependant on when the user wants the elem to be in view))
        if (scrollTop > (elPos - screenSize + elHeight + offset) && scrollTop <= limit) {
            if(cb){
                cb({ isInView: true, el: el, index: index, array: array });
            }
            viewArr.push({ isInView: true, el: el, index: index, array: array });
        }
        else {
            if(cb){
                cb({ isInView: false, el: el, index: index, array: array });
            }
            viewArr.push({ isInView: false, el: el, index: index, array: array });
        }
    });


    return viewArr;

}

/**
* returns scroll percentage
* @param {ScrollTop}
* @returns {Number}
*/
export const percentageScrolled =  (scrollTop) =>{

    let pageHeight = scrollDetails().pageHeight ;
    const percScrolled = (scrollTop / pageHeight) * 100;

    return percScrolled;
    // e.g 300 / 6000 = 0.05
};

/**
* Returns a percentange of size relative to windows height
* @param {jQuery|Element}
* @returns {Number}
*/
export const getHSizeAsPercentage = (element) => {
    return parseFloat(element.height() / $(window).height() * 100).toFixed(2);
};


/**
* returns some page details integral for getting proper width and height of page
* @returns {pageHeight} Total sum of the page height
* @returns {pageWidth} Total sum of the page width
*/
export const scrollDetails = () => {
    return { // w/o taking the innerH off the percentage wouldn't be correct
        pageHeight: document.querySelector('html').offsetHeight - window.innerHeight,
        pageWidth: document.querySelector('html').offsetWidth - window.innerWidth
    }
};


/**
* Shows the element
* @param {String || HTMLElement} el - adds class of show
*/
export const showEl = (el) => {
    if (typeof el !== 'object') {
        el = document.querySelector(el);
    }
    el.classList.remove('hide');
    el.classList.add('show');
};

/**
* Hides the element
* @param {String || HTMLElement} el - adds class of hide
*/
export const hideEl = (el) => {

    if (typeof el !== 'object') {
        el = document.querySelector(el);
    }
    el.classList.remove('show');
    el.classList.add('hide');
};


/**
* Shows and hides the element in view
* @param {String} el - element to show or hide
* @param {String} scrolltop - PageYOffset scroll top
* @param {Function} cb - Callback funciton on complete
*/
export const showHideInView = (el, scrollTop, cb) => {
    isInView(el, scrollTop, 200).forEach((data, index, array) => {
        if (data.isInView) {
            showEl(data.el);
            if (typeof cb === 'function'){
                cb(data);
            }
        }
        else {
            hideEl(data.el);
            if (typeof cb === 'function') {
                cb(data);
            }
        }
    });
};