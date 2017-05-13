import {Cart, Product} from './cart';
import assert from 'assert';

describe("Cart Tests", function()
{
    describe("Add to cart tests", function()
    {
        it("Adds item to cart", function()
        {
            Cart.setInstance();
            var firstProduct = new Product({id:1,name:"NAME1", price:12});
            Cart.instance.addItem(firstProduct);
            assert.ok(Cart.instance.hasProduct(firstProduct));
        })
        it("Increments item count on add if product exists", function()
        {
            Cart.setInstance();
            var firstProduct = new Product({id:1,name:"NAME1", price:12});
            Cart.instance.addItem(firstProduct);
            Cart.instance.addItem(firstProduct);
            var item = Cart.instance.getItem(firstProduct);
            assert.equal(item.Count, 2);
        })
        it("Updates item total on add if product exists", function()
        {
            Cart.setInstance();
            var firstProduct = new Product({id:1,name:"NAME1", price:12});
            Cart.instance.addItem(firstProduct);
            Cart.instance.addItem(firstProduct);
            var item = Cart.instance.getItem(firstProduct);
            assert.equal(item.Total, 24);
        })
        it("Adds second item to cart", function()
        {
            Cart.setInstance();
            var firstProduct = new Product({id:1,name:"NAME1", price:12});
            Cart.instance.addItem(firstProduct);
            Cart.instance.addItem(firstProduct);
            var item = Cart.instance.getItem(firstProduct);
            Cart.instance.removeItem(firstProduct);
            var secondProduct = new Product({id:2,name:"NAME2", price:5});
            Cart.instance.addItem(secondProduct);
            assert.equal(Cart.instance.Items.length, 2);
        })
        it("Updates cart total on second item addition", function()
        {
            Cart.setInstance();
            var firstProduct = new Product({id:1,name:"NAME1", price:12});
            Cart.instance.addItem(firstProduct);
            Cart.instance.addItem(firstProduct);
            var item = Cart.instance.getItem(firstProduct);
            Cart.instance.removeItem(firstProduct);
            var secondProduct = new Product({id:2,name:"NAME2", price:5});
            Cart.instance.addItem(secondProduct);
            assert.equal(Cart.instance.Items.length, 2);
        })
    })
    describe("Remove from cart tests", function()
    {
        it("Decrements item count on remove if product exists", function()
        {
            Cart.setInstance();
            var firstProduct = new Product({id:1,name:"NAME1", price:12});
            Cart.instance.addItem(firstProduct);
            Cart.instance.addItem(firstProduct);
            var item = Cart.instance.getItem(firstProduct);
            Cart.instance.removeItem(firstProduct);
            assert.equal(item.Count, 1);
        })
        it("Updates item count on remove if product exists", function()
        {
            Cart.setInstance();
            var firstProduct = new Product({id:1,name:"NAME1", price:12});
            Cart.instance.addItem(firstProduct);
            Cart.instance.addItem(firstProduct);
            var item = Cart.instance.getItem(firstProduct);
            Cart.instance.removeItem(firstProduct);
            assert.equal(item.Total, 12);
        })
    })
    describe("Cart state tests", function()
    {
        it("Returns correct total", function()
        {
            Cart.setInstance();
            var firstProduct = new Product({id:1,name:"NAME1", price:12});
            Cart.instance.addItem(firstProduct);
            Cart.instance.addItem(firstProduct);
            var item = Cart.instance.getItem(firstProduct);
            Cart.instance.removeItem(firstProduct);
            var secondProduct = new Product({id:2,name:"NAME2", price:5});
            Cart.instance.addItem(secondProduct);
            assert.equal(Cart.instance.Total, 17);
        })
        it("Clears Cart", function()
        {
            Cart.setInstance();
            var firstProduct = new Product({id:1,name:"NAME1", price:12});
            Cart.instance.addItem(firstProduct);
            Cart.instance.addItem(firstProduct);
            var item = Cart.instance.getItem(firstProduct);
            Cart.instance.removeItem(firstProduct);
            var secondProduct = new Product({id:2,name:"NAME2", price:5});
            Cart.instance.addItem(secondProduct);
            Cart.instance.clearCart();
            assert.equal(Cart.instance.Items.length, 0);
        })
    })
})