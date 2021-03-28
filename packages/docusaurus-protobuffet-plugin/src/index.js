"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
function validateOptions(_a) {
    var options = _a.options, validate = _a.validate;
    if (options.fileDescriptorsPath === undefined) {
        throw new Error("Options missing fileDescriptorsPath.");
    }
    return options;
}
exports.validateOptions = validateOptions;
;
function myPlugin(context, options) {
    return {
        name: "docusaurus-protobuffet-plugin",
        extendCli: function (cli) {
            cli
                .command("dothing")
                .description("Does something")
                .action(function () { });
        },
    };
}
exports.default = myPlugin;
