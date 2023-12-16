// ==UserScript==
// @name         GoogleSearchFixer
// @namespace    https://wmeluna.com/
// @version      0.1
// @description  Fix Firefox having a shitier search
// @author       WmeLuna
// @match        https://*.google.*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @updateURL    https://github.com/WmeLuna/MobileUserscripts/raw/main/GoogleSearchFixer.user.js
// @downloadURL  https://github.com/WmeLuna/MobileUserscripts/raw/main/GoogleSearchFixer.user.js
// @grant        none
// ==/UserScript==

const RunningFirefoxVersion = (navigator.userAgent.match(/Firefox\/([0-9.]+)/) || ["", "58.0"])[1];
const RunningAndroidVersion = navigator.userAgent.match(/Android [0-9.]+/) || "Android 6.0";

const ChromeMajorVersionToMimic = `${parseInt(RunningFirefoxVersion) + 4}.0.0.0`;

const ChromePhoneUA = `Mozilla/5.0 (Linux; ${RunningAndroidVersion}; Nexus 5 Build/MRA58N) FxQuantum/${RunningFirefoxVersion} AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${ChromeMajorVersionToMimic} Mobile Safari/537.36`;
const ChromeTabletUA = `Mozilla/5.0 (Linux; ${RunningAndroidVersion}; Nexus 7 Build/JSS15Q) FxQuantum/${RunningFirefoxVersion} AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${ChromeMajorVersionToMimic} Safari/537.36`;

function getUserAgentOverride(userAgent) {
  if (userAgent.includes("Mobile")) {
    return ChromePhoneUA;
  }
  if (userAgent.includes("Tablet")) {
    return ChromeTabletUA;
  }
  return userAgent;
}

Object.defineProperty(
  navigator.wrappedJSObject,
  "userAgent",
  {
    enumerable: true,
    configurable: true,
    value: getUserAgentOverride(navigator.userAgent),
  }
);
