const backendDomain = "http://localhost:8000"

const SummaryApi = {
    signUP : {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomain}/api/signin`,
        method : "post",
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get",
    },
    logout_user : {
        url : `${backendDomain}/api/logout`,
        method : "get",
    },
    allUser : {
        url : `${backendDomain}/api/all-user`,
        method : "get",
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : "post",
    },
    uploadProduct : {
        url : `${backendDomain}/product/upload-product`,
        method : "post"
    },
    allProduct : {
        url : `${backendDomain}/product/get-product`,
        method : "get"
    },
    updateProduct : {
        url : `${backendDomain}/product/update-product`,
        method : "post"
    },
    categoryProduct : {
        url : `${backendDomain}/product/get-categoryProduct`,
        method : "get"
    },
    categoryWiseProduct : {
        url : `${backendDomain}/product/category-product`,
        method : "post"
    },
    productDetails : {
        url : `${backendDomain}/product/product-details`,
        method : "post"
    },
    addToCartProduct : {
        url : `${backendDomain}/cart/addtocart`,
        method : "post"
    },
    countAddToCartProduct : {
        url : `${backendDomain}/cart/countAddToCart`,
        method : "get"
    },
    viewAddToCardProduct : {
        url : `${backendDomain}/cart/view-card-product`,
        method : "get"
    },
    updateCartProduct : {
        url : `${backendDomain}/cart/update-cart-product`,
        method : "post"
    },
    deleteCartProduct : {
        url : `${backendDomain}/cart/delete-cart-product`,
        method : "post"
    },
    searchProduct : {
        url : `${backendDomain}/product/search`,
        method : "get"
    },
    filterProduct : {
        url : `${backendDomain}/product/filter-product`,
        method : "post"
    }
}

export default SummaryApi;