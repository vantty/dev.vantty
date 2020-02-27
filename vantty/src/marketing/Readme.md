# GA Events

## Goals

1. Create account

   - Files: actions/auth => func => Register Local, Google and Facebook.
     Events:
     gaEvent(New user, register, Google || Facebook || Local)

2. Get bookings

   - File: views/profile/slider/index.jsx
     Events:
     gaEvent(Start checkout, Click to checkout, User ID)

   - File: view/checkout/index
     Events:
     Service => gaEvent("Checkout", "Service");
     Address => gaEvent("Checkout", "Address");
     Payment => gaEvent("Checkout", "Payment");
     Finished => gaEvent("Checkout", "Finished");

   - File: actions/book = Fun => addNewBook
     Events:
     gaEvent("New Booking", "Create", bookingId);
