//https://iss-sim.spacex.com/

var x = 2000, y = 120, z = 292, roll = 150, pitch = -200, yaw = -100, range = 2024;

var WAIT_ROTATION = 100;
var WAIT_TRANSLATE = 100;

var stop = false;



var removeChar = function (c, str) {
    for (var i = 0; i < str.length; i++)
        if (str[i] == c) {
            return str.substring(0, i) + str.substring(i + 1);
        }
    return str;
}

var readVal = function (element) {
    var rollStr = $(element).innerText;
    return Number(removeChar(".", rollStr.substring(0, rollStr.length - 1)));
}

var doClick = function (element, count, doThen, wait = WAIT_ROTATION) {


    for (var i = 0; i < count; i++) {
        setTimeout(function () {
            $(element).click();
        }, wait * i + 1);
    }
    setTimeout(function () {
        doThen();
    }, wait * (count));


}

var rollRight = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt( Math.abs(q));

    doClick("#roll-right-button", CLICK_COUNT, function () {
        if (doBack)
            rollLeft(false, q);
        else move();
    });

}

var rollLeft = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt(Math.abs(q));

    doClick("#roll-left-button", CLICK_COUNT, function () {
        if (doBack)
            rollRight(false, q);
        else move();
    });
}

var yawLeft = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt(Math.abs(q));

    doClick("#yaw-left-button", CLICK_COUNT, function () {
        if (doBack)
            yawRight(false, q);
        else move();
    });
}

var yawRight = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt(Math.abs(q));

    doClick("#yaw-right-button", CLICK_COUNT, function () {
        if (doBack)
            yawLeft(false, q);
        else move();
    });
}

var pitchUp = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt(Math.abs(q));

    doClick("#pitch-up-button", CLICK_COUNT, function () {
        if (doBack)
            pitchDown(false,q); else move();
    });
}

var pitchDown = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt(Math.abs(q));

    doClick("#pitch-down-button", CLICK_COUNT, function () {
        if (doBack)
            pitchUp(false, q);
        else move();
    });
}

var goUp = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt( 10 * Math.abs(q));

    doClick("#translate-up-button", CLICK_COUNT, function () {
        if (doBack)
            goDown(false, q);
        else move();
    }, WAIT_TRANSLATE);
}

var goDown = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt(10 * Math.abs(q));

    doClick("#translate-down-button", CLICK_COUNT, function () {
        if (doBack)
            goUp(false, q);
        else move();
    }, WAIT_TRANSLATE);
}

var goLeft = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt(10 * Math.abs(q));

    doClick("#translate-left-button", CLICK_COUNT, function () {
        if (doBack)
            goRight(false, q);
        else move();
    }, WAIT_TRANSLATE);
}

var goRight = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt(10 * Math.abs(q));

    doClick("#translate-right-button", CLICK_COUNT, function () {
        if (doBack)
            goLeft(false, q);
        else move();
    }, WAIT_TRANSLATE);
}

var forward = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt(10 * Math.abs(q));

    doClick("#translate-forward-button", CLICK_COUNT, function () {
        if (doBack)
            backward(false, q);
        else move();
    }, WAIT_TRANSLATE);
}

var backward = function (doBack, q) {

    var CLICK_COUNT = Math.sqrt(10 * Math.abs(q));

    doClick("#translate-backward-button", CLICK_COUNT, function () {
        if (doBack)
            forward(false, q);
        else move();
    }, WAIT_TRANSLATE);
}

var move = function () {
    roll = readVal("#roll>div");
    yaw = readVal("#yaw>div");
    pitch = readVal("#pitch>div");

    x = readVal("#x-range>div");
    y = readVal("#y-range>div");
    z = readVal("#z-range>div");

    if (stop) return;

    if (roll >= 1) {
        rollRight(true, roll);
        return;
    }

    if (roll <= -1) {
        rollLeft(true, roll);
        return;
    }

    if (pitch >= 1) {
        pitchDown(true, pitch);
        return;
    }

    if (pitch <= -1) {
        pitchUp(true, pitch);
        return;
    }

    if (yaw >= 1) {
        yawRight(true, yaw);
        return;
    }

    if (yaw <= -1) {
        yawLeft(true, yaw);
        return;
    }

    if (z >= 1) {
        goDown(true, z);
        return;
    }

    if (z <= -1) {
        goUp(true, z);
        return;
    }

    if (y >= 1) {
        goLeft(true, y);
        return;
    }

    if (y <= -1) {
        goRight(true, y);
        return;
    }

    if (x >= 1) {
        forward(true, x);
        return;
    }

    console.log("Bitti heralde");
}


