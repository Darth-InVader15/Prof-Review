let User = require('../models/user');

const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");




exports.signup = (req,res)=>
{
    const errors = validationResult(req);

    if (!errors.isEmpty())
     {
      return res.status(422).json(
        
        {
        error: errors.array()[0].msg
        }
      );
    }

    else
    {
        user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            instituteName: req.body.instituteName,
            password: req.body.password
        })
        user.save((err,user) => 
        {
            if(err || !user)
            {
                return res.status(400).json({
                    error: err['keyValue']
                })
            }
            else
            {
                return res.json(user);  
                // Change the above line
            }
        })
    }

}



exports.signin = (req,res) =>
{
    const errors = validationResult(req);

    if (!errors.isEmpty())
     {
      return res.status(422).json(
        {
        error: errors.array()[0].msg
        }
      );
    }
    else
    {
        const{username ,password} = req.body;
        
        User.findOne({ username }, (err, user) =>
         {
            if (err || !user) {
              return res.status(400).json({
                error: "USERNAME does not exists"
              });
            }
        
            if (!user.autheticate(password)) 
            {
              return res.status(401).json(
                {
                error: "Email and password do not match"
                }
              );
            }
            else
            {
                //create token
                const token = jwt.sign({ username: user.username }, process.env.SECRET);
                //put token in cookie
                res.cookie("token", token, { expire: new Date() + 9999 });

                //send response to front end
                const { _id, name, username, role , email, instituteName } = user;

                return res.status(200)
                .json({ token, user: { _id, name, username, role, email } });
            

            }
        });
    }
    
}

exports.signout = (req,res) =>
{
    res.clearCookie("token");
    res.json({
      message: "User signout successfully"
    });

}


//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
  });


//custom middlewares

// Is Authenticated is used to see whether the user can make changes to his account only
exports.isAuthenticated = (req, res, next) =>
 {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
      return res.status(403).json({
        error: "ACCESS DENIED"
      });
    }
    next();
  };

  
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === -1) {
      return res.status(403).json({
        error: "You are not ADMIN, Access denied"
      });
    }
    next();
  };