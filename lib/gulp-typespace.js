var sourceStream = require("vinyl-source-stream");
var Typespace = require("typespace");

module.exports = function (settings, callback) {
    var stream = sourceStream(settings.outFile || "output.ts");

    new Typespace(settings)
        .convert()
        .then(function (contents) {
            if (callback) {
                return callback(contents);
            }

            stream.write(contents, "utf-8", function () {
                stream.end();
            });
        })
        .catch(function (error) {
            console.error("Error in gulp-typespace:", error);
        });

    return stream;
};
