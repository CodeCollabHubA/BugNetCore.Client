import http from './httpService';
import apiEndPoints from './apiEndPoints';

const { projectApi } = apiEndPoints;

export const getAllProjectsWithFilterPaginationAndSorting = async (
  filterOn = null,
  filterQuery = null,
  sortBy = null,
  isAscending = null,
  pageSize = 10,
  pageNumber = 1
) => {
  let url = `${projectApi}?pageSize=${pageSize}&pageNumber=${pageNumber}`;

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

export const getProjectData =async ()=>{
  const {data} = await http.get(projectApi)
  return data.records 
}


// use the method above to calculate the count below
export const countProjectsByStatus = async (status = null) => {
  const data = await getAllProjectsWithFilterPaginationAndSorting(
    'status',
    status,
    null,
    null,
    0,
    0
  );

  return data.totalRecords;
};
export const getProjectById = async (id) => {
  const { data } = await http.get(`${projectApi}/${id}`);

  return data;
};

export const createProject = async (req) => {
  const { data } = await http.post(`${projectApi}`, req);

  return data;
};

export const updateProject = async (id, req) => {
  const { data } = await http.put(`${projectApi}/${id}`, req);

  return data;
};

export const deleteProject = async (id) => {
  const { data } = await http.delete(`${projectApi}/${id}`);

  return data;
};
