import http from './httpService';
import apiEndPoints from './apiEndPoints';

const { supportRequestApi } = apiEndPoints;

export const getAllSupportRequestsWithFilterPaginationAndSorting = async (
  filterOn = null,
  filterQuery = null,
  sortBy = null,
  isAscending = null,
  pageSize = 10,
  pageNumber = 1
) => {
  let url = `${supportRequestApi}?pageSize=${pageSize}&pageNumber=${pageNumber}`;

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

export const getsupportRequestData =async ()=>{
  const {data} = await http.get(supportRequestApi)
  return data.records 
}


// use the method above to calculate the count below
export const countsupportRequestsByStatus = async (status = null) => {
  const data = await getAllSupportRequestsWithFilterPaginationAndSorting(
    'status',
    status,
    null,
    null,
    0,
    0
  );

  return data.totalRecords;
};
export const getsupportRequestById = async (id) => {
  const { data } = await http.get(`${supportRequestApi}/${id}`);

  return data;
};

export const createsupportRequest = async (req) => {
  const { data } = await http.post(`${supportRequestApi}`, req);

  return data;
};

export const updatesupportRequest = async (id, req) => {
  const { data } = await http.put(`${supportRequestApi}/${id}`, req);

  return data;
};

export const deletesupportRequest = async (id) => {
  const { data } = await http.delete(`${supportRequestApi}/${id}`);

  return data;
};
