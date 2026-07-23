// =====================================
// FindMe - voice.js
// =====================================

// هل الصوت مفعل؟
let voiceEnabled = true;

// اللغة
const voiceLang = "ar-EG";

// تشغيل / إيقاف الصوت
function toggleVoice(){

    voiceEnabled = !voiceEnabled;

    const buttons = document.querySelectorAll(".bottom-bar button");

    buttons.forEach(btn=>{

        if(btn.innerText.includes("الصوت")){

            if(voiceEnabled){

                btn.style.color="#1976D2";

            }else{

                btn.style.color="#888";

            }

        }

    });

    speak(

        voiceEnabled ?

        "تم تشغيل التوجيه الصوتي"

        :

        "تم إيقاف التوجيه الصوتي"

    );

}

// نطق أي رسالة
function speak(text){

    if(!voiceEnabled){

        return;

    }

    if(!("speechSynthesis" in window)){

        console.log("Speech API غير مدعومة");

        return;

    }

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);

    utter.lang = voiceLang;

    utter.rate = 1;

    utter.pitch = 1;

    utter.volume = 1;

    window.speechSynthesis.speak(utter);

}

// تعليمات الملاحة
function navigationVoice(distance){

    if(!voiceEnabled){

        return;

    }

    if(distance > 500){

        speak(

            "استمر في السير"

        );

    }

    else if(distance > 200){

        speak(

            "اقتربت من وجهتك"

        );

    }

    else if(distance > 50){

        speak(

            "بعد قليل ستصل"

        );

    }

    else{

        speak(

            "لقد وصلت إلى وجهتك"

        );

    }

}

// تشغيل صوت البداية
function welcomeVoice(){

    if(voiceEnabled){

        speak(

            "مرحباً بك في تطبيق فايند مي"

        );

    }

}

// تشغيل عند فتح التطبيق
window.addEventListener(

    "load",

    function(){

        setTimeout(

            welcomeVoice,

            2000

        );

    }

);