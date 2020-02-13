const nodemailer = require("nodemailer");
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
const mailgun = require("mailgun-js");
const sgMail = require("@sendgrid/mail");

const content = (type, uri, token, firstName, reviewData) => {
  switch (type) {
    case CONFIRMATION:
      return {
        subject: "Email Confirmation",
        html: `Hi ${firstName}, welcome to Vantty!`,
        url: `${uri}/confirmation/${token}`
      };
    case FORGOT:
      return {
        subject: "Reset Password",
        html: `Hi ${firstName}. Please click this link to reset your password: <a href=${uri}/reset/${token}><strong>Click Here.</strong></a>`
      };
    case REQUESTED_USER:
      return {
        subject: "Book Requested",
        html: `Hi ${firstName}, your book has been sent to the artist. Once she accepts the service, we will send you a confirmation email with your booking code. To see the state of your request please <a href=${uri}/dashboard/user/apponitments><strong>click here.</strong></a>`
      };
    case REQUESTED_ARTIST:
      return {
        subject: "Book Requested",
        html: `Hi ${firstName}, you have a new book request. To see the details and accept the request please <a href=${uri}/bookings><strong>click here.</strong></a>`
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

const compose = async (email, subject, html) => {
  console.log("EMAIL", email);
  const transporter = await nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 465,
    secure: true,
    auth: {
      user: "postmaster@mg.vantty.ca",
      pass: "1c4be440def569d85fdb79e22aac9bb9-52b6835e-2e59dfb2"
    }
  });
  const message = {
    from: "admin@vantty.ca",
    to: `${email}`,
    subject: subject,
    html: html
  };
  const { response } = await transporter.sendMail(message);
  console.log("RES", response);
  return response;
};

const composeMG = async (email, subject, html) => {
  const DOMAIN = "mg.vantty.ca";
  const mg = mailgun({
    apiKey: "key-f4c2e0fc9d1d209d99ee29604f7a4d19",
    domain: DOMAIN
  });
  const data = {
    from: "admin@vantty.ca",
    to: email,
    subject: subject,
    template: "confirm-email",
    "v:url": `${html}`
  };
  await mg.messages().send(data, function(error, body) {
    console.log("RES", body);
    return body;
  });
};

const composeSG = async (email, subject, html, url) => {
  await sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: "admin@vantty.ca",
    subject: subject,
    templateId: "d-a94e0655e3c447cfad10349050007bf3",
    dynamic_template_data: {
      subject: subject,
      url: url,
      html: html
    }
  };
  const res = await sgMail.send(msg);
  const { statusCode, statusMessage } = res[0];
  const result = statusCode + statusMessage;
  return result;
};

module.exports = { content, compose, composeMG, composeSG };
