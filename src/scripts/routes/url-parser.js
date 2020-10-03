const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splittedUrl = this._urlSplitter(url);
    const combinedUrl = this._urlCombiner(splittedUrl);
    return combinedUrl;
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('/');
    const [resource = null, id = null, verb = null] = urlsSplits;
    return { resource, id, verb };
  },

  _urlCombiner(splittedUrl) {
    let { resource, id, verb } = splittedUrl;
    resource = resource || '/';
    id = id || '';
    verb = verb ? '/:id' : '';
    return `${resource}${id}${verb}`;
  }
};

export default UrlParser;
