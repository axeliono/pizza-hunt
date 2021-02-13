const { Comment, Pizza } = require("../models");

const commentController = {
  async addComment({ params, body }, res) {
    console.log(body);
    try {
      const newComment = await Comment.create(body);
      console.log(newComment._id);
      const pizzaData = await Pizza.findOneAndUpdate(
        { _id: params.pizzaId },
        { $push: { comments: newComment._id } },
        { new: true }
      );
      if (!pizzaData) {
        res.status(404).json({ message: "No pizza found with this id!" });
        return;
      }
      res.json(pizzaData);
    } catch (error) {
      res.json(error);
    }
  },
  async removeComment({ params }, res) {
    try {
      const comment = await Comment.findOneAndDelete({ _id: params.commentId });
      if (!comment) {
        return res.status(404).json({ message: "No comment with this id!" });
      }
      const pizzaData = await Pizza.findOneAndUpdate(
        { _id: params.pizzaId },
        { $pull: { comments: params.commentId } },
        { new: true }
      );
      if (!pizzaData) {
        res.status(404).json({ message: "No pizza found with this id!" });
        return;
      }
      res.json(pizzaData);
    } catch (error) {
      res.json(error);
    }
  },
};

module.exports = commentController;
