// ====================================
// FindMe - settings.js
// ====================================

const SETTINGS_KEY = "findme_settings";

// الإعدادات الافتراضية
let settings = {

    darkMode:false,

    voice:true,

    traffic:false,

    satellite:false,

    keepCentered:true,

    language:"ar"

};

// تحميل الإعدادات
function loadSettings(){

    const data = localStorage.getItem(SETTINGS_KEY);

    if(data){

        settings = JSON.parse(data);

    }

    applySettings();

}

// حفظ
function saveSettings(){

    localStorage.setItem(

        SETTINGS_KEY,

        JSON.stringify(settings)

    );

}

// تطبيق الإعدادات
function applySettings(){

    // الوضع الليلي
    if(settings.darkMode){

        document.body.classList.add("dark");

    }else{

        document.body.classList.remove("dark");

    }

    // متابعة الموقع
    if(typeof followUser !== "undefined"){

        followUser = settings.keepCentered;

    }

    // الصوت
    if(typeof voiceEnabled !== "undefined"){

        voiceEnabled = settings.voice;

    }

}

// نافذة الإعدادات
function openSettings(){

    const choice = prompt(

`========== FindMe ==========

1 - الوضع الليلي

2 - تشغيل / إيقاف الصوت

3 - تشغيل / إيقاف المرور

4 - متابعة الموقع

5 - معلومات التطبيق

============================`

    );

    switch(choice){

        case "1":

            settings.darkMode=!settings.darkMode;

            break;

        case "2":

            settings.voice=!settings.voice;

            break;

        case "3":

            settings.traffic=!settings.traffic;

            if(typeof toggleTraffic==="function"){

                toggleTraffic();

            }

            break;

        case "4":

            settings.keepCentered=!settings.keepCentered;

            break;

        case "5":

            alert(

`FindMe

Version 1.0

Professional GPS Navigation

Developer: Omar`

            );

            return;

    }

    saveSettings();

    applySettings();

}

// هل الصوت يعمل؟
function isVoiceEnabled(){

    return settings.voice;

}

// هل الوضع الليلي يعمل؟
function isDarkMode(){

    return settings.darkMode;

}

// هل المرور يعمل؟
function isTrafficEnabled(){

    return settings.traffic;

}

// تحميل الإعدادات
window.addEventListener("load",function(){

    loadSettings();

});
