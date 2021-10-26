function getCartFromSessionStorage() {
    return JSON.parse(sessionStorage.getItem('cart'));
};

function setCartInSessionStorage(value) {
    sessionStorage.setItem('cart', JSON.stringify(value));
};

export function addItemToCart(itemId) {
    let cart = getCartFromSessionStorage();
    if (!cart) {
        cart = {};
        cart[itemId] = 1;
    } else if (!cart[itemId]) {
        cart[itemId] = 1;
    } else {
        cart[itemId]++;
    }
    setCartInSessionStorage(cart);
};


export function getAllItemsFromCart() {
    return getCartFromSessionStorage();
};

