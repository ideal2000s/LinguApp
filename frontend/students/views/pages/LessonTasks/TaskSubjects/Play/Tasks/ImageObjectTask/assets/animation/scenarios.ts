export const animationScenarios = [
  {
    name: 'header-hidden',
    animate: {
      opacity: 0,
      scale: 1.5,
      transition: { type: 'Inertia', duration: 0.5, delay: 0.5 }
    }
  },
  {
    name: 'header-initial',
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: 'Inertia', duration: 0.5, delay: 2 }
    }
  },
  {
    name: 'header-regular',
    animate: {
      opacity: 1,
      scale: 1,
      transition: { type: 'Inertia', duration: 0.5 }
    }
  },
  {
    name: 'body-appear',
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: 'Inertia', duration: 0.5, delay: 0.5 }
    }
  },
  {
    name: 'body-zoomed',
    animate: {
      width: '100vw',
      transition: { type: 'Inertia', duration: 0.5, delay: 1 }
    }
  },
  {
    name: 'body-default',
    animate: {
      width: '100%'
    }
  }
];
