import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;
let groupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required field'],
        maxlength:  [255, 'Name is too long'],
        minlength: [3, 'Name is too short']
        
    },
    lastMessage: {
        type: ObjectId,
        required: true
    },
    author: {
        type: ObjectId,
        ref: 'user'

    },
    members: {
        type: [ObjectId]
    },
    deleteAt: {
        type: Date,
        default: null
    }
});

groupSchema.pre('find', function() {
	const query = this.getQuery();
    query['$or'] = [
        {
            deleteAt: null
        }
    ]
});

module.exports = mongoose.model('group',groupSchema);