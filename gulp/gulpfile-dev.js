/*
* 所有开发时候用到的功能
* */
const gulp = require('gulp');
const sass = require('gulp-sass'); //scss编译
const browserSync = require('browser-sync').create(); //实时刷新
const reload = browserSync.reload;
//scss编译
gulp.task('scss:dev',()=>{gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream:true}));  //设置css注入
});
//监测文件变化，实时刷新
gulp.task('default',['scss:dev'],function () {
    browserSync.init({
        server:{
            baseDir:'./'  //设置服务器的根目录
        },
        logLevel: "debug",
        logPrefix:"dev",
        browser:'chrome',
        notify:false //开启静默模式
    });
    //使用gulp的监听功能，实现编译修改过后的文件
    gulp.watch('src/scss/*.scss',['scss:dev']);
    gulp.watch(('*.html')).on('change',reload);
});