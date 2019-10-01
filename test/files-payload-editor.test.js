import { fixture, assert, aTimeout } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import '../files-payload-editor.js';

describe('<files-payload-editor>', function() {
  async function basicFixture() {
    return await fixture(`<files-payload-editor></files-payload-editor>`);
  }

  async function base64Fixture() {
    return await fixture(`<files-payload-editor base64encode></files-payload-editor>`);
  }

  describe('basic', function() {
    let element;
    const contentType = 'text/plain';
    const testBlob = new Blob(['test'], { type: contentType });
    beforeEach(async function() {
      element = await basicFixture();
      element.clearCache();
      await aTimeout();
    });

    it('Is not validated without a value', function() {
      assert.isFalse(element.validate());
    });

    it('Is validated with a value', function() {
      element.value = testBlob;
      assert.isTrue(element.validate());
    });

    it('Computes hasFile', function() {
      element.value = testBlob;
      assert.isTrue(element.hasFile);
    });

    it('Computes fileName', function() {
      element.value = testBlob;
      assert.equal(element.fileName, 'blob');
    });

    it('Computes fileSize', function() {
      element.value = testBlob;
      assert.equal(element.fileSize, 4);
    });

    it('Fires content-type-changed custom event with known type', function(done) {
      element.addEventListener('content-type-changed', function clb(e) {
        element.removeEventListener('content-type-changed', clb);
        assert.equal(e.detail.value, contentType);
        done();
      });
      const blob = new Blob([''], { type: contentType });
      element.value = blob;
    });

    it('Fires content-type-changed custom event with unknown type', function(done) {
      element.addEventListener('content-type-changed', function(e) {
        assert.equal(e.detail.value, 'application/octet-stream');
        done();
      });
      const blob = new Blob(['']);
      element.value = blob;
    });
  });

  describe('_getInput()', () => {
    let element;
    beforeEach(async function() {
      element = await basicFixture();
    });

    it('Returns the input', () => {
      const input = element._getInput();
      assert.ok(input);
      assert.equal(input.type, 'file');
    });
  });

  describe('_valueChnaged()', () => {
    const contentType = 'text/plain';
    let element;
    let blob;
    beforeEach(async function() {
      element = await basicFixture();
      element.clearCache();
      blob = new Blob(['test'], { type: contentType });
      blob.name = 'test-name';
      await aTimeout();
    });

    it('Does nothing when no value', () => {
      element._valueChnaged();
      assert.isUndefined(element.fileName);
    });

    it('Sets file name from file', () => {
      element._valueChnaged(blob);
      assert.equal(element.fileName, 'test-name');
    });

    it('Sets file fileSize from file', () => {
      element._valueChnaged(blob);
      assert.isAbove(element.fileSize, 0);
    });

    it('Sets hasFile', () => {
      element._valueChnaged(blob);
      assert.isTrue(element.hasFile);
    });

    it('Calls _informContentType()', (done) => {
      const spy = sinon.spy(element, '_informContentType');
      element._valueChnaged(blob);
      setTimeout(() => {
        assert.isTrue(spy.called);
        assert.equal(spy.args[0][0], contentType);
        done();
      });
    });

    it('Calls _informContentType() with default content type', (done) => {
      const spy = sinon.spy(element, '_informContentType');
      blob = new Blob(['test']);
      element._valueChnaged(blob);
      setTimeout(() => {
        assert.equal(spy.args[0][0], 'application/octet-stream');
        done();
      });
    });

    it('Calls _updateFileMeta() for other types', () => {
      const spy = sinon.spy(element, '_updateFileMeta');
      element._valueChnaged({});
      assert.isTrue(spy.called);
    });
  });

  describe('_updateFileMeta()', () => {
    let element;
    beforeEach(async function() {
      element = await basicFixture();
      element.clearCache();
      await aTimeout();
    });

    it('Sets hasFile to false when no value', () => {
      element._updateFileMeta();
      assert.isFalse(element.hasFile);
    });

    it('Sets hasFile to false when value value is not string', () => {
      element._updateFileMeta({});
      assert.isFalse(element.hasFile);
    });

    it('Restores previously selected file', () => {
      const blob = new Blob(['test']);
      element._valueChnaged(blob);
      element.value = undefined;
      element._updateFileMeta({});
      assert.typeOf(element.value, 'blob');
    });

    it('Sets has file to true when restoring a file', () => {
      const blob = new Blob(['test']);
      element._valueChnaged(blob);
      element.value = undefined;
      element._updateFileMeta({});
      assert.isTrue(element.hasFile);
    });

    it('Restores previously selected file when value is invalid', () => {
      const blob = new Blob(['test']);
      element._valueChnaged(blob);
      element.value = undefined;
      element._updateFileMeta('a==');
      assert.typeOf(element.value, 'blob');
    });

    // rest of the tests in base64-test.html
  });

  describe('_fileObjectChanged()', () => {
    let element;
    beforeEach(async function() {
      element = await basicFixture();
      element.clearCache();
      await aTimeout();
    });

    it('Calls _setFileValue( with file value)', () => {
      const spy = sinon.spy(element, '_setFileValue');
      const blob = new Blob(['test']);
      element._fileObjectChanged({
        target: {
          files: [blob]
        }
      });
      assert.isTrue(spy.called);
      assert.isTrue(spy.args[0][0] === blob);
    });
  });

  describe('_setFileValue()', () => {
    const contentType = 'text/plain';
    let element;
    let blob;
    beforeEach(async function() {
      element = await basicFixture();
      element.clearCache();
      blob = new Blob(['test'], { type: contentType });
      blob.name = 'test-name';
      await aTimeout();
    });

    it('Sets value undefined when no argument', () => {
      element.value = blob;
      element._setFileValue();
      assert.isUndefined(element.value);
    });

    it('Sets file value', () => {
      element._setFileValue(blob);
      assert.isTrue(element.value === blob);
    });

    it('Sets text value when base64Encode', (done) => {
      element.base64Encode = true;
      element._setFileValue(blob);
      element.addEventListener('value-changed', function f() {
        element.removeEventListener('value-changed', f);
        assert.typeOf(element.value, 'string');
        done();
      });
    });

    it('Calls __informBase64Conversion()', (done) => {
      element.base64Encode = true;
      const spy = sinon.spy(element, '__informBase64Conversion');
      element._setFileValue(blob);
      element.addEventListener('value-changed', function f() {
        element.removeEventListener('value-changed', f);
        setTimeout(() => {
          assert.isTrue(spy.called);
          done();
        });
      });
    });
  });

  describe('removeFile()', () => {
    const contentType = 'text/plain';
    let element;
    let blob;
    beforeEach(async function() {
      element = await basicFixture();
      element.clearCache();
      blob = new Blob(['test'], { type: contentType });
      blob.name = 'test-name';
      await aTimeout();
    });

    it('Sets value undefined', () => {
      element.removeFile();
      assert.isUndefined(element.value);
    });

    it('Sets fileName undefined', () => {
      element.removeFile();
      assert.isUndefined(element.fileName);
    });

    it('Sets hasFile', () => {
      element.removeFile();
      assert.isFalse(element.hasFile);
    });

    it('Sets fileSize undefined', () => {
      element.removeFile();
      assert.isUndefined(element.fileSize);
    });
  });

  describe('base64', function() {
    let element;
    const contentType = 'text/plain';
    const testBase64String = 'dGVzdA==';
    const testBlob = new Blob(['test'], {type: contentType});
    const contentTypeBase64 = 'data:' + contentType + ';base64,' + testBase64String;

    beforeEach(async () => {
      element = await base64Fixture();
      element.clearCache();
    });

    it('Produces base64 string', function(done) {
      element._setFileValue(testBlob);
      element.addEventListener('base64-value-set', function clb() {
        element.removeEventListener('base64-value-set', clb);
        assert.equal(element.value, testBase64String);
        done();
      });
    });

    it('Computes fileName', function(done) {
      element._setFileValue(testBlob);
      element.addEventListener('base64-value-set', function clb() {
        element.removeEventListener('base64-value-set', clb);
        assert.equal(element.fileName, 'blob');
        done();
      });
    });

    it('Computes fileSize', function(done) {
      element._setFileValue(testBlob);
      element.addEventListener('base64-value-set', function clb() {
        element.removeEventListener('base64-value-set', clb);
        assert.equal(element.fileSize, 4);
        done();
      });
    });

    it('Fires base64 content type', function(done) {
      element.addEventListener('content-type-changed', function(e) {
        assert.equal(e.detail.value, contentType);
        done();
      });
      element.value = contentTypeBase64;
    });

    it('Computes hasFile from base64 with content type', function() {
      element.value = contentTypeBase64;
      assert.isTrue(element.hasFile);
    });

    it('Computes fileName from base64 with content type', function() {
      element.value = contentTypeBase64;
      assert.equal(element.fileName, 'blob');
    });

    it('Computes fileSize from base64 with content type', function() {
      element.value = contentTypeBase64;
      assert.equal(element.fileSize, 4);
    });

    it('Sets hasFile to false when invalid input', () => {
      element._updateFileMeta('a==');
      assert.isFalse(element.hasFile);
    });
  });

  describe('onchange', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.equal(element.onchange, null);
      const f = () => {};
      element.onchange = f;
      assert.isTrue(element.onchange === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onchange = f;
      element.value = new Blob(['test']);
      element.onchange = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onchange = f1;
      element.onchange = f2;
      element.value = new Blob(['test']);
      element.onchange = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('a11y', () => {
    it('is accessible when default', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element);
    });
  });
});
