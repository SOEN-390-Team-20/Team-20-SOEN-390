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
      return response.status(200).json(result.messages);
    }
  }).exec();

});

conversationsRouter.post('/new-message', async (request, response) => {
  const { body } = request;

  const currentUser = 123;
});

module.exports = conversationsRouter;
