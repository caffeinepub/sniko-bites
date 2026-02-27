import Array "mo:core/Array";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";

actor {
  type Sneaker = {
    id : Nat;
    name : Text;
    price : Float;
    description : Text;
    sizes : [Text];
    category : Text;
    isFeatured : Bool;
  };

  let sneakers = Map.empty<Nat, Sneaker>();

  public shared ({ caller }) func seedSneakers() : async () {
    let sampleSneakers : [Sneaker] = [
      {
        id = 1;
        name = "Sonic Rush Runner";
        price = 119.99;
        description = "Lightweight running sneakers with superior cushioning.";
        sizes = ["8", "9", "10", "11"];
        category = "Running";
        isFeatured = true;
      },
      {
        id = 2;
        name = "Sky Dunk Pro";
        price = 149.99;
        description = "High-top basketball sneakers with enhanced ankle support.";
        sizes = ["9", "10", "11", "12"];
        category = "Basketball";
        isFeatured = false;
      },
      {
        id = 3;
        name = "Urban Flow";
        price = 99.99;
        description = "Casual lifestyle sneakers for everyday wear.";
        sizes = ["7", "8", "9", "10"];
        category = "Lifestyle";
        isFeatured = true;
      },
      {
        id = 4;
        name = "Velocity Boost";
        price = 129.99;
        description = "Performance running sneakers with energy-return soles.";
        sizes = ["8", "9", "10"];
        category = "Running";
        isFeatured = false;
      },
      {
        id = 5;
        name = "Limited Edition Royal Blue";
        price = 249.99;
        description = "Exclusive limited edition sneakers in royal blue.";
        sizes = ["9", "10", "11"];
        category = "Limited Edition";
        isFeatured = true;
      },
      {
        id = 6;
        name = "Street Glide";
        price = 109.99;
        description = "Sleek and stylish sneakers for urban explorers.";
        sizes = ["8", "9"];
        category = "Lifestyle";
        isFeatured = false;
      },
      {
        id = 7;
        name = "Court Master";
        price = 139.99;
        description = "Premium basketball sneakers with advanced grip.";
        sizes = ["10", "11", "12"];
        category = "Basketball";
        isFeatured = true;
      },
      {
        id = 8;
        name = "Trail Blazer";
        price = 159.99;
        description = "All-terrain running sneakers for outdoor adventures.";
        sizes = ["9", "10", "11"];
        category = "Running";
        isFeatured = false;
      },
    ];

    for (sneaker in sampleSneakers.values()) {
      sneakers.add(sneaker.id, sneaker);
    };
  };

  public query ({ caller }) func getAllSneakers() : async [Sneaker] {
    sneakers.values().toArray();
  };

  public query ({ caller }) func getFeaturedSneakers() : async [Sneaker] {
    let featured = sneakers.values().toArray().filter(
      func(s) { s.isFeatured }
    );
    featured;
  };

  public query ({ caller }) func getSneakerById(id : Nat) : async Sneaker {
    switch (sneakers.get(id)) {
      case (null) { Runtime.trap("Sneaker not found") };
      case (?sneaker) { sneaker };
    };
  };
};
