var express = require('express');
var cors = require('cors')
var jsonServer = require('json-server');
var fs = require('fs');
const fileUpload = require('express-fileupload');

var server = express();

server.use(cors())

server.use(fileUpload());

server.use('/uploads', express.static('uploads'));

const jsRouter = jsonServer.router('db.json');

jsRouter.render = async (req, res) =>{

  if(res.statusCode == 201){
    const lastId = res.locals.data.id;
    
    let newfile = req.files.picture;

    newfile.mv(`./uploads/${lastId}.png`, function(err) {
      if (err) console.error(`File ${lastId} failed`);
      console.log('file uploaded');
    });

  }
  
  res.jsonp(res.locals.data);

}

server.use('/api', jsRouter);

server.listen(3000, ()=> console.log('server started'));