// voice.js

let voiceEnabled = true;

function speak(text) {

    if (!voiceEnabled) return;

    if (!('speechSynthesis' in window)) {

        console.log("Speech not supported");

        return;

    }

    window.speechSynthesis.cancel();

    const msg = new SpeechSynthesisUtterance();

    msg.text = text;

    msg.lang = "ar-EG";

    msg.rate = 1;

    msg.pitch = 1;

    msg.volume = 1;

    window.speechSynthesis.speak(msg);

}

// تشغيل وإيقاف الصوت
function toggleVoice() {

    voiceEnabled = !voiceEnabled;

    if (voiceEnabled) {

        speak("تم تشغيل التوجيه الصوتي");

    } else {

        window.speechSynthesis.cancel();

        alert("تم إيقاف التوجيه الصوتي");

    }

}

// أوامر الملاحة
function sayStart() {

    speak("تم بدء الملاحة");

}

function sayArrived() {

    speak("لقد وصلت إلى وجهتك");

}

function sayTurnLeft() {

    speak("انعطف يساراً");

}

function sayTurnRight() {

    speak("انعطف يميناً");

}

function sayStraight() {

    speak("استمر في السير للأمام");

}

function sayUTurn() {

    speak("قم بالالتفاف للخلف عندما يكون ذلك آمناً");

}

function saySpeed(speed) {

    speak("سرعتك الحالية " + speed + " كيلومتر في الساعة");

}






