import PropTypes from "prop-types";

export const convoStateInterface = {
  convoState: PropTypes.shape({
    conversationLog: PropTypes.array,
    convoIsLoading: PropTypes.bool.isRequired
  }).isRequired
};

export const userStateInterface = {
  userState: PropTypes.shape({
    signedIn: PropTypes.bool.isRequired,
    userData: PropTypes.object
  }).isRequired
};

export default {
  date: PropTypes.string.isRequired,
  dateFull: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  showPic: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  showTimeStamp: PropTypes.bool.isRequired
};
