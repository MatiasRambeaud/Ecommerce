import cartsModel from "../../db/models/cart.model.js";
import productsModel from "../../db/models/product.model.js";


class CartsManager {

    async addCart() {
        const cart = {
            products: []
        };
        const addCart = await cartsModel.create(cart);
        if (!addCart) {
            return null;
        }
        return addCart;
    }

    async addProduct(cid, pid, qty) {
        const cart = await cartsModel.findOne({ _id: cid });
        if (!cart) {
            return "no cart";
        }
        const product = await productsModel.findOne({ _id: pid });
        if (!product) {
            return "no product";
        }
        let exists = false;
        cart.products.forEach(eachproduct => {
            if (eachproduct.product._id == pid) {
                eachproduct.quantity += qty;
                exists = true;
            }
        });
        if (!exists) {
            cart.products.push({ product: product._id, quantity: qty });
            const result = await cartsModel.updateOne({ _id: cid }, { products: cart.products });
            if (!result) {
                return "server error";
            }
            return result;
        } else {
            const result = await cartsModel.updateOne({ _id: cid }, { $set: { products: cart.products } });
            if (!result) {
                return "server error";
            } else {
                return result;
            }
        }
    }

    async getCart(cid) {
        const cart = await cartsModel.findOne({ _id: cid }).populate("products.product");
        if (!cart) {
            return null;
        }
        return cart;
    }

    async updateCart(cid, data) {
        const result = await cartsModel.updateOne({ _id: cid }, { products: data });
        if (!result) {
            return null;
        }
        return result;
    }

    async updateProductQuantity(cid, pid, qty) {
        const cart = await cartsModel.findOne({ _id: cid });
        if (!cart) {
            return "no cart";
        }
        const product = await productsModel.findOne({ _id: pid });
        if (!product) {
            return "no product";
        }

        cart.products.forEach(eachproduct => {
            if (eachproduct.product._id == pid) {
                eachproduct.quantity = qty;
            }
        });

        const result = await cartsModel.updateOne({ _id: cid }, cart);
        if (!result) {
            return "server error";
        }
        return result;
    }

    async deleteProduct(cid, pid) {
        const cart = await cartsModel.findOne({ _id: cid });
        if (!cart) {
            return "no cart";
        }
        const product = await productsModel.findOne({ _id: pid });
        if (!product) {
            return "no product";
        }

        for (let i = cart.products.length - 1; i >= 0; i--) {
            if (cart.products[i].product._id == pid) {
                cart.products.splice(i, 1);
            }
        }

        const result = await cartsModel.updateOne({ _id: cid }, cart);
        if (!result) {
            return "server error";
        }
        return result;
    }

    async DeleteAllProducts(cid) {
        const cart = await cartsModel.findOne({ _id: cid });
        if (!cart) {
            return "no cart";
        }

        const result = await cartsModel.updateOne({ _id: cid }, { $set: { products: [] } });
        if (!result) {
            return "server error";
        }
        return result;
    }
}

export default CartsManager;