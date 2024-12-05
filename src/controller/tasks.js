const { Op } = require('sequelize')
const { Tasks, Users, Categories } = require('../models')

// index
const index = async (req, res) => {
    try {
        // define params per_page and page
        const { per_page, page, user_id, status } = req.query
        const limit = !per_page ? 10 : parseInt(per_page)
        const selfPage = !page ? 1 : parseInt(page)

        // calculate for offset
        const offset = selfPage === 1 ? 0 : (selfPage-1)*limit
    
        // filter
        let filter = {}

        if (user_id) {
            filter['user_id'] = JSON.parse("[" + user_id + "]")
        }

        if (status) {
            filter['status'] = status
        }

        // const dataTasks = await Tasks.findAll({
        const { count, rows } = await Tasks.findAndCountAll({
            where: filter,
            include: {
                model: Users,
                as: 'user',
                attributes: ['fullname']
            },
            order: [
                ['id', 'DESC']
            ],
            offset, limit
        })

        const prepare = {
            data: rows,
            total: count,
            per_page: limit,
            page: selfPage
        }

        res.status(200).json(prepare)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        if (id) {
            const task = await Tasks.findByPk(id, {
                include: [
                    {
                        model: Users,
                        as: 'user',
                        attributes: ['fullname']
                    },
                    {
                        model: Categories,
                        as: 'categori',
                        attributes: ['name']
                    }
                ]
            })

            if (task) {
                const prepare = {
                    data: task,
                    message: "Success show task"
                }
                res.status(200).json(prepare)
            } else {
                res.status(404).json({
                    message: "Failed show task",
                    error: "task doesn't exist"
                })
            }
        } else {
            res.status(400).json({
                message: "Failed show task",
                error: "Parameter not valid"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const store = async (req, res) => {
    try {
        const body = req.body
        const store = await Tasks.create(body)

        const prepare = {
            data: store,
            message: "Success store task"
        }

        res.status(200).json(prepare)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const body = req.body
        const update = await Tasks.update(body, {
            where: {
                id: req.params.id
            }
        })

        if (update == 0) {
            res.status(404).json({
                message: "Failed update task",
                error: "Task doesn't exist"
            });
        } else {
            const prepare = {
                data: body,
                message: "Success update task"
            }
            res.status(200).json(prepare);
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

const destroy = async (req, res) => {
    try {
        const destroy = await Tasks.destroy({
            where: {
                id: req.params.id
            }
        })

        if (destroy === 0) {
            res.status(400).json({
                message: "Failed destroy task",
                error: "Task doesn't exist"
            })
        } else {
            res.status(200).json({
                message: "Success destroy task"
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}