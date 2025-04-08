const prisma = require("../../Utils/prisma");
const bcrypt = require("bcrypt");
const generateToken = require("../../Middleware/Auth/generateToken");

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw {
        custom: true,
        message: "Email and password are required",
      };
    }

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      throw {
        custom: true,
        message: "User not found",
      };
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      throw {
        custom: true,
        message: "Invalid password",
      };
    }

    const token = generateToken(
      {
        id: user.id,
        username: user.username,
        wallet_address: user.wallet_address,
        email: user.email,
      },
      240
    );

    return res.status(200).json({
      user: user,
      token: token,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = Login;
