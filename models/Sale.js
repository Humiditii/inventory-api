import {Schema, model} from 'mongoose';

const saleSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productId: {
        type:Schema.Types.ObjectId,
        ref: 'store'
    },

    dateSold: {
        type: Date,
        default: Date.now()
    },
    quantity : {
        type: Number,
        required: true
    },
    salesPrice: {
        type: Number,
        required: true
    },
    seller : {
        type:Schema.Types.ObjectId,
        ref: 'auth',
        required: true
    }

});

export default model('sale', saleSchema);