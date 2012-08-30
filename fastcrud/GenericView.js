var db=require('./database.js')

GenericView={
	DetailView: function(options){
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
	},
	ListView: function(options){
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
	},
	CreateView: function(options){
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
}




module.exports.ListView=GenericView.ListView
module.exports.DetailView=GenericView.DetailView
module.exports.CreateView=GenericView.CreateView

module.exports.url=function(app, view){
	view.bindUrl(app,view)
}

/*fc.url(app,fc.ListView({
  model: 'Lab',
  template: './admin/labs.jade',
  url: '/admin/labs/',
}))

fc.url(app,fc.ListView({
  model: 'User',
  template: './admin/users.jade',
  url: '/admin/users/',
  chain: [accounts.authenticate,accounts.authenticateAdministrator]
}))

fc.url(app,fc.CreateView({
  model: 'Lab',
  template: './admin/labCreate.jade',
  url: '/admin/labs/create/',
}))

fc.url(app,fc.DetailView({
  model: 'Lab',
  template: './admin/lab.jade',
  url: '/admin/labs/',
  key: '_id'
}))*/