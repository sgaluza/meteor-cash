Exrates = utils.schemaCollection('exrates', {
    id: {
        type: Meteor.ObjectId
    },
    attributes: {
        type: Object
    },
    Cur_QuotName: {
        type: String
    },
    Cur_Scale: {
        type: Number
    },
    Cur_OfficialRate: {
        type: Number
    },
    Cur_Code: {
        type: Number
    },
    Cur_Abbreviation: {
        type: String
    }
});