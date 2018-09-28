/* eslint-disable class-methods-use-this */
class RouteNotFound {
  notFound(router) {
    router.use('/*', (req, res) => res.status(404).json({
      message: 'page not found'
    }));
  }
}

const notFound = new RouteNotFound();
export default notFound;
