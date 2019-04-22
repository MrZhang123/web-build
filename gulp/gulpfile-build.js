/*
 * 打包上线时候用到的功能
 * */
//引用的模块
const gulp = require('gulp');
//const rename = require('gulp-rename');                  //重新命名生成的css和js文件
const sass = require('gulp-sass');                      //scss编译
const uglify = require('gulp-uglify');                  //压缩js
const clean = require('gulp-clean');                    //清空文件夹里所有的文件
const rev = require('gulp-rev');                        //生成带有哈希值的文件名
const runSequence = require('run-sequence');            //让task序列化
const reCollector = require('gulp-rev-collector');      //gulp-rev的插件，用于在生成带哈希值的文件名后替换html中的引用
//每次打包时先清空原有的文件夹
gulp.task('clean', ()=>
    gulp.src(['dist', 'rev'], {read: false}) //这里设置的dist表示删除dist文件夹及其下所有文件
        .pipe(clean())

);
//scss编译
gulp.task('css', ()=> {
    gulp.src('src/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'               //编译并输出压缩过的文件
        }))
        /*.pipe(rename(function (path) {            //替换文件名字
            path.basename += '.min'
        }))*/
        .pipe(rev())                                //给css添加哈希值
        .pipe(gulp.dest('dist/css'))
        .pipe(rev.manifest())                       //给添加哈希值的文件添加到清单中
        .pipe(gulp.dest('rev/css'));
});
//压缩js
gulp.task('js', ()=> {
    gulp.src('src/js/*js')
        .pipe(uglify())
        .pipe(rev())                                //给js添加哈希值
        .pipe(gulp.dest('dist/js'))
        .pipe(rev.manifest())                       //给添加哈希值的文件添加到清单中
        .pipe(gulp.dest('rev/js'));
});
//将处理过的css，js引入html
gulp.task('reCollector',()=>{
    gulp.src(['rev/**/*.json','src/*.html'])
        .pipe(reCollector({
            replaceReved: true,
            dirReplacements: {
                'css/': '/dist/css/',
                'js/': '/dist/js/'
            }
        }))
        .pipe(gulp.dest('dist'));
});
//进行打包上线
gulp.task('default', ()=> {
    runSequence('clean', ['css', 'js'], 'reCollector');
});
