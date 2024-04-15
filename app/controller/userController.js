const User = require('../model/userModel');
const ShopModel = require('../model/shopModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.registerPage = async (req, res) => {
    try {
        const data = req.body;
        console.log('data', data)
        if (!data.email) return res.json({ code: 404, message: 'email reaquire' });
        if (!data.password) return res.json({ code: 404, message: ' password required' })
        const item = await User.findOne({ email: data.email });
        if (item) {
            return res.json({
                code: 404,
                message: 'user already exist'
            })
        } else {
            const salt = 10;
            const hashPassword = await bcrypt.hash(data.password, salt);
            const newUser = new User({
                email: data.email,
                password: hashPassword,
                firstName: data.firstName,
                lastName: data.lastName,
            })
            const saveUser = await newUser.save();
            return res.json({
                code: 201,
                message: 'user created successfully',
                data: saveUser
            })
        }
    } catch (err) {
        console.log(err)
    }
};

exports.loginPage = async (req, res) => {
    try {
        const data = req.body;
        if (!data.email) return res.json({ code: 404, message: 'email required' });
        if (!data.password) return res.json({ code: 404, message: 'password required' });
        const item = await User.findOne({ email: data.email });
        console.log('....>>>>', item)
        if (!item) {
            return res.json({
                code: 401,
                message: 'user not found'
            })
        } else {
            const matchPassword = await bcrypt.compare(data.password, item.password)
            if (!matchPassword) {
                return res.json({
                    code: 404,
                    message: 'password not matched'
                })
            }
            const token = jwt.sign({ id: item._id }, 'neetu', { expiresIn: '1d' })
            console.log(">>>>>>>", token)

            return res.json({
                code: 201,
                message: 'user login successfully',
                data: item,
                token

            })

        }
    } catch (err) {
        console.log(err)
    }
};


// exports.getUserByToken = async (req, res) => {
//     try {
//         console.log(">>>>>><<>>><>>", req.verifyUser.id)
//         const data = req.verifyUser.id;
//         const item = await User.findById(data);
//         if (!item) {
//             return res.json({
//                 code: 404,
//                 message: "user not exist"
//             })
//         } else {
//             return res.json({
//                 code: 201,
//                 message: "user found successfully",
//                 data: item
//             })
//         }

//     } catch (err) {
//         console.log(err)
//     }
// };


exports.updateUser = async (req, res) => {
    try {
        const data = req.body
        data.id = req.verifyUser.id

        const item = await User.findByIdAndUpdate({ _id: data.id }, data, { new: true })
        return res.json({
            code: 200,
            data: item
        })
    } catch (err) {
        console.log(err)
    }
}



exports.registerPage = async (req, res) => {
    try {
        const data = req.body;
        if (!data.email) return res.json({})
        const item = await User.findOne({ email: data.email })
        if (item) {
            return res.json({
                code: 401,
                message: 'user already exist'
            })
        } const salt = 10;
        const hashPassword = await bcrypt.hash(data.password, salt);
        const newUser = new User({
            email: data.email,
            password: hashPassword,
            firstName: data.firstName,
            lastName: data.lastName

        })
        const saveUser = await newUser.save()
        return res.json({
            code: 201,
            message: 'user registered successfully',
            data: saveUser
        })
    } catch (err) {
        console.log(err)
    }
}



// exports.loginPage = async (req, res) => {
//     try {
//         const data = req.body;
//         if (!data.email) return res.json({ code: 404, message: 'email required' });
//         if (!data.password) return res.json({ code: 404, message: 'password required' });
//         const item = await User.findOne({ email: data.email });
//         console.log('....>>>>', item)
//         if (!item) {
//             return res.json({
//                 code: 401,
//                 message: 'user not found'
//             })
//         } else {
//             const matchPassword = await bcrypt.compare(data.password, item.password)
//             if (!matchPassword) {
//                 return res.json({
//                     code: 404,
//                     message: 'password not matched'
//                 })
//             }
//             const token = jwt.sign({ id: item._id }, 'neetu', { expiresIn: '1d' })
//             console.log(">>>>>>>", token)

//             return res.json({
//                 code: 201,
//                 message: 'user login successfully',
//                 data: item,
//                 token

//             })

//         }
//     } catch (err) {
//         console.log(err)
//     }
// };


exports.loginPage = async (req, res) => {
    try {
        const data = req.body;
        if (!data.email) return res.json({ code: 401, message: "email required" });
        if (!data.password) return res.json({ code: 401, message: "password required" })

        const item = await User.findOne({ email: data.email });
        if (!item) {
            return res.json({
                code: 404,
                message: "user not exist"
            })
        } else {
            const matchdata = await bcrypt.compare(data.password, item.password)
            if (!matchdata) {
                return res.json({
                    code: 404,
                    message: "password not matched"
                })
            } else {
                const token = jwt.sign({ id: item._id }, "secrete key", { expiresIn: '1d' });
                return res.json({
                    code: 201,
                    message: 'user login successfully',
                    data: item,
                    token
                })
            }
        }
    } catch (err) {
        console.log(err)
    }
}





exports.getUserByToken = async (req, res) => {
    try {
        console.log(">>>>>><<>>><>>", req.verifyUser.id)
        const data = req.verifyUser.id;
        const item = await User.findById(data);
        if (!item) {
            return res.json({
                code: 404,
                message: "user not exist"
            })
        } else {
            return res.json({
                code: 201,
                message: "user found successfully",
                data: item
            })
        }

    } catch (err) {
        console.log(err)
    }
};



exports.shopCreat = async (req, res) => {
    try {
        const data = req.body;
        const item = await ShopModel.create(data);
        return res.json({
            code: 201,
            message: 'user created successfully',
            data: item,
        })
    } catch (err) {
        console.log(err)
    }
}