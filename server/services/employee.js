import Employee from '../models/employee.js';

export const createEmployee = async (data) => Employee.create(data);

export const getEmployeeById = async (id) => Employee.findById(id);

export const updateEmployee = async (id, data) =>
Employee.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

export const removeEmployee = async (id) => {
  const employee = await Employee.findById(id);
  employee.remove();
};