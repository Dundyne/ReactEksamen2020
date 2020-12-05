import catchAsyncErrors from '../middleware/catchAsync.js';
import ErrorHandler from '../utils/errorHandler.js';
import { articleService } from '../services/index.js';
export const get = catchAsyncErrors(async (req, res, next) => {
  const article = await articleService.getEventById(req.params.id);
  if (!article) {
    return next(
      new ErrorHandler(`Finner ikke article med ${req.params.id}`, 404)
    );
  }
  res.status(201).json({ success: true, data: article });
});

export const list = catchAsyncErrors(async (req, res, next) => {
    const articles = await articleService.listArticles();
    res.status(200).json({ success: true, data: events });
  });

export const create = catchAsyncErrors(async (req, res, next) => {
  //req.body.user = req.user.id;
  const article = await articleService.createArticle(req.body);
  res.status(201).json({ success: true, data: article });
});

export const update = catchAsyncErrors(async (req, res, next) => {
  let article = await articleService.getArticleById(req.params.id);
  if (!article) {
    return next(
      new ErrorHandler(`Finner ikke article med ${req.params.id}`, 404)
    );
  }
  article = await articleService.updateArticle(req.params.id, req.body);
  res.status(200).json({ success: true, data: article });
});

export const remove = catchAsyncErrors(async (req, res, next) => {
  let article = await articleService.getArticleById(req.params.id);
  if (!article) {
    return next(
      new ErrorHandler(`Finner ikke article med ${req.params.id}`, 404)
    );
  }
  article = await articleService.removeArticle(req.params.id);
  res.status(204).json({});
});

