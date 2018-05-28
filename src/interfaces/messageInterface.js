import PropTypes from "prop-types";

export default {
  date: PropTypes.string.isRequired,
  dateFull: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  sender: PropTypes.string.isRequired,
  showPic: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  showTimeStamp: PropTypes.bool.isRequired
};
