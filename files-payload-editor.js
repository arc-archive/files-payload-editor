/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import { LitElement, html, css } from 'lit-element';
import { ValidatableMixin } from '@anypoint-web-components/validatable-mixin/validatable-mixin.js';
import '@advanced-rest-client/arc-icons/arc-icons.js';
import '@anypoint-web-components/anypoint-button/anypoint-button.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
let latestFile;
/**
 * `<files-payload-editor>` A request body editor to add files as a payload.
 *
 * With this element the user can select single file that will be used in the request body.
 *
 * The element can be used in forms when `iron-form` is used. It contains validation methods to
 * validate user input.
 *
 * ### Example
 *
 * ```html
 * <files-payload-editor></files-payload-editor>
 * ```
 *
 * @customElement
 * @demo demo/index.html
 * @appliesMixin ValidatableMixin
 * @memberof UiElements
 */
class FilesPayloadEditor extends ValidatableMixin(LitElement) {
  static get styles() {
    return css`:host {
      display: block;
      padding: 12px 0;
    }

    .selector {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .list {
      margin: 0 0.29em;
      display: inline-block;
      margin-top: 12px;
    }

    .file-trigger {
      margin-right: 12px;
    }

    .files-counter-message {
      flex: 1;
      flex-basis: 0.000000001px;
    }

    .file-name {
      margin-left: 8px;
    }

    .card {
      display: flex;
      flex-direction: row;
      align-items: center;
    }`;
  }

  render() {
    const { hasFile, fileSize, fileName } = this;
    return html`<div class="selector">
      <anypoint-button emphasis="high" @click="${this._selectFile}" class="file-trigger">Choose a file</anypoint-button>
      ${hasFile ? html`
        <span class="files-counter-message">1 file selected, ${fileSize} bytes</span>` : undefined}
    </div>

    ${hasFile ? html`<div class="list">
      <div class="card">
        <iron-icon class="file-icon" icon="${this._computeIcon('insert-drive-file')}"></iron-icon>
        <span class="file-name">${fileName}</span>
        <anypoint-icon-button
          class="action-icon delete-icon"
          title="Clear file"
          @click="${this.removeFile}">
          <iron-icon icon="${this._computeIcon('remove-circle-outline')}"></iron-icon>
        </anypoint-icon-button>
      </div>
    </div>` : undefined}
    <input type="file" hidden @change="${this._fileObjectChanged}">`;
  }

  static get properties() {
    return {
      // Computed value, true if the control has files.
      _hasFile: {
        type: Boolean
      },
      /**
       * If set the value will be base64 encoded.
       */
      base64Encode: { type: Boolean },
      // Selected file name
      fileName: { type: String },
      // Selected file size,
      fileSize: { type: Number },
      /**
       * Value produced by this control.
       *
       * @type {Blob}
       */
      value: { },
      /**
       * Icon prefix from the svg icon set. This can be used to replace the set
       * without changing the icon.
       *
       * Defaults to `arc`.
       */
      iconPrefix: { type: String }
    };
  }
  /**
   * @return {Boolean} true if the control has files.
   */
  get hasFile() {
    return this._hasFile || false;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    const old = this._value;
    if (old === value) {
      return;
    }
    this._value = value;
    this._valueChnaged(value);
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: {
        value
      }
    }));
  }
  /**
   * @return {Function|null} Prefiously registered function, if any.
   */
  get onchange() {
    return this._onchange || null;
  }
  /**
   * Registers a callback function for `value-changed` event.
   * @param {?Function} value A function to register. Pass null to clear.
   */
  set onchange(value) {
    const key = '_onchange';
    if (this[key]) {
      this.removeEventListener('value-changed', this[key]);
    }
    if (typeof value !== 'function') {
      this[key] = null;
      return;
    }
    this[key] = value;
    this.addEventListener('value-changed', value);
  }

  constructor() {
    super();
    this.iconPrefix = 'arc';
  }
  /**
   * Returns a reference to the input element.
   *
   * @return {HTMLElement}
   */
  _getInput() {
    return this.shadowRoot.querySelector('input[type="file"]');
  }

  _valueChnaged(value) {
    if (!value) {
      return;
    }
    if (value instanceof Blob) {
      this.fileName = value.name || 'blob';
      this.fileSize = value.size;
      this._hasFile = true;
      latestFile = value;
    } else {
      this._hasFile = false;
    }
    if (!this.fileName || (!this.fileSize && this.fileSize !== 0)) {
      this._updateFileMeta(value);
      return;
    }
    let type;
    if (value.type) {
      type = value.type;
    } else {
      type = 'application/octet-stream';
    }
    setTimeout(() => this._informContentType(type));
  }
  /**
   * Updated `fileName` and `fileSize` from a base64 encoded string value
   *
   * @param {String} value File as base64 string
   */
  _updateFileMeta(value) {
    if (!value || typeof value !== 'string') {
      if (latestFile) {
        this.value = latestFile;
        return;
      }
      this._hasFile = false;
      return;
    }
    let type;
    if (value.indexOf('data:') === 0) {
      value = value.substr(5);
      const comaIndex = value.indexOf(',');
      type = value.substr(0, value.indexOf(';'));
      value = value.substr(comaIndex + 1);
    }
    let byteChars;
    try {
      byteChars = atob(value);
      this._hasFile = true;
    } catch (e) {
      if (latestFile) {
        this.value = latestFile;
        return;
      }
      this._hasFile = false;
    }
    type = type || 'application/octet-stream';
    this._informContentType(type);
    this.fileName = 'blob';
    this.fileSize = byteChars ? byteChars.length : -1;
  }
  /**
   * Dispatches `content-type-changed` custom event change when a
   * file is selected.
   *
   * @param {String} ct File content type
   */
  _informContentType(ct) {
    const e = new CustomEvent('content-type-changed', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        value: ct
      }
    });
    this.dispatchEvent(e);
  }
  /**
   * A handler to choose file button click.
   * This function will find a proper input[type="file"] and programatically click on it to open
   * file dialog.
   */
  _selectFile() {
    const file = this._getInput();
    file.click();
  }

  /**
   * A handler to file change event for input[type="file"].
   * This will update files array for corresponding `this.value` array object.
   *
   * @param {Event} e Input change event
   */
  _fileObjectChanged(e) {
    this._setFileValue(e.target.files[0]);
    this._getInput().blur();
  }
  /**
   * Sets the `value` depending on `base64Encode` option.
   *
   * @param {Blob} file A file to set as a value.
   */
  _setFileValue(file) {
    if (!file) {
      this.value = undefined;
      return;
    }
    if (!this.base64Encode) {
      this.value = file;
      return;
    }
    const reader = new FileReader();
    const context = this;
    reader.addEventListener('load', function() {
      const typed = new Uint8Array(reader.result);
      const result = btoa(String.fromCharCode.apply(null, typed));
      context.value = result;
      context.__informBase64Conversion();
    });
    reader.addEventListener('error', function() {
      context.value = 'Invalid file';
      context.__informBase64Conversion();
    });
    reader.readAsArrayBuffer(file);
  }
  // Send an event when base64 conversion ends
  __informBase64Conversion() {
    const e = new CustomEvent('base64-value-set', {
      bubbles: false,
      cancelable: true
    });
    this.dispatchEvent(e);
  }
  // Overides ValidatableMixin
  _getValidity() {
    return this._computeHasFile(this.value);
  }

  _computeHasFile(file) {
    if (!file) {
      return false;
    }
    const enc = this.base64Encode;
    if (enc) {
      return !!file;
    }
    return file instanceof Blob;
  }
  /**
   * Removed added file from the editor.
   */
  removeFile() {
    this.value = undefined;
    this.fileName = undefined;
    this.fileSize = undefined;
    this._hasFile = (false);
    const file = this._getInput();
    file.value = '';
  }
  /**
   * The element keeps in memory last selected file so it can be restored.
   * This removes reference to the object so it can be GSd.
   */
  clearCache() {
    latestFile = undefined;
  }

  _computeIcon(name) {
    let icon = '';
    if (this.iconPrefix) {
      icon = this.iconPrefix + ':';
    }
    return icon + name;
  }
}
window.customElements.define('files-payload-editor', FilesPayloadEditor);
