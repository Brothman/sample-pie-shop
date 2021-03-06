# Benji Notes

## New NPM Packages

I installed axios to send the form data to our backend, i.e. 'npm install --s axios'.

## Client Updates

### Client Styles

I created a new file called `product-generator.css` in `src/client/styles` to style the Product Generation form.

In `src/client/js/app.js`, I imported the new css file. 

I edited `src/client/styles/product.css` to style the 'Show Product JSON' button.

### Client Javascript

In `src/client/js/home.js`, I wrote logic to grab form data, send the data to the backend,
and re-direct the client URL after the server returns the URL for the newly generated product. 

In `src/client/js/product.js`, I wrote logic to register the 'Show Product JSON' button click,
and display the hidden product data returned from the server. 

### Client Routing

I edited the constructor of `src/client/js/router.js` to add a "random" subdomain whenever
anyone visits the website without a subdomain. **We need to change the `baseURL`to the
URL of the production website.**

## Server Updates

### Server Routing

In `src/server/routes`, I edited `index.js` and added `create-product.js` and `verification.js`.
* `verification.js` offers the HTML for Merchant Center's web crawlers to verify this is a valid website.
* `create-product.js` receives the client product data, generates a new product, and submits it to 
the database (database submission still needs to be done).

I edited `src/server/routes/router.js` to import and enable the `verification` and `create-product` routes.
* I placed the verification route before the product :id wildcard route to ensure the verification route works.
* I added the '*' wildcard to all routes. I hope that will work for subdomains, however we need to test in
production. **We still need to add the wildcard to the regular expression for index.html**

I edited `src/server/routes/index.js` to have an empty array for `homeCategories` and `homeProducts`.
**Comment out my code and comment in the original code to get the website to work in production.**

### Server-side HTML

In `src/server/services/templates/partials`, I added `home-add-product.hbs` to generate the HTML
to create a new product.

In `src/server/services/templates/views`, I edited `index.hbs` to add the new `home-add-product` partial
to the end of the page.

In `src/server/services/templates/views`, I edited `product.hbs` to add the 'Show Product JSON' button
and the `pre` tag to display the Content API JSON data.

# Online store PWA sample

[![Build Status](https://travis-ci.org/GoogleChromeLabs/sample-pie-shop.svg?branch=master)](https://travis-ci.org/GoogleChromeLabs/sample-pie-shop)

This sample demonstrates best practices for e-commerce websites.

It also demonstrates some useful features enabled by new technologies and APIs
on the web.

## Development

Create a fork of the original project
[GoogleChromeLabs/sample-pie-shop](https://github.com/GoogleChromeLabs/sample-pie-shop)
and clone to your development environment.

### Install dependencies

Change to the top level project directory run the following:

```sh
cd sample-pie-shop
npm ci
```

*Note:* This will install the dependencies as per the `package-lock.json`
whereas `npm install` will update them. If you need to update the dependencies,
submit the updated `package-lock.json` as a new PR.

### Run the development server

The project uses [Firebase Cloud
Firestore](https://firebase.google.com/docs/firestore/) for product data. You
will need to create a project and download the JSON configuration for the Admin
SDK. You can do this in the [Firebase
console](https://console.firebase.google.com/project/YOUR-PROJECT-NAME/settings/serviceaccounts/adminsdk)
using the **Generate new private key** button. Save this to
`src/data/firebase-admin-key.json`.

The `start:dev` target will build the site and serve it locally while watching
for any changes. Once the script completes the initial build, the site should be
available at [localhost:3000](http://localhost:3000/).

```sh
npm run start:dev
```

*Note:* You can override the default location for the config file by specifying
a path in the `FB_KEYS` environment variable.

```sh
FB_KEYS=/path/to/alternative-key.json npm run start:dev
```

Check
[`package.json`](https://github.com/GoogleChromeLabs/sample-pie-shop/blob/master/package.json)
for the other build targets.

### Import data to the database

Sample data for products, product categories and homepage content is stored as
JSON in the [`/src/data`](/src/data) directory.

You can import (upload) this data to your remote Firestore database by running
the following Node scripts from the
[`/tools`](https://github.com/GoogleChromeLabs/sample-pie-shop/tree/master/tools)
directory:

```sh
cd tools
node --experimental-modules import_home.mjs
node --experimental-modules import_products.mjs
```

This project uses ECMAScript Modules, which currently require the `--experimental-modules` flag.

Check your version of Node using `node -v` and update to the LTS or Current version if necessary. The import code above has been tested in versions 10.15.3 and 11.14.0.

### Create a search index from your own data

This demo uses the [Algolia](https://www.algolia.com) search engine. This is free for open source projects with up to 100k records and 200k operations monthly.

The search functionality provided by this sample will work as-is for the product data in [`/src/data/products.json`](/src/data/products.json). In other words, if you're happy to use the sample product data as it is, you don't need to do anything!

However, if you want to use different product data, you will need to create your own Algolia application, then build a search index from your data. The _index.js_ application in the [`/tools/algolia`](/tools/algolia) directory enables you to create an Algolia search index from a Firebase data source. It can also be used to monitor updates to your data, and update the Algolia search index in response.

Follow these steps to build a search index if you want to use your own data:

1. Follow the [Algolia tutorial](https://www.algolia.com/doc/tutorials/indexing/3rd-party-service/firebase-algolia/) to create a search application.
2. Follow the tutorial instructions to create a `.env` configuration file in the [`/tools/algolia`](tools/algolia) directory.
3. Run `node index.js` in the same directory to get data from Firebase and create the index for the Algolia app.
4. Update the `APP_ID` (Algolia app) and `API_KEY` (search key) values in [/src/services/algolia.js](src/services/algolia.js).

### Images

Images are served from
[Cloudinary](https://res.cloudinary.com/pieshop/f_auto,dpr_auto,q_auto:eco/w_500/GGOEYXXX0938.png)
and displayed responsively using the `srcset` and `sizes` attributes in
combination with
[`lazy-img`](https://github.com/GoogleChromeLabs/sample-pie-shop/blob/master/src/client/js/lazy-img.js)
for lazy loading.

## Deploying

See [`DEPLOY.md`](DEPLOY.md).
