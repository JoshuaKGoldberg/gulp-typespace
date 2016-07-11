var sourceStream = require("vinyl-source-stream");
var Typespace = require("typespace");

module.exports = function (settings, callback) {
    var stream = sourceStream(settings.fileName || "output.ts");

    new Typespace(settings)
        .convert()
        .then(function (contents) {
            if (callback) {
                return callback();
            }

            stream
                .write(contents)
                .then(function () {
                    stream.end();
                });
        });

    return stream;
};
