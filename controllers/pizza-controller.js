const Pizza = require("../models/Pizza.js");

const pizzaController = {
  //get all pizzas
  async getAllPizza(req, res) {
    try {
      const pizza = await Pizza.find({})
        .populate({
          path: "comments",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 });
      res.json(pizza);
    } catch (error) {
      console.error(`${error}`);
      console.exit(1);
    }
  },

  //get single pizza by ID
  async getPizzaById({ params }, res) {
    try {
      const pizza = await Pizza.findOne({ _id: params.id })
        .populate({
          path: "comments",
          select: "-__v",
        })
        .select("-__v");

      if (!pizza) {
        res.status(404).json({ message: "No pizza found with this id" });
        return;
      }
      res.json(pizza);
    } catch (error) {
      console.error(`${error}`);
      console.exit(1);
    }
  },

  //create new pizza
  async createPizza({ body }, res) {
    try {
      const newPizza = await Pizza.create(body);

      res.json(newPizza);
    } catch (error) {
      console.error(`${error}`);
      console.exit(1);
    }
  },

  //update existing pizza
  async updatePizza({ params, body }, res) {
    try {
      const changedPizza = await Pizza.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true }
      );
      if (!changedPizza) {
        res.status(404).json({ message: "No pizza found with this id!" });
        return;
      }
      res.json(changedPizza);
    } catch (error) {
      console.error(`${error}`);
      console.exit(1);
    }
  },

  //delete pizza
  async deletePizza({ params }, res) {
    try {
      const removedPizza = await Pizza.findOneAndDelete({ _id: params.id });
      if (!removedPizza) {
        res.status(404).json({ message: "No Pizza found with this id" });
        return;
      }
      res.json(removedPizza);
    } catch (error) {
      console.error(`${error}`);
      console.exit(1);
    }
  },
};

module.exports = pizzaController;
