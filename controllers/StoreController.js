import Store from '../models/store';
import Util from '../utils/Utility';

class StoreController {
    static addProduct(req, res, next){

        const {name, price, quantity} = req.body;
        const {userId} = req;
        console.log(userId)
        const totalPrice = quantity * price;

        Store.findOne({name:name}).then( result => {
            if(result){
                return res.status(200).json({
                    message: 'Name of Product is existing, please edit the product or use another name for this product'
                });
            }else{
                const saveProduct = new Store({
                    name: name,
                    price: price,
                    quantity: quantity,
                    totalPrice: totalPrice,
                    admin: userId
                });

                saveProduct.save().then( saved => {
                    res.status(201).json({
                        message: 'Product added',
                        data: saved
                    })
                }).catch( err => {
                    return Util.appError(err, next)
                })
            }
        }).catch( err => {
            return Util.appError(err, next);
        })

    }

    static editProduct(req, res, next){

        const{userId} = req;
        const{productId} = req.params;
        const { quantity, price } = req.body;

        Store.findById(productId).then( productGotten => {

            productGotten.price = price;
            productGotten.quantity = Number(quantity);
            productGotten.totalPrice = price * productGotten.quantity;
            productGotten.save().then( edited=> {
                return res.status(201).json({
                    message: 'Updated'
                })
            })

        }).catch( err => {
            return Util.appError(err,next);
        })
        


    }

    static getProducts(req, res, next){
        const {userId} = req;
        console.log(userId)
        Store.find({admin:userId}).then(result => {
            if(result.length == 0){
                return res.status(200).json({
                    message: 'No Product Yet!!!'
                })
            }else{
                res.status(200).json({
                    data: result
                })
            }
        }).catch(err => {
            return Util.appError(err, next)
        });
    }
}

export default StoreController;