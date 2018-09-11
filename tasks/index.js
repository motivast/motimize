import gulp from 'gulp'

import './sequelize';
import './javascript';

gulp.task('watch', gulp.parallel( [
    'watch:javascript',
]));
