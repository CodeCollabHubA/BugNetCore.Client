import http from './httpService';
import apiEndPoints from './apiEndPoints';

const { commentApi } = apiEndPoints;

export const getAllCommentsWithFilterPaginationAndSorting = async (
  filterOn = null,
  filterQuery = null,
  sortBy = null,
  isAscending = null,
  pageSize = 10,
  pageNumber = 1
) => {
  
  let url = `${commentApi}?pageSize=${pageSize}&pageNumber=${pageNumber}`;

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

export const getCommentById = async (id) => {
  const { data } = await http.get(`${commentApi}/${id}`);

  return data;
};

export const createComment = async (req) => {
  console.log(req,'deeper')
  const { data } = await http.post(`${commentApi}`, req);

  return data;
};

export const updateComment = async (id, req) => {
  const { data } = await http.put(`${commentApi}/${id}`, req);

  return data;
};

// use the method above to calculate the count below
export const countCommentsByStatus = async (status = null) => {
  const data = await getAllCommentsWithFilterPaginationAndSorting('status', status, null, null, 0, 0);

  return data.totalRecords;
};

export const deleteComment = async (id, rowVersion) => {
  const payLoad = {
    id,
    rowVersion,
  };
  const { data } = await http.delete(`${commentApi}/${id}`, {
    data: payLoad,
    headers: { 'Content-Type': 'application/json' },
  });

  return data;
};
