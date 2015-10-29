var gulp = require("gulp"), 
    sass = require("gulp-ruby-sass"),
    notify = require("gulp-notify"),
    bower = require("gulp-bower"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    gulpif =  require("gulp-if");

var env = process.env.NODE_ENV  || "development"; 

var config = {
	sassPath: "./develoment/scss",
	bowerDir: "./bower_components",
	dest: "./assets"
};

/* Bower task, install all the bower dependencies */
gulp.task("bower", function() {
	return bower()
		.pipe(gulp.dest(config.bowerDir))
});

/* Copy the fonts file from fontawesome to the assets directory */
gulp.task("icons", function() {
	return gulp.src([
		config.bowerDir + "/bootstrap-sass/assets/fonts/bootstrap/**.*", 
			config.bowerDir + "/font-awesome/fonts/**.*"
		])
		.pipe(gulp.dest(config.dest + "/fonts"));
});

/* Complie cssc to a css file */
gulp.task('css', function() {
	return sass(config.sassPath + '/styles.scss', {
		style: 'compressed',
		loadPath: [
			config.bowerDir,
			config.bowerDir + '/bootstrap-sass/assets/stylesheets',
			config.bowerDir + '/font-awesome/scss',
		]
	})
	.on("error", notify.onError(function (error) {
		return "Error: " + error.message;
	}))
	.pipe(gulp.dest(config.dest + "/css"));
});

/* Concat, minify javascript files */
gulp.task("js",function(){
	return gulp.src([config.bowerDir + "/jquery/dist/jquery.js", "./develoment/js/**/*.js"])
		.pipe(concat("app.js"))
		.pipe(gulpif(env === "production", uglify()))
		.pipe(gulp.dest(config.dest + "/js"));
});