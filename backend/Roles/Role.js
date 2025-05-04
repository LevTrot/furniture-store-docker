const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['read', 'write', 'admin']
    },
    permissions: {
        type: [String],
        required: true,
        enum: ['read', 'write', 'delete']
    }
});

module.exports = mongoose.model('Role', roleSchema);