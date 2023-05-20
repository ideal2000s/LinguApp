export const animationScenarios = [
  {
    name: 'hide',
    animate: {
      opacity: 0,
      transition: { type: 'Inertia', duration: 0.25 }
    }
  },
  {
    name: 'appear',
    animate: {
      opacity: 1,
      transition: { type: 'Inertia', duration: 0.25 }
    }
  }
];
