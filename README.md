# FastCrud


FastCrud is Node.js module that makes development of CRUD operations faster, allowing to focus on frontend.

It works with Express and Mongoose.

Some features:

* you can define a model simply by its default values. It creates automatically from them the corresponding mongoose Schema

* you can add API for defined models simply in one line of code. It generates automatically urls and corresponding methods

* you can use generic views to automatically generate urls and corresponding http request handlers and focus only on template to display, modify and create models, with just few lines of code. Generic views supported are: ListView (to list instances of a model), DetailsView (to display single model), CreateView and UpdateView 


## How to use it

Suppose you have a Student model with nested School model.

### Define a model

Define a model calling FastCrud.Model function and passing an object of default values.

```js

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

```

### Create, save, update and remove model

You can invoke FastCrud.get(name_of_model) function to get mongoose model. Example:

```js

var Student=FastCrud.get('Student')
, School=FastCrud.get('School')

var school=new School({
  name: 'Roma 3',
  address: 'via della Vasca Navale'
})

var student=new Student({
  name: 'Marco DiLillo',
  age: 24,
  school: school
}).save(function(err,doc){
  console.log(err,doc);
})

```

### Define API to handle models

Use **setAPI(app)** of a defined model, it automatically defines url and corresponding methods to handle instances via GET, PUT, POST, DELETE http methods.


```js

StudentModel.setAPI(app)

```

Generated urls are:
* /api/student/ - to get a list of all student models
* /api/student/:_id/ - to get a single instance model by _id attribute via GET http method
* /api/student/:_id/ - to save or modify a single istance model by _id attribute via POST/PUT http methods
* /api/student/:_id/ - to delete a single instance model by _id via DELETE http method

### Use generic view to build quickly page that display models

Use **setGenericViews(app,options)** to quickly define urls and corresponding routes to display models. It automatically generate corresponding urls, like:
* /student/ (GET http method): url to list all Student models
* /student/ (POST http method): url to create new Student model
* /student/_id/ (GET http method): url to display a Details view about one Student model
* and so on (...under construction...)  

Parameters are:
* **app**: the app object defined normally in app.js file
* **options**: to specify what generic views it defines, passing for every generic view a template parameter that specify the file used to display models

Example: 

```js

StudentModel.setGenericViews(app,{
  ListView: {
    template: './students/students.jade'
  },
  DetailsView:{
    template: './students/student.jade'
  }
})

```

Example of jade templates for ListView:

```jade

- for student in models
	p 
		a(href='/student/#{student._id}/') #{student.name} 

```

Example of jade templates for DetailsView:

```jade

block content
	p Name: #{model.name} 
	- var a=model.school
	p School: #{model.school[0].name} 

```

