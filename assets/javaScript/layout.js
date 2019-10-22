let screenWidth = 0;
// start 
window.onload = function() {
    this.navClick('n1', 'p1');
};


// nav links manipulations, do some things when navs are clicked
// nav ids: n1=home, n2=about, n3=portfolio, n4=projects, n5=contact
// corresponding page ids: p1, p2, p3, p4, p5, for scrolling to.
navClick = (navId, pageId) => {
    // scroll
    this.smoothScroll(pageId);
    if (this.screenWidth <= 1040) {
        this.showHideMenu();
    }
    //highlight selected nav
    for (let i = 1; i < 6; i++) {
        let tempNavId = "n" + i;
        let elem = document.getElementById(tempNavId);
        if (tempNavId === navId) {
            elem.style.backgroundColor = "black";
            elem.style.color = "#469cff";
        } else {
            elem.style.backgroundColor = "inherit";
            elem.style.color = "aliceblue";
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
    let burgerTrigger = document.getElementById('burger-menu-trigger');
    if (menuDiv.style.marginLeft === "-260px") {
        menuDiv.style.marginLeft = "0px";
        menuDiv.style.transition = "0.4s";
        burgerTrigger.style.display = "none";
    } else if (menuDiv.style.marginLeft === "0px") {
        menuDiv.style.marginLeft = "-260px";
        menuDiv.style.transition = "0.4s";
        burgerTrigger.style.display = "block";

    }
}

// detect resolution change
windowResized = (screenWidth) => {
    this.screenWidth = screenWidth;
    let menuDiv = document.getElementById('nav-main-container');
    let burgerTrigger = document.getElementById('burger-menu-trigger');
    if (screenWidth <= 1040) {
        menuDiv.style.marginLeft = "-260px";
        menuDiv.style.transition = "0.4s";
        burgerTrigger.style.display = "block";
    } else if (screenWidth >= 1040) {
        menuDiv.style.marginLeft = "0px";
        menuDiv.style.transition = "0.4s";
        burgerTrigger.style.display = "none";
    }
}