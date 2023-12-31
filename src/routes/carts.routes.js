import { Router } from "express"


import CartManager from "../controllers/cartManager.js"
const manager = new CartManager
const router = Router()

router.get("/carts", async (req, res) => {
    const listOfCarts = await manager.getCarts()
    res.json({ message: "success", listOfCarts })

})

router.get("/carts/:cid", async (req, res) => {
    const cartfound = await manager.getCartbyId(req.params)
    res.send({ status: "success", cartfound })
})

router.post("/carts", async (req, res) => {
    const newcart = await manager.addCart(req.body)
    res.send({ status: "success", newcart })
})

router.post("/carts/:cid/products/:pid", async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const addproductsToCart = await manager.addProductToCart(cid, pid)
    res.send({ status: "success", addproductsToCart })
})



export default router