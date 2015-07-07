utils = {
    schemaCollection: function (collectionName, schema) {
        var collection = new Mongo.Collection(collectionName);
        collection.attachSchema(new SimpleSchema(schema));
        return collection;
    }
};