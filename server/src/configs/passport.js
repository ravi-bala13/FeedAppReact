require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth2").Strategy;

const { uuid } = require("uuidv4");

const User = require("../models/user.model");
const { BACKEND_URL } = require("../utils/constants");
const passport = require("passport");

const jwt = require("jsonwebtoken");
const newToken = (user) => {
  return jwt.sign({ user: user }, process.env.JWT_ACCESS_KEY || JWT_ACCESS_KEY);
};

// Google OAuth strategy configuration
const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${BACKEND_URL}auth/google/callback`,
  userProfileURL: "https://**www**.googleapis.com/oauth2/v3/userinfo",
  passReqToCallback: true,
};
/**
 * using google strategy
 */

passport.use(
  new GoogleStrategy(googleOptions, async function (
    request,
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    // console.log("profile:", profile);
    let user = await User.findOne({ email: profile?._json?.email })

      .lean()
      .exec();

    if (!user) {
      user = await User.create({
        email: profile?._json?.email,
        password: uuid(),
      });
    }
    const token = newToken(user);
    return done(null, { user, token });
  })
);

module.exports = passport;
