import UriTemplate from '../url-template.js';
import expect from 'expect.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const examples = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../uritemplate-test/spec-examples-by-section.json')));

function createTestContext(c) {
  return function (t, r) {
    if (typeof r === 'string') {
      expect(new UriTemplate(t).expand(c)).to.eql(r);
    } else {
      expect(r.indexOf(new UriTemplate(t).expand(c)) >= 0).to.be.ok();
    }
  };
}

describe('spec-examples', function () {
  Object.keys(examples).forEach(function (section) {
    var assert = createTestContext(examples[section].variables);
    examples[section].testcases.forEach(function (testcase) {
      it(section + ' ' + testcase[0], function () {
        assert(testcase[0], testcase[1]);
      });
    });
  });
});
