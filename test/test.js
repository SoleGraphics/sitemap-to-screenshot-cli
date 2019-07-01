const { expect } = require('chai');
const { urlToFilename, urlToDomain } = require('../lib/url');

// urlToFilename
describe('urlToFilename()', () => {
  it('should remove protocol', () => {
    const expected = 'google_com';

    const httpProtocol = urlToFilename('http://google.com/');
    const httpsProtocol = urlToFilename('https://google.com/');

    expect(httpProtocol).to.be.equal(expected);
    expect(httpsProtocol).to.be.equal(expected);
  });

  it('should remove www', () => {
    const expected = 'google_com';

    const url = 'https://www.google.com/';
    const filename = urlToFilename(url);

    expect(filename).to.be.equal(expected);
  });

  it('should replace forward slashes', () => {
    const expected = 'google_com__some__path';

    const url = 'https://www.google.com/some/path/';
    const filename = urlToFilename(url);

    expect(filename).to.be.equal(expected);
  });

  it('should replace periods', () => {
    const expected = 'google_com__some_dot__path_dot';

    const url = 'https://www.google.com/some.dot/path.dot/';
    const filename = urlToFilename(url);

    expect(filename).to.be.equal(expected);
  });
});

// urlToDomain
describe('urlToDomain()', () => {
  it('should return only the domain', () => {
    const expected = 'google_com';

    const testOne = urlToDomain('http://google.com');
    const testTwo = urlToDomain('https://google.com/');
    const testThree = urlToDomain('https://google.com/some/path/');

    expect(testOne).to.be.equal(expected);
    expect(testTwo).to.be.equal(expected);
    expect(testThree).to.be.equal(expected);
  });

  it('should not need a protocol', () => {
    const expected = 'google_com';

    const testOne = urlToDomain('google.com');

    expect(testOne).to.be.equal(expected);
  });
});
