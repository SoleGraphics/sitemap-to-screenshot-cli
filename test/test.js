const expect = require('chai').expect;
const { urlToFilename, urlToDomain } = require('../lib/url');

// urlToFilename
describe('urlToFilename()', function () {
  it('should remove protocol', function () {
    const expected = 'google_com';

    const httpProtocol = 'http://google.com/';
    const httpsProtocol = 'https://google.com/';

    expect(urlToFilename(httpProtocol) == expected).to.be.true
      && expect(urlToFilename(httpsProtocol) == expected).to.be.true;

  });

  it('should remove www', function () {
    const expected = 'google_com';

    const url = 'https://www.google.com/';
    const filename = urlToFilename(url);

    expect(filename).to.be.equal(expected);

  });

  it('should replace forward slashes', function () {
    const expected = 'google_com__some__path';

    const url = 'https://www.google.com/some/path/';
    const filename = urlToFilename(url);

    expect(filename).to.be.equal(expected);

  });

  it('should replace periods', function () {
    const expected = 'google_com__some_dot__path_dot';

    const url = 'https://www.google.com/some.dot/path.dot/';
    const filename = urlToFilename(url);

    expect(filename).to.be.equal(expected);

  });
});

// urlToDomain
describe('urlToDomain()', function () {
  it('should return only the domain', function () {
    const expected = 'google_com';

    const testOne = 'http://google.com';
    const testTwo = 'https://google.com/';
    const testThree = 'https://google.com/some/path/';

    expect(urlToDomain(testOne) == expected).to.be.true
      && expect(urlToDomain(testTwo) == expected).to.be.true
      && expect(urlToDomain(testThree) == expected).to.be.true;

  });

  it('should not need a protocol', function () {
    const expected = 'google_com';

    const testOne = 'google.com';

    expect(urlToDomain(testOne) == expected).to.be.true;

  });
});
