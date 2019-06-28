const router = require('express').Router();
const multer = require('multer');

const Product = require('../controllers/product');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './uploads/');
  },
  filename(req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, callback) => {
  const imageMIMETypes = [
    'image/jpeg',
    'image/png'
  ];

  const isValidMIMEType = imageMIMETypes.includes(file.mimetype);

  callback(null, isValidMIMEType);
};

const upload = multer({ 
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter
});

router.get('/', Product.getAll);

router.get('/:id', Product.getAll);

router.post('/', checkAuth, upload.single('image'), Product.create);

router.patch('/:id', checkAuth, Product.update);

router.delete('/:id', checkAuth, Product.delete);

module.exports = router;