import { Question } from '../models/questionModel.js';

export const addQuestion = async (req, res) => {
    const { question } = req.body;
    if (!question || !question.trim()) {
      return res.status(400).json({ message: 'Question is required' });
    }
  
    const { _id, firstName, lastName, email } = req.user;
    const q = await Question.create({
      userID: _id,
      name: `${firstName} ${lastName}`,
      email,
      question: question.trim()
    });
  
    return res.status(201).json(q);
  };

export const getAllQuestions = async (req, res) => {
  const qs = await Question.find().sort('-createdAt');
  res.status(200).json(qs);
};

export const getQuestion = async (req, res) => {
  const q = await Question.findById(req.params.id);
  if (!q) return res.status(404).json({ message: 'Not found' });
  res.status(200).json(q);
};
