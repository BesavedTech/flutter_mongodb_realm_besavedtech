
var mongoClient;
var stitchAppClient
//
//function Test() {
//    return 12+20;
//}


function Mongo() {
    Mongo.prototype.connectMongo  = function(appId) {
        stitchAppClient = stitch.Stitch.initializeDefaultAppClient(appId);

        mongoClient = stitchAppClient.getServiceClient(
            stitch.RemoteMongoClient.factory,
            "mongodb-atlas"
        );
    }

    Mongo.prototype.loginAnonymously  = async function(){
        var user = await stitchAppClient.auth.loginWithCredential(new stitch.AnonymousCredential())

        return new Promise((resolve, reject) => {
            resolve(JSON.stringify({"id": user.id}));
        });
    }


    Mongo.prototype.getCollection = function(databaseName, collectionName){
       return mongoClient.db(databaseName).collection(collectionName)
    }


    Mongo.prototype.insertDocument = async function(databaseName, collectionName, docString){
        var collection = this.getCollection(databaseName, collectionName)
        var doc = JSON.parse(docString)

        await collection.insertOne(doc)
    }


    Mongo.prototype.insertDocuments = async function(databaseName, collectionName, list){
        var collection = this.getCollection(databaseName, collectionName)

        var docs = []
        list.forEach((str) => {
            docs.push(JSON.parse(str))
        })

        await collection.insertMany(docs)
    }

    Mongo.prototype.findDocument = async function (databaseName, collectionName, filter) {
        var collection = this.getCollection(databaseName, collectionName)
        var query = JSON.parse(filter);

        var doc = await collection.findOne(query, {})

        return new Promise((resolve, reject) => {
            resolve(JSON.stringify(doc));
        });
    }

    Mongo.prototype.findDocuments = async function (databaseName, collectionName, filter) {
        var collection = this.getCollection(databaseName, collectionName)
        var query = JSON.parse(filter);

        var results = await collection.find(query, {}).toArray()

        var strings = [];
        results.forEach((doc) => {
            strings.push(JSON.stringify(doc))
        })

        return new Promise((resolve, reject) => {
            resolve(strings);
        });
    }

    Mongo.prototype.deleteDocument = async function(databaseName, collectionName, filter){
        var collection = this.getCollection(databaseName, collectionName)
        var query = JSON.parse(filter)

        var result = await collection.deleteOne(query)

        return new Promise((resolve, reject) => {
            resolve(JSON.stringify(result));
        });
    }

    Mongo.prototype.deleteDocuments = async function(databaseName, collectionName, filter){
        var collection = this.getCollection(databaseName, collectionName)
        var query = JSON.parse(filter)

        var result = await collection.deleteMany(query)

        return new Promise((resolve, reject) => {
            resolve(JSON.stringify(result));
        });
    }

    Mongo.prototype.countDocuments = async function(databaseName, collectionName, filter){
        var collection = this.getCollection(databaseName, collectionName)
        var query = JSON.parse(filter)

        var docsCount = await collection.count(query);

        return new Promise((resolve, reject) => {
            resolve(docsCount);
        });
    }


    Mongo.prototype.updateDocument = async function(databaseName, collectionName, filter, update){
        var collection = this.getCollection(databaseName, collectionName)
        var query = JSON.parse(filter)
        var update = JSON.parse(update)
        var options = {}

        var results = await collection.updateOne(query, update, options);

        return new Promise((resolve, reject) => {
            resolve(JSON.stringify(results));
        });
    }


    Mongo.prototype.updateDocuments = async function(databaseName, collectionName, filter, update){
        var collection = this.getCollection(databaseName, collectionName)
        var query = JSON.parse(filter)
        var update = JSON.parse(update)
        var options = {}

        var results = await collection.updateMany(query, update, options);

        return new Promise((resolve, reject) => {
            resolve(JSON.stringify(results));
        });
    }



}