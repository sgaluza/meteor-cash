utils = {
    schemaCollection: function (collectionName, schema) {
        var collection = new Mongo.Collection(collectionName);
        collection.attachSchema(new SimpleSchema(schema));

        if(Meteor.isServer) {
         //   Meteor.publish(collectionName);
        }
        return collection;
    }
};