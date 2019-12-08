var screenWidth = 0;
var menuIsShowing = null;
//animation variables
const fps = 60;
const duration = 5; //s
const start = 0; //%

const chartFinishPercentages = {
        html: 95,
        css: 80,
        javaScript: 70,
        angularJs: 60,
        reactJs: 55,
        java: 90,
        dotNet: 65,
        cpp: 70,
    } //%
const positions = {
    htmlPosition: start,
    cssPosition: start,
    javaScriptPosition: start,
    angularJsPosition: start,
    reactJsPosition: start,
    javaPosition: start,
    dotNetPosition: start,
    cppPosition: start
};
var time = 0;
var handler;
//////circle charts////////
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
///////////////////////////////////
var hasPlayedOnce = false;
//////////////form values///////////
var name;
var email;
var message;
//firebase database ref
var fbdb;
// start 
window.onload = function() {
    this.navClick('n1', 'p1');
    this.windowResized(window.innerWidth); // set state on reload
    //form data listeners
    const inputName = document.getElementById('inputName');
    const inputEmail = document.getElementById('inputEmail');
    const inputMessage = document.getElementById('inputMessage');
    inputName.addEventListener('input', test);
    inputEmail.addEventListener('input', test);
    inputMessage.addEventListener('input', test);

    fbdb = firebase.database();
};

test = (e) => {
        if (e.target.id === 'inputName') {
            this.name = e.target.value;
        } else if (e.target.id === 'inputEmail') {
            this.email = e.target.value;
        } else if (e.target.id === 'inputMessage') {
            this.message = e.target.value;
        }
    }
    // nav links manipulations, do some things when navs are clicked
    // nav ids: n1=home, n2=about, n3=projects, n3=contact
    // corresponding page ids: p1, p2, p3, p4, for scrolling to.
navClick = (navId, pageId) => {
    // scroll
    this.smoothScroll(pageId);
    if (this.screenWidth <= 730) {
        this.showHideMenu();
        this.menuIsShowing = false;
    } else {
        this.menuIsShowing = true;
    }
    //highlight selected nav
    for (let i = 1; i < 5; i++) {
        const tempNavId = "n" + i;
        const elem = document.getElementById(tempNavId);
        if (tempNavId === navId) {
            elem.style.backgroundColor = "white";
            elem.style.color = "black";
            elem.style.fontWeight = "bold";
        } else {
            elem.style.backgroundColor = "inherit";
            elem.style.color = "white";
            elem.style.fontWeight = "bold";
        }
    }
}

//update active nav indication, depending on if the page is scrolled to
updateNavLinkBg = (navId) => {
    for (let i = 1; i < 5; i++) {
        const tempNavId = "n" + i;
        const elem = document.getElementById(tempNavId);
        if (tempNavId === navId) {
            elem.style.backgroundColor = "white";
            elem.style.color = "black";
            elem.style.fontWeight = "bold";
        } else {
            elem.style.backgroundColor = "inherit";
            elem.style.color = "white";
            elem.style.fontWeight = "bold";
        }
    }
}

// check if page is visible onScrolling body
windowScrolling = () => {
    const homeDistanceY = document.getElementById('p1').getBoundingClientRect().top;
    const aboutDistanceY = document.getElementById('p2').getBoundingClientRect().top;
    const projectsDistanceY = document.getElementById('p3').getBoundingClientRect().top;
    const contactDistanceY = document.getElementById('p4').getBoundingClientRect().top;

    const stickyCvDownloadButton = document.getElementById('stick-cv-btn-div');
    stickyCvDownloadButton.style.transition = "2s"

    if (Math.abs(homeDistanceY) <= 602) {
        stickyCvDownloadButton.style.display = "none";
    } else if (Math.abs(homeDistanceY) > 602) {
        stickyCvDownloadButton.style.display = "block";
    }

    if (Math.abs(homeDistanceY) <= (window.innerHeight / 2)) {
        this.updateNavLinkBg("n1");
    }
    if (Math.abs(aboutDistanceY) <= (window.innerHeight / 2)) {
        this.updateNavLinkBg('n2');
    }
    if (Math.abs(projectsDistanceY) <= (window.innerHeight / 2)) {
        this.updateNavLinkBg('n3');
    }
    if (Math.abs(contactDistanceY) <= (window.innerHeight / 2)) {
        this.updateNavLinkBg('n4');
    }

    //play charts if in viewport
    const cppChartDistanceToTop = document.getElementById('progress__valuecpp').getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (Math.floor(cppChartDistanceToTop) < screenHeight - 200) { // 200 is offset, so all charts are visible.
        if (this.hasPlayedOnce === false) {
            this.playChartsAnimations();
        }
    }
}

//smooth scrolling/////using window.scrollTo, compatible with most browsers.
//determine current position
currentYPos = () => {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

// determina position of the destination element
elementYpos = (eID) => {
    const elm = document.getElementById(eID);
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}

// do the scrolling
smoothScroll = (eID) => {
        const startY = currentYPos();
        const stopY = elementYpos(eID);
        const distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        const step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step;
                if (leapY > stopY) leapY = stopY;
                timer++;
            }
            return;
        }
        for (let i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY -= step;
            if (leapY < stopY) leapY = stopY;
            timer++;
        }
        return false;
    }
    //end smooth scroll//////////////////

// show hidden menu
showHideMenu = () => {
    const menuDiv = document.getElementById('nav-main-container');
    const burgerTrigger = document.getElementById('burger-menu-button-div');
    if (menuDiv.style.marginLeft === "-260px") {
        menuDiv.style.marginLeft = "0px";
        menuDiv.style.transition = "0.4s";
        burgerTrigger.style.display = "none";
        this.menuIsShowing = true;
        this.darkenOnDrawerShouldSHow(true);

    } else if (menuDiv.style.marginLeft === "0px") {
        menuDiv.style.marginLeft = "-260px";
        menuDiv.style.transition = "0.4s";
        burgerTrigger.style.display = "block";
        this.menuIsShowing = false;
        this.darkenOnDrawerShouldSHow(false);
    }
}

// hide menu if page is clicked and if menu should be hidden
hideMenuIfClickOnBody = () => {
    if ((this.innerWidth < 730) && (this.menuIsShowing)) {
        this.showHideMenu();
    }
}

//darken view on menu drawer showing
darkenOnDrawerShouldSHow = (shouldDarken) => {
    const overlay = document.getElementById('overlay-div');
    if (shouldDarken) {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    }
}


// detect resolution change
windowResized = (screenWidth) => {
        this.screenWidth = screenWidth;
        const menuDiv = document.getElementById('nav-main-container');
        const burgerTrigger = document.getElementById('burger-menu-button-div');
        // let mainMiddleContainer = document.getElementsByClassName('body');
        if (screenWidth <= 730) {
            menuDiv.style.marginLeft = "-260px";
            menuDiv.style.transition = "0.4s";
            burgerTrigger.style.display = "block";
            this.menuIsShowing = false;
            this.darkenOnDrawerShouldSHow();
        } else if (screenWidth >= 730) {
            menuDiv.style.marginLeft = "0px";
            menuDiv.style.transition = "0.4s";
            burgerTrigger.style.display = "none";
            this.menuIsShowing = true;
        }
    }
    ///////////////////////////percentage animation///////////////////////////
    // x: percent
    // t: current time,
    // b: beginning value,
    // c: change in value,
    // d: duration
    // standard easout function: formula credit goes to http://easings.net/
easeInOutQuad = (t, b, c, d) => {
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b;
    } else {
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    }
}

// play charts animations
playChartsAnimations = () => {
    // to be called once
    if (this.hasPlayedOnce === false) {
        this.hasPlayedOnce = true;
        //initiate and play charts animations
        this.handler = setInterval(runChartsAnimations, 1000 / fps);
        const percentageCircle = document.getElementsByClassName('progress__value');
        // unpause all animation for all clas of "progress__value"
        for (let i = 0; i < percentageCircle.length; i++) {
            percentageCircle[i].style.WebkitAnimationPlayState = "running";
            percentageCircle[i].style.animationPlayState = "running";
        }
    }
}

//feed charts with their appropriate data
function runChartsAnimations() {
    this.time += 1 / fps;

    positions.htmlPosition = this.easeInOutQuad(time, start, chartFinishPercentages.html, duration);
    document.getElementById("skillLevel-p-html").innerHTML = Math.floor(positions.htmlPosition) + "%";

    positions.cssPosition = this.easeInOutQuad(time, start, chartFinishPercentages.css, duration);
    document.getElementById("skillLevel-p-css").innerHTML = Math.floor(positions.cssPosition) + "%";

    positions.javaScriptPosition = this.easeInOutQuad(time, start, chartFinishPercentages.javaScript, duration);
    document.getElementById("skillLevel-p-javaScript").innerHTML = Math.floor(positions.javaScriptPosition) + "%";

    positions.angularJsPosition = this.easeInOutQuad(time, start, chartFinishPercentages.angularJs, duration);
    document.getElementById("skillLevel-p-angularJs").innerHTML = Math.floor(positions.angularJsPosition) + "%";

    positions.reactJsPosition = this.easeInOutQuad(time, start, chartFinishPercentages.reactJs, duration);
    document.getElementById("skillLevel-p-reactJs").innerHTML = Math.floor(positions.reactJsPosition) + "%";

    positions.javaPosition = this.easeInOutQuad(time, start, chartFinishPercentages.java, duration);
    document.getElementById("skillLevel-p-java").innerHTML = Math.floor(positions.javaPosition) + "%";

    positions.dotNetPosition = this.easeInOutQuad(time, start, chartFinishPercentages.dotNet, duration);
    document.getElementById("skillLevel-p-dotNet").innerHTML = Math.floor(positions.dotNetPosition) + "%";

    positions.cppPosition = this.easeInOutQuad(time, start, chartFinishPercentages.cpp, duration);
    document.getElementById("skillLevel-p-cpp").innerHTML = Math.floor(positions.cppPosition) + "%";

    if (positions.htmlPosition >= chartFinishPercentages.html) {
        clearInterval(this.handler); //common for all charts
        return;
    }
}

// handle form submit
handleFormSubmit = () => {
    this.fbdb.ref('/messages/' + new Date).set({
        Aname: this.name,
        Bemail: this.email,
        Cmessage: this.message
    });
    alert('Message Sent!');
}