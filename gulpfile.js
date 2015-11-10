var gulp = require("gulp"), 
    sass = require("gulp-ruby-sass"),
    notify = require("gulp-notify"),
    bower = require("gulp-bower"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    gulpif =  require("gulp-if"),
    connect =  require("gulp-connect");

var env = process.env.NODE_ENV  || "development"; 

var config = {
	sassPath: "./development/scss",
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

/* Copy the inde.html file to the the production forder */
gulp.task("html", function(){
	return gulp.src("./development/index.html")
		.pipe(gulp.dest("./"))
		.pipe(connect.reload());
});

/* Complie cssc to a css file */
gulp.task('css', function() {
	var configCss = {
		loadPath: [
			config.bowerDir,
			config.bowerDir + '/bootstrap-sass/assets/stylesheets',
			config.bowerDir + '/font-awesome/scss',
		]
	};
	if(env === "production"){
		config.style = "compressed";
	}
	return sass(config.sassPath + '/styles.scss', configCss)
	.on("error", notify.onError(function (error) {
		return "Error: " + error.message;
	}))
	.pipe(gulp.dest(config.dest + "/css"))
	.pipe(connect.reload());
});

/* Concat, minify javascript files */
gulp.task("js",function(){
	return gulp.src([
			config.bowerDir + "/jquery/dist/jquery.js",
			config.bowerDir + "/bootstrap/dist/js/bootstrap.js",
			config.bowerDir + "/underscore/underscore.js",
			config.bowerDir + "/backbone/backbone.js",
			config.bowerDir + "/backbone.bootstrap-modal/src/backbone.bootstrap-modal.js",
			config.bowerDir + "/moment/moment.js",
			"./development/js/*.js",
			"./development/js/models/*.js",
			"./development/js/collections/*.js",
			"./development/js/views/*.js",
			"./development/js/routers/*.js"
		])
		.pipe(concat("app.js"))
		.pipe(gulpif(env === "production", uglify()))
		.pipe(gulp.dest(config.dest + "/js"))
		.pipe(connect.reload());
});

/* Watch task: run the specified task(s) when some file(s) change*/
gulp.task("watch", function(){
	gulp.watch("./development/scss/*.scss", ["css"]);
	gulp.watch("./development/js/**/*.js", ["js"]);
	gulp.watch("./development/index.html", ["html"]);
});

gulp.task("connect", function(){
	connect.server({
		port: 3000,
		livereload: true
	});
});

/* Define the default task */
gulp.task("default", ["html", "icons", "css", "js", "connect", "watch"]);