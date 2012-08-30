var mongoose=require('mongoose')
,	_und=require('underscore')
// ,	GenericView=require('./GenericView')
,	Schema = mongoose.Schema
,	ObjectId = Schema.ObjectId
,	ObjectIdType = mongoose.Types.ObjectId
,	that = this

if (!this.db){
	this.db= mongoose.connect('mongodb://localhost/fastcrud')
}





module.exports.Model=function(options){
	T={}
	/* set properties of this */
	T.name=_und.keys(options)[0]
	T.defaults=options
	T.get=function(){
		return that.db.model(T.name)
	}

	var createSchemaFromDefaultValues=function(defaults){
		var schema={}
		for (key in defaults){
			if (typeof defaults[key]=='object'){
				var k=key
				console.log(key,'is object')
				var nestedSchema=createSchemaFromDefaultValues(defaults[key])
				schema[ k.toLowerCase() ]=[nestedSchema]
				mongoose.model(k,nestedSchema)
			}else{
				schema[key]=typeof defaults[key]
			}
		}
		return new Schema(schema)
	}

	/* create mongoose object */
	var schema=createSchemaFromDefaultValues(T.defaults)
	T.schema=schema

	/* api method */
	T.api={
		getList: function(req,res,next){
			that.db.model(T.name).find({},function(err,docs){
				if (err){
					res.json(err)	
				} else{
					res.json(docs)
				}
			})
		},
		getDetails:function(req,res,next){
			var _id=req.params._id
			that.db.model(T.name).find({_id:_id},function(err,doc){
				if (err){
					res.json(err)	
				} else{
					res.json(doc)
				}
			})
		},
		create: function(req,res,next){
			T.create(req.body).save(function(err,doc){
				if (err){
					res.json(err)
				}else{
					res.json(doc)
				}
			})
		},
		update: function(req,res,next){
			that.db.model(T.name).update({_id:_id},req.body,{},function(err,numberAffected, raw){
				if (err){
					res.json(err)	
				} else{
					res.json(numberAffected, raw)
				}
			})
		},
	}
	T.setAPI=function(app){
		var modelName=T.name.toLowerCase()
		app.get('/api/'+modelName+'/',T.api.getList)
		app.get('/api/'+modelName+'/:_id/',T.api.getDetails )
		app.put('/api/'+modelName+'/', T.api.create)
		app.post('/api/'+modelName+'/:_id/', T.api.update)
	}

	T.genericViews={
		DetailsView: function(template){
			var handler=function(req,res,next){
				that.db.model(T.name).findOne({_id:req.params._id},function(err,doc){
					res.render(template,{
						model: doc
					})
				})
			}
			return handler
		},
		ListView: function(template){
			var handler=function(req,res,next){
				that.db.model(T.name).find({},function(err,docs){
					res.render(template,{
						models: docs
					})
				})
			}
			return handler
		},
		CreateView: function(req,res,next){

		},
		UpdateView: function(req,res,next){

		},
	}
	T.setGenericViews=function(app,options){
		if (options.ListView && options.ListView.template){
			app.get('/'+T.name+'/',T.genericViews.ListView(options.ListView.template) )
		}
		if (options.DetailsView && options.DetailsView.template){
			app.get('/'+T.name+'/:_id/',T.genericViews.DetailsView(options.DetailsView.template) )
		}
	}


	return T
}
module.exports.ObjectId=function(){
	return ObjectId
}

module.exports.get=function(name){
	return this.db.model(name)	
}