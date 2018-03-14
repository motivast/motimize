/**
 * Gulp task provider for processing javascript
 */
import config from './config';

import gulp from 'gulp';
import notify from 'gulp-notify';
import eslint from 'gulp-eslint';

let watcher;

/**
 * Task provided for linting js files
 */
gulp.task('javascript:lint', function() {

    return gulp.src(config.src + '/**/*.js', { buffer: true })
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(gulp.dest(config.src));
});

/**
 * Task provided for fixing code styling in javascript files
 */
gulp.task('javascript:fix', function() {

    return gulp.src(config.src + '/**/*.js', { buffer: true })
        .pipe(eslint({ fix: true }))
        .pipe(gulp.dest(config.src));
});

/**
 * Task provided for notify about task end
 */
gulp.task('javascript:notify', function() {

    return gulp.src(config.src + '/**/*.js')
        .pipe(notify({ message: 'JS tasks completed!', onLast: true }));
});

gulp.task('javascript:development', gulp.series(
    'javascript:fix',
    'javascript:lint',
    'javascript:notify',
));

/**
 * Task provided for listening changes on files and processing it
 */
gulp.task('watch:javascript', function(done) {

    watcher = gulp.watch(config.jsWatchGlob, gulp.series('wdisable:javascript', 'javascript:development', 'wenable:javascript'));
    done();

});

gulp.task('wdisable:javascript', function(done) {

    watcher.unwatch(config.jsWatchGlob);
    done();

});

gulp.task('wenable:javascript', function(done) {

    watcher.add(config.jsWatchGlob);
    done();

});
