const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'dropdown'],
        required: true
    },
    options: [String]
})

const FormSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [QuestionSchema],
    responses: [{
        type: Map,
        of: String
    }]
});

module.exports = mongoose.model('Form', FormSchema);