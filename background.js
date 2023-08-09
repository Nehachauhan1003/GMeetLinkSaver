var openLink = function (y) {
    window.open(y,"_blank");
 }
chrome.runtime.onMessage.addListener(
   openLink
)