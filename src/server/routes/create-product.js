const productNameToUrl = {
  "YouTube Icon Pullover Black": "YouTube+Icon+Pullover+Black+Custom",
  "Google Light Pen Yellow": "Google+Light+Up+Pen+Yellow+Custom",
  "Google Tee Yellow": "Google+Tee+Yellow+Custom",
  "Google Snapback Black Cap": "Google+Snapback+Black+Cap+Custom",
  "Google Twill Cap": "Google+Twill+Cap+Custom",
  "Android 25 oz Gear Cap Bottle White": "Android+Gear+Cap+Bottle+White+Custom"
}

//for the image
const productNameToID = {
  "YouTube Icon Pullover Black": "GGOEYXXX0938",
  "Google Light Pen Yellow": "GGOEGOAT090299",
  "Google Tee Yellow": "GGOEGXXX0905",
  "Google Snapback Black Cap": "GGOEGAPB087899",
  "Google Twill Cap": "GGOEGHPB071610",
  "Android 25 oz Gear Cap Bottle White": "GGOEADHQ098399"
}

function createCustomId(){
  return Math.floor(Math.random() * 100000000);
}

const createProduct = {
  post: (req, res, next) => {
    // create the product, then redirect to the products url
    const productData = req.body;
    const customId = createCustomId();
    productData.url = productNameToUrl[productData.name] + "+" + customId;
    productData.id = productNameToID[productData.name] + "-" + customId;
    console.log(productData); // we can remove this console.log
    // addProductData(productData) // firebase step
    res.send(productData.url); // this step tells the client the new URL to go to
  },
};

export default createProduct;
