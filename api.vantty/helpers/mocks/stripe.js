const mockToken = jest.fn();
const mockRetrieve = jest.fn();
const mockCreateLoginLink = jest.fn();
const mockDelete = jest.fn();
const mockCreate = jest.fn();
const mockCreateSource = jest.fn();
const mockDeleteSource = jest.fn();
const mockRetrieveSource = jest.fn();

const mock = jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => {
    return {
      oauth: {
        token: mockToken,
      },
      accounts: {
        retrieve: mockRetrieve,
        createLoginLink: mockCreateLoginLink,
        del: mockDelete,
      },
      charges: {
        create: mockCreate,
      },
      customers: {
        createSource: mockCreateSource,
        deleteSource: mockDeleteSource,
        retrieveSource: mockRetrieveSource,
      },
    };
  });
});

module.exports = {
  mock,
  mockToken,
  mockRetrieve,
  mockCreateLoginLink,
  mockDelete,
  mockCreate,
  mockCreateSource,
  mockDeleteSource,
  mockRetrieveSource,
};
