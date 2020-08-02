require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-token-google2").Strategy;
const User = require("./models/user");

// Verify that the required environment variables exist
(() => {
    const REQUIRED_ENV_VARS = ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"];
    REQUIRED_ENV_VARS.forEach((evar) => {
        if (!process.env[evar]) {
            console.log(`Missing environment variable ${evar}`);
            process.exit(1);
        }
    });
})();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
        async (accessToken, refreshToken, profile, done) => {
            let user;
            try {
                user = await User.findOne({ google_id: profile.id });
                if (user) {
                    return done(null, user);
                }
                user = new User({ google_id: profile.id, email: profile.emails[0].value });
                await user.save();
                return done(null, user);
            } catch (error) {
                return done(error, false, error.message);
            }
        },
    ),
);