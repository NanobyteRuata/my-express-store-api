const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const { roles } = require('../util/access_control')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.signup = async (req, res, next) => {
    try {
        const { email, password, role } = req.body

        if (role == 'admin') {
            const admin = await User.findOne({ role: 'admin' });
            if (admin) {
                res.status(401).json({
                    error: "Admin already exists"
                });
            }
        }

        const user = await User.findOne({ email });
        if (user) {
            res.status(401).json({
                error: "Email already exists"
            });
        } else {
            const hashedPassword = await hashPassword(password);
            const newUser = new User({ email, password: hashedPassword, role: role || "user", name: req.body.name, phone: req.body.phone, address: req.body.address });
            const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: "1d"
            });
            newUser.accessToken = accessToken;
            await newUser.save();
            res.json({
                data: newUser,
                accessToken
            })
        }

    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

exports.adminExist = async (req, res, next) => {
    try {
        const admin = await User.findOne({ role: 'admin' });
        res.json({
            admin_exists: admin ? true : false
        });
    } catch {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

exports.checkToken = async (req, res, next) => {
    try {
        res.json({
            message: "Token is valid",
            is_valid: true
        });
    } catch {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

exports.redirect = (req, res, next) => {
    res.redirect(req.query.url);
}

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body; 

        var mail = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_ADDRESS,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: "No user with this email"
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_JWT_SECRET, { expiresIn: '20m' });
        const mailOptions = {
            from: process.env.GMAIL_ADDRESS,
            to: email,
            subject: 'Reset Password',
            html: `<h1>Please click the link below to set new password</h1>
                    <p><a href="http://www.remruatthanga.com/mystore/api/redirect?url=mystoreadmin://com.remruatthanga.my_store_admin/reset_password?token=${token}">Reset password</a></p>
            `
        }

        user.updateOne({ reset_link: token }, (err, success) => {
            if (err) {
                res.status(500).json({
                    error: "Internal server error"
                })
            } else {
                mail.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('error is: ' + error);
                        res.status(500).json({
                            error: "Internal server error"
                        })
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.status(200).json({
                            message: "Email sent successfully"
                        })
                    }
                });
            }
        });
    } catch {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({
                error: "Email already exists"
            });
            return;
        }
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) {
            res.status(401).json({
                error: "Incorrect password"
            });
            return;
        }
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { accessToken })
        res.status(200).json({
            data: user,
            accessToken
        })
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        data: users
    });
}

exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params.user_id;
        const user = await User.findById(userId);
        if (!user) return next(new Error('User does not exist'));
        res.status(200).json({
            data: user
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const update = req.body
        const userId = req.params.user_id;
        update.updated_at = (new Date()).toISOString();
        await User.findByIdAndUpdate(userId, update);
        const user = await User.findById(userId)
        res.status(200).json({
            data: user,
            message: 'User has been updated'
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.user_id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({
            data: null,
            message: 'User has been deleted'
        });

        //TODO: Use for production
        // User.findOne({
        //     _id: req.params.user_id
        // }, function (err, user) {
        //     if (err)
        //         res.json({
        //             status: "error",
        //             message: err,
        //         });
        //     else {
        //         user.is_active = false;
        //         user.inactive_at = (new Date()).toISOString();
        //         user.save(function (err) {
        //             if (err)
        //                 res.json({
        //                     status: "error",
        //                     message: err
        //                 });
        //             else
        //                 res.json({
        //                     status: "success",
        //                     message: 'Product deleted.'
        //                 });
        //         });
        //     }
        // });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            res.status(500).json({
                error: "Internal server error"
            })
        }
    }
}

exports.allowIfLoggedin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET, (err, usr) => {
                if (err) {
                    return res.status(401).json({
                        error: "Invalid token"
                    });
                }
                User.findById(usr.userId, (err, user) => {
                    req.user = user;
                    next();
                });
            });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        return res.status(401).json({
            error: "You need to be logged in to access this route"
        });
    }
}