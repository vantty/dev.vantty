const sgMail = require("@sendgrid/mail");
const {
  CONFIRMATION,
  FORGOT,
  REQUESTED_USER,
  REQUESTED_ARTIST,
  ACCEPTED_USER,
  ACCEPTED_ARTIST,
  DECLINED_USER,
  DECLINED_ARTIST,
  DECLINED_POSPONED_USER,
  DECLINED_POSPONED_ARTIST,
  DECLINED_USER_BY_USER,
  DECLINED_ARTIST_BY_USER,
  COMPLETED_USER,
  COMPLETED_ARTIST
} = require("../helpers/emailTypes");

const content = (type, uri, token, firstName, reviewData, date) => {
  switch (type) {
    case CONFIRMATION:
      return {
        subject: "Email Confirmation",
        title: `Hi ${firstName}, we are glad you are here!`,
        html: "To be part of the Vantty community please confirm your email.",
        url: `${uri}/confirmation/${token}`,
        buttonText: "Confirm your email",
        templateId: "d-a94e0655e3c447cfad10349050007bf3"
      };
    case FORGOT:
      return {
        subject: "Reset Password",
        title: `Hi ${firstName},`,
        html: "To reset your password please click the link below.",
        url: `${uri}/reset/${token}`,
        buttonText: "Reset your password",
        templateId: "d-a94e0655e3c447cfad10349050007bf3"
      };
    case REQUESTED_USER:
      return {
        subject: "Book Requested",
        title: `Hi ${firstName},`,
        html:
          "Your book has been sent to the artist. Once she accepts the service, we will send you a confirmation email with your booking code. To see the state of your request please click the link below.",
        details: date,
        url: `${uri}/bookings-user`,
        buttonText: "Bookings",
        templateId: "d-b1af9d047c234276bc3950a5e0e4e94f"
      };
    case REQUESTED_ARTIST:
      return {
        subject: "Book Requested",
        title: `Hi ${firstName},`,
        html:
          "You have a new book request. To see the details and accept the request please click the link below.",
        details: date,
        url: `${uri}/bookings`,
        buttonText: "Bookings",
        templateId: "d-b1af9d047c234276bc3950a5e0e4e94f"
      };
    case ACCEPTED_USER:
      return {
        subject: "Book Accepted",
        html: `Hi ${firstName}, your book has been accepted by the artist. Your booking code is: <strong>${token}</strong>. Please save this code, because you have to give it to the artist once she finish your service. If you need to modify or cancell the service please <a href=${uri}/dashboard/user/apponitments><strong>click here.</strong></a>`
      };
    case ACCEPTED_ARTIST:
      return {
        subject: "Book Accepted",
        html: `Hi ${firstName}, you have accepted the book request. To see the details of the service please <a href=${uri}/bookings><strong>click here.</strong></a>`
      };
    case DECLINED_USER:
      return {
        subject: "Book Declined",
        html: `Hi ${firstName}, your book has been declined by the artist. Please go back to Vantty and <a href=${uri}/search><strong>search for another artist.</strong></a>`
      };
    case DECLINED_ARTIST:
      return {
        subject: "Book Declined",
        html: `Hi ${firstName}, you have declined the book request. To see the details of the declined service please <a href=${uri}/bookings><strong>click here.</strong></a>`
      };
    case DECLINED_POSPONED_USER:
      return {
        subject: "Book Declined",
        html: `Hi ${firstName}, your book has been declined by the artist. However she has an alternative proposal for you: <strong>${token}.</strong> If it works for you, please go back to Vantty and <a href=${uri}/search><strong>book again your service.</strong></a>`
      };
    case DECLINED_POSPONED_ARTIST:
      return {
        subject: "Book Declined",
        html: `Hi ${firstName}, you have declined the book request and send a proposal to the user. Please wait until the user books you again. To see the details of service please <a href=${uri}/bookings><strong>click here.</strong></a>`
      };
    case DECLINED_USER_BY_USER:
      return {
        subject: "Book Declined",
        html: `Hi ${firstName}, you have declined the service. Please go back to Vantty and <a href=${uri}/search><strong>search for another artist.</strong></a>`
      };
    case DECLINED_ARTIST_BY_USER:
      return {
        subject: "Book Declined",
        html: `Hi ${firstName}, the user has declined the service. To see the details of the declined service please <a href=${uri}/bookings><strong>click here.</strong></a>`
      };
    case COMPLETED_USER:
      return {
        subject: "Book Completed",
        html: `Hi ${firstName}, your book has been completed. Your artist will appriciate a review from you. To write it, please <a href=${uri}/profile/artist/${reviewData.artistId}/${reviewData.reviewId}><strong>click here.</strong></a>`
      };
    case COMPLETED_ARTIST:
      return {
        subject: "Book Completed",
        html: `Hi ${firstName}, your service has been completed. To see the details of the service please <a href=${uri}/bookings><strong>click here.</strong></a>`
      };
    default:
      return null;
  }
};

const compose = async (
  email,
  subject,
  title,
  html,
  details,
  url,
  buttonText,
  templateId
) => {
  await sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "Vantty Client Services <info@vantty.ca>",
    subject: subject,
    templateId: templateId,
    dynamic_template_data: {
      subject: subject,
      title: title,
      url: url,
      buttonText: buttonText,
      html: html,
      details: details
    }
  };
  const res = await sgMail.send(msg);
  const { statusCode, statusMessage } = res[0];
  const result = statusCode + statusMessage;
  return result;
};

module.exports = { content, compose };
