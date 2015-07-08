Tags = utils.schemaCollection('Tags', {
    title: {
        type: String,
        label: "Tag",
        max: 200,
        index: true,
        unique: true
    }
});