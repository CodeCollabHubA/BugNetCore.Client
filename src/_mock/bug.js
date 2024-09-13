import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// Enum definitions
const BugStatus = {
  Reported: 'Reported',
  InProgress: 'InProgress',
  Resolved: 'Resolved',
  Testing: 'Testing',
};

const BugPriority = {
  Low: 'Low',
  Medium: 'Medium',
  High: 'High',
};

const BugSeverity = {
  Urgent: 'Urgent',
  High: 'High',
  Medium: 'Medium',
  Low: 'Low',
};

const BugCategory = {
  UI: 'UI',
  Backend: 'Backend',
  Frontend: 'Frontend',
  Database: 'Database',
  Other: 'Other',
};

const bugIds = [
  'ffb55271-39db-463a-a171-d60758897645',
  '2703d0cf-8673-4028-854f-813644012c21',
  '52778682-3989-43bf-bed1-145069fa0863',
  '50b4bce1-5e43-4097-90f1-d13c07ae1d07',
  '0437e1fa-46cd-41ac-ace1-515e0db88125',
  '21fee938-ed2b-4e81-9b83-4c3f5941001b',
  '005a1cfd-8ce1-4c34-8cbe-8d86cf95932a',
  'fcc49aeb-0404-4448-80a4-dab9fc3dd1e8',
  '35f94ea1-2724-4b26-a882-f6f4edd3e66e',
  '697432f0-8e8e-4560-90ce-9aa7d7b03c13',
];

// Function to generate a list of project names
function generateProjectNames(count) {
  const projNames = [];
  let i = 0;
  while (i < count) {
    projNames.push(faker.company.catchPhrase());
    i += 1;
  }
  return projNames;
}

// Generate 10 project names
const projectNames = generateProjectNames(10);

// Generate fake data for bugs
export const bugs = [...Array(10)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: bugIds[index],
    rowVersion: faker.number.int(),
    description: faker.lorem.sentence(),
    category: sample(Object.values(BugCategory)),
    customerAssignedSeverity: sample(Object.values(BugSeverity)),
    adminAssignedPriority: sample(Object.values(BugPriority)),
    status: sample(Object.values(BugStatus)),
    screenshot: `/assets/images/bugs/Screenshot_${setIndex}.png`,
    projectId: faker.string.uuid(),
    projectName: sample(projectNames),
    customerId: faker.string.uuid(),
    customerName: faker.person.firstName(),
    devId: faker.string.uuid(),
    devName: faker.person.firstName(),
    comments: [...Array(5)].map(() => ({
      id: faker.string.uuid(),
      senderName: faker.person.firstName(),
      senderRole: faker.person.jobTitle(),
      message: faker.lorem.sentence(),
    })),
    createdAt: faker.date.past(),
    lastModified: faker.date.recent(),
  };
});
