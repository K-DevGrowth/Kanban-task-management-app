export const requireOwner =
  (getResource, getOwnerId) => async (req, res, next) => {
    const resource = await getResource(req);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    if (getOwnerId(resource) !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this resource" });
    }
    req.resource = resource;
    next();
  };
