import { NextFunction, Request, Response } from 'express';
import emailConfig from '../config/mailerConfig';
import handlebars from 'handlebars';
import fs from 'fs';
import { formatDateTime } from '../components/dateFormatter';
import * as eventService from '../services/eventService';
import * as eventModel from '../models/eventModel';
import * as postModel from '../models/postModel';
import * as userModel from '../models/userModel';

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const boardId = Number(req.params.boardId);
    const postId = Number(req.params.postId);
    const eventData = req.body;

    const event = await eventService.createEvent(boardId, postId, eventData);
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = Number(req.params.postId);
  const eventData = req.body;

  try {
    const event = await eventService.updateEvent(postId, eventData);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = Number(req.params.postId);

  try {
    await eventService.deleteEvent(postId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = Number(req.params.postId);

  try {
    const event = await eventService.getEvent(postId);
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const sendEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const boardId = Number(req.params.boardId);
  const postId = Number(req.params.postId);
  const commentId = Number(req.body.commentId);

  const mailTemplateSource = fs.readFileSync(
    './src/templates/mailTemplate.html',
    'utf-8'
  );
  const mailTemplate = handlebars.compile(mailTemplateSource);

  try {
    const event = await eventModel.findByPostId(postId);
    const senderId = await postModel.getMemberByPostId(postId);
    const senderNickname = await userModel.getNicknameByMemberId(senderId);
    const senderEmail = `${senderNickname} <${process.env.EMAIL_USER}>`;

    const receiverId = await eventModel.findUserByCommentId(commentId);
    const receiverEmail = await userModel.getEmailByMemberId(receiverId);

    const post = await postModel.getPostById(boardId, postId);
    const subject = post.title;

    const eventLink = `${process.env.FRONTEND_URL}/boards/${boardId}/posts/${postId}`;

    const data = {
      eventTitle: `${subject} 안내`,
      location: event.location,
      eventTime: formatDateTime(event.event_time).formattedDateAndTime,
      eventLink: eventLink,
    };
    const htmlContent = mailTemplate(data);
    const mailOptions = {
      from: senderEmail,
      to: receiverEmail,
      subject: subject,
      html: htmlContent,
    };
    const info = await emailConfig.sendMail(mailOptions);
    res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};
