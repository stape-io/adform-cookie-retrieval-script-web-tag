const copyFromWindow = require('copyFromWindow');
const getCookieValues = require('getCookieValues');
const getUrl = require('getUrl');
const getReferrerUrl = require('getReferrerUrl');
const injectScript = require('injectScript');
const makeInteger = require('makeInteger');
const makeString = require('makeString');
const parseUrl = require('parseUrl');
const setCookie = require('setCookie');

/*==============================================================================
==============================================================================*/

const adfuidFromURL = getAdfuidFromURL();
if (adfuidFromURL && isAdfuidValid(adfuidFromURL)) {
  setAdfuidCookie(adfuidFromURL);
  return data.gtmOnSuccess();
}

const adfuidFromFirstParty = getCookieValues('adfuid')[0];
if (adfuidFromFirstParty && isAdfuidValid(adfuidFromFirstParty)) {
  setAdfuidCookie(adfuidFromFirstParty);
  return data.gtmOnSuccess();
}

injectScript(
  'https://track.adform.net/Serving/Cookie/?adfaction=getjs;adfcookname=uid',
  () => {
    const adfuidFromThirdParty = copyFromWindow('Adform._uid');
    if (adfuidFromThirdParty && isAdfuidValid(adfuidFromThirdParty)) {
      setAdfuidCookie(adfuidFromThirdParty);
    }
    return data.gtmOnSuccess();
  },
  data.gtmOnFailure
  /* No 3rd arg. It must not be cached. */
);

/*==============================================================================
  Vendor related functions
==============================================================================*/

function isAdfuidValid(adfuid) {
  return makeString(adfuid).match('^[-\\d]\\d{17,19}$') !== null;
}

function getAdfuidFromURL() {
  const urls = [getUrl(), getReferrerUrl()].filter((url) => !!url);
  const adfuids = urls
    .map((url) => parseUrl(url))
    .filter((parsedUrl) => parsedUrl && parsedUrl.searchParams)
    .map((parsedUrl) => parsedUrl.searchParams.adfcookieid)
    .filter((adfuid) => !!adfuid);

  return adfuids[0];
}

function setAdfuidCookie(adfuid) {
  if (!adfuid) return;
  setCookie('adfuid', adfuid, {
    domain: data.cookieDomain || 'auto',
    path: '/',
    secure: true,
    samesite: data.cookieSameSite || 'none',
    'max-age': 24 * 60 * 60 * makeInteger(data.cookieExpiration || 60)
  });
}
