module.exports = (schema) => (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      return res.status(422).json({
        errors: err.errors.map(e => ({ path: e.path[0], message: e.message })),
      });
    }
  };
  