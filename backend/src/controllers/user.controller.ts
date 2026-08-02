export const getCurrentUser = async (req, res, next) => {
  const { password, ...safeUser } = req.user;
  res.status(200).json({ success: true, data: safeUser });
};
