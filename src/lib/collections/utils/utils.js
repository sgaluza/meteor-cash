utils = {
    schemaCollection: function (collectionName, schema, query) {
        var collection = new Mongo.Collection(collectionName);
        collection.attachSchema(new SimpleSchema(schema));

        if (Meteor.isServer) {
            Meteor.publish(collectionName, function () {
                return collection.find(!!query && typeof 'object' ? query : {});
            });
        }

        return collection;
    }
};