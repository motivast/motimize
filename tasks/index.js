import gulp from 'gulp'

import javascript from './javascript';

gulp.task('watch', gulp.parallel( [
    'watch:javascript',
]));
