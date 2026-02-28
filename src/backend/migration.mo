import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Array "mo:core/Array";

module {
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

  type UserProfile = {
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

  type OldSneaker = {
    id : Nat;
    name : Text;
    price : Float;
    description : Text;
    sizes : [Text];
    category : Text;
    isFeatured : Bool;
  };

  type OldUserProfile = {
    principal : Principal;
    username : Text;
    joinedAt : Int;
  };

  type OldActor = {
    sneakers : Map.Map<Nat, OldSneaker>;
    users : Map.Map<Principal, OldUserProfile>;
  };

  type NewActor = {
    nextOrderId : Nat;
    products : Map.Map<Nat, Product>;
    userProfiles : Map.Map<Principal, UserProfile>;
    carts : Map.Map<Principal, [CartItem]>;
    orders : Map.Map<Nat, Order>;
  };

  public func run(old : OldActor) : NewActor {
    let products = old.sneakers.map<Nat, OldSneaker, Product>(
      func(id, oldSneaker) {
        {
          id = oldSneaker.id;
          name = oldSneaker.name;
          description = oldSneaker.description;
          category = #Special;
          sizes = Array.repeat<Size>(#_100g, 1);
          imagePath = "not-set";
        };
      }
    );

    let userProfiles = old.users.map<Principal, OldUserProfile, UserProfile>(
      func(_principal, profile) {
        {
          name = profile.username;
          phoneNumber = "not-set";
          deliveryAddress = "not-set";
          email = "not-set";
        };
      }
    );

    {
      nextOrderId = 1;
      products;
      userProfiles;
      carts = Map.empty<Principal, [CartItem]>();
      orders = Map.empty<Nat, Order>();
    };
  };
};
