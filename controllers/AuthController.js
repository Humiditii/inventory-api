import Util from '../utils/Utility';
import Auth from '../models/auth';

class AuthController {
    static async Signup(req, res, next){

        const {businessName, email, password} = req.body;

        const findEmail = await Auth.findOne({email:email})

        if (findEmail){
           // console.log(findEmail.email)
            return res.status(200).json({
                message: 'Email present, Please Select another Email'
            });
        }else{
            const findBusinessName =await Auth.findOne({businessname: businessName});

            if( findBusinessName ){
                return res.json(200).json({
                    message: 'Bussiness name selected, Please try another one'
                })
            }else{

               try {
                const saveUser = new Auth({
                    businessname: businessName,
                    email: email,
                    password: Util.hashPassword(password)
                });

                saveUser.save().then( result => {
                    res.status(201).json({
                        message: businessName + ' Signed successfully, proceed to Login'
                    })
                }).catch( err => {
                    return Util.appError(err, next)
                })
               } catch (error) {
                   return Util.appError(error, next)
               }
            }
        }

    }

    static async signin(req,res,next){

        const {businessName, password} = req.body;

        if (businessName == null && password==null) {
            return res.status(200).json({
                message: 'Fields cannot be empty, please check and try again'
            });
        }else{
            const getUserIfExist = await Auth.findOne({businessname:businessName});

            if(!getUserIfExist){
                return res.json({
                    statusCode:400,
                    message: 'User does not exist'
                })
            }else{
                if(!Util.decodePwd(password, getUserIfExist.password)){
                    return res.status(401).json({
                        statusCode: 401,
                        message:'Invalid Password'
                    })
                }else{
                    const user_details = {
                        email: getUserIfExist.email,
                        id: getUserIfExist._id
                    }

                    return res.status(200).json({
                        message : 'Logged in',
                        token: Util.generateToken(user_details)
                    })
                }
            }
        }

    }
    static async forgetPassword(req, res, next){

        const {email} = req.body;

        Auth.findOne({email:email}).then( user => {
            user.resetPassword.token = Util.randomStr();
            user.resetPassword.expiryDte = Date.now()
        }).catch( err=> {
            return Util.appError(err, next)
        })

    }

    static resetPassword(req, res, next){

    }

}


export default AuthController;