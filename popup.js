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


window.onload = function onLoadFunctions() {
    function change(){
    document.getElementById("currday").style.borderLeft = "solid #000000";
    document.getElementById("currday").style.borderRight = "black";
    document.getElementById("currday").style.borderTop = "black";
    document.getElementById("currday").style.borderBottom = "black";
    }
    var apikey = '6b84a56c561b6aba70eb92a47c27452d';
    var prefFahrenheit = 40;
    var prefTemp = (prefFahrenheit + 459.67)*5/9;
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
    function apparentTemp(daytemp, rhperc, windspd) {
        var vp = (rhperc/100)*6.105*Math.Exp(17.27*daytemp/(237.7+daytemp));
        var atemp = daytemp + 0.33*vp-0.7*windspd-4.0;
        return atemp;
    }
    function colorFromTemp(temp) {
        var r = 0, g = 128, b = 0;
        var diff = temp - prefTemp;
        if (diff > 0) {
            r = 204;
            g = 0;
            b = 76;
            r += diff*2;
            b -= diff*4;
            g -= diff*4;
        }
        else {
            b = 237;
            r = 100;
            g = 149;
            b += diff*2;
            r -= diff*4;
            g -= diff*4;
        }
        if (r >= 255) {
            r = 255;
        }
        else if (r <= 0) {
            r = 0;
        }
        if (g >= 255) {
            g = 255;
        }
        else if (g <= 0) {
            g = 0;
        }
        if (b >= 255) {
            b = 255;
        }
        else if (b <= 0) {
            b = 0;
        }
        return rgb2hex(r,g,b);
    }

    function rgb2hex(red, green, blue) {
        var rgb = blue | (green << 8) | (red << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1)
    }

    document.getElementById("pref").addEventListener("click", function(){
        chrome.windows.create({'url': 'pref.html', 'type': 'popup', height: 450, width: 650}, function(window) {
        });
    });

    document.getElementById("info").addEventListener("click", function(){
        alert('Made with <3 by Kaushik, Kanav, and Saahil, at Hack Illinois 2018!')
    });

    var apiCall = 'http://api.openweathermap.org/data/2.5/weather?lat=' + 40.11 + '&lon=' + 88.21 + '&appid=' + apikey;
    var apiCallForecast = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + 40.11 + '&lon=' + 88.21 + '&appid=' + apikey;

    var data2 = getJSON(apiCall);
    var data = JSON.parse(data2);
    var dataForecast2 = getJSON(apiCallForecast);
    var dataForecast = JSON.parse(dataForecast2);
    var currdaytemp = data.main.temp;
    console.log(currdaytemp);
    var daytwotemp = 0;
    var dataForecastArray = Array(dataForecast.list);
    for (i = 0; i <= 6; i++){
        daytwotemp += dataForecastArray[0][i].main.temp;

    }
    daytwotemp = daytwotemp/7;
    var daythreetemp = 0;
    for (i = 7; i <= 14; i++){
        daythreetemp += dataForecastArray[0][i].main.temp;
    }
    daythreetemp = daythreetemp/8;
    var dayfourtemp = 0;
    for (i = 15; i <= 22; i++){
        dayfourtemp += dataForecastArray[0][i].main.temp;
    }
    dayfourtemp = dayfourtemp/8;
    var dayfivetemp = 0;
    for (i = 23; i <= 30; i++){
        dayfivetemp += dataForecastArray[0][i].main.temp;
    }
    dayfivetemp = dayfivetemp/8;

    console.log(colorFromTemp(currdaytemp));
    console.log(colorFromTemp(daytwotemp));
    console.log(colorFromTemp(daythreetemp));
    console.log(colorFromTemp(dayfourtemp));
    console.log(colorFromTemp(dayfivetemp));

    document.getElementById("currday").style.backgroundColor = colorFromTemp(currdaytemp);
    document.getElementById("daytwo").style.backgroundColor = colorFromTemp(daytwotemp);
    document.getElementById("daythree").style.backgroundColor = colorFromTemp(daythreetemp);
    document.getElementById("dayfour").style.backgroundColor = colorFromTemp(dayfourtemp);
    document.getElementById("dayfive").style.backgroundColor = colorFromTemp(dayfivetemp);

}
