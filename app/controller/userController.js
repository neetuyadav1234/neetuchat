const User = require('../model/userModel');
const ShopModel = require('../model/shopModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const axios = require('axios');

const url = 'https://httpbin.io/anything';
const apikey = '802caba38bf68a901f0b17eb757d3f9aaacc1e64';

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
};

exports.getProduct = async (req, res) => {
    try {
        const itemResponse = await axios({
            url: 'https://api.zenrows.com/v1/',
            method: 'GET',
            params: {
                'url': url,
                'apikey': apikey,
            },
        });

        // Extracting necessary data from the response
        const itemData = itemResponse.data;

        console.log(">>>>>>>>>>>>item ", itemData);

        return res.json({
            code: 200,
            data: itemData
        });

        // Code after res.json() will not execute
        console.log("hellop");
    } catch (error) {
        console.log(error);
        // Handle error appropriately, e.g., send an error response
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
