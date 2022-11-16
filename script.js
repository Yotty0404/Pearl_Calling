
var isCalled = false;
var isCalling = false;

function showClock() {
    let nowTime = new Date();
    let nowHour = ("00" + nowTime.getHours()).slice(-2);
    let nowMin = ("00" + nowTime.getMinutes()).slice(-2);
    let nowSec = nowTime.getSeconds();
    let msg = nowHour + ":" + nowMin;
    document.getElementById("clock").innerHTML = msg;
}
setInterval('showClock()', 1000);

function btnStart_click() {
    setLocation();
    dispObj();
    rec();
}

function callEnd() {
    isCalling = false;
    hideObj();
}

function rec() {
    isCalled = false;
    isCalling = true;

    window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
    var recognition = new webkitSpeechRecognition();

    recognition.lang = 'ja';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (event) {
        var res = event.results[event.results.length - 1];
        var str = res[0].transcript;
        var textarea = document.querySelector('textarea');
        textarea.value = str;

        if (str.indexOf('パール') != -1 || str.indexOf('パル') != -1) {
            called();
        }
    }

    recognition.start();
}

function called() {
    if (!isCalling || isCalled) {
        return;
    }
    isCalled = true;

    var n = Math.random();
    document.getElementById('movie2').currentTime = 0;
    $('#movie2').css('opacity', '1');
    setTimeout(function () {
        $('#movie2')[0].play();
    }, 0);
    if (n < 0.3) {
        $('#movie2').attr('src', 'Movies/pearl_called2.mp4');
        setTimeout(celledEnd, 3850);
    }
    else {
        $('#movie2').attr('src', 'Movies/pearl_called.mp4');
        setTimeout(celledEnd, 3000);
    }

}

$(window).resize(function () {
    setLocation();
})

function celledEnd() {
    $('#movie2').css('opacity', '0');
    $("#movie2")[0].pause()
    isCalled = false;
    rec();
}

function dispObj() {
    $(".dispObj").css("opacity", 1);
}

function hideObj() {
    $(".dispObj").css("opacity", 0);
}

function setLocation() {
    var movieWidth = $("#movie1").width();
    $("#endBtn").css("width", movieWidth / 3 + "px");

    var windowHeight = $(window).height();
    $("#endBtn").css("top", windowHeight - (movieWidth / 3) - 6 + "px");

    var movieLeft = $("#movie1").offset().left;
    var movieLeftEnd = $("#movie1").offset().left + $("#movie1").width();
    $("#battery").css("left", movieLeftEnd - 60 + "px");
    $("#wifi").css("left", movieLeftEnd - 95 + "px");


    $("#selfy").css("width", movieWidth / 4 + "px");
    $("#selfy").css("left", movieLeft + 6 + "px");
}

function movie_click() {
    if (!isCalling || isCalled) {
        return;
    }
    called();
}
