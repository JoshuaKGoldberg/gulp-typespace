/// <reference path="../node_modules/@types/node/index.d.ts" />

const through = require("through2");
const Typespace = require("typespace").Typespace;

interface IGulpTypespaceSettings {
    /**
     * Name of the output root namespace.
     */
    rootNamespace: string;

    /**
     * Input tsconfig.json path.
     */
    project: string;

    /**
     * Root namespace to ignore from module paths.
     */
    root: string;
}

module.exports = () => {
    return through.obj((settings: IGulpTypespaceSettings, encoding: string, callback: Function) => {
        new Typespace(settings)
            .convert()
            .then((contents: string) => callback(null, contents));
    });
};
