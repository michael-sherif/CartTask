const Cart = require('./cart');
const assert = require('assert');

try
{
    console.log("TESTS START");
    
    var firstProduct = new Cart.Product(1,"NAME1", 12);

    Cart.addItem(firstProduct);
    console.log("Test add item");
    assert.ok(Cart.hasProduct(firstProduct));

    Cart.addItem(firstProduct);
    var item = Cart.getItem(firstProduct);
    console.log("Test readd item count modified");
    assert.equal(item.getCount(), 2);
    console.log("Test readd item total modified");
    assert.equal(item.getCount() * item.getProduct().getPrice(), 24);

    Cart.removeItem(firstProduct);
    console.log("Test remove item count modified");
    assert.equal(Cart.getItem(firstProduct).getCount(), 1);
    console.log("Test remove item total modified");
    assert.equal(item.getCount() * item.getProduct().getPrice(), 12);

    var secondProduct = new Cart.Product(2,"NAME2", 5);
    
    Cart.addItem(secondProduct);
    console.log("Test add second item length modified");
    assert.equal(Cart.getItems().length, 2);

    console.log("Test cart total");
    assert.equal(Cart.getTotal(), 17);

    console.log("Test clear cart");
    Cart.clearCart();
    assert.equal(Cart.getItems().length, 0);

    console.log("TESTS PASSED");
}
catch(err)
{
    console.log("Test failed : %s", err.message)
}
