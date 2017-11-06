export default {
  duration: 200,
  defaultStyle: {
    opacity: 0,
    transition: "opacity 200ms ease-out"
  },
  transitionStyles: {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  }
};
