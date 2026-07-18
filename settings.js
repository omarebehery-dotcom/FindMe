// ====================================
// FindMe - settings.js
// ====================================

const SETTINGS_KEY = "findme_settings";

// الإعدادات الافتراضية
let settings = {

    darkMode: false,

    voice: true,

    traffic: false,

    satellite: false,

    keepCentered: true,

    language: "ar"

};

// تحميل الإعدادات
function loadSettings(){

    const data = localStorage.getItem(SETTINGS_KEY);

    if(data){

        settings = JSON.parse(data);

    }

    applySettings();

}

// حفظ الإعدادات
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

    }

    else{

        document.body.classList.remove("dark");

    }

}

// نافذة الإعدادات
function openSettings(){

    const choice = prompt(

`========== FindMe ==========
1 - الوضع الليلي

2 - تشغيل/إيقاف الصوت

3 - تشغيل/إيقاف المرور

4 - تمركز الخريطة

5 - معلومات التطبيق
=============================`

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

            toggleTraffic();

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

            break;

    }

    saveSettings();

    applySettings();

}

// معرفة إذا كان الصوت يعمل
function voiceEnabled(){

    return settings.voice;

}

// تحميل الإعدادات عند فتح التطبيق
loadSettings();
