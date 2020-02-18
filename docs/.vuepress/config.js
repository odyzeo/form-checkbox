module.exports = {
  plugins: [
    require('./plugin.js')
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'FormCheckbox',
      description: 'FormCheckbox for Vue.js'
    }
  },
  themeConfig: {
    repo: 'Odyzeo &lt;tomas.zamba@odyzeo.com, peter.baricic@odyzeo.com&gt; (https://odyzeo.com)/form-checkbox',
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: [{
          text: 'Release Notes',
          link: 'https://github.com/Odyzeo &lt;tomas.zamba@odyzeo.com, peter.baricic@odyzeo.com&gt; (https://odyzeo.com)/form-checkbox/releases'
        }],
        sidebar: [
          '/installation.md',
          '/started.md',
        ]
      }
    }
  }
}
