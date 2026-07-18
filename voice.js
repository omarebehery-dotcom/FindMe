// =====================================
// FindMe - voice.js
// =====================================

let voiceEnabled = true;

// تشغيل الكلام
function speak(text){

    if(!voiceEnabled) return;

    if(!("speechSynthesis" in window)){

        console.log("Voice Not Supported");

        return;

    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance();

    speech.lang = "ar-EG";

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    speech.text = text;

    window.speechSynthesis.speak(speech);

}

// تشغيل وإيقاف الصوت
function toggleVoice(){

    voiceEnabled = !voiceEnabled;

    if(voiceEnabled){

        speak("تم تشغيل التوجيه الصوتي");

    }else{

        window.speechSynthesis.cancel();

        alert("تم إيقاف التوجيه الصوتي");

    }

}

// بدء الملاحة
function voiceStart(){

    speak("تم بدء الملاحة");

}

// الوصول
function voiceArrived(){

    speak("لقد وصلت إلى وجهتك");

}

// انعطف يمين
function voiceRight(){

    speak("انعطف يميناً");

}

// انعطف يسار
function voiceLeft(){

    speak("انعطف يساراً");

}

// استمر
function voiceStraight(){

    speak("استمر للأمام");

}

// دوران للخلف
function voiceUTurn(){

    speak("قم بالالتفاف للخلف عندما يكون ذلك آمناً");

}

// سرعة
function voiceSpeed(speed){

    speak("سرعتك الحالية " + speed + " كيلومتر في الساعة");

}

// تحذير سرعة
function voiceWarning(){

    speak("يرجى تخفيف السرعة");

}
