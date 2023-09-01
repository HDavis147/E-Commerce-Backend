const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  await Category.findAll({
    attributes: ['id', 'categoery_name'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
    .then((categoryInfo) => {res.json(categoryInfo)})
    .catch ((err) => {res.json(err)})
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  await Category.findByPk(req.params.id, {
    attributes:['id', 'category_name'],
    include: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    }]
  })
    .then((categorySingle) => {res.json(categorySingle)})
    .catch ((err) => {res.json(err)})
});

router.post('/', async (req, res) => {
  // create a new category
  await Category.create(req.body)
    .then((categoryCreated) => res.status(200).json(categoryCreated))
    .catch((err) => {res.status(400).json(err)})
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: {id: req.params.id},
})
.then((categoryUpdated) => res.status(200).json(categoryUpdated))
.catch((err) => res.json(err))
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
    where: {id: req.params.id}
  })
  .then((deletedCategory) => res.status(200).res.json('Category has been deleted: \n' + deletedCategory))
  .catch((err) => res.json(err))
});

module.exports = router;
