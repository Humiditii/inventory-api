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
                //console.log(newSale, userId)

                productDB.quantity = productDB.quantity - quantity;
                productDB.totalPrice = productDB.quantity * productDB.price;
                return productDB.save().then( soldSuccess => {
                    return res.status(201).json({
                        message: 'Success, Product Sold out.',
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


    static getProductList(req, res, next){
        const {userId} = req;
        Store.find({admin:userId, quantity: {
            $gte: 1
        }}).then( result => {
           // console.log(result)
            const data = result.map( (item) => [item.name, item._id, item.quantity] )

            return res.status(200).json({
                data: data ? data : 'No Product, Please Add'
            })
        }).catch( err=> {
            return Util.appError(err, next);
        })
    }

    static viewSales(req, res, next){
        const {userId} = req;

        const {from, to} = req.params;

        const defaultDate = Date.now();

        if(from == 'now' && to == 'now'){
             //console.log(new Date(to), new Date(from), 'if')
            Sale.find({dateSold: { 
                $gte:new Date (new Date(defaultDate).setHours(0,0,0)),
                $lt: new Date( new Date(defaultDate).setHours(23,59,59))
            } , seller: userId}).then( result => {
                if(result.length === 0){
                    return res.status(404).json({
                        message: 'No Sales record'
                    })
                }else{
                    res.status(200).json({
                        data: result
                    })
                }
            }).catch( err => {
                return Util.appError(err, next);
            });
        }else{
            // console.log(new Date(to), new Date(from),'else')
            Sale.find({dateSold:{ 
                $gte: new Date(from),
                $lt: new Date( new Date(to).setHours(23,59,59))
            }, seller: userId}).then( result => {
            
                if(result.length === 0){
                    return res.status(404).json({
                        message: 'No Sales record'
                    })
                }else{
                    res.status(200).json({
                        data: result
                    })
                }
            }).catch( err => {
                return Util.appError(err, next);
            });
        }
    }
}


export default SaleController;