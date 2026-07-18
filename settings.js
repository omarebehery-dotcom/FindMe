// settings.js

let settings = {

    darkMode: false,

    gpsEnabled: true

};

// تحميل الإعدادات
function loadSettings() {

    const data = localStorage.getItem("findme_settings");

    if (data) {

        settings = JSON.parse(data);

    }

    applySettings();

}

// حفظ الإعدادات
function saveSettings() {

    localStorage.setItem(
        "findme_settings",
        JSON.stringify(settings)
    );

}

// تطبيق الإعدادات
function applySettings() {

    if (settings.darkMode) {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");

    }

}

// تشغيل الوضع الليلي
function toggleDarkMode() {

    settings.darkMode = !settings.darkMode;

    saveSettings();

    applySettings();

}

// تشغيل أو إيقاف GPS
function toggleGPS() {

    settings.gpsEnabled = !settings.gpsEnabled;

    saveSettings();

    if (settings.gpsEnabled) {

        startGPS();

        alert("GPS Enabled");

    } else {

        alert("GPS Disabled");

    }

}

// نافذة الإعدادات
function openSettings() {

    const choice = prompt(

`الإعدادات

1 = الوضع الليلي

2 = تشغيل/إيقاف GPS`

    );

    if (choice == "1") {

        toggleDarkMode();

    }

    if (choice == "2") {

        toggleGPS();

    }

}

loadSettings();
