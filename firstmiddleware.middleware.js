module.exports.firstmiddleware = (res,req,next)=> {
    console.log("In middleware before API call");
    next();
}