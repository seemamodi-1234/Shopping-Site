const User =require('../../models/user');
const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
const shortid =require('shortid');

exports.signup=async(req,res) => {
    User.findOne({email: req.body.email})
    .exec(async(error,user)=>{
        if(user) return res.status(400).json({
            message: 'Admin already registered'
        });
        const {
            firstName,
            lastName,
            email,
            password
        }=req.body;
        const hash_passwword = await bcrypt.hash(password,10);
        const _user =new User({
            firstName,
            lastName,
            email,
            hash_passwword,
            username:shortid.generate(),
            role:'admin'
        });
        await _user.save((error,data)=>{
            if(error){
                console.log(error);
                return res.status(500).json({
                    message: 'Something went wrong in saving'
                });
            }
            if(data){
                return res.status(201).json({
                    message: 'Admin created Successfully....!'
                });
            }
        });
    });
}

exports.signin=async(req,res) => {
    await User.findOne({email: req.body.email})
    .exec(async(error,user)  => {
        if(error)return res.status(500).json({error});
        if(user){
            if(await user.authenticate(req.body.password)&&user.role==='admin'){
                const token =jwt.sign({_id: user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:'1h'});
                res.cookie('token',token,{expiresIn:'1h'});
                const{_id,firstName, lastName,email,role,fullName}=user;
                res.status(200).json({
                    token,
                    user: {
                        _id, firstName, lastName,email,role,fullName
                    }
                });
            }
            else {
                return res.status(500).json({
                    message : 'Invalid password'
                });
            }
        }
        else{
            return res.status(500).json({message:'Something went wrong'});
        }
    });
}

exports.signout =async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({
        message:'Signout successfully...!'
    })
}