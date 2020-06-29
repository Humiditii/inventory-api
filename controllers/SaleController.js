import Sale from '../models/Sale';
import Util from '../utils/Utility';
import Store from '../models/store';

class SaleController {
    static sell(req, res, next){
        const {userId} = req;
        const { product, productId, quantity } = req.body;

        Store.findById(productId).then( productDB => {
            //console.log(productDB)
            const totalCost = productDB.price * quantity;

            const newSale = new Sale({
                productName: product,
                productId: productId,
                quantity: quantity,
                salesPrice: totalCost,
                seller: userId
            });

           // console.log(newSale.salesPrice)

            newSale.save().then( result => {
                console.log(newSale, userId)

                productDB.quantity = productDB.quantity - quantity;
                productDB.totalPrice = productDB.quantity * productDB.price;
                return productDB.save().then( soldSuccess => {
                    return res.status(201).json({
                        message: 'Success',
                        data: result
                    })
                }).catch(err => {
                    return Util.appError(Err, next)
                })

            }).catch(err => {
                return Util.appError(err, next);
            })

        }).catch( err => {
            console.log(err)
            return Util.appError(err, next);
        })

    }

    static viewSales(req, res, next){
        const {userId} = req;

        const {date} = req.body;

        const defaultDate = date ? date : Date.now();

        Sale.find({dateSold : defaultDate}).then( result => {
            console.log(defaultDate)
            res.status(200).json({
                data: result
            })
        }).catch( err => {4
            return Util.appError(err, next);
        });
    }
}


export default SaleController;