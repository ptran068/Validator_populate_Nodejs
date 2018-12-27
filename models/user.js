import mongoose from 'mongoose';
import Group from '../models/group'
const Schema = mongoose.Schema;
let userSchema = new Schema({
    _id: Schema.Types.ObjectId,
	gender: Boolean,
    firstName: {
    	type: String,
    	required: [ true, 'firstName is required field!'],
    	maxlength: [ 255, 'firstName is too long!' ]
    },
    lastName: {
    	type: String,
    	required: [ true, 'lastName is required field!'],
    	maxlength: [ 255, 'lastName is too long!' ],
    	trim: true,
    	uppercase: true,
    },
    email: {
    	type: String,
    
    },
    password: {
    	type: String,
    	required: [ true, 'password is required field!'],
    	maxlength: [ 20, 'password is too long!' ]
    },
    refNames: {
    	type: [String],
    	
    },
    age: {
    	type: [String]
    },
    isDelete: {
    	type: Boolean,
    	default: false
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
    // deletedAt: Date
});
userSchema.pre('find', function() {
	const query = this.getQuery();
    query['$or'] = [
        {
            isDelete: false
        },
        {
            isDelete: null
        }
    ]
});

userSchema.pre('findOne', function() {
	const query = this.getQuery();
    query['$or'] = [
        {
            isDelete: false
        },
        {
            isDelete: null
        }
    ]
});

userSchema.post('findOne', function(doc) {
	// doc.version = 1;
  console.log('post find is executing...');
});




module.exports = mongoose.model('user',userSchema);