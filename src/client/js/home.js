/**
 *
 *  Online store PWA sample.
 *  Copyright 2017 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

import pageInit from './page-init';
import axios from 'axios';

function initializeHomePage() {
  const submitProductButton = document.querySelector('#submit-product');

  submitProductButton.addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.querySelector('#template').value;
    const channel = document.querySelector('#channel').value;
    const language = document.querySelector('#language').value;
    const country = document.querySelector('#country').value;
    const price = document.querySelector('#price').value;
    const description = document.querySelector('#description').value;
    const keywords = document.querySelector('#keywords').value;
    const category = document.querySelector('#add-category').value;
    const subcategory = document.querySelector('#add-subcategory').value;
    const brand = document.querySelector('#brand').value;

    const data = {
      name,
      channel,
      language,
      country,
      price,
      description,
      keywords,
      category,
      subcategory,
      brand,
    };

    // these are the three blank text fields currently
    if (!price || !description || !keywords) {
      alert('Please fill out every field to be able create a new product.');
    } else if (isNaN(price) && price != '') {
      alert('Please fill out a valid number for the price.');
    } else {
      axios.post('/create-product', data).then((response) => {
        console.log(response);
        const newUrl = response.data;
        window.location.href = newUrl;
      })
        .catch((e) => {
          console.error(e);
          console.log('Unfortunately your request could not be completed at this time. Please try again later.');
          alert('Unfortunately your request could not be completed at this time. Please try again later.');
        });
    }
  });

  pageInit();
  // TODO: Add Code dedicated to home page only.
}

export default function init() {
  initializeHomePage();
}
