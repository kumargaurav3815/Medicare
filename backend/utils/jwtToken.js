/** @format */
//generate token for authentication
export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  // Determine the cookie name based on the user's role
  //id admin generate adminToken & if patient generate patientToken
  const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

  res
    .status(statusCode)
    .cookie(cookieName, token, {
      //expires after 7days (refer config.env)
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 //day * hour * minute * second * milliSecond
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
