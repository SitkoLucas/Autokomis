import type { Transition, Variants } from "framer-motion";

export const easeApple: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const easeExit: [number, number, number, number] = [0.4, 0, 1, 1];

export const fadeTransition: Transition = {
  duration: 0.55,
  ease: easeApple,
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.06,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: fadeTransition,
  },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: easeApple },
  },
};

export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeApple },
  },
};

export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.25, ease: easeApple },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: easeExit },
  },
};

export const modalPanel: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeApple },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 4,
    transition: { duration: 0.2, ease: easeExit },
  },
};

export const drawerPanel: Variants = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeApple },
  },
  exit: {
    opacity: 0,
    y: "100%",
    transition: { duration: 0.28, ease: easeExit },
  },
};
