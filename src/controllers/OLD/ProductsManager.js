import productsModel from "../../db/models/product.model.js";

class ProductManager {

    async getProducts(p){
        const products = await productsModel.paginate({}, { page: p, limit: 10 })
        if (!products) {
            return "server error";
        }

        const prevLink = () => {
            if (products.hasPrevPage) {
                return `http://localhost:8080/api/products/${products.page-1}`;
            } else {
                return null;
            }
        };
        const nextLink = () => {
            if (products.hasNextPage) {
                return `http://localhost:8080/api/products/${products.page+1}`;
            } else {
                return null;
            }
        };

        return {
            result:products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: prevLink(),
            nextLink: nextLink()
        };
    }

    async addProduct(data){
        const newProduct = {
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            stock: data.stock || 1,
            category: data.category,
            status: data.status || true
        }
        const exists = await productsModel.findOne({ code: data.code });
        
        if (exists) {
            const updatedProduct = await productsModel.updateOne({ code: data.code }, { stock: exists.stock + newProduct.stock });
            if(!updatedProduct){
                return "server error";
            }
            return updatedProduct;
        } else {
            const product = await productsModel.create(newProduct);
            if (!product) {
                return "server error";
            } else {
                return product;
            }
        }
    }

    async updateProduct(pid,data){
        const update = {
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            stock: data.stock,
            category: data.category,
            status: data.status
        }
        const updatedProduct = await productsModel.updateOne({ _id: pid }, update);
        if (!updatedProduct) {
            return "server error";
        }
        return updatedProduct;
    }

    async deleteProduct(pid){
        const deletedProduct = await productsModel.deleteOne({ _id: pid });
        if (!deletedProduct) {
            return "server error";
        }
        return deletedProduct;
    }
}

export default ProductManager;