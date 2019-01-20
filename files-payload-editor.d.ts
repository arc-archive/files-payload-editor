/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   files-payload-editor.html
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

/// <reference path="../polymer/types/polymer.d.ts" />
/// <reference path="../polymer/types/lib/elements/dom-if.d.ts" />
/// <reference path="../arc-icons/arc-icons.d.ts" />
/// <reference path="../paper-styles/shadow.d.ts" />
/// <reference path="../paper-button/paper-button.d.ts" />
/// <reference path="../paper-icon-button/paper-icon-button.d.ts" />
/// <reference path="../iron-validatable-behavior/iron-validatable-behavior.d.ts" />
/// <reference path="../iron-icon/iron-icon.d.ts" />

declare namespace ApiComponents {

  /**
   * `<files-payload-editor>` A request body editor to add files as a payload.
   *
   * With this element the user can select single file that will be used in the request body.
   *
   * As other payload editors it fires `payload-value-changed` custom event when value change.
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
   * ### Styling
   * `<files-payload-editor>` provides the following custom properties and mixins for styling:
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--files-payload-editor` | Mixin applied to the element | `{}`
   * `--files-payload-editor-file-item` | Mixin applied to a selected file item | `{}`
   * `--files-payload-editor-file-trigger-color` | Color of the file input | `--accent-color` or `#FF5722`
   * `--files-payload-editor-file-summary-color` | Color of the selected file summary | `rgba(0,0,0,0.74)`
   * `--files-payload-editor-selected-file-name-color` | Selected file name label color | `rgba(0,0,0,0.74)`
   * `--files-payload-editor-selected-file-icon-color` | Color of the icon in the selected file section | `--accent-color` or `#2196F3`
   * `--arc-font-body1` | Theme mixin, applied to text elements | `{}`
   * `--inline-fom-action-icon-color` | Theme variable, color of the delete icon | `rgba(0, 0, 0, 0.74)`
   * `--inline-fom-action-icon-color-hover` | Theme variable, color of the delete icon when hovering | `--accent-color` or `rgba(0, 0, 0, 0.74)`
   */
  class FilesPayloadEditor extends
    Polymer.IronValidatableBehavior(
    Object) {

    /**
     * Computed value, true if the control has files.
     */
    readonly hasFile: boolean|null|undefined;

    /**
     * If set the value will be base64 encoded.
     */
    base64Encode: boolean|null|undefined;

    /**
     * Selected file name
     */
    fileName: string|null|undefined;

    /**
     * Selected file size,
     */
    fileSize: number|null|undefined;

    /**
     * Value produced by this control.
     */
    value: Blob|null;

    /**
     * Returns a reference to the input element.
     */
    _getInput(): HTMLElement|null;
    _valueChnaged(value: any): void;

    /**
     * Updated `fileName` and `fileSize` from a base64 encoded string value
     *
     * @param value File as base64 string
     */
    _updateFileMeta(value: String|null): void;

    /**
     * Dispatches `content-type-changed` custom event change when a
     * file is selected.
     *
     * @param ct File content type
     */
    _informContentType(ct: String|null): void;

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
    _fileObjectChanged(e: Event|null): void;

    /**
     * Sets the `value` depending on `base64Encode` option.
     *
     * @param file A file to set as a value.
     */
    _setFileValue(file: Blob|null): void;

    /**
     * Overides Polymer.IronValidatableBehavior
     */
    _getValidity(): any;
    _computeHasFile(file: any): any;

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
}

interface HTMLElementTagNameMap {
  "files-payload-editor": ApiComponents.FilesPayloadEditor;
}
