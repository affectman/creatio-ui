const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true },
    text: {type: String, required: true},
    date: {type: Date, default: Date.now},
    time: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: 'Task'}
})

module.exports = model('Task', schema)