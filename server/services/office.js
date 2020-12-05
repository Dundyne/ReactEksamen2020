import Office from '../models/office.js';

export const createOffice = async (data) => Office.create(data);

export const getOfficeById = async (id) => Office.findById(id);

export const updateOffice = async (id, data) =>
Office.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

export const removeOffice = async (id) => {
  const office = await Office.findById(id);
  office.remove();
};