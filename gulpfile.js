const gulp = require("gulp");
const merge = require("merge2");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");

gulp.task("tslint", () => {
    return gulp
        .src(["src/**/*.ts"])
        .pipe(tslint())
        .pipe(tslint.report("verbose"));
});

gulp.task("tsc", () => {
    const project = ts.createProject("tsconfig.json");
    const output = project
        .src()
        .pipe(ts(project));

    return merge([
        output.dts.pipe(gulp.dest("lib")),
        output.js.pipe(gulp.dest("lib"))
    ]);
});

gulp.task("watch", ["default"], () => {
    gulp.watch(["src/**/*.ts"], ["default"]);
});

gulp.task("default", ["tsc", "tslint"]);
