
/*
 * GET home page.
 */
var Backbone=require('backbone')

exports.index = function(req, res){
  res.render('index', { 
  	title: 'Express', 
  	Persona: Backbone.Model.extend({
  		defaults:{
  			name: 'Giovanni',
  			age: 15,
  			residenza: 'Roma'
  		}
  	}),
  	Backbone: Backbone,
  	Persona2: function(name){
  		return {
  			name: name
  		}
  	}
  })
};