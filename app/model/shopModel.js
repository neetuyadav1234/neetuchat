const mongoose = require('mongoose');
const ShopSchema = new mongoose.Schema({

    shopName: {
        type: String,
        required: true
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema',
        required: true

    },

    location: {
        type: {
            type: String,
            enum: ['point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,

        }
    }

},
    {
        timestamps: true
    },

);
ShopSchema.index({ location: '2dsphere' })
module.exports = mongoose.model('ShopSchema', ShopSchema)
