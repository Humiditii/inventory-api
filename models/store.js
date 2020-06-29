import {Schema, model} from 'mongoose';

const stroeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    price : {
        type: Number,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
    admin : {
        type:Schema.Types.ObjectId,
        ref: 'auth',
        required: true
    },
});

export default model('store', stroeSchema)