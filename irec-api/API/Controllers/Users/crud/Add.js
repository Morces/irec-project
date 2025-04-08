const prisma = require("../../../Utils/prisma");
const bcrypt = require("bcrypt");

const Add = async (req, res, next) => {
  try {
    const { username, wallet_address, email, password } = req.body;

    if (!username || !wallet_address || !email || !password) {
      throw {
        custom: true,
        message: "Please provide all required fields",
      };
    }

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw {
        custom: true,
        message: "User already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userAdded = await prisma.users.create({
      data: {
        username,
        wallet_address,
        email,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ user: userAdded, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = Add;
