const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
var publicKEY = fs.readFileSync(path.join(__dirname + '/public.key'), 'utf8');
var privateKEY = fs.readFileSync(path.join(__dirname + '/private.key'), 'utf8');


var i 	= 'Krissio';    	// Issuer (Software organization who issues the token)
var s 	= 'admin@kriss.io';	// Subject (intended user of the token)
var a 	= 'https://kriss.io';	// Audience (Domain within which this token will live and function)

module.exports = {
    sign : (payload)=>{
         // Token signing options
         var signOptions = {
            issuer: 	i,
            subject: 	s,
            audience: 	a,
            expiresIn: "30d",    // 30 days validity
            algorithm: "RS256"
        };
        return jwt.sign(payload, privateKEY, signOptions);
    },
    verify : (req, res, next)=>{ 
        //next();
        
        var token = req.headers['x-access-token'];
        if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

        var verifyOptions = {
            issuer: 	i,
            subject: 	s,
            audience: 	a,
            expiresIn: 	"12h",
            algorithm: 	["RS256"]
        };      

        jwt.verify(token, publicKEY, verifyOptions, function(err, decoded) {
            console.log(JSON.stringify(decoded));
            if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            // if everything good, save to request for use in other routes
            req.userId = decoded.id;
            req.userLevel = decoded.level;
            next();
        });
        
    }
}