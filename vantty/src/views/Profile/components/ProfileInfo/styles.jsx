const profilePageStyle = theme => ({
  profile: {
    textAlign: "center"
  },

  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%"
  },

  //All Text
  name: {
    marginTop: "2px",
    marginBottom: "0px"
  },
  description: {
    // margin: "1.071rem auto 0",
    margin: "0 auto",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important"
  },
  title: {
    display: "inline-block",
    position: "relative",
    marginTop: "10px",
    minHeight: "32px",
    textDecoration: "none",
    fontSize: "40px"
  },
  subTitle: {
    display: "inline-block",
    position: "relative",
    marginTop: "0px",
    minHeight: "17px",
    textDecoration: "none",
    fontSize: "16px"
  },
  subSubTitle: {
    display: "inline-block",
    position: "relative",
    marginTop: "0px",
    minHeight: "7px",
    textDecoration: "none",
    fontSize: "10px",
    color: "#999"
  },
  text: {
    display: "inline-block",
    position: "relative",
    marginTop: "0px",
    minHeight: "17px",
    textDecoration: "none",
    fontSize: "14px"
  },

  navWrapper: {
    margin: "20px auto 50px auto",
    textAlign: "center"
  },
  avatar: {
    margin: "auto",
    height: 90,
    width: 90
  },
  bigAvatar: {
    margin: 10,
    width: 90,
    height: 90,
    fontWeight: "bold",
    fontSize: "35px",
    backgroundColor: theme.palette.greenVantty.main
  },
  button: {
    margin: 10,
    color: theme.palette.vantty
    // backgroundColor: "rgb(120, 40, 146)"
  },
  input: {
    display: "none"
  },
  //Review
  review: {
    // width: "100%",
    maxWidth: 800
    // marginTop: "10px",
    // minHeight: "32px"
  },
  inline: {
    // display: "inline",
    float: "left"
  },
  textField: {
    marginLeft: "1rem",
    marginRight: "1rem"
  },
  date: {
    margin: "0 auto",
    maxWidth: "600px",
    color: "#999",
    fontSize: "12px"
  },
  messageReview: {
    display: "block",
    position: "relative",
    marginTop: "0px",
    minHeight: "17px",
    textDecoration: "none",
    fontSize: "14px"
  },

  marks: {
    // position: "absolute",
    display: "inline"
  },

  totalReview: {
    width: "200px",
    height: "200px",
    border: "1px solid red"
  },
  totalMark: {
    width: "200px",
    height: "200px",
    border: "1px solid blue"
  },
  verifiedIcon: {
    color: "rgb(0, 223, 212)",
    marginLeft: "0.3rem",
    marginBottom: "-0.3rem",
    width: "1rem"
  }
});

export default profilePageStyle;
