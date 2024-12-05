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
    
        const { count, rows } = await Categories.findAndCountAll({
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
            const categories = await Categories.findByPk(id, {
                include: [
                    {
                        model: Tasks,
                        as: 'tasks',
                        attributes: ['title', 'status']
                    },
                    {
                        model: Users,
                        as: 'user',
                        attributes: ['fullname']
                    }
                ]
            })

            if (categories) {
                const prepare = {
                    data: categories,
                    message: "Success show categories"
                }
                res.status(200).json(prepare)
            } else {
                res.status(404).json({
                    message: "Failed show categories",
                    error: "Categories doesn't exist"
                })
            }
        } else {
            res.status(400).json({
                message: "Failed show categories",
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
        const store = await Categories.create(body)

        const prepare = {
            data: store,
            message: "Success store categories"
        }

        res.status(200).json(prepare)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const body = req.body
        const update = await Categories.update(body, {
            where: {
                id: req.params.id
            }
        })

        if (update == 0) {
            res.status(404).json({
                message: "Failed update categories",
                error: "Categories doesn't exist"
            });
        } else {
            const prepare = {
                data: body,
                message: "Success update categories"
            }
            res.status(200).json(prepare);
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

const destroy = async (req, res) => {
    try {
        const destroy = await Categories.destroy({
            where: {
                id: req.params.id
            }
        })

        if (destroy === 0) {
            res.status(400).json({
                message: "Failed destroy categories",
                error: "Categories doesn't exist"
            })
        } else {
            res.status(200).json({
                message: "Success destroy categories"
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