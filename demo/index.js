import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '../files-payload-editor.js';

class ComponentDemo extends ArcDemoPage {
  constructor() {
    super();
    this._componentName = 'files-payload-editor';

    this._f1Handler = this._f1Handler.bind(this);
    this._f2Handler = this._f2Handler.bind(this);
  }

  get f1() {
    return this._f1;
  }

  set f1(value) {
    this._setObservableProperty('f1', value);
  }

  get f2() {
    return this._f2;
  }

  set f2(value) {
    this._setObservableProperty('f2', value);
  }

  _f1Handler(e) {
    this.f1 = e.detail.value;
  }

  _f2Handler(e) {
    this.f2 = e.detail.value;
  }

  contentTemplate() {
    return html`
      <div class="card">
        <h2>The files-payload-editor</h2>
        <files-payload-editor @value-changed="${this._f1Handler}"></files-payload-editor>
        <pre>${this.f1}</pre>
      </div>

      <div class="card">
        <h2>Base64 encoded</h2>
        <files-payload-editor @value-changed="${this._f2Handler}" base64encode></files-payload-editor>
        <pre>${this.f2}</pre>
      </div>

      <div class="card">
        <h2>With Base64 encoded value (with content type)</h2>
        <files-payload-editor base64encode value="data:text/html;base64,PCEtLQpVc2UgYGNocm9tZS1ibHVldG9vdGgtc29ja2V0YCBlbGVtZW50IHRvIGNyZWF0ZSBhIHNvY2tldCBjb25uZWN0aW9uIHRvIGEKQmx1ZXRvb3RoIGRldmljZS4KCldoZW4geW91IGNvbm5lY3QgdG8gYSBzb2NrZXQgeW91IGNhbiBzZW5kIG1lc3NhZ2UgdG8gYSBkZXZpY2UgYW5kIApyZWNlaXZlIGRhdGEgZnJvbSBpdC4KCiMjIyBFeGFtcGxlCmBgYAo8Y2hyb21lLWJsdWV0b290aC1zb2NrZXQgaWQ9InNvY2tldCIKICB1dWlkPSIwYjg3MzY3Yy1mMTg4LTQ3Y2QtYmMyMC1hNWY0ZjcwOTczYzYiCiAgYWRkcmVzcz0iW1tzb2NrZXRBZGRyZXNzXV0iCiAgb24tY29ubmVjdGVkPSJfb25Db25uZWN0ZWQiCiAgb24tbWVzc2FnZT0iX29uTWVzc2FnZSIKICBsYXN0LW1lc3NhZ2U9IltbbGFzdFNvY2tldE1lc3NhZ2VdXSI+PC9jaHJvbWUtYmx1ZXRvb3RoLXNvY2tldD4KYGBgCi0tPgo8bGluayByZWw9ImltcG9ydCIgaHJlZj0iY2hyb21lLWJsdWV0b290aC1zb2NrZXQtYmVoYXZpb3IuaHRtbCI+Cjxkb20tbW9kdWxlIGlkPSJjaHJvbWUtYmx1ZXRvb3RoLXNvY2tldCI+CiAgPHRlbXBsYXRlPgogICAgPHN0eWxlPgogICAgICA6aG9zdCB7CiAgICAgICAgZGlzcGxheTogbm9uZTsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L3RlbXBsYXRlPgogIDxzY3JpcHQgc3JjPSJjaHJvbWUtYmx1ZXRvb3RoLXNvY2tldC5qcyI+PC9zY3JpcHQ+CjwvZG9tLW1vZHVsZT4K"></files-payload-editor>
      </div>

      <div class="card">
        <h2>With Base64 encoded value (without content type)</h2>
        <files-payload-editor base64encode value="PCEtLQpVc2UgYGNocm9tZS1ibHVldG9vdGgtc29ja2V0YCBlbGVtZW50IHRvIGNyZWF0ZSBhIHNvY2tldCBjb25uZWN0aW9uIHRvIGEKQmx1ZXRvb3RoIGRldmljZS4KCldoZW4geW91IGNvbm5lY3QgdG8gYSBzb2NrZXQgeW91IGNhbiBzZW5kIG1lc3NhZ2UgdG8gYSBkZXZpY2UgYW5kIApyZWNlaXZlIGRhdGEgZnJvbSBpdC4KCiMjIyBFeGFtcGxlCmBgYAo8Y2hyb21lLWJsdWV0b290aC1zb2NrZXQgaWQ9InNvY2tldCIKICB1dWlkPSIwYjg3MzY3Yy1mMTg4LTQ3Y2QtYmMyMC1hNWY0ZjcwOTczYzYiCiAgYWRkcmVzcz0iW1tzb2NrZXRBZGRyZXNzXV0iCiAgb24tY29ubmVjdGVkPSJfb25Db25uZWN0ZWQiCiAgb24tbWVzc2FnZT0iX29uTWVzc2FnZSIKICBsYXN0LW1lc3NhZ2U9IltbbGFzdFNvY2tldE1lc3NhZ2VdXSI+PC9jaHJvbWUtYmx1ZXRvb3RoLXNvY2tldD4KYGBgCi0tPgo8bGluayByZWw9ImltcG9ydCIgaHJlZj0iY2hyb21lLWJsdWV0b290aC1zb2NrZXQtYmVoYXZpb3IuaHRtbCI+Cjxkb20tbW9kdWxlIGlkPSJjaHJvbWUtYmx1ZXRvb3RoLXNvY2tldCI+CiAgPHRlbXBsYXRlPgogICAgPHN0eWxlPgogICAgICA6aG9zdCB7CiAgICAgICAgZGlzcGxheTogbm9uZTsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L3RlbXBsYXRlPgogIDxzY3JpcHQgc3JjPSJjaHJvbWUtYmx1ZXRvb3RoLXNvY2tldC5qcyI+PC9zY3JpcHQ+CjwvZG9tLW1vZHVsZT4K"></files-payload-editor>
      </div>
    `;
  }
}
const instance = new ComponentDemo();
instance.render();
window.demo = instance;
