import { hashPassword, comparePassword } from '../utils/password.js';

// Definisi kategori dan tag yang diizinkan
const VALID_CATEGORIES = ['Budaya', 'Taman Hiburan', 'Cagar Alam', 'Bahari', 'Pusat Perbelanjaan', 'Tempat Ibadah'];
const VALID_TAGS = [
    'beach', 'hiking', 'cultural', 'historical', 'culinary', 'family',
    'adventure', 'photography', 'shopping', 'nature', 'free', 'solo',
    'religious', 'romantic', 'wildlife', 'resort', 'camping', 'art',
    'traditional', 'modern', 'museum', 'island', 'temple', 'mountain',
    'city', 'village', 'festival', 'local', 'luxury', 'budget',
    'spiritual', 'heritage', 'garden', 'forest', 'coastal', 'sunset',
    'sunrise', 'extreme', 'underrated', 'popular', 'eco-friendly'
];
const VALID_PRICE_RANGES = ['budget', 'midRange', 'luxury'];

// Register user baru
export const register = async (req, res) => {
  try {
    const prisma = req.app.locals.prisma;

    const { name, email, password, city, coordinates, visitedPlaces,
           priceRange, interestTags, preferredCategories, minRating } = req.body;

    // Cek email sudah digunakan
    const existingEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'Email sudah terdaftar'
      });
    }

    const hashedPassword = await hashPassword(password);

    // Cari ID tertinggi
    const maxIdResult = await prisma.$queryRaw`SELECT MAX(id) FROM "users"`;
    const maxId = parseInt(maxIdResult[0].max) || 0;
    const newId = maxId + 1;

    // Buat user dengan ID di atas max yang ada
    const newUser = await prisma.user.create({
      data: {
        id: newId, // Gunakan ID baru di atas maksimum yang ada
        name,
        email,
        password: hashedPassword,
        city,
        coordinates,
        visitedPlaces: visitedPlaces || [],
        priceRange,
        interestTags: interestTags || [],
        preferredCategories: preferredCategories || [],
        minRating: minRating || 0,
      }
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error("Registration error details:", error);

    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

// Login user
export const login = async (req, res, next) => {
  try {
    const prisma = req.app.locals.prisma;
    const { email, password } = req.body;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login (updatedAt will be automatically updated)
    await prisma.user.update({
      where: { id: user.id },
      data: {} // Empty update to trigger updatedAt
    });

    // Set session
    req.session.userId = user.id;

    // Send response (omitting password)
    const { password: _, ...userWithoutPassword } = user;
    return res.json({
      message: 'Login successful',
      user: userWithoutPassword
    });

  } catch (error) {
    next(error);
  }
};

// Logout user
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out, please try again' });
    }

    res.clearCookie('connect.sid');
    return res.json({ message: 'Logged out successfully' });
  });
};

// Get current user
export const getCurrentUser = async (req, res, next) => {
  try {
    const prisma = req.app.locals.prisma;

    if (!req.session.userId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        city: true,
        coordinates: true,
        visitedPlaces: true,
        priceRange: true,
        interestTags: true,
        preferredCategories: true,
        minRating: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      // Clear invalid session
      req.session.destroy();
      return res.status(401).json({ message: 'User not found' });
    }

    return res.json({ user });

  } catch (error) {
    next(error);
  }
};

// Update user profile
export const updateProfile = async (req, res, next) => {
  try {
    const prisma = req.app.locals.prisma;
    let {
      name, city, coordinates, priceRange,
      interestTags, preferredCategories, minRating
    } = req.body;

    // Validasi data input
    // Validasi priceRange
    if (priceRange && !VALID_PRICE_RANGES.includes(priceRange)) {
      priceRange = 'midRange'; // Default jika tidak valid
    }

    // Validasi interestTags
    if (interestTags && Array.isArray(interestTags)) {
      interestTags = interestTags.filter(tag => VALID_TAGS.includes(tag));
    }

    // Validasi preferredCategories
    if (preferredCategories && Array.isArray(preferredCategories)) {
      preferredCategories = preferredCategories.filter(category =>
        VALID_CATEGORIES.includes(category)
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.session.userId },
      data: {
        name,
        city,
        coordinates,
        priceRange,
        interestTags,
        preferredCategories,
        minRating: minRating ? parseFloat(minRating) : undefined
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        city: true,
        coordinates: true,
        visitedPlaces: true,
        priceRange: true,
        interestTags: true,
        preferredCategories: true,
        minRating: true,
        updatedAt: true
      }
    });

    return res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    next(error);
  }
};

export const completeProfile = async (req, res) => {
  try {
    const { id } = req.user; // Dari middleware auth
    const { name, email, password, location, age } = req.body;

    // Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nama, email, dan password harus diisi'
      });
    }

    // Cek jika email sudah digunakan (kecuali oleh user ini)
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
        id: { not: id }
      }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email sudah digunakan'
      });
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        password: hashedPassword,
        location,
        age: age ? parseInt(age) : undefined,
        needsProfileUpdate: false,
        updatedAt: new Date()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Profil berhasil diperbarui'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memperbarui profil'
    });
  }
};
