

const User =require("../models/userModel")


exports.getAllUsers = async (req, res) => {
    const { tableName } = req.params;
    


    try {
        if(!User(tableName)){
            return res.status(404).json({
                status: 'error',
                params: tableName,
                message: 'Table not found'
            });
        }
        const tableData = await User(tableName).findAll()
        res.status(200).json({
            status: 'success',
          
             tableData
        });
        



       
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching users'
        });
    }
};

exports.addUser = async (req, res) => {


    try {
        const { id, ...userData } = req.body;

        const {tableName} = req.params


        const newUser = await User(tableName).create(userData);

        res.status(201).json({
            status: 'success',
            data: newUser
        });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error adding user'
        });
    }
};
exports.singleUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching user'
        });
    }
};
exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const [updatedRowsCount] = await User.update(req.body, {
            where: { id: userId }
        });
        if (updatedRowsCount === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'User updated successfully'
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating user'
        });
    }
};
exports.deleteUser = async (req, res) => {
    const {tableName} = req.params
    try {
        const userId = req.params.id;
        const deletedRowsCount = await User(tableName).destroy({
            where: { id: userId }
        });
        if (deletedRowsCount === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error deleting user'
        });
    }
};