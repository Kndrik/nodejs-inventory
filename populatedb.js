const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Manufacturer = require("./models/manufacturer");
const Item = require("./models/item");

const categories = [];
const manufacturers = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createManufacturers();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(name, description) {
  const category = new Category({
    name: name,
    description: description,
  });
  categories.push(category);
  await category.save();
  console.log(`Added category: ${name}`);
}

async function manufacturerCreate(name, address) {
  const manufacturer = new Manufacturer({
    name: name,
    address: address,
  });
  manufacturers.push(manufacturer);
  await manufacturer.save();
  console.log(`Added manufacturer: ${name}`);
}

async function itemCreate(
  name,
  description,
  price,
  number_in_stock,
  category,
  manufacturer
) {
  const item = new Item({
    name: name,
    description: description,
    price: price,
    number_in_stock: number_in_stock,
    category: category,
    manufacturer: manufacturer,
  });
  await item.save();
  items.push(item);
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate("Keycaps", "Covers placed over the keyswitch."),
    categoryCreate(
      "Switches",
      "Mechanisms under the keycaps that register key presses."
    ),
    categoryCreate("Cases", "Keyboard cases"),
    categoryCreate("PCB", "Keyboard PCBs"),
    categoryCreate(
      "Full Kits",
      "Packages of keycaps, switches, cases and PCBs to facilitate the access to mechanical keyboards."
    ),
  ]);
}

async function createManufacturers() {
  console.log("Adding manufacturers");
  await Promise.all([
    manufacturerCreate("GMK", "Germany"),
    manufacturerCreate("PBTFans", "China"),
    manufacturerCreate("Gateron", "Huizhou, China"),
    manufacturerCreate("Cherry MX", "Germany"),
    manufacturerCreate("EPBT", "China"),
    manufacturerCreate("Tofu", "China"),
    manufacturerCreate("KBDFans", "China"),
  ]);
}

async function createItems() {
  console.log("Adding items");
  await Promise.all([
    itemCreate(
      "DZ60 Solderable",
      "Solderable 60% PCB",
      59,
      2,
      categories[3],
      manufacturers[6]
    ),
    itemCreate(
      "DZ65 Hot-Swap RGB PCB",
      "DZ65 RGB Hot-Swap PCB 65%",
      80,
      0,
      categories[3],
      manufacturers[6]
    ),
    itemCreate(
      "PBTFans WoB",
      "PBTFans white on black PBT doubleshot keycap set",
      99,
      8,
      categories[0],
      manufacturers[1]
    ),
    itemCreate(
      "GMK Kitsune",
      "GMK Kistune ABS doubleshot keycap set",
      129,
      0,
      categories[0],
      manufacturers[0]
    ),
    itemCreate(
      "PBTFans Blush",
      "PBTFans blush PBT doubleshot keycap set",
      99,
      3,
      categories[0],
      manufacturers[1]
    ),
    itemCreate(
      "TOFU65",
      "65% Aluminium case",
      80,
      23,
      categories[2],
      manufacturers[5]
    ),
    itemCreate(
      "Gateron INK BLACK v2",
      "Linear switches from Gateron",
      2.49,
      265,
      categories[1],
      manufacturers[2]
    ),
    itemCreate(
      "Gateron Ink Milky Yellow",
      "Linear switches from Gateron",
      2.49,
      178,
      categories[1],
      manufacturers[2]
    ),
  ]);
}
