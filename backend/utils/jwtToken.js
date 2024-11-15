export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  // Determine the cookie name based on the user's role
  const cookieName = user.role === 'Admin' 
  ? 'adminToken' 
  : user.role === 'Doctor' 
  ? 'doctorToken' 
  : 'patientToken';

  res.status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(
        Date.now() + 5000 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
};
