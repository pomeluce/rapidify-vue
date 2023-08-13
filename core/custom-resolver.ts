export const customResolver = (componentName: string) => {
  if (componentName.startsWith('Icon')) {
    return { name: componentName.slice(4), from: '@icon-park/vue-next' };
  }

  if (componentName.startsWith('Rify')) {
    return { name: componentName, from: '@/rify' };
  }
};
