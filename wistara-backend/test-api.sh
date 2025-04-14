#!/bin/bash
# filepath: /home/arul23/dicoding/wistara/wistara-backend/api-test.sh

# Set base URL
BASE_URL="http://localhost:5000/api/auth"
COOKIE_JAR="cookies.txt"

# Warna untuk output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}===== WISTARA API TESTING =====${NC}"
echo ""

# Hapus cookie lama jika ada
rm -f $COOKIE_JAR

# =====================
# 1. LOGIN EXISTING USER
# =====================
echo -e "${BLUE}Testing Login with Seeded User...${NC}"
echo ""

# Simpan response login
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@wistara.com",
    "password": "user123"
  }' \
  -c $COOKIE_JAR)

# Cek jika response mengandung login successful
if echo "$LOGIN_RESPONSE" | grep -q "successful"; then
  echo -e "${GREEN}✓ Login Successful${NC}"
  echo -e "${YELLOW}Response:${NC} $LOGIN_RESPONSE"
else
  echo -e "${RED}× Login Failed${NC}"
  echo -e "${YELLOW}Response:${NC} $LOGIN_RESPONSE"
  echo ""
  echo -e "${BLUE}Trying verbose mode to see what's happening:${NC}"
  curl -v -X POST $BASE_URL/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "user@wistara.com",
      "password": "user123"
    }'
  echo ""
fi

echo ""
echo "-----------------------------------------"

# =====================
# 2. GET CURRENT USER
# =====================
echo -e "${BLUE}Testing Get Current User...${NC}"
echo ""

# Get user profile dengan cookie session
GET_USER_RESPONSE=$(curl -s -X GET $BASE_URL/me \
  -H "Content-Type: application/json" \
  -b $COOKIE_JAR)

# Cek jika response memiliki user
if echo "$GET_USER_RESPONSE" | grep -q "user"; then
  echo -e "${GREEN}✓ Get Current User Successful${NC}"
  echo -e "${YELLOW}Response:${NC} $GET_USER_RESPONSE"
else
  echo -e "${RED}× Get Current User Failed${NC}"
  echo -e "${YELLOW}Response:${NC} $GET_USER_RESPONSE"

  echo ""
  echo -e "${BLUE}Trying verbose mode to see what's happening:${NC}"
  curl -v -X GET $BASE_URL/me \
    -H "Content-Type: application/json" \
    -b $COOKIE_JAR
  echo ""
fi

echo ""
echo "-----------------------------------------"

# =====================
# 3. UPDATE USER PROFILE
# =====================
echo -e "${BLUE}Testing Update User Profile...${NC}"
echo ""

# Update user profile
UPDATE_RESPONSE=$(curl -s -X PUT $BASE_URL/profile \
  -H "Content-Type: application/json" \
  -b $COOKIE_JAR \
  -d '{
    "name": "Updated User",
    "city": "Yogyakarta",
    "coordinates": {"lat": -7.797, "lng": 110.370},
    "priceRange": "budget",
    "interestTags": ["history", "food", "tradition"],
    "preferredCategories": ["cultural", "heritage"],
    "minRating": 4
  }')

# Cek jika response berhasil
if echo "$UPDATE_RESPONSE" | grep -q "updated"; then
  echo -e "${GREEN}✓ Profile Update Successful${NC}"
  echo -e "${YELLOW}Response:${NC} $UPDATE_RESPONSE"
else
  echo -e "${RED}× Profile Update Failed${NC}"
  echo -e "${YELLOW}Response:${NC} $UPDATE_RESPONSE"

  echo ""
  echo -e "${BLUE}Trying verbose mode to see what's happening:${NC}"
  curl -v -X PUT $BASE_URL/profile \
    -H "Content-Type: application/json" \
    -b $COOKIE_JAR \
    -d '{
      "name": "Updated User",
      "city": "Yogyakarta"
    }'
  echo ""
fi

echo ""
echo "-----------------------------------------"

# =====================
# 4. LOGOUT
# =====================
echo -e "${BLUE}Testing User Logout...${NC}"
echo ""

# Logout user
LOGOUT_RESPONSE=$(curl -s -X POST $BASE_URL/logout \
  -H "Content-Type: application/json" \
  -b $COOKIE_JAR)

# Cek jika response berhasil
if echo "$LOGOUT_RESPONSE" | grep -q "Logged out"; then
  echo -e "${GREEN}✓ Logout Successful${NC}"
  echo -e "${YELLOW}Response:${NC} $LOGOUT_RESPONSE"
else
  echo -e "${RED}× Logout Failed${NC}"
  echo -e "${YELLOW}Response:${NC} $LOGOUT_RESPONSE"

  echo ""
  echo -e "${BLUE}Trying verbose mode to see what's happening:${NC}"
  curl -v -X POST $BASE_URL/logout \
    -H "Content-Type: application/json" \
    -b $COOKIE_JAR
  echo ""
fi

echo ""
echo "-----------------------------------------"

# =====================
# 5. VERIFY LOGGED OUT (Should fail now)
# =====================
echo -e "${BLUE}Verifying Logout (This should fail with Unauthorized)...${NC}"
echo ""

# Try to access protected route after logout
VERIFY_RESPONSE=$(curl -s -X GET $BASE_URL/me \
  -H "Content-Type: application/json" \
  -b $COOKIE_JAR)

# Check if unauthorized (expected)
if echo "$VERIFY_RESPONSE" | grep -q "Unauthorized"; then
  echo -e "${GREEN}✓ Verification Successful (Properly Unauthorized)${NC}"
  echo -e "${YELLOW}Response:${NC} $VERIFY_RESPONSE"
else
  echo -e "${RED}× Verification Failed (Still Authorized?)${NC}"
  echo -e "${YELLOW}Response:${NC} $VERIFY_RESPONSE"
fi

echo ""
echo "-----------------------------------------"

# =====================
# 6. TEST REGISTER NEW USER
# =====================
echo -e "${BLUE}Testing New User Registration...${NC}"
echo ""

# Generate random email to avoid conflicts
RANDOM_EMAIL="test_$(date +%s)@example.com"

# Simpan response dari register
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$RANDOM_EMAIL'",
    "password": "Test@123",
    "name": "Test User",
    "city": "Surabaya",
    "priceRange": "midRange",
    "interestTags": ["beach", "nature"],
    "preferredCategories": ["island", "park"]
  }')

# Cek jika response memiliki user
if echo "$REGISTER_RESPONSE" | grep -q "user"; then
  echo -e "${GREEN}✓ Registration Successful${NC}"
  echo -e "${YELLOW}Response:${NC} $REGISTER_RESPONSE"
else
  echo -e "${RED}× Registration Failed${NC}"
  echo -e "${YELLOW}Response:${NC} $REGISTER_RESPONSE"

  echo ""
  echo -e "${BLUE}Trying verbose mode to see what's happening:${NC}"
  curl -v -X POST $BASE_URL/register \
    -H "Content-Type: application/json" \
    -d '{
      "email": "'$RANDOM_EMAIL'",
      "password": "Test@123",
      "name": "Test User"
    }'
  echo ""
fi

echo ""
echo "-----------------------------------------"

# Clean up cookie file
rm -f $COOKIE_JAR

echo -e "${BLUE}API Testing Complete${NC}"
