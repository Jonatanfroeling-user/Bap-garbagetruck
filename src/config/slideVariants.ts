export const slideVariants = Object.freeze({
  hiddenRight: {
    x: "-100%",
    transition: { duration: 0.1 },
    opacity: 0,
  },
  hiddenLeft: {
    x: "100%",
    transition: { duration: 0.1 },
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
});
