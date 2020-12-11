import catchAsyncErrors from '../middleware/catchAsync.js';
import ErrorHandler from '../utils/errorHandler.js';
import { officeService } from '../services/index.js';
export const get = catchAsyncErrors(async (req, res, next) => {
  const office = await officeService.getOfficeById(req.params.id);
  if (!office) {
    return next(
      new ErrorHandler(`Finner ikke office med ${req.params.id}`, 404)
    );
  }
  res.status(201).json({ success: true, data: office });
});

export const list = catchAsyncErrors(async (req, res, next) => {
    const offices = await officeService.listOffices();
    res.status(200).json({ success: true, data: offices });
  });

export const create = catchAsyncErrors(async (req, res, next) => {
  //req.body.user = req.user.id;
  const office = await officeService.createOffice(req.body);
  res.status(201).json({ success: true, data: office });
});

export const update = catchAsyncErrors(async (req, res, next) => {
  let office = await officeService.getOfficeById(req.params.id);
  if (!office) {
    return next(
      new ErrorHandler(`Finner ikke office med ${req.params.id}`, 404)
    );
  }
  office = await officeService.updateOffice(req.params.id, req.body);
  res.status(200).json({ success: true, data: office });
});

export const remove = catchAsyncErrors(async (req, res, next) => {
  let office = await officeService.getOfficeById(req.params.id);
  if (!office) {
    return next(
      new ErrorHandler(`Finner ikke office med ${req.params.id}`, 404)
    );
  }
  office = await officeService.removeOffice(req.params.id);
  res.status(204).json({});
});

