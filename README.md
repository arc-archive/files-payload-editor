# DEPRECATED

This component is deprecated. The code base has been moved to [body-editor](https://github.com/advanced-rest-client/body-editor) module.

-----

`<files-payload-editor>` A request body editor to add files as a payload.
With this element the user can select single file that will be used in the request body.

The element can be used in forms when `iron-form` is used. It contains validation methods to
validate user input.

## Usage

### Installation
```
npm install --save @advanced-rest-client/files-payload-editor
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/files-payload-editor/files-payload-editor.js';
    </script>
  </head>
  <body>
    <files-payload-editor></files-payload-editor>
    <script>
    {
      document.querySelector('files-payload-editor').onchange = (e) => {
        console.log(e.target.value); // or e.detail.value
      };
    }
    </script>
  </body>
</html>
```

### In a LitElement template

```javascript
import { LitElement, html } from 'lit-element';
import '@advanced-rest-client/files-payload-editor/files-payload-editor.js';

class SampleElement extends LitElement {
  render() {
    return html`
    <files-payload-editor @value-changed="${this._fileChanged}"></files-payload-editor>
    `;
  }

  _fileChanged(e) {
    this.body = e.detail.value;
  }
}
customElements.define('sample-element', SampleElement);
```

## Development

```sh
git clone https://github.com/advanced-rest-client/files-payload-editor
cd files-payload-editor
npm install
```

### Running the demo locally

```sh
npm start
```

### Running the tests

```sh
npm test
```
