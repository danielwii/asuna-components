module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: [],
  babel: async (options) => {
    console.log('Babel options is', options);
    return {
      ...options,
    };
  },
};
