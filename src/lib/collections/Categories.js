Category = utils.schemaCollection('Cateogories', {
    title: {
        type: String,
        label: 'Category',
        max: 200,
        index: true,
        unique: true
    }
});