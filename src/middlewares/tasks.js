const Joi = require('joi')
const { Users } = require('../models')

const taskSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Field title is required',
        'any.required': 'Field title cannot be empty'
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Field description is required',
        'any.required': 'Field description cannot be empty'
    }),
    user_id: Joi.number().integer().required().messages({
        'number.base': 'Field user_id must be a number.',
        'number.integer': 'Field user_id must be an integer.',
        'any.required': 'Field user_id cannot be empty.',
    }),
    status: Joi.string().messages({
        'any.required': 'Field status cannot be empty'
    }),
    categori_id: Joi.number().integer().messages({
        'number.base': 'Field categori_id must be a number.',
        'number.integer': 'Field categori_id must be an integer.',
        'any.required': 'Field categori_id cannot be empty.',
    })
})

exports.tasksValidation = async (req, res, next) => {
    const { error } = taskSchema.validate(req.body)

    if (error) {
        const message = req.params.id ? "Failed update task" : "Success sctore task"
        return res.status(400).json({ message, error: error.details[0].message })
    }

    const { user_id } = req.body
    const user = await Users.findByPk(user_id)
    if (!user) {
        return res.status(400).json({ error: "Invalid user_id, User doesn't exist" })
    }

    next()
}