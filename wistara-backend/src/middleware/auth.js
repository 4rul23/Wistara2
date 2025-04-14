// Middleware untuk memastikan user sudah login
export const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized: Please login first' });
};

// Middleware untuk otorisasi berdasarkan peran
export const hasRole = (roles = []) => {
  return async (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Jika tidak ada roles yang diperiksa, lanjutkan
    if (!roles.length) {
      return next();
    }

    try {
      const prisma = req.app.locals.prisma;

      const user = await prisma.user.findUnique({
        where: { id: req.session.userId },
        select: { role: true }
      });

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({
          message: 'Forbidden: You do not have permission to access this resource'
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
