const Comment = require('../models/commentModel');
const Article = require('../models/articleModel');
const { findUserByToken } = require('../utils/CommonFunctions');

async function addCommentRefernceToArticle(ArticleID, CommentID) {
  try {
    const article = await Article.findById(ArticleID);
    if (!article) {
      console.error(`Article with ID ${ArticleID} not found.`);
      return;
    }
    article.commentsReference.push(CommentID);
    await article.save();
    console.log(`Comment reference added to article ${ArticleID}.`);
  } catch (error) {
    console.error(
      `Error adding comment reference to article: ${error.message}`
    );
  }
}

exports.createComment = async (req, res) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  const { _id, name, email, role } = await findUserByToken(token);
  const author = { _id, name, email, role };
  const authorReference = _id;
  const { text, articleReference } = req.body;

  try {
    const newComment = new Comment({
      text,
      author,
      authorReference
    });
    const savedComment = await newComment.save();
    const commentId = savedComment._id;
    addCommentRefernceToArticle(articleReference, commentId);

    res.status(200).json({
      message: 'Comment added',
      comment: savedComment
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getCommentByID = async (req, res) => {
  const { id } = req.body;
  const comment = await Comment.findById(id);
  try {
    res.status(200).json({
      message: 'works',
      comment
    });
  } catch (error) {
    console.error(error);
  }
};
