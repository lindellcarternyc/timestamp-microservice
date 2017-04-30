var express = require("express");
var url = require("url");

var app = express();

app.get('*', (req, res) => {
    var urldata = url.parse(req.url);
    var str = urldata.path.split('/')[1];
    str = decodeURI(str);
    
    var obj = {};
    var date = Date.parse(str)
    if (isNaN(date)) {
        var millis = parseInt(str);
        if (isNaN(millis)) {
            obj["unix"] = null;
            obj["natural"] = null;
        } else {
            obj["unix"] = millis;
            obj["natural"] = dateString(millis);
        }
    } else {
        obj["unix"] = date;
        obj["natural"] = dateString(date);
    }
    
    obj = JSON.stringify(obj);
    console.log(obj);
    res.json(obj);
    res.end();
});

app.listen(8080, () => {
   console.log(`app listening on port ${8080}`); 
});

function dateString(millis) {
    var date = new Date(millis);
    // console.log(date.getMonth());
    var month = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'Novermber', 'December'
    ][date.getMonth()];
    return `${month} ${date.getDate()}, ${date.getFullYear()}`;
}