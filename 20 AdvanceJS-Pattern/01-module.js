const MyStore = (function () {
  let _count = 0;
  let _data = {};

  function set(key, value) {
    _data[key] = value;
    _count++;
  }

  function get(key) {
    return _data[key];
  }

  function getCount() {
    return _count;
  }

  function list() {
    return Object.keys(_data);
  }

  return {
    set,
    get,
    getCount,
    list,
  };
})();

const AccountBook = (function () {
  let _data = {};
  let _accessLog = [];

  function set(key, value) {
    _data[key] = value;
    _accessLog.push({
      key,
      value,
      timestamp: Date.now(),
    });
  }

  function get(key) {
    return _data[key];
  }

  function logAccess(action, key) {
    _accessLog.push({
      action,
      key,
      timestamp: Date.now(),
    });
  }

  function getAccessLog() {
    return _accessLog;
  }

  function store(document) {
    // Store the document in the account book
    set(document.id, document);
    logAccess("store", document.id);
  }

  function retrieve(documentId) {
    const document = get(documentId);
    logAccess("retrieve", documentId);
    return document;
  }

  function getCount() {
    logAccess("getCount", null);
    return Object.keys(_data).length;
  }

  function getAccountBook() {
    return _data;
  }

  return {
    set,
    get,
    getAccessLog,
    store,
    retrieve,
    count: getCount,
    getAccountBook,
  };
})();

//Simulation and Dependency Injection
const shoppingMart = {};
shoppingMart.Inventory = (function () {
  function unitPrice(totalPrice, quantity) {
    return totalPrice / quantity;
  }

  function totalWeight(weightPerUnit, quantity) {
    return weightPerUnit * quantity;
  }

  return {
    unitPrice,
    totalWeight,
  };
})();

shoppingMart.BillingCalculator = (function (Inventory) {
  function calculateTotalPrice(items) {
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += Inventory.unitPrice(item.totalPrice, item.quantity);
    });
    return totalPrice;
  }

  function bulkDiscount(price, kgs) {
    if (kgs > 10) {
      return price * 0.9; // 10% discount for bulk purchases
    }
    const weight = Inventory.totalWeight(15, kgs); // Assuming 1 kg per unit for simplicity
    return `${weight} kg, Total Price: $${price}`;
  }

  return {
    calculateTotalPrice,
    bulkDiscount,
  };
})(shoppingMart.Inventory);

console.log(
  shoppingMart.BillingCalculator.calculateTotalPrice([
    { totalPrice: 100, quantity: 2 },
    { totalPrice: 50, quantity: 1 },
  ]),
); // 75
console.log(shoppingMart.BillingCalculator.bulkDiscount(200, 12)); // 180
console.log(shoppingMart.BillingCalculator.bulkDiscount(200, 5)); // 75 kg, Total Price: $200

/*
console.log(MyStore.getCount()); // 0
MyStore.set("name", "John");
MyStore.set("age", 30);
console.log(MyStore.getCount()); // 2
console.log(MyStore.get("name")); // John
console.log(MyStore.list()); // ['name', 'age']

AccountBook.store({ id: "doc1", content: "Document 1" });
AccountBook.store({ id: "doc2", content: "Document 2" });
console.log(AccountBook.retrieve("doc1")); // { id: 'doc1', content: 'Document 1' }
console.log(AccountBook.count()); // 2
console.log(AccountBook.getAccessLog());
*/
