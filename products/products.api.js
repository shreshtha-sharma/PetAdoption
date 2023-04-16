const router = require('express').Router()

router.get("/", async function(req,res){
    //get request without id is for listing all books

    try {

        let list = await service.list()
        res.send(list)

    }catch (error){

        res.status(400).send(error)

    }
    

})

router.get("/:id", async function(req,res){
    try{
        let list = await service.get(req.params.id)
        res.send(list)
    }
    catch(error){
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


router.put("/:id", async function(req,res){
    try{
        let product = await service.update(req.params.id, req.body) //get gets it's id from path hence params
    }catch (error){

        res.status(400).send(error)

    }
})

router.delete("/:id", async function(req,res){

    try{
        await service.delete(req.params.id)
        res.send({msg: "Product delete successful"})
    }catch (error){

        res.status(400).send(error)

    }
    
})

module.exports = router