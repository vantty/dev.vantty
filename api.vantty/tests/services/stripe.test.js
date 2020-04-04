const {
  mockToken,
  mockRetrieve,
  mockCreateLoginLink,
  mockDelete,
  mockCreate,
  mockCreateSource,
  mockDeleteSource,
  mockRetrieveSource,
} = require('../../helpers/mocks/stripe');

const StripeService = require('../../services/stripe');

describe('Stripe service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`should create a stripe account with correct params`, async () => {
    //Arrange
    const code = '123';
    const stripe_user_id = '1234';
    const data = [
      {
        id: 1,
        country: 'Colombia',
        currency: 'COP',
        back_name: 'Ana Smith',
        routing_number: '12234',
        last4: '1234',
      },
    ];

    const expectData = {
      stripeBankData: {
        bankId: data[0].id,
        country: data[0].country,
        currency: data[0].currency,
        bankName: data[0].bank_name,
        routingNumber: data[0].routing_number,
        last4: data[0].last4,
      },
      support_phone: '123577777',
      stripeArtistAccount: stripe_user_id,
    };

    const mockRetrieveResult = {
      external_accounts: {
        data,
      },
      business_profile: {
        support_phone: '123577777',
      },
    };

    mockToken.mockReturnValue({ stripe_user_id });
    mockRetrieve.mockReturnValue(mockRetrieveResult);

    //Act
    const result = await StripeService.createAccount(code);

    //Assert
    expect(result).toEqual(expectData);
    expect(mockToken).toHaveBeenCalledWith({
      grant_type: 'authorization_code',
      code,
    });
    expect(mockRetrieve).toHaveBeenCalledWith(stripe_user_id);
  });

  xtest('should create a customer', async () => {});

  test('should save a card', async () => {
    const stripeCustomerId = 'd33c1bfd-9705-4f6e-a8cd-e8e45d636cf5';
    const source = '12ba7262-1243-4d3a-9446-a3dff6182d23';
    const card = {
      id: '1',
      fingerprint: 'abcdef',
      brand: 'VISA',
      exp_month: '11',
      exp_year: '2020',
      last4: '7890',
    };

    const expectData = {
      stripeCardId: '1',
      fingerPrint: 'abcdef',
      brand: 'VISA',
      expMonth: '11',
      expYear: '2020',
      last4: '7890',
    };
    await mockCreateSource.mockReturnValue(card);

    const result = await StripeService.saveCard(stripeCustomerId, source);

    expect(result).toEqual(expectData);
  });

  test('should delete a card if exists one', async () => {
    const stripeCustomerId = 'd33c1bfd-9705-4f6e-a8cd-e8e45d636cf5';
    const source = '12ba7262-1243-4d3a-9446-a3dff6182d23';
    const card = {
      id: '1',
      fingerprint: 'abcdef',
    };

    const cards = [{ ...card, fingerPrint: card.fingerprint }];

    await mockCreateSource.mockReturnValue(card);
    await mockDeleteSource.mockReturnValue();

    const result = await StripeService.saveCard(
      stripeCustomerId,
      source,
      undefined,
      cards
    );

    expect(result).toEqual(null);
  });
});
