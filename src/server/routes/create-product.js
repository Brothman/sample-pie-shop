import {getProduct, addProduct} from '../get-data';

const productNameToUrl = {
  'YouTube Icon Pullover Black': 'YouTube+Icon+Pullover+Black',
  'Google Light Pen Yellow': 'Google+Light+Up+Pen+Yellow',
  'Google Tee Yellow': 'Google+Tee+Yellow',
  'Google Snapback Black Cap': 'Google+Snapback+Black+Cap',
  'Google Twill Cap': 'Google+Twill+Cap',
  'Android 25 oz Gear Cap Bottle White': 'Android+Gear+Cap+Bottle+White',
};

// for the image
const productNameToID = {
  'YouTube Icon Pullover Black': 'GGOEYXXX0938',
  'Google Light Pen Yellow': 'GGOEGOAT090299',
  'Google Tee Yellow': 'GGOEGXXX0905',
  'Google Snapback Black Cap': 'GGOEGAPB087899',
  'Google Twill Cap': 'GGOEGHPB071610',
  'Android 25 oz Gear Cap Bottle White': 'GGOEADHQ098399',
};

function createCustomId() {
  return Math.floor(Math.random() * 100000000);
}

// Minium required for:
//  'YouTube Icon Pullover Black'
//  'Google Light Pen Yellow'
//  'Google Tee Yellow'
//  'Google Snapback Black Cap'
//  'Google Twill Cap'
//  'Android 25 oz Gear Cap Bottle White'
const categoryToSubCategory = {
  'apparel': {
    'apparel': '166', // 166 - Apparel & Accessories
    'women\'s-T-Shirts': '212', // 212 - Apparel & Accessories > Clothing > Shirts & Tops
    'headgear': '173', // 173 - Apparel & Accessories > Clothing Accessories > Hats
  },
  'accessories': {
    'accessories': '8', // 8 - Arts & Entertainment
  },
  'bags': {
    'bags': '100', // 100 - Luggage & Bags > Backpacks
  },
  'office': {
    'office': '922', // 922 - Office Supplies
    'writing instruments': '977', // 977 - Office Supplies > Office Instruments > Writing & Drawing Instruments
  },
  'drinkware': {
    'drinkware': '2920', // 2920 - Home & Garden > Kitchen & Dining > Food & Beverage Carriers
  },

};

const getGoogleProductCategory = (category, subCategory) => {
  // Support a subset of product categories, return empty string if missing
  const subCategoryToGPC = categoryToSubCategory[category];
  if (subCategoryToGPC) {
    const gpc = subCategoryToGPC[subCategory];
    if (gpc) {
      return gpc;
    }
  }
  return '';
};

const validateProductData = (pd) => {
  // Be explicit about fields to ensure the data is validated
  const fields = [
    'id',
    'name',
    'description',
    'features',
    'price',
    'keywords',
    'url',
    'category',
    'subcategory',
    'brand',
  ];

  const valid = fields.map((field) => (pd[field] && typeof pd[field] === 'string'))
    .reduce((prev, value) => prev && value, true);
  if (!valid) {
    return {valid: false, msg: 'Fields invalid'};
  }

  const googleProductCategory = getGoogleProductCategory(pd.category, pd.subcategory);
  if (googleProductCategory === '') {
    return {valid: false, msg: 'Categories invalid'};
  }

  const product = {
    id: pd.id,
    name: pd.name,
    description: pd.description,
    features: pd.features,
    price: pd.price,
    keywords: pd.keywords,
    url: pd.url,
    category: pd.category,
    subcategory: pd.subcategory,
    brand: pd.brand,
    googleProductCategory: googleProductCategory,
  };

  return {valid: true, msg: 'ok', product: product};
};
/*
const runProductDataTests = () => {
  // DEBUG ONLY. Remove in prod
  const testProductEmpty = {};

  const testProductMissingFields = {
    id: '1',
    name: '2',
    description: '3',
    features: '4',
    price: '5',
  };

  const testProductAllFields = {
    id: '1',
    name: '2',
    description: '3',
    features: '4',
    price: '5',
    keywords: '6',
    url: '7',
    category: '8',
    subcategory: '9',
    brand: '10',
  };

  const testProductNoBrand = {
    id: 'GGOEYXXX0938',
    name: 'YouTube Icon Pullover Black',
    description: 'This YouTube pullover hoodie will keep you warm while looking stylish with the tone on tone logo.',
    features: '<p>8oz. 52% Cotton. 48% Polyester. Fleece</p>\n<p>Kangaroo pocket</p>\n<p>Matching drawcords</p>\n<p>',
    price: '59.99',
    keywords: 'YouTube Icon Pullover Black, pullover, hoodie',
    url: 'YouTube+Icon+Pullover+Black',
    category: 'apparel',
    subcategory: 'apparel',
  };

  const testProductNonString = {
    id: 'GGOEYXXX0938',
    name: 'YouTube Icon Pullover Black',
    description: 'This YouTube pullover hoodie will keep you warm while looking stylish with the tone on tone logo.',
    features: '<p>8oz. 52% Cotton. 48% Polyester. Fleece</p>\n<p>Kangaroo pocket</p>\n<p>Matching drawcords</p>\n<p>',
    price: 59.99,
    keywords: 'YouTube Icon Pullover Black, pullover, hoodie',
    url: 'YouTube+Icon+Pullover+Black',
    category: 'apparel',
    subcategory: 'apparel',
    brand: 'YouTube',
  };

  const testProductNoGPC = {
    id: 'GGOEYXXX0938',
    name: 'YouTube Icon Pullover Black',
    description: 'This YouTube pullover hoodie will keep you warm while looking stylish with the tone on tone logo.',
    features: '<p>8oz. 52% Cotton. 48% Polyester. Fleece</p>\n<p>Kangaroo pocket</p>\n<p>Matching drawcords</p>\n<p>',
    price: '59.99',
    keywords: 'YouTube Icon Pullover Black, pullover, hoodie',
    url: 'YouTube+Icon+Pullover+Black',
    category: 'apparel',
    subcategory: 'apparel',
    brand: 'YouTube',
  };

  const testProductExtraFields = {
    id: 'GGOEYXXX0938',
    name: 'YouTube Icon Pullover Black',
    description: 'This YouTube pullover hoodie will keep you warm while looking stylish with the tone on tone logo.',
    features: '<p>8oz. 52% Cotton. 48% Polyester. Fleece</p>\n<p>Kangaroo pocket</p>\n<p>Matching drawcords</p>\n<p>',
    price: '59.99',
    keywords: 'YouTube Icon Pullover Black, pullover, hoodie',
    url: 'YouTube+Icon+Pullover+Black',
    category: 'apparel',
    subcategory: 'apparel',
    brand: 'YouTube',
    channel: 'online',
    language: 'en',
    country: 'US',
  };

  console.log('testProductEmpty: ', validateProductData(testProductEmpty));
  console.log('testProductMissingFields: ', validateProductData(testProductMissingFields));
  console.log('testProductAllFields: ', validateProductData(testProductAllFields));
  console.log('testProductNoBrand: ', validateProductData(testProductNoBrand));
  console.log('testProductNonString: ', validateProductData(testProductNonString));
  console.log('testProductNoGPC: ', validateProductData(testProductNoGPC));
  console.log('testProductExtraFields: ', validateProductData(testProductExtraFields));
};*/
// DEBUG ONLY. Remove in prod
// runProductDataTests();


const createProduct = {
  post: (req, res, next) => {
    // create the product, then redirect to the products url
    const productData = req.body;
    productData.url = productNameToUrl[productData.name];
    productData.id = productNameToID[productData.name];

    const dbProduct = getProduct(productData.url);
    // console.log(dbProduct);
    if (!dbProduct) {
      res.status(400);
      const error = new Error('Product template is invalid');
      error.status = 400;
      next(error);
      return;
    }
    if (dbProduct.id !== productData.id) {
      res.status(400);
      const error = new Error('Product id is invalid');
      error.status = 400;
      next(error);
      return;
    }
    productData.features = dbProduct.features;

    // console.log(productData); // we can remove this console.log

    const validateResult = validateProductData(productData);
    if (!validateResult.valid) {
      res.status(400);
      const error = new Error('Product submitted is invalid');
      error.status = 400;
      next(error);
      return;
    }

    const product = validateResult.product;
    const customId = createCustomId();
    product.offerId = product.id + '-' + customId;
    product.url += '+' + customId;
    // console.log(product); // we can remove this console.log
    addProduct(product).then((addResult) => {
      res.send(product.url); // this step tells the client the new URL to go to
    });
  },
};

export default createProduct;
