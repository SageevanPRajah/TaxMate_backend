import nodemailer from 'nodemailer';
import { Answer } from '../models/answerModel.js';
import { Question } from '../models/questionModel.js';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '../config.js';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: +SMTP_PORT,
  secure: false, // true if 465
  auth: { user: SMTP_USER, pass: SMTP_PASS }
});

async function sendMail(to, name, originalQuestion, answerText) {
  const today = new Date().toLocaleDateString();
  const html = `
    <p>Hello ${name},</p>
    <p>Thank you for reaching out to us with your question!</p>
    <p>📝 <strong>Your Question:</strong><br/>${originalQuestion}</p>
    <p>✅ <strong>Our Answer:</strong><br/>${answerText}</p>
    <p>If you have any further questions, reply to this email or visit our Help Center.</p>
    <p>Warm regards,<br/>Customer Support Team<br/>TaxMate</p>
  `;
  await transporter.sendMail({
    from: `"TaxMate Support" <${SMTP_USER}>`,
    to,
    subject: '📩 Answer to Your Question from TaxMate',
    html
  });
}

export const addAnswer = async (req, res) => {
  const { questionId } = req.params;
  const { answer } = req.body;
  const answeredBy = req.user._id;

  const q = await Question.findById(questionId);
  if (!q) return res.status(404).json({ message: 'Question not found' });

  const a = new Answer({ questionID: questionId, answer, answeredBy });
  await a.save();

  // send email
  await sendMail(q.email, q.name, q.question, answer);

  res.status(201).json(a);
};

export const updateAnswer = async (req, res) => {
  const { id } = req.params; // answer _id
  const { answer } = req.body;

  const a = await Answer.findById(id);
  if (!a) return res.status(404).json({ message: 'Answer not found' });

  a.answer = answer;
  await a.save();

  // re-fetch question for mailing
  const q = await Question.findById(a.questionID);
  await sendMail(q.email, q.name, q.question, answer);

  res.status(200).json(a);
};

export const getAnswersForQuestion = async (req, res) => {
  const answers = await Answer.find({ questionID: req.params.questionId })
                              .populate('answeredBy', 'firstName lastName email');
  res.status(200).json(answers);
};
