const { Users, Tasks, Categories } = require('../models')

// index
const index = async (req, res) => {
    try {
        // define params per_page and page
        const query = req.query
        const limit = !query.per_page ? 10 : parseInt(query.per_page)
        const page = !query.page ? 1 : parseInt(query.page)

        // calculate for offset
        const offset = page === 1 ? 0 : (page-1)*limit
    
        const { count, rows } = await Users.findAndCountAll({
            order: [
                ['id', 'DESC']
            ],
            offset, limit
        })

        const prepare = {
            data: rows,
            total: count,
            per_page: limit,
            page: page
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
            const user = await Users.findByPk(id, {
                include: {
                    model: Tasks,
                    as: 'tasks',
                    attributes: ['title', 'status'],
                    include: {
                        model: Categories,
                        as: 'categori',
                        attributes: ['name']
                    }
                }
            })

            if (user) {
                const prepare = {
                    data: user,
                    message: "Success show user"
                }
                res.status(200).json(prepare)
            } else {
                res.status(404).json({
                    message: "Failed show user",
                    error: "User doesn't exist"
                })
            }
        } else {
            res.status(400).json({
                message: "Failed show user",
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
        const store = await Users.create(body)

        const prepare = {
            data: store,
            message: "Success store user"
        }

        res.status(200).json(prepare)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const body = req.body
        const update = await Users.update(body, {
            where: {
                id: req.params.id
            }
        })

        if (update == 0) {
            res.status(404).json({
                message: "Failed update user",
                error: "User doesn't exist"
            });
        } else {
            const prepare = {
                data: body,
                message: "Success update user"
            }
            res.status(200).json(prepare);
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

const destroy = async (req, res) => {
    try {
        const destroy = await Users.destroy({
            where: {
                id: req.params.id
            }
        })

        if (destroy === 0) {
            res.status(400).json({
                message: "Failed destroy user",
                error: "User doesn't exist"
            })
        } else {
            res.status(200).json({
                message: "Success destroy user"
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