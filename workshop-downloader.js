function parseQuery(url) {
    let q = {};
    url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
    return q;
}

console.log(parseQuery('www.test.com/api/?id=100'));