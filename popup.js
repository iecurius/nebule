
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

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
});
}
const var apikey = '6b84a56c561b6aba70eb92a47c27452d';
var x = document.getElementById("ua");

function getLat(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude;
}
function getLong(position) {
    x.innerHTML = "Longitude: " + position.coords.longitude;
}

function getJSON(url) {
    var resp ;
    var xmlHttp ;
    resp  = '' ;
    xmlHttp = new XMLHttpRequest();
    if(xmlHttp != null)
    {
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        resp = xmlHttp.responseText;
    }
    return resp ;
}

function onLoadFunctions() {
    var apiCall = 'http://api.openweathermap.org/data/2.5/weather?lat=' + getLat() + '&lon=' + getLong() + '&appid=' + apikey;
    var apiCallForecast = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + getLat() + '&lon=' + getLong() + '&appid=' + apikey;

    var data1 = getJSON(apiCall1);
    var dataForecast = getJSON(apiCallForecast);

    var currdaytemp = data1.main.temp;
    var daytwotemp = 0;
    for (i = 1; i <= 7; i++){
      daytwotemp += data.list[i].main.temp;
    }
    daytwotemp = daytwotemp/7;
    var daythreetemp = 0;
    for (i = 8; i <= 15; i++){
        daythreetemp += data.list[i].main.temp;
    }
    daythreetemp = daythreetemp/8;
    var dayfourtemp = 0;
    for (i = 16; i <= 23; i++){
        dayfourtemp += data.list[i].main.temp;
    }
    dayfourtemp = daytwotemp/8;
    var dayfivetemp = 0;
    for (i = 24; i <= 31; i++){
        dayfivetemp += data.list[i].main.temp;
    }
    dayfivetemp = daytwotemp/8;


}


