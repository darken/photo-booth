var fs = require("fs");

exports.index = function(req, res){
  getPhotos(res);
};

function renderIndex(res, photos) {
  res.render('index.html', {
    title: 'Photo Booth',
    photos: photos
  });
}

function getPhotos(res) {
  fs.readdir("./public/uploads", function (err, files) {
    if (err) throw err;
    renderIndex(res, files);
  });
}
