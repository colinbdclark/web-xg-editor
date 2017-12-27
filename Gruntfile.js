/* eslint-env node */

"use strict";

module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        eslint: {
            all: ["src/**/*.js", "tests/**/*.js"],
        },

        jsonlint: {
            all: ["src/**/*.json"]
        }
    });

    // Load relevant Grunt plugins.
    grunt.loadNpmTasks("fluid-grunt-eslint");
    grunt.loadNpmTasks("grunt-jsonlint");

    grunt.registerTask("default", ["lint"]);
    grunt.registerTask("lint", "Apply eslint and jsonlint", ["eslint", "jsonlint"]);

};
