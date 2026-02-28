import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Float "mo:core/Float";
import Migration "migration";

(with migration = Migration.run)
actor {
  type ProductCategory = {
    #Dark;
    #Milk;
    #White;
    #Special;
  };

  type Size = {
    #_100g;
    #_500g;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    category : ProductCategory;
    sizes : [Size];
    imagePath : Text;
  };

  public type UserProfile = {
    name : Text;
    phoneNumber : Text;
    deliveryAddress : Text;
    email : Text;
  };

  type CartItem = {
    productId : Nat;
    size : Size;
    quantity : Nat;
  };

  type OrderStatus = {
    #Pending;
    #Processing;
    #Shipped;
    #Delivered;
  };

  type Order = {
    id : Nat;
    userId : Principal;
    items : [CartItem];
    totalPrice : Float;
    deliveryAddress : Text;
    status : OrderStatus;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextOrderId = 1;
  let products = Map.empty<Nat, Product>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let carts = Map.empty<Principal, [CartItem]>();
  let orders = Map.empty<Nat, Order>();

  // Product Management
  public shared ({ caller }) func seedProducts() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can seed products");
    };

    let sampleProducts : [Product] = [
      {
        id = 1;
        name = "Dark Chocolate Bar";
        description = "Rich dark chocolate";
        category = #Dark;
        sizes = [#_100g, #_500g];
        imagePath = "/images/dark_bar.png";
      },
      {
        id = 2;
        name = "Milk Chocolate Bar";
        description = "Creamy milk chocolate";
        category = #Milk;
        sizes = [#_100g, #_500g];
        imagePath = "/images/milk_bar.png";
      },
      {
        id = 3;
        name = "White Chocolate Bar";
        description = "Sweet white chocolate";
        category = #White;
        sizes = [#_100g, #_500g];
        imagePath = "/images/white_bar.png";
      },
      {
        id = 4;
        name = "Hazelnut Dark Bar";
        description = "Dark chocolate with hazelnuts";
        category = #Special;
        sizes = [#_100g, #_500g];
        imagePath = "/images/hazelnut_dark.png";
      },
      {
        id = 5;
        name = "Caramel Milk Bar";
        description = "Milk chocolate with caramel filling";
        category = #Special;
        sizes = [#_100g, #_500g];
        imagePath = "/images/caramel_milk.png";
      },
      {
        id = 6;
        name = "Raspberry White Bar";
        description = "White chocolate with raspberry flavor";
        category = #Special;
        sizes = [#_100g, #_500g];
        imagePath = "/images/raspberry_white.png";
      },
      {
        id = 7;
        name = "Almond Dark Bar";
        description = "Dark chocolate with almonds";
        category = #Special;
        sizes = [#_100g, #_500g];
        imagePath = "/images/almond_dark.png";
      },
      {
        id = 8;
        name = "Mint Milk Bar";
        description = "Milk chocolate with mint";
        category = #Special;
        sizes = [#_100g, #_500g];
        imagePath = "/images/mint_milk.png";
      },
      {
        id = 9;
        name = "Orange White Bar";
        description = "White chocolate with orange flavor";
        category = #Special;
        sizes = [#_100g, #_500g];
        imagePath = "/images/orange_white.png";
      },
      {
        id = 10;
        name = "Classic Dark Truffles";
        description = "Smooth dark chocolate truffles";
        category = #Dark;
        sizes = [#_100g, #_500g];
        imagePath = "/images/dark_truffles.png";
      },
    ];

    for (product in sampleProducts.values()) {
      products.add(product.id, product);
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductById(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  // User Profile Management
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  // Shopping Cart Management
  public shared ({ caller }) func addToCart(productId : Nat, size : Size, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add to cart");
    };

    if (quantity == 0) {
      Runtime.trap("Quantity must be greater than 0");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };

    let newItem : CartItem = {
      productId;
      size;
      quantity;
    };

    let updatedCart = switch (cart.find(func(item) { item.productId == productId and item.size == size })) {
      case (null) {
        cart.concat([newItem]);
      };
      case (?existingItem) {
        cart.map(
          func(item) {
            if (item.productId == productId and item.size == size) {
              {
                item with quantity = item.quantity + quantity;
              };
            } else {
              item;
            };
          }
        );
      };
    };

    carts.add(caller, updatedCart);
  };

  public shared ({ caller }) func removeFromCart(productId : Nat, size : Size) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can remove from cart");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };

    let updatedCart = cart.filter(func(item) { item.productId != productId or item.size != size });

    if (updatedCart.size() == cart.size()) {
      Runtime.trap("Item not found in cart");
    };

    carts.add(caller, updatedCart);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can clear cart");
    };

    carts.add(caller, []);
  };

  public query ({ caller }) func getCart() : async [CartItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access cart");
    };
    switch (carts.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };
  };

  // Order Management
  public shared ({ caller }) func placeOrder() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };

    let cart = switch (carts.get(caller)) {
      case (null) { [] };
      case (?items) { items };
    };

    if (cart.size() == 0) {
      Runtime.trap("Cart is empty");
    };

    let totalPrice = cart.foldLeft(
      0.0,
      func(acc, item) {
        let price = switch (item.size) {
          case (#_100g) { 5.0 };
          case (#_500g) { 15.0 };
        };
        acc + (price * item.quantity.toFloat());
      },
    );

    let deliveryAddress = switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) { profile.deliveryAddress };
    };

    let newOrder : Order = {
      id = nextOrderId;
      userId = caller;
      items = cart;
      totalPrice;
      deliveryAddress;
      status = #Pending;
    };

    orders.add(nextOrderId, newOrder);
    nextOrderId += 1;

    carts.add(caller, []);

    newOrder.id;
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async Order {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };

    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        if (order.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own orders");
        };
        order;
      };
    };
  };

  public query ({ caller }) func getMyOrders() : async [Order] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };
    let myOrders = orders.values().toArray().filter(
      func(order) { order.userId == caller }
    );
    myOrders;
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update orders");
    };

    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder = {
          order with status
        };
        orders.add(orderId, updatedOrder);
      };
    };
  };
};
