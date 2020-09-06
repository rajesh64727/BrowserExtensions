function hideImage() {
    return function(info, tab) {
        chrome.tabs.sendMessage(tab.id, { type: 'image', imgURL: info.srcUrl, mode: "hide" }, function (msg) { });
    };
};

function removeImage() {
    return function(info, tab) {
        chrome.tabs.sendMessage(tab.id, { type: 'image', imgURL: info.srcUrl, mode: "remove" }, function (msg) { });
    };
};

function editPage() {
    return function(info, tab) {
        chrome.tabs.sendMessage(tab.id, { type: 'page', mode: "design" }, function (msg) { });
    };
};

chrome.contextMenus.create({
    "title": "Hide image",
    "type": "normal",
    "contexts": ["image"],
    "onclick": hideImage()
});

chrome.contextMenus.create({
    "title": "Remove image",
    "type": "normal",
    "contexts": ["image"],
    "onclick": removeImage()
});

chrome.contextMenus.create({
    "title": "Edit the Page",
    "type": "normal",
    "contexts": ["page"],
    "onclick": editPage()
});