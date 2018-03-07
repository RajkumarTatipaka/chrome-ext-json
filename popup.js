/// This extension allows to open the downloaded json file to json viewer directly without wasting 
/// time to open,copy and paste the content in online json editor.
/// This extension uses json editor node module to render the json on json viewer.


///This popup.js runs in the background of the extension.

//Callback function after tabs creation done.
var tabCreateCallback = function(details){
  //left blank intentionally

}
var downloadSearchCallback = function(details){
  //create new tab, this new tab will show the json viewer for the downloaded json.
  chrome.tabs.create({ url: chrome.extension.getURL('jsoneditor.htm') + '?query=' + details[0].filename },tabCreateCallback);
  
}

// Callback method for download initiated.
var downloadCreatedCallback = function(details){
    
    var query = {};
    query.id = details.id; //Unique download Id, require to search and read the contents of the downloaded file.

    setTimeout(function() {
      chrome.downloads.search(query, downloadSearchCallback);
    },1000); 
  }

//attach listener to download event.  
chrome.downloads.onCreated.addListener(downloadCreatedCallback);


