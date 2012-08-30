# FastCrud


FastCrud is Node.js module that makes development of CRUD operations faster, allowing to focus on frontend.

It works with Express and Mongoose.

Some features:

* you can define a model simply by its default values. It creates automatically from them the corresponding mongoose Schema

* you can add API for defined models simply in one line of code

* you can use generic views that let you, with few lines of code, to handle simple crud operation. It supports ListView (to list instances of a model), DetailsView (to display single model), CreateView and UpdateView 


## How to use it

Suppose you have a Student model with nested School model