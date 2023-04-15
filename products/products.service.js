const Book = require("./product");

module.exports.list = async function list(){
    return await Product.find()
}

module.exports.create = async function create(payload){
    try {
        let product = new Product(payload)
        return await product.save(payload)
    } catch (error) {
        throw error
    }
}
// file that sees how CRUD with DB is going to happen 
//File Functions

module.exports.get = async function(id){
    //function that takes in ID and searches and fetches for it in the DB
    return await Product.findOne({p_id:id})

    //findById is a fucntion that returns 
    //the bracket content is a way of telling mongoDB
}





module.exports.update = async function(id, payload){
    //function that takes in data and stores in db with a generated ID
    return await Product.findByIdAndUpdate({p_id: id}, payload)
}


module.exports.delete = async function(id){
    //function that takes in id and deletes it from db
    return await Product.findByIdAndDelete(id)

}