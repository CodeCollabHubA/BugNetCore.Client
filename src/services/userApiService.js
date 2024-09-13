import http from './httpService';
import apiEndPoints from './apiEndPoints';

const { userApi } = apiEndPoints;

export const getAllUsersWithFilterPaginationAndSorting = async (
  filterOn = null,
  filterQuery = null,
  sortBy = null,
  isAscending = null,
  pageSize = 10,
  pageNumber = 1
) => {
  let url = `${userApi}?pageSize=${pageSize}&pageNumber=${pageNumber}`;

  if (filterOn != null && filterQuery != null) {
    url = `${url}&filterOn=${filterOn}&filterQuery=${filterQuery}`;
  }

  if (sortBy != null) {
    url = `${url}&sortBy=${sortBy}`;
    if (isAscending != null) {
      url = `${url}&isAscending=${isAscending}`;
    }
  }
  const { data } = await http.get(url);

  return data;
};

// use the method above to calculate the count below
export const countUsersByRole = async (role = null) => {
  const data = await getAllUsersWithFilterPaginationAndSorting(
    'userRole',
    role,
    null,
    null,
    0,
    0
  );

  return data.totalRecords;
};

export const getUserById = async (id) => {
  const { data } = await http.get(`${userApi}/${id}`);

  return data;
};


export const createUser = async (req) => {
  const { data } = await http.post(`${userApi}`, req);

  return data;
};


export const updateUser = async (id, req) => {
  const { data } = await http.put(`${userApi}/${id}`, req);

  return data;
};


export const deleteUser = async (id) => {
  const { data } = await http.delete(`${userApi}/${id}`);

  return data;
};
