var private = new WeakMap();

function isNumeric(n) 
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}
var Product = (function() 
{
    function Product(id, name, price) 
    {
        if(!isNumeric(price))
            throw new Error("Price must be a numeric value");
        if(price <= 0)
            throw new Error("Price must be more than 0");   
        var privateProperties = 
        {
            id: id,
            name: name,
            price: price
        };
        private.set(this, privateProperties);
    }
    Product.prototype.getId = function() 
    {
        return private.get(this).id;
    };
    Product.prototype.getName = function() 
    {
        return private.get(this).name;
    };
    Product.prototype.getPrice = function() 
    {
        return private.get(this).price;
    };
    Product.prototype.equals = function(product) 
    {
        return private.get(this).id === product.getId();
    };
    return Product;
}());


var CartItem = (function() 
{
    function CartItem(product) 
    {
        var privateProperties = 
        {
            product: product,
            count: 1,
            total: product.getPrice(),
            updateTotal: () =>
            {
                private.get(this).total = private.get(this).product.getPrice() * private.get(this).count;
            }
        };
        private.set(this, privateProperties);
    }
    CartItem.prototype.getProduct = function() 
    {
        return private.get(this).product;
    };
    CartItem.prototype.getCount = function() 
    {
        return private.get(this).count;
    };
    CartItem.prototype.getTotal = function() 
    {
        return private.get(this).total;
    };
    CartItem.prototype.incrementCount = function(product) 
    {
        private.get(this).count++;
        private.get(this).updateTotal();
    };
    CartItem.prototype.decrementCount = function(product) 
    {
        private.get(this).count--;
        private.get(this).updateTotal();
    };
    return CartItem;
}());

var cartItems = [];

module.exports = 
{
    Product: Product,
    getItems: () => cartItems ,
    hasProduct: product => !!cartItems.find(cartItem => cartItem.getProduct().equals(product)),
    addItem: product =>
    {

        if(!cartItems.some(cartItem => 
        {
            if(cartItem.getProduct().equals(product))
            {
                cartItem.incrementCount();
                return true;
            }
            return false;
        }))
        cartItems.push(new CartItem(product));
    },
    removeItem: product => 
    {
        var index = cartItems.findIndex(cartItem => cartItem.getProduct().equals(product))
        var element = cartItems[index];
        if(element.getCount() <= 1)
            cartItems.splice(index, 1);
        else
            cartItems[index].decrementCount();
    },
    removeProduct: product => cartItems.splice(cartItems.findIndex(cartItem => cartItem.getProduct().equals(product)), 1),
    getItem: product =>
    {
        var item = cartItems.find(cartItem => cartItem.getProduct().equals(product));
        return item ? item: null;
    },
    getTotal: () => cartItems.map(cartItem => cartItem.getTotal()).reduce((acc, cartTotal) => acc + cartTotal , 0),
    clearCart: () => { cartItems = []; }
}