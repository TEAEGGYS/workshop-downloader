function parseQuery(url) {
    let q = {};
    url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
    return q;
}

class Utils {
    
}