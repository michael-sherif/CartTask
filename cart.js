const _privateStore = new WeakMap();
const cartSingleton = Symbol();
const cartSingletonEnforcer = Symbol();

function isNumeric(n) 
{
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export class Product
{
    constructor({id, name, price})
    {
        if(!isNumeric(price))
            throw new Error("Price must be a numeric value");
        if(price <= 0)
            throw new Error("Price must be more than 0");
        var privateProperties = 
        {
            id:id,
            name:name,
            price:price
        };
        _privateStore.set(this, privateProperties);
    }
    get Id()
    {
        return _privateStore.get(this).id;
    }
    get Name()
    {
        return _privateStore.get(this).name;
    }
    get Price()
    {
        return _privateStore.get(this).price;
    }
    equals(product)
    {
        return _privateStore.get(this).id === product.Id;
    }
}

class CartItem
{
    constructor(product)
    {
        var privateProperties = 
        {
            product: product,
            count: 1,
            total: product.Price
        };
        _privateStore.set(this, privateProperties);
    }
    get Product()
    {
        return _privateStore.get(this).product;
    }
    get Count()
    {
        return _privateStore.get(this).count;
    }
    get Total()
    {
        return _privateStore.get(this).total;
    }
    _updateTotal()
    {
        _privateStore.get(this).total = _privateStore.get(this).product.Price * _privateStore.get(this).count;
    }
    incrementCount()
    {
        _privateStore.get(this).count++;
        this._updateTotal();
    }
    decrementCount()
    {
        _privateStore.get(this).count--;
        this._updateTotal();
    }
}
export class Cart 
{
  constructor(enforcer) 
  {
    if (enforcer !== cartSingletonEnforcer)
        throw new Error('Can not construct singleton');
    else
    {
        var privateProperties = 
        {
            cartItems : []
        };
        _privateStore.set(this, privateProperties);
    }
  }
  static get instance() 
  {
    if (!this[cartSingleton]) 
      this.setInstance();
    return this[cartSingleton];
  }
  static setInstance()
  {
      this[cartSingleton] = new Cart(cartSingletonEnforcer);
  }
  get Items()
  {
      return  _privateStore.get(this).cartItems;
  }
  get Total()
  {
      return  _privateStore.get(this).cartItems.map(cartItem => cartItem.Total).reduce((acc, cartTotal) => acc + cartTotal , 0);
  }
  hasProduct(product)
  {
      return !!_privateStore.get(this).cartItems.find(cartItem => cartItem.Product.equals(product));
  }
  _getItemIndex(product)
  {
      return _privateStore.get(this).cartItems.findIndex(cartItem => cartItem.Product.equals(product));
  }
  addItem(product)
  {
    var cartItemIndex = this._getItemIndex(product);
    if(cartItemIndex === -1)
        _privateStore.get(this).cartItems.push(new CartItem(product));
    else
        _privateStore.get(this).cartItems[cartItemIndex].incrementCount();
  }
  removeItem(product)
  {
    var cartItemIndex = this._getItemIndex(product);
    if(cartItemIndex !== -1)
    {
        var cartItem = _privateStore.get(this).cartItems[cartItemIndex];
        if(cartItem.Count <= 1)
            _privateStore.get(this).cartItems.splice(cartItemIndex, 1);
        else
            cartItem.decrementCount();
    }
  }
  clearCart()
  {
      _privateStore.get(this).cartItems = [];
  }
  removeProduct(product)
  {
    var cartItemIndex = this._getItemIndex(product);
    if(cartItemIndex !== -1)
         _privateStore.get(this).cartItems.splice(cartItemIndex, 1);
  }
  getItem(product)
  {
    var item =  _privateStore.get(this).cartItems.find(cartItem => cartItem.Product.equals(product));
    return item ? item : null;
  }
}