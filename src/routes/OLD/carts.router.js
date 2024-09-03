import { Router } from "express";
import cartsManager from "../controllers/OLD/CartsManager.js";

const router = Router();
const CartsManager = new cartsManager();

//Get cart data
router.get("/:cid", async(req, res) => {
    const cid = req.params.cid;

    const cart = await CartsManager.getCart(cid);
    if (!cart) {
        res.send({ status: "error", error: "Cart not found" });
    }
    res.send({ status: "success", payload: cart });
})

//Create a new cart
router.post("/", async(req, res) => {
    const result = await CartsManager.addCart();
    if (!result) {
        res.send({ status: "error", error: "Could not create cart" });
    }
    res.send({ status: "success", payload: result });
})

//Add a new product to the cart
router.post("/:cid/products/:pid", async(req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const qty = req.body.quantity || 1;
    const result = await CartsManager.addProduct(cid, pid, qty);
    if (result == "no cart") {
        res.send({ status: "error", error: "Cart not found" });
    }
    if (result == "no product") {
        res.send({ status: "error", error: "Product not found" });
    }
    if (result == "server error") {
        res.send({ status: "error", error: "Couldnt add product" });
    }
    res.send({ status: "success", payload: result });

})

//Update entire cart
router.put("/:cid", async(req, res) => {
    const cid = req.params.cid;
    const data = req.body;

    const result = await CartsManager.updateCart(cid, data);
    if (!result) {
        res.send({ status: "error", error: "Could not edit products" });
    }
    res.send({ status: "success", payload: result });
})

//Update product quantity
router.put("/:cid/products/:pid", async(req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const qty = req.body.quantity;

    const result = await CartsManager.updateProductQuantity(cid, pid, qty);
    if (result == "no cart") {
        res.send({ status: "error", error: "Cart not found" });
    }
    if (result == "no product") {
        res.send({ status: "error", error: "Product not found" });
    }
    if (result == "server error") {
        res.send({ status: "error", error: "Could not edit products" });
    }
    res.send({ status: "success", payload: result });
})

//Delete specific product
router.delete("/:cid/products/:pid", async(req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const result = await CartsManager.deleteProduct(cid, pid);
    if (result == "no cart") {
        res.send({ status: "error", error: "Cart not found" });
    }
    if (result == "no product") {
        res.send({ status: "error", error: "Product not found" });
    }
    if (result == "server error") {
        res.send({ status: "error", error: "Could not delete product" });
    }
    if (!result) {
        res.send({ status: "error", error: "Server error" });
    }
    res.send({ status: "success", payload: result });
})

//Empty cart
router.delete("/:cid", async(req, res) => {
    const cid = req.params.cid;

    const result = await CartsManager.DeleteAllProducts(cid);
    if (result == "no cart") {
        res.send({ status: "error", error: "Cart not found" });
    }
    if (result == "server error") {
        res.send({ status: "error", error: "Could not delete product" });
    }
    res.send({ status: "success", payload: result });
})

export default router;