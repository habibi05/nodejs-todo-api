const Joi = require('joi')

const userSchema = Joi.object({
    username: Joi.string().required().messages({
        'string.empty': 'Field username is required',
        'any.required': 'Field username cannot be empty'
    }),
    fullname: Joi.string().required().messages({
        'string.empty': 'Field fullname is required',
        'any.required': 'Field fullname cannot be empty'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Field email is required',
        'any.required': 'Field email cannot be empty',
        'string.email': 'Field email must be a valid email'
    })
})

exports.usersValidation = (req, res, next) => {
    const { error } = userSchema.validate(req.body)

    if (error) {
        const message = req.params.id ? "Failed update user" : "Success sctore user"
        return res.status(400).json({ message, error: error.details[0].message })
    }

    next()
}