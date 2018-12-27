import Group from '../models/group'
import User from '../models/user'
import mongoose from 'mongoose'

class Groups {
    // constructor(){
    //     this.test=this.test.bind(this);
     
    // }

    async getAll (req, res, next) {
        try {
            const group = await Group.find();
            return res.json({
                isSuccess: true,
                group
            });
        } catch (e) {
            next(e);
        }
    }
    async createGroup (req, res, next) {
        try {
            const {name, password, refNames, firstName, lastName, gender, email} = req.body
            const author = new User({
                _id: new mongoose.Types.ObjectId(),
                password,
                firstName,
                lastName,
                refNames,
                gender,
                email
                
              });
            await author.save();
              
            const group = new Group({
                  name,
                  lastMessage: new mongoose.Types.ObjectId(),
                  author: author._id,    // assign the _id from the person
                  members: new mongoose.Types.ObjectId(),
                });
              
            await group.save();
            return res.json({
                isSuccess: true,
                group
            })

        } catch (e) {
            return next(e);
        }
    }
    async updateGroup (req, res, next) {
        try {
            const idGroup = req.params.id;
            const group = await Group.findById(idGroup);
            if (!group) {
                return next( new Error('Group is not found'));
            }
            const body = req.body;
            group.name = body.name;
            await group.update();
            return res.json({
                isSuccess: true,
                group
            });
        } catch (e) {
            return next(e);
        }

    } 
    
    async deleteGroup (req, res, next) {
        try {
            const idGroup = req.params.id;
            const group = await Group.findById(idGroup);
            if (!group) {
                return next( new Error('Group is not found'));
            } 
            group.deleteAt = new Date();
            await group.save();
            return res.json({
                isSuccess: true,
                group
            }); 
        } catch (e) {
            return next(e);
        }
    }

}

module.exports= Groups