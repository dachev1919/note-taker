module.exports = {
  async rewrites() {
    return [
      {
        source: '/notes/:id/edit',
        destination: '/notes/edit/:id',
      },
    ];
  },
};