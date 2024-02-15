exports.getFullCredentials = async (req, res, next) => {
  const token = await req.headers.authorization.replace('Bearer ', '');
  if (token === null) {
    console.log('there no token!');
  }
  const { id } = jwt.decode(token);
  const { name, email, role } = await User.findById(id);
  res.status(200).json({ name, email, role });
};
