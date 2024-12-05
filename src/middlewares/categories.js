const Joi = require('joi')
const { Users } = require('../models')

const categoriesSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Field name is required',
        'any.required': 'Field name cannot be empty'
    }),
    user_id: Joi.number().integer().required().messages({
        'number.base': 'Field user_id must be a number.',
        'number.integer': 'Field user_id must be an integer.',
        'any.required': 'Field user_id cannot be empty.',
    })
})

exports.categoriesValidation = async (req, res, next) => {
    const { error } = categoriesSchema.validate(req.body)

    if (error) {
        const message = req.params.id ? "Failed update categories" : "Success sctore categories"
        return res.status(400).json({ message, error: error.details[0].message })
    }

    const { user_id } = req.body
    const user = await Users.findByPk(user_id)
    if (!user) {
        return res.status(400).json({ error: "Invalid user_id, User doesn't exist" })
    }

    next()
}