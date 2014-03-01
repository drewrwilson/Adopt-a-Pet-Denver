var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

var paths = {
    spec: 'spec/unit/**/*.js',
    less: 'client/less/**/*'
};

gulp.task('specRunner', function() {
    return gulp.src('spec/unit/*.js')
        .pipe(jasmine());
});

gulp.task('default', ['specRunner']);

gulp.task('spec', function() {
    gulp.watch(paths.spec, ['specRunner']);
});
