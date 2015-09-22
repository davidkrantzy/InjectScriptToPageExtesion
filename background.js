/**
 * runs a js file
 * config script to js file path, weather to run on each tab, etc.
 * @type {*}
 */

/* Config Script */
var runAlways = false;
var runOnClicked = true;
var runInAllTabs = false;
var jsFilePath = "script.js";



if ( runAlways)
    RunAlways();

if ( runOnClicked)
    RunOnClicked();



/* Functions */

function RunAlways(){

    chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {

        runScript(tabId, changeInfo, tab);
    });
}

// Called when the user clicks on the browser action.
function RunOnClicked(){

    chrome.browserAction.onClicked.addListener(function(tab) {

        chrome.tabs.executeScript(tab.id, {file: jsFilePath, runAt: "document_end"});
    });
}

function runScript(tabId, changeInfo, tab) {

    var runAtCurrentTab = ( runInAllTabs || tab.active);

    if ( changeInfo.status == 'complete' &&  runAtCurrentTab) {
        log('Sending content from tab:  ' + tab.id.toString() );
        chrome.tabs.executeScript(tab.id, {file: jsFilePath, runAt: "document_end"});
        //chrome.tabs.executeScript(tab.id, {file: jsFilePath, runAt: "document_start"});
    }
}

var logToConsole = true;
var showMessageBox = false;

function log(message)
{
    if ( logToConsole )
        console.log(message);

    if ( showMessageBox )
        alert(message);
}
