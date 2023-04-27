const router = require('express').Router()


router.get("/", async function(req,res){
    //get request without id is for listing all books

    try {
        console.log("before service call")
        let list = await service.list()
        res.send(list)

    }catch (error){

        res.status(400).send(error)

    }
    

})



router.post("/", async function(req,res){
    try{
        let product = await service.create(req.body)

        res.send("Product created successfully")
    }
    catch(error){
        console.error(error) // log the error to the console
        res.status(500).send("Internal Server Error") // send a 500 error response
    }
})

// Handle GET request for a specific product by ID
// Router configuration
router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findOne({ p_id: id });
  
      if (!product) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json(product);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const payload = req.body;
  
      // Find the product by ID and update it
      const updatedProduct = await Product.findOneAndUpdate({ p_id: id }, payload, {
        new: true, // Return the updated product
      });
  
      if (!updatedProduct) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.status(200).json(updatedProduct);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

router.delete("/:id", async function(req,res){

    try{
        await service.delete(req.params.id)
        res.send({msg: "Product delete successful"})
    }catch (error){

        res.status(400).send(error)

    }
    
})

module.exports = router