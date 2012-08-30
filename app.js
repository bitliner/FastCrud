
/**
 * Module dependencies.
 */

 var express = require('express')
 , routes = require('./routes');

 var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

var FastCrud=require('./fastcrud')

var StudentModel=FastCrud.Model({
  Student:{
    name: 'Giovanni Johnson',
    age: 18,
    School: {
      name: 'Standford',
      address: 'Stand street'
    }
  },
})
, Student=FastCrud.get('Student')
, School=FastCrud.get('School')


var s=new School({
  name: 'Roma 3',
  address: 'via della Vasca Navale'
})

var s=new Student({
  name: 'Marco DiLillo',
  age: 24,
  school: s
}).save(function(err,doc){
  console.log(err,doc);
})

StudentModel.setAPI(app)
StudentModel.setGenericViews(app,{
  ListView: {
    template: './students/students.jade'
  },
  DetailsView:{
    template: './students/student.jade'
  }
})
/*var Car=FastCrud.Model({
  name: 'Car',
  defaults:{
    name: 'Mercedes',
    colors: ['blue'],
  },
  schema:{
    _id: FastCrud.ObjectId(),
    name: String,
    age: Number,
  }
})*/

/*Car.create({
  name:'fiat',
  colors: ['green']
}).save(function(err,car){
  console.log(err,car);
})
Car.setAPI(app)*/

/*Persona.create({
  name: 'Giovanni',
  age: 18
}).save(function(err,p){
  console.log(err,p);
})*/

/*app.get('/api/persona/',Persona.api.getList )
app.get('/api/persona/:_id/',Persona.api.getDetails )
app.put('/api/persona/', Persona.api.create)*/


/*Persona.remove({name:'Giovanni'},function(err,b){
  console.log('ok',err,b);
})*/





