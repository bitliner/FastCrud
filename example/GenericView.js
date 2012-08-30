//var db=require('./database.js')
var db='ciao'


var DetailView=function(options){
	this.model=options.model
	this.template=options.template

	this.render=function(req,res){
		var model=db[this.model]()
		model.findOne({},function(err,docs){
			res.render(this.template,{
				models: docs
			})
		})
	}
}

module.exports.ListView=function(options){
	var T={}
	T.model=options.model
	T.template= options.template
	T.url= options.url
	T.chain=options.chain||[]
	T.bindUrl=function(app,view){
		app['get'](T.url, T.chain,T.render)
	}
	T.render= function(req,res,next){
		var model=db[ T.model ]()
		model.find({},function(err,docs){
			console.log('err,docs',err,docs);
			res.render(T.template,{
				models: docs
			})
		})
	}
	return T
}
module.exports.DetailView=function(options){
	var T={}
	T.model=options.model
	T.template= options.template
	T.url= options.url
	T.key=options.key
	T.bindUrl=function(app,view){
		var url=T.url+':'+T.key+'/'
		app['get'](url, T.render)
	}
	T.render= function(req,res,next){
		var model=db[ T.model ]()
		var query={}
		query[T.key.toString()]=req.params[T.key]
		model.findOne( query ,function(err,doc){
			res.render(T.template,{
				model: doc
			})
		})
	}
	return T
}

module.exports.CreateView=function(options){
	var T={}
	T.model=options.model
	T.template= options.template
	T.url= options.url
	T.key=options.key
	T.bindUrl=function(app,view){
		app['get'](T.url, T.renderGet)
		app['put'](T.url, T.renderPut)
	}
	T.renderGet= function(req,res,next){
		res.render(T.template,{
			form: {
				action: T.url,
				method: 'PUT',
			}
		})
	}
	return T
}

module.exports.url=function(app, view){
	view.bindUrl(app,view)
}