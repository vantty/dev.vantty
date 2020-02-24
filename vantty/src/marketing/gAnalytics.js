import ReactGA from "react-ga";

export const gaEvent = (
  category,
  action,
  label,
  value,
  nonInteraction,
  transport
) =>
  ReactGA.event({
    category: category,
    //String. Required. A top level category for these events. E.g. 'User', 'Navigation', 'App Editing', etc.
    action: action,
    //args.action	String. Required. A description of the behaviour. E.g. 'Clicked Delete', 'Added a component', 'Deleted account', etc.
    label: label,
    //String. Optional. More precise labelling of the related action. E.g. alongside the 'Added a component' action, we could add the name of a component as the label. E.g. 'Survey', 'Heading', 'Button', etc.
    value: value,
    //Int. Optional. A means of recording a numerical value against an event. E.g. a rating, a score, etc.
    nonInteraction: nonInteraction,
    //Boolean. Optional. If an event is not triggered by a user interaction, but instead by our code (e.g. on page load, it should be flagged as a nonInteraction event to avoid skewing bounce rate data.
    transport: transport
    //String. Optional. This specifies the transport mechanism with which hits will be sent. Valid values include 'beacon', 'xhr', or 'image'.
  });

export const gaError = description => {
  ReactGA.exception({
    description: description,
    fatal: true
  });
};
