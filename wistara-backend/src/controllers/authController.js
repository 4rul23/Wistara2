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
export const register = async (req, res, next) => {
  try {
    const prisma = req.app.locals.prisma;
    let { email, password, name, city, priceRange, interestTags, preferredCategories, minRating } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

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

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Prepare data for creating a user
    const userData = {
      email,
      password: hashedPassword,
      name,
      city,
      priceRange,
      minRating: minRating ? parseFloat(minRating) : undefined
    };

    // Add array fields if they exist
    if (interestTags && Array.isArray(interestTags)) {
      userData.interestTags = interestTags;
    }

    if (preferredCategories && Array.isArray(preferredCategories)) {
      userData.preferredCategories = preferredCategories;
    }

    // Create user with Prisma
    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        city: true,
        priceRange: true,
        interestTags: true,
        preferredCategories: true,
        minRating: true,
        createdAt: true
      }
    });

    // Set session
    req.session.userId = user.id;

    // Send response
    return res.status(201).json({
      message: 'Registration successful',
      user
    });

  } catch (error) {
    next(error);
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
