import { Router } from "express";
import productsManager from "../controllers/OLD/ProductsManager.js";

const router = Router();
const ProductsManager = new productsManager();

//Get product data
router.get("/:page", async(req, res) => {
    const p = req.params.page.toString() || 1;
    const result = await ProductsManager.getProducts(p);
    if (result=="server error") {
        res.send({ status: "error", error: "Server error" });
    }

    res.send({
        status: "success",
        payload: result.result,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.prevLink,
        nextLink: result.nextLink
    });
})

//Create product
router.post("/", async(req, res) => {
    const data = req.body;
    if (!data.title || !data.description || !data.code || !data.price || !data.category) {
        res.send({ status: "error", error: "Missing product values" })
    }else{
        const result = ProductsManager.addProduct(data);
        if(!result){
            res.send({ status: "error", error: "Could not create product" });
        }
        res.send({ status: "success", payload: result });
    }
})

//Update product
router.put("/:pid", async(req, res) => {
    const pid = req.params.pid;
    const data = req.body;

    const result = await ProductsManager.updateProduct(pid,data);
    if (result=="server error") {
        res.send({ status: "error", error: "Could not update product" })
    }
    res.send({ status: "success", payload: result });
})

//Delete product
router.delete("/:pid", async(req, res) => {
    const pid = req.params.pid;
    const result = await ProductsManager.deleteProduct(pid);
    if (result=="server error") {
        res.send({ status: "error", error: "Could not delete product" })
    }
    res.send({ status: "success", payload: result });
})

export default router;