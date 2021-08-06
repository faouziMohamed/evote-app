export default function addDashboardRoute(router) {
  router.route('/dashboard').get((req, res) => {
    res.render('connected/dashboard', {
      title: 'Dashboard',
      metadata: {
        title: 'Dashboard',
        description: 'Dashboard',
      },
    });
  });
}
