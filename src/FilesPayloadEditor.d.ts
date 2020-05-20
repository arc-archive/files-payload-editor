import {LitElement, TemplateResult} from 'lit-element';
import {ValidatableMixin} from '@anypoint-web-components/validatable-mixin/validatable-mixin.js';

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
 */
export class FilesPayloadEditor {
  readonly hasFile: Boolean;

  /**
   * Value produced by this control.
   */
  value: Blob|File;
  onchange: EventListener;

  /**
   * Computed value, true if the control has files.
   */
  _hasFile: boolean|undefined;

  /**
   * If set the value will be base64 encoded.
   */
  base64Encode: boolean|undefined;

  /**
   * Selected file name
   */
  fileName: string|undefined;

  /**
   * Selected file size,
   */
  fileSize: number|undefined;

  render(): TemplateResult;

  /**
   * Returns a reference to the input element.
   */
  _getInput(): HTMLInputElement;
  _valueChnaged(value: Blob|File): void;

  /**
   * Updated `fileName` and `fileSize` from a base64 encoded string value
   *
   * @param value File as base64 string
   */
  _updateFileMeta(value: string): void;

  /**
   * Dispatches `content-type-changed` custom event change when a
   * file is selected.
   *
   * @param ct File content type
   */
  _informContentType(ct: String): void;

  /**
   * A handler to choose file button click.
   * This function will find a proper input[type="file"] and programatically click on it to open
   * file dialog.
   */
  _selectFile(): void;

  /**
   * A handler to file change event for input[type="file"].
   * This will update files array for corresponding `this.value` array object.
   *
   * @param e Input change event
   */
  _fileObjectChanged(e: Event): void;

  /**
   * Sets the `value` depending on `base64Encode` option.
   *
   * @param file A file to set as a value.
   */
  _setFileValue(file: Blob|File): void;

  /**
   * Send an event when base64 conversion ends.
   */
  __informBase64Conversion(): void;

  /**
   * Overides ValidatableMixin
   */
  _getValidity(): boolean;
  _computeHasFile(file: Blob|File): boolean;

  /**
   * Removed added file from the editor.
   */
  removeFile(): void;

  /**
   * The element keeps in memory last selected file so it can be restored.
   * This removes reference to the object so it can be GSd.
   */
  clearCache(): void;
}

export declare interface FilesPayloadEditor extends ValidatableMixin, LitElement {

}
