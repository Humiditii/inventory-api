import {Schema, model} from 'mongoose';

const authSchema = new Schema({
    businessname: {
        type: String,
        required: true,
        minlength: [3, 'firstname must not be less than three characters'],
        lowercase: true
    },
    email : {
        type: String,
        required: true,
        minlength: [5, 'Email must not be less than five characters']
    },

    password: {
        type: String,
        minlength: [5, 'Password must not be less than five characters']

    },
    
    passwordReset: {
        token: {
            type: String
        },
        expiryDte: {
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default model('auth', authSchema);