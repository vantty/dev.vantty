const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const StripeService = require('../../services/stripe');
const ProfileService = require('../../services/profile');
const UserService = require('../../services/user');

const { setupDatabase } = require('../../helpers/testUtils');

jest.mock('twilio');

describe('Stripe Controller', () => {
  beforeAll(async (done) => {
    jest.clearAllMocks();
    await setupDatabase().open('stripe');
    await setupDatabase().removeCollections();

    const profileTest = {
      name: {
        firstName: 'Test',
        lastName: 'Test',
      },
    };

    const userTest = {
      _id: mongoose.Types.ObjectId('5e6d295166d6f0141cd57265'),
      firstName: 'Test',
      lastName: 'Test',
      profile: true,
      email: 'test@test.com',
      method: 'gmail',
    };

    await Profile.create(profileTest);
    await User.create(userTest);

    done();
  });

  afterAll(async (done) => {
    await setupDatabase().removeCollections();
    await setupDatabase().dropCollections();
    await setupDatabase().close();
    done();
  });

  describe('Create account', () => {
    const code = '123';
    const url = `/api/stripe/account/${code}`;

    beforeEach((done) => {
      StripeService.createAccount = jest.fn();
      StripeService.generateLink = jest.fn();
      ProfileService.update = jest.fn();
      UserService.update = jest.fn();
      done();
    });

    afterEach((done) => {
      StripeService.createAccount.mockReset();
      StripeService.generateLink.mockReset();
      ProfileService.update.mockReset();
      UserService.update.mockReset();
      done();
    });

    test('should returns 201 status when the person creates an account', async () => {
      await StripeService.createAccount.mockResolvedValue({
        stripeArtistAccount: '851cbe44-f92f-4095-954a-3e86122bcc1e',
        stripeBankData: {
          bankId: '9b7e5f25-8982-4972-9968-60b7766d4bb6',
          country: 'CA',
          currency: 'cad',
          bankName: 'test',
          routingNumber: '00000-00',
          last4: '1234',
        },
        support_phone: '123456789',
      });
      await StripeService.generateLink.mockResolvedValue({ url: 'test.any' });
      await ProfileService.update.mockResolvedValue({});
      await UserService.update.mockResolvedValue();

      const response = await request(app)
        .post(url)
        .set(
          'authorization',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ2YW50dHkiLCJzdWIiOiI1ZTZkMjk1MTY2ZDZmMDE0MWNkNTcyNjUiLCJpYXQiOjE1ODQyMTIzMDUsImV4cCI6MTYxNTc0ODMwNX0.SyNLiMFl3E0LGOefXXxOPzNXeHgPd9KBi2EiRdIhvEA'
        )
        .send({ code: '123' });

      expect(StripeService.createAccount).toHaveBeenCalledWith('123');
      expect(StripeService.generateLink).toHaveBeenCalledWith(
        '851cbe44-f92f-4095-954a-3e86122bcc1e'
      );
      expect(UserService.update).toHaveBeenCalledWith(
        '5e6d295166d6f0141cd57265',
        { mobileNumber: '123456789' },
        '$set'
      );
      expect(ProfileService.update).toHaveBeenCalledWith(
        '5e6d295166d6f0141cd57265',
        {
          stripeArtistAccount: '851cbe44-f92f-4095-954a-3e86122bcc1e',
          stripeBankData: {
            bankId: '9b7e5f25-8982-4972-9968-60b7766d4bb6',
            country: 'CA',
            currency: 'cad',
            bankName: 'test',
            routingNumber: '00000-00',
            last4: '1234',
          },
          stripeLink: 'test.any',
          mobileNumber: '123456789',
        },
        '$set'
      );
      expect(response.status).toEqual(201);
      expect(response.body).toEqual({});
    });

    test(`should return a status 500 when occurs an unexpected exception`, async () => {
      await StripeService.createAccount.mockRejectedValue(
        'unexpected exception'
      );

      const response = await request(app)
        .post(url)
        .set(
          'authorization',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ2YW50dHkiLCJzdWIiOiI1ZTZkMjk1MTY2ZDZmMDE0MWNkNTcyNjUiLCJpYXQiOjE1ODQyMTIzMDUsImV4cCI6MTYxNTc0ODMwNX0.SyNLiMFl3E0LGOefXXxOPzNXeHgPd9KBi2EiRdIhvEA'
        );

      expect(response.status).toEqual(500);
    });
  });
});
