import User from '../models/user';
const UserController = {};

UserController.getAll = async (req, res, next) => {
    try {
        const users = await User.find({
            // $or: [
            //     {
            //         isDelete: false
            //     },
            //     {
            //         isDelete: null
            //     }
            // ]
        });
        return res.json({
            isSuccess: true,
            users
        });
    } catch (err) {
        return next(err);
    }
};

UserController.getOneUser = async (req, res, next) => {
    try {
        const _id = req.params.id;
        let user = await User.findOne({
            _id,
            // $of: [
            //     {
            //         isDelete: false
            //     },
            //     {
            //         isDelete: null
            //     }
            // ]
        });
        if (!user) {
            
            return next(new Error('User is not found'));
            
        }
        return res.json({
            isSuccess: true,
            user
        });
    } catch(e) {
    
        return next(e);
        
    }
};

UserController.addUser = async (req, res, next) => {
    try {
        const { password, refNames, firstName, lastName, gender, email } = req.body;

        console.log(typeof gender);
        if (!password) {
            return next( new Error('Password is required field'))
        }
        const user = new User({
            password,
            refNames,
            firstName,
            lastName,
            gender,
            email
        });
        await user.save();
        return res.json({
            isSuccess: true,
            user
        });
      
    } catch (err) {
        return next(err);
    }
};

UserController.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return next( new Error('User is not found'))
        }
        user.set(req.body);
        await user.save();
        return res.json({
            isSuccess: true,
            message: 'Update successfully'
        });
    } catch (e) {
        return next(err);
    }
};

UserController.deleteUser = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        if (!user) {
            return next( new Error('User is not found'))
        }
        user.isDelete = true;
        await user.save();
       
        return res.status(200).json({
            isSuccess: true,
            message: 'Deleted user'
        });
    } catch (e) {
        return next(err);
        
    }
};

export default UserController;
