
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.engine('html', require('hbs').__express);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/upphoto', function (req, res) {
  var newPhoto = req.files.newPhoto;
  if (!newPhoto || newPhoto.type.indexOf("image/") == -1) {
    res.redirect("back");
    return;
  }

  var currentPath = newPhoto.path;
  var newPath = "./public/uploads/" + newPhoto.name;

  fs.rename(currentPath, newPath, function (err) {
    if (err) throw err;
    res.redirect("back");
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
 
