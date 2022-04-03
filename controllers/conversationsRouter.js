const express = require('express');

const conversationsRouter = express.Router();
const User = require('../models/user');
const Conversation = require('../models/conversation');
const { verifyJWTAuth } = require('./auth');

/* eslint-disable */
conversationsRouter.get('/:id', verifyJWTAuth, async (request, response) => {
  const { targetId } = request.params;
  const currentUser = await User.findById(request.userId).exec();
  const targetUser = await User.findById(targetId).exec();
  await Conversation.findOne({
    participants: { $all: [currentUser.__id, targetUser.__id] }
  }, async function (err, result) {
    if (err) {
      console.log(err);
    }
    // findOne() returns null if there are no matches
    if (!result) {
      const newConversation = new Conversation({
        participants: [currentUser.__id, targetUser.__id],
      });
      await newConversation.save().then(savedNewConversation => {
        return response.status(200).json(savedNewConversation.messages);
      });
    } else {
      const responsePayload = {
        currentId: currentUser.__id,
        targetId: targetUser.__id,
        messages: result.messages,
      };
      return response.status(200).json(responsePayload);
    }
  }).exec();

});

conversationsRouter.post('/:id', verifyJWTAuth, async (request, response) => {
  const { targetId } = request.params;
  const currentUser = await User.findById(request.userId).exec();
  const targetUser = await User.findById(targetId).exec();

  let updatedConversation = await Conversation.findOneAndUpdate(
      { participants: { $all: [currentUser.__id, targetUser.__id] } },
      { $push: { messages: { sender: currentUser.__id, content: request.body.content } }},
      { new: true }
  ).exec();
  return response.status(200).json(updatedConversation);
});

module.exports = conversationsRouter;
