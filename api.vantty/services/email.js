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
          "Your book has been sent to the artist. Once she accepts the service, we will send you a confirmation email with your booking code. Remember that your appointment is on:",
        details: date,
        html2: "To see the state of your request please click the link below.",
        url: `${uri}/bookings-user`,
        buttonText: "Bookings",
        templateId: "d-b1af9d047c234276bc3950a5e0e4e94f"
      };
    case REQUESTED_ARTIST:
      return {
        subject: "Book Requested",
        title: `Hi ${firstName},`,
        html:
          "You have a new book request. Remember that your appointment is on:",
        details: date,
        html2:
          "To see the details and accept the request please click the link below.",
        url: `${uri}/bookings`,
        buttonText: "Bookings",
        templateId: "d-b1af9d047c234276bc3950a5e0e4e94f"
      };
    case ACCEPTED_USER:
      return {
        subject: "Book Accepted",
        title: `Hi ${firstName},`,
        html:
          "Your book request has been accepted by your artist. Once your artists finish your service, please give her this booking code:",
        details: token,
        html2:
          "If you need to modify or cancell the service please click the link below.",
        url: `${uri}/bookings-user`,
        buttonText: "Bookings",
        templateId: "d-b1af9d047c234276bc3950a5e0e4e94f"
      };
    case ACCEPTED_ARTIST:
      return {
        subject: "Book Accepted",
        title: `Hi ${firstName},`,
        html:
          "You have accepted the book request. Remember that your appointment is on:",
        details: date,
        html2:
          "Once you finish this services, please ask your client for the book code and click the link below to get paid.",
        url: `${uri}/bookings`,
        buttonText: "Bookings",
        templateId: "d-b1af9d047c234276bc3950a5e0e4e94f"
      };
    case DECLINED_USER:
      return {
        subject: "Book Declined",
        title: `Hi ${firstName},`,
        html:
          "Your book has been declined by the artist. Please go back to Vantty and search for another one.",
        url: `${uri}/search`,
        buttonText: "Go to Vantty",
        templateId: "d-a94e0655e3c447cfad10349050007bf3"
      };
    case DECLINED_ARTIST:
      return {
        subject: "Book Declined",
        title: `Hi ${firstName},`,
        html:
          "You have declined the book request. To see the details of the declined service please click the link below.",
        url: `${uri}/bookings`,
        buttonText: "Bookings",
        templateId: "d-a94e0655e3c447cfad10349050007bf3"
      };
    case DECLINED_POSPONED_USER:
      return {
        subject: "Book Declined",
        title: `Hi ${firstName},`,
        html:
          "Your book has been declined by the artist. However she has an alternative proposal for you:",
        details: token,
        html2:
          "If it works for you, please go back to Vantty and book again your service.",
        url: `${uri}/bookings`,
        buttonText: "Go to Vantty",
        templateId: "d-b1af9d047c234276bc3950a5e0e4e94f"
      };
    case DECLINED_POSPONED_ARTIST:
      return {
        subject: "Book Declined",
        title: `Hi ${firstName},`,
        html:
          "You have declined the book request and send this proposal to the user:",
        details: token,
        html2:
          "Please wait until the user books you again. To see the details of service please click the link below.",
        url: `${uri}/bookings`,
        buttonText: "Bookings",
        templateId: "d-b1af9d047c234276bc3950a5e0e4e94f"
      };
    case DECLINED_USER_BY_USER:
      return {
        subject: "Book Declined",
        title: `Hi ${firstName},`,
        html:
          "You have declined the service. Please go back to Vantty and book another one.",
        url: `${uri}/search`,
        buttonText: "Go to Vantty",
        templateId: "d-a94e0655e3c447cfad10349050007bf3"
      };
    case DECLINED_ARTIST_BY_USER:
      return {
        subject: "Book Declined",
        title: `Hi ${firstName},`,
        html:
          "The user has declined the service. To see the details of the declined service please click the link below.",
        url: `${uri}/bookings`,
        buttonText: "Bookings",
        templateId: "d-a94e0655e3c447cfad10349050007bf3"
      };
    case COMPLETED_USER:
      return {
        subject: "Service Completed",
        title: `Hi ${firstName},`,
        html:
          "Your service has been completed. Your artist will appriciate a review from you. To write it, please click the link below.",
        url: `${uri}/profile/artist/${reviewData.artistId}/${reviewData.reviewId}`,
        buttonText: "Leave Review",
        templateId: "d-a94e0655e3c447cfad10349050007bf3"
      };
    case COMPLETED_ARTIST:
      return {
        subject: "Service Completed",
        title: `Hi ${firstName},`,
        html:
          "You have completed the service. To see the details of the service please click the link below.",
        url: `${uri}/bookings`,
        buttonText: "Bookings",
        templateId: "d-a94e0655e3c447cfad10349050007bf3"
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
  html2,
  details,
  url,
  buttonText,
  templateId
) => {
  await sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "Vantty Client Services <no-reply@vantty.ca>",
    subject: subject,
    templateId: templateId,
    dynamic_template_data: {
      subject: subject,
      title: title,
      url: url,
      buttonText: buttonText,
      html: html,
      html2: html2,
      details: details
    }
  };
  const res = await sgMail.send(msg);
  const { statusCode, statusMessage } = res[0];
  const result = statusCode + statusMessage;
  return result;
};

module.exports = { content, compose };
