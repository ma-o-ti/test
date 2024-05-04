const urlParams = {
  searchParams: new URLSearchParams(window.location.search),

  set(name, value) {
    this.searchParams.set(name, value);

    const resultUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }?${this.searchParams.toString()}`;
    window.history.pushState({ path: resultUrl }, "", resultUrl);
  },

  get(name) {
    return this.searchParams.get(name);
  },
};

window.urlParams = urlParams;

export { urlParams };
