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
    participants: { $all: [currentUser._id, targetUser._id] }
  }, async function (err, result) {
    if (err) {
      console.log(err);
    }
    // findOne() returns null if there are no matches
    if (!result) {
      const newConversation = new Conversation({
        participants: [currentUser._id, targetUser._id],
      });
      await newConversation.save().then(savedNewConversation => {
        const responsePayload = {
          currentId: currentUser._id,
          targetId: targetUser._id,
          messages: savedNewConversation.messages,
        };
        return response.status(200).json(responsePayload);
      });
    } else {
      const responsePayload = {
        currentId: currentUser._id,
        targetId: targetUser._id,
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
      { participants: { $all: [currentUser._id, targetUser._id] } },
      { $push: { messages: { sender: currentUser._id, content: request.body.content } }},
      { new: true }
  ).exec();
  return response.status(200).json(updatedConversation);
});

module.exports = conversationsRouter;
