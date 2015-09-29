
TagsUtil = {
    findOrCreate: function(title) {
        var tag = Tags.findOne({
            title: title
        });
        if(tag) {
            return tag;
        }
        Tags.insert({
            title: title
        });

        return Tags.findOne({
            title: title
        });
    }
};


