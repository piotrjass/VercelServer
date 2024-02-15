const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

//
const Article = require('../models/articleModel');
const { findUserByToken } = require('../utils/CommonFunctions');

exports.createArticle = async (req, res) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  const { _id, name, email, role } = await findUserByToken(token);
  const author = { _id, name, email, role };
  const { title, desc, content, tags } = req.body;
  const authorReference = author._id;
  try {
    const newArticles = new Article({
      title,
      desc,
      content,
      tags,
      author,
      authorReference
    });
    const savedArticle = await newArticles.save();
    const populatedArticle = await Article.populate(savedArticle, {
      path: 'authorReference',
      select:
        '-favourites -favouriteCards -daysStreak -resourcesStarted -resourcesEnded -answeredQuestion -__v -dateOfLastLogin'
    });

    res.status(200).json({
      populatedArticle
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    res.status(200).json({
      message: 'got it!',
      article
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getListOfAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({}, 'title desc tags date _id');

    const simplifiedArticles = articles.map(article => ({
      title: article.title,
      desc: article.desc,
      tags: article.tags,
      date: article.date,
      id: article._id
    }));

    res.status(200).json({
      message: 'Success',
      simplifiedArticles
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};
