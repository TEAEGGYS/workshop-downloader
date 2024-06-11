(function() {
    'use strict';
    class Utils {
        static parseQuery(URL) {
            let q = {};
            URL.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
            return q;
        }

        static currentURLQuery() {
            return window.location.href;
        }
    }

    class Downloader {
        static _DownloadAPI;

        static get API() {
            return this._DownloadAPI;
        }

        static set API(apiURL) {
            this._DownloadAPI = apiURL;
        }

        static getItemID(itemURL) {
            const parse = Utils.parseQuery(itemURL);
            return parse.id;
        }

        static getDownloadLink(itemID) {
            return new Promise((resolve, reject) => {
                if (!this._DownloadAPI) {
                    reject(new Error("未设置下载api"));
                }
                GM_xmlhttpRequest({
                    method: "GET",
                    url: `${this._DownloadAPI}/${itemID}`,
                    onload: (res) => {
                        if (res.status === 200) {
                            const parser = new DOMParser();
                            const page = parser.parseFromString(res.response, 'text/html');
                            const downloadLink = page.querySelector('b > a').href;
                            resolve(downloadLink);
                        } else {
                            reject(new Error(`请求失败: ${res.statusText}`));
                        }
                    },
                    onerror: (err) => {
                        reject(new Error(`网络错误: ${err}`));
                    }
                })
            })
        }
    }

    class DOMBuilder {
        constructor(NodeList) {
            NodeList.forEach(DOM => {
                
            });
        }

        #createDownloaderBox() {
            
        }

        #initDownloadBtnStyle() {
            
        }

        #initCancelBtnStyle() {
            
        }
    }

    Downloader.API = "http://steamworkshop.download/download/view";
    const itemID = Downloader.getItemID(Utils.currentURLQuery());
    console.log(itemID);
    (async () => {
        const downloadLink = await Downloader.getDownloadLink(itemID);
        console.log(downloadLink);
    })()

})();