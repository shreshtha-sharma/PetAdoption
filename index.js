const express = require('express') //importing express library
const app = express() //init the express library. app is an instance of express

const BodyParser = require('body-parser') //importing body parser...it is required to read the body that comes from client in post request
const { default: mongoose } = require('mongoose')
app.use(BodyParser.json()) //app instance is now using body parser
const Product = require('./products/products')


//connecting to database (mongo db)
mongoose.connect("mongodb://127.0.0.1:27017/miniproject_petAdoption").then(()=>{
    console.log("Connected to DB")
})


// we firstly configure nodeman which is a package that will restart server everytime a change in server files is made (.js, json files)
//nodeman needs to be mentioned in the index.js file 




/********GET REQUEST********/
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error)
    }
})
 //get(endpoint name, body function)
//function will have two parameters request and response


// E6 syntax
// app.get('/books', (req, res)=>{
//     res.send("Welcome to first endpoint")
// }



/********POST REQUEST********/
app.post('/products', async (req,res)=>{

    try{
        let product = new Product(req.body) 
        await product.save()
         res.status(201).json({ message: "Product created successfully", data: product }); 
    }
    catch (error) {
        res.status(500).send(error)
    }
})


app.use('/products', require('./products/products.api'))




app.listen(3000, ()=> {
    console.log("Server listening on port 3000")
}) 

