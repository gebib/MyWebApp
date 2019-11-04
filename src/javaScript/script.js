var screenWidth = 0;
var menuIsShowing = null;
// start 
window.onload = function() {
    this.navClick('n1', 'p1');
    this.windowResized(window.innerWidth); // set state on reload
    // binary clock
};


// nav links manipulations, do some things when navs are clicked
// nav ids: n1=home, n2=about, n3=portfolio, n4=projects, n5=contact
// corresponding page ids: p1, p2, p3, p4, p5, for scrolling to.
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
    for (let i = 1; i < 6; i++) {
        let tempNavId = "n" + i;
        let elem = document.getElementById(tempNavId);
        if (tempNavId === navId) {
            elem.style.backgroundColor = "aliceblue";
            elem.style.color = "black";
            elem.style.fontWeight = "bold";
        } else {
            elem.style.backgroundColor = "inherit";
            elem.style.color = "aliceblue";
            elem.style.fontWeight = "bold";
        }
    }
}

//update active nav indication, depending on if the page is scrolled to
updateNavLinkBg = (navId) => {
    for (let i = 1; i < 6; i++) {
        let tempNavId = "n" + i;
        let elem = document.getElementById(tempNavId);
        if (tempNavId === navId) {
            elem.style.backgroundColor = "aliceblue";
            elem.style.color = "black";
            elem.style.fontWeight = "bold";
        } else {
            elem.style.backgroundColor = "inherit";
            elem.style.color = "aliceblue";
            elem.style.fontWeight = "bold";
        }
    }
}

// check if page is visible onScrolling body
windowScrolling = () => {
    let homeDistanceY = document.getElementById('p1').getBoundingClientRect().top;
    let aboutDistanceY = document.getElementById('p2').getBoundingClientRect().top;
    let portfolioDistanceY = document.getElementById('p3').getBoundingClientRect().top;
    let projectsDistanceY = document.getElementById('p4').getBoundingClientRect().top;
    let contactDistanceY = document.getElementById('p5').getBoundingClientRect().top;

    let stickyCvDownloadButton = document.getElementById('stick-cv-btn-div');
    stickyCvDownloadButton.style.transition = "2s"

    if (Math.abs(homeDistanceY) <= 602) {
        stickyCvDownloadButton.style.display = "none";
    } else {
        stickyCvDownloadButton.style.display = "block";
    }

    if (Math.abs(homeDistanceY) <= (window.innerHeight / 2)) {
        this.updateNavLinkBg("n1");
    }
    if (Math.abs(aboutDistanceY) <= (window.innerHeight / 2)) {
        this.updateNavLinkBg('n2');
    }
    if (Math.abs(portfolioDistanceY) <= (window.innerHeight / 2)) {
        this.updateNavLinkBg('n3');
    }
    if (Math.abs(projectsDistanceY) <= (window.innerHeight / 2)) {
        this.updateNavLinkBg('n4');
    }
    if (Math.abs(contactDistanceY) <= (window.innerHeight / 2)) {
        this.updateNavLinkBg('n5');
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
    let elm = document.getElementById(eID);
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
        let startY = currentYPos();
        let stopY = elementYpos(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY);
            return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
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
    let menuDiv = document.getElementById('nav-main-container');
    let burgerTrigger = document.getElementById('burger-menu-button-div');
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
    let overlay = document.getElementById('overlay-div');
    if (shouldDarken) {
        overlay.style.display = "block";
    } else {
        overlay.style.display = "none";
    }
}


// detect resolution change
windowResized = (screenWidth) => {
    this.screenWidth = screenWidth;
    let menuDiv = document.getElementById('nav-main-container');
    let burgerTrigger = document.getElementById('burger-menu-button-div');
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