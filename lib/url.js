function urlToFilename(url) {
  let niceName = url;

  niceName = niceName.replace(/^(?:https?:\/\/)/i, '');
  niceName = niceName.replace(/\/$/, ''); // Remove trailing slash
  niceName = niceName.replace(/\//g, '__'); // Replace forward slashes with double underscore
  niceName = niceName.replace('www.', ''); // Replace www
  niceName = niceName.replace(/\./g, '_'); // Replace periods with underscore

  return niceName;
}

function urlToDomain(url) {
  let niceName = url;

  niceName = niceName.replace(/^(?:https?:\/\/)/i, '');
  niceName = niceName.split('/')[0];

  return urlToFilename(niceName);
}

module.exports = {
  urlToFilename,
  urlToDomain
};
