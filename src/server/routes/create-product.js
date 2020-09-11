const templateProductDataToUrl = {
  'YouTube Icon Pullover Black': 'YouTube+Icon+Pullover+Black+Custom',
  'Google Light Pen Yellow': 'Google+Light+Up+Pen+Yellow+Custom',
  'Google Tee Yellow': 'Google+Tee+Yellow+Custom',
  'Google Snapback Black Cap': 'Google+Snapback+Black+Cap+Custom',
  'Google Twill Cap': 'Google+Twill+Cap+Custom',
  'Android 25 oz Gear Cap Bottle White': 'Android+Gear+Cap+Bottle+White+Custom',
};

// for the image
const templateProductDataToID = {
  'YouTube Icon Pullover Black': 'GGOEYXXX0938',
  'Google Light Pen Yellow': 'GGOEGOAT090299',
  'Google Tee Yellow': 'GGOEGXXX0905',
  'Google Snapback Black Cap': 'GGOEGAPB087899',
  'Google Twill Cap': 'GGOEGHPB071610',
  'Android 25 oz Gear Cap Bottle White': 'GGOEADHQ098399',
};

const createProduct = {
  post: (req, res, next) => {
    // create the product, then redirect to the products url
    const productData = req.body;
    productData.url = templateProductDataToUrl[productData.template];
    productData.id = templateProductDataToID[productData.template];
    console.log(productData); // we can remove this console.log
    // addProductData(productData) // firebase step
    res.send(productData.url); // this step tells the client the new URL to go to, would be done in the callback
    // to the firebase creation step
  },
};

export default createProduct;
