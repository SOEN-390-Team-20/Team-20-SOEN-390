const express = require('express');

const conversationsRouter = express.Router();
const User = require('../models/user');
const Conversation = require('../models/conversation');
const { verifyJWTAuth } = require('./auth');

/* eslint-disable */
conversationsRouter.get('/:id', verifyJWTAuth, async (request, response) => {
  const targetId = request.params.id;
  const currentUser = await User.findById(request.userId).exec();
  const targetUser = await User.findById(targetId).exec();

  if (currentUser._id === targetUser._id) {
    return response.sendStatus(404);
  }

  const conversation = await Conversation.findOne({ participants: { $all: [currentUser._id, targetUser._id] } }).exec();

  // findOne() returns null if there are no matches
  if (!conversation) {
    const newConversation = new Conversation({
      participants: [currentUser._id, targetUser._id],
    });
    await newConversation.save().then(savedNewConversation => {
      const responsePayload = {
        currentId: currentUser._id,
        targetId: targetUser._id,
        targetFirstName: targetUser.firstName,
        messages: savedNewConversation.messages,
      };
      return response.status(200).json(responsePayload);
    });
  } else {
    const responsePayload = {
      currentId: currentUser._id,
      targetId: targetUser._id,
      targetFirstName: targetUser.firstName,
      messages: conversation.messages,
    };
    return response.status(200).json(responsePayload);
  }
});

conversationsRouter.post('/:id', verifyJWTAuth, async (request, response) => {
  const targetId = request.params.id;
  const currentUser = await User.findById(request.userId).exec();
  const targetUser = await User.findById(targetId).exec();

  await Conversation.findOneAndUpdate(
      { participants: { $all: [currentUser._id, targetUser._id] } },
      { $push: { messages: { sender: currentUser._id, content: request.body.content } }},
      { new: true }
  ).exec();
  return response.sendStatus(200);
});

module.exports = conversationsRouter;
