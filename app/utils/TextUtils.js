exports.splitParams = (bodyData)  => {
    var queryString = bodyData; // Extract the query string
    var params = queryString.split('&'); // Split the query string into individual parameters

    var result = {};
    for (var i = 0; i < params.length; i++) {
        var param = params[i].split('=');
        var key = decodeURIComponent(param[0]);
        var value = decodeURIComponent(param[1]);

        result[key] = value;
    }

    return result;
}
