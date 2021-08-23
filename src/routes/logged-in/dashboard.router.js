export default function addDashboardRoute(router) {
  router.route('/dashboard').get((req, res) => {
    res.render('connected/dashboard', {
      title: 'Dashboard',
      user: req.user,
      metadata: {
        title: 'Dashboard',
        description: 'Dashboard',
      },
    });
  });
}
