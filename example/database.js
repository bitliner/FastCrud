var mongoose=require('mongoose')
,	Schema = mongoose.Schema
,	ObjectId = Schema.ObjectId
,	ObjectIdType = mongoose.Types.ObjectId
, 	T=this;

if (!this.db){
	this.db=db = mongoose.connect('mongodb://localhost/nobdrain')
}

var UserSchema=new Schema({
	id: Number,
	username: String,
	name: String,
	email: String,
	description: String,
	linkedin: String,
	labCreator: Boolean,
	locale: String,
	subscriptions: [ObjectId],
	administrator: Boolean,
})
var LectureSchema=new Schema({
	title: String,
	filename: String,
	type: String,
	createdAt: Date
})
var PostSchema=new Schema({
	content: String,
	author: {
		type: Schema.Types.ObjectId, 
		ref: 'User' 
	},
	createdAt: Date
})
var TopicSchema=new Schema({
	title: String,
	content: String,
	author: {
		type: Schema.Types.ObjectId, 
		ref: 'User' 
	},
	createdAt: Date,
	posts: [PostSchema],
	lab: {
		type: Schema.Types.ObjectId, 
		ref: 'Lab'	
	}
})
var LabSchema=new Schema({
	id: ObjectId,
	name: String,
	description: String,
	price: Number,
	language: String,
	author: {
		type: Schema.Types.ObjectId, 
		ref: 'User' 
	},
	category: {
		type: Schema.Types.ObjectId, 
		ref: 'Category' 
	},
	lectures: [LectureSchema],
})
var CategorySchema=new Schema({
	id: ObjectId,
	name: String,
	description: String
})
CategorySchema.methods.getLabs = function (cb) {
	Lab=T.Lab()
	Lab.find({category: this._id},function(err,docs){
		cb(docs)
	})
}

mongoose.model('User', UserSchema)
mongoose.model('Lecture', LectureSchema)
mongoose.model('Post', PostSchema)
mongoose.model('Topic', TopicSchema)
mongoose.model('Lab', LabSchema)
mongoose.model('Category', CategorySchema)


exports.User = function(db) {
	return this.db.model('User')
}
exports.Lecture = function(db) {
	return this.db.model('Lecture')
}
exports.Post = function() {
	return this.db.model('Post')
}
exports.Topic = function() {
	return this.db.model('Topic')
}
exports.Lab = function() {
	return this.db.model('Lab')
}
exports.Category = function() {
	return this.db.model('Category')
}
exports.OID=function(id){
	return new ObjectIdType.fromString(id)
}