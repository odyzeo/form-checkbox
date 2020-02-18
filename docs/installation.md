# Installation

## Direct Download / CDN

https://unpkg.com/form-checkbox/dist/form-checkbox 

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/form-checkbox@{{ $version }}/dist/form-checkbox.js
 
Include form-checkbox after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/form-checkbox/dist/form-checkbox.js"></script>
```

## NPM

```sh
$ npm install form-checkbox
```

## Yarn

```sh
$ yarn add form-checkbox
```

When used with a module system, you must explicitly install the `form-checkbox` via `Vue.use()`:

```javascript
import Vue from 'vue'
import form-checkbox from 'form-checkbox'

Vue.use(form-checkbox)
```

You don't need to do this when using global script tags.

## Dev Build

You will have to clone directly from GitHub and build `form-checkbox` yourself if
you want to use the latest dev build.

```sh
$ git clone https://github.com//form-checkbox.git node_modules/form-checkbox
$ cd node_modules/form-checkbox
$ npm install
$ npm run build
```

