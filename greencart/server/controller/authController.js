const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signUp = async (req, res) => {
    try {
        const { name, email, password, address, phone, role, isAdmin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const randomId = Math.floor((Math.random() * 10) + 9999) + 1;
        const frameUserDetails = new User({ uniqueId: randomId, name, email, password: hashedPassword, address, phone,role, isAdmin });
        const saveUserDetail = await frameUserDetails.save();
        return res.status(201).json({ message: "User details saved", data: saveUserDetail })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userDetail = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, userDetail.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        const token = jwt.sign({ id: userDetail._id, role: userDetail.role }, process.env.SECRET, { expiresIn: "1h" });
        res.cookie("token", token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
                maxAge: 60 * 60 * 1000,
            }
        );

        return res.status(200).json({message: "User logged in", data: userDetail, token : token})

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const logout = async(req,res)=>{
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Lax',
        secure: false
    });
    return res.status(200).json({ message: "User logged out" });
}

const verifyUser = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET);

      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      req.user = user;

      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden: Access denied" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token", error: err.message });
    }
  };
};


module.exports = { signUp , signIn , logout, verifyUser};