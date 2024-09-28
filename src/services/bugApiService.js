import http from './httpService';
import apiEndPoints from './apiEndPoints';

const { bugApi } = apiEndPoints;

export const getAllBugsWithFilterPaginationAndSorting = async (
  filterOn = null,
  filterQuery = null,
  sortBy = null,
  isAscending = null,
  pageSize = 5,
  pageNumber = 1
) => {
  let url = `${bugApi}?pageSize=${pageSize}&pageNumber=${pageNumber}`;

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

export const getBugById = async (id) => {
  const { data } = await http.get(`${bugApi}/${id}`);

  return data;
};

export const createBug = async (req) => {

  const { data } = await http.post(`${bugApi}`, req,{
    headers: {
      'Content-Type': 'multipart/form-data',
    }});

  return data;
};

export const updateBug = async (id, req) => {

  const { data } = await http.put(`${bugApi}/${id}`, req,{headers: {
    'Content-Type': 'multipart/form-data',
  }});

  return data;
};

// use the method above to calculate the count below
export const countBugsByStatus = async (status = null) => {
  const data = await getAllBugsWithFilterPaginationAndSorting('status', status, null, null, 0, 0);

  return data.totalRecords;
};

export const deleteBug = async (id, rowVersion) => {
  const payLoad = {
    id,
    rowVersion,
  };
  const { data } = await http.delete(`${bugApi}/${id}`, {
    data: payLoad,
    headers: { 'Content-Type': 'application/json' },
  });

  return data;
};
