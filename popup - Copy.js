// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;
    console.log(url)
    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, (tabs) => {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

// /**
//  * Change the background color of the current page.
//  *
//  * @param {string} color The new background color.
//  */
// function changeBackgroundColor(color) {
//   var script = 'document.body.style.backgroundColor="' + color + '";';
//   // See https://developer.chrome.com/extensions/tabs#method-executeScript.
//   // chrome.tabs.executeScript allows us to programmatically inject JavaScript
//   // into a page. Since we omit the optional first argument "tabId", the script
//   // is inserted into the active tab of the current window, which serves as the
//   // default.
//   chrome.tabs.executeScript({
//     code: script
//   });
// }

function injectJsonEditorScript(tabId) {
        // create the editor

  // var editorScript = 'var container = document.getElementById("jsoneditor");var options = {};var editor = new JSONEditor(container, options); var json = {"Array": [1, 2, 3],"Boolean": true, "Null": null,"Number": 123,"Object": {"a": "b", "c": "d"},"String": "Hello World"};editor.set(json);var json = editor.get();'
 
  // //var script = "document.body.appendChild('" + editorScript + "')";
  // // var script = 'document.body.style.backgroundColor="blue";';
  // // See https://developer.chrome.com/extensions/tabs#method-executeScript.
  // // chrome.tabs.executeScript allows us to programmatically inject JavaScript
  // // into a page. Since we omit the optional first argument "tabId", the script
  // // is inserted into the active tab of the current window, which serves as the
  // // default.
  // var script = document.createElement('p');
  //   //script.type = 'text/javascript';
  //   script.innerHTML = editorScript;
  // var injectScript =  "var script = document.createElement('p');script.innerHTML = 'editorScript';document.body.appendChild(script)";

  // chrome.tabs.executeScript({

  //   code: injectScript
  // });
}


/**
 * Gets the saved background color for url.
 *
 * @param {string} url URL whose background color is to be retrieved.
 * @param {function(string)} callback called with the saved background color for
 *     the given url on success, or a falsy value if no color is retrieved.
 */
// function getSavedBackgroundColor(url, callback) {
//   // See https://developer.chrome.com/apps/storage#type-StorageArea. We check
//   // for chrome.runtime.lastError to ensure correctness even when the API call
//   // fails.
//   chrome.storage.sync.get(url, (items) => {
//     callback(chrome.runtime.lastError ? null : items[url]);
//   });
// }

/**
 * Sets the given background color for url.
 *
 * @param {string} url URL for which background color is to be saved.
 * @param {string} color The background color to be saved.
 */
// function saveBackgroundColor(url, color) {
//   var items = {};
//   items[url] = color;
//   // See https://developer.chrome.com/apps/storage#type-StorageArea. We omit the
//   // optional callback since we don't need to perform any action once the
//   // background color is saved.
//   chrome.storage.sync.set(items);
// }

// This extension loads the saved background color for the current tab if one
// exists. The user can select a new background color from the dropdown for the
// current page, and it will be saved as part of the extension's isolated
// storage. The chrome.storage API is used for this purpose. This is different
// from the window.localStorage API, which is synchronous and stores data bound
// to a document's origin. Also, using chrome.storage.sync instead of
// chrome.storage.local allows the extension data to be synced across multiple
// user devices.
var tabCreateCallback = function(details){
  // //alert(details.id)
  // setTimeout(function() {
  //   injectJsonEditorScript(details.id);
  // },0)

}
var downloadSearchCallback = function(details){
  // alert(details[0].finalUrl);
  
   //injectJsonEditorScript(details);
  

  chrome.tabs.create({ url: chrome.extension.getURL('jsoneditor.htm') + '?query=' + details[0].filename },tabCreateCallback);
  // injectJsonEditorScript();
  // getCurrentTabUrl((url) => {

  //   console.log(url);

  //   injectJsonEditorScript();
  // });

}
var downloadCallback = function(details){
    
    var query = {};
    query.id = details.id;

    setTimeout(function() {
      //.downloads.open(query.id)
      chrome.downloads.search(query, downloadSearchCallback);
    },0); 
  }

  
chrome.downloads.onCreated.addListener(downloadCallback);



// document.addEventListener('DOMContentLoaded', () => {
// //  var callback = function(details) {
// //   if (details.url === "http://imap-server/api/v1/IMAP/Simulation/JsonDownload/")
// //   {

    
// //   }
// //   chrome.runtime.getURL("myfile.html")
// //   console.log(details)
// // };
// //       //var filter = {"*://imap-server/*"};
// //       var opt_extraInfoSpec = [];
// // chrome.webRequest.onCompleted.addListener(callback,{urls:["*://imap-server/*"]},[]) 



// // var downloadCallback = function(details){

// //   alert(details.id);
// //   query.id = details.id;

// //   setTimeout(function() {
// //     chrome.downloads.search(query, downloadSearchCallback);
// //   },0);
// // }



// // var downloadSearchCallback = function(details){
// //   //console.log(details);
  
// //    injectJsonEditorScript(details);
// //   //chrome.tabs.create({ url: chrome.extension.getURL('jsoneditor.htm') },tabCreateCallback);
// //   // injectJsonEditorScript();
// //   // getCurrentTabUrl((url) => {

// //   //   console.log(url);

// //   //   injectJsonEditorScript();
// //   // });

// // }
// // chrome.downloads.onCreated.addListener(downloadCallback)
// // chrome.devtools.network.onRequestFinished.addListener(
// //           function(request) {
// //             console.log(request.response);
// //             // if (request.response.bodySize > 40*1024) {
// //             //   chrome.devtools.inspectedWindow.eval(
// //             //       'console.log("Large image: " + unescape("' +
// //             //       escape(request.request.url) + '"))');
// //             // }
// //       });

//   // getCurrentTabUrl((url) => {

//   //   if (url == 'http://imap-server/api/v1/IMAP/Simulation/JsonDownload/')
//   //     console.log('found');

//   //   var dropdown = document.getElementById('dropdown');

//   //   // Load the saved background color for this page and modify the dropdown
//   //   // value, if needed.
//   //   getSavedBackgroundColor(url, (savedColor) => {
//   //     if (savedColor) {
//   //       changeBackgroundColor(savedColor);
//   //       dropdown.value = savedColor;
//   //     }
//   //   });

//   //   // Ensure the background color is changed and saved when the dropdown
//   //   // selection changes.
//   //   dropdown.addEventListener('change', () => {
//   //     changeBackgroundColor(dropdown.value);
//   //     saveBackgroundColor(url, dropdown.value);
//   //   });
//   // });
// });


