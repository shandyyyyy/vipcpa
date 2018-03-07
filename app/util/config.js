let host = location.host;
const APIURL = 'live-hz.gaodun.com'; // 接口地址

export const getEnv = () => {
    // 开发环境
    if (host.indexOf('localhost') > -1 || host.indexOf('192') > -1 || host.indexOf('127') > -1) {
        return 'live-pre.gaodun.com'
    }
    let pre = location.host.match(/^.*-/);
    // 正式环境
    if (pre === null) {
        return '';
    }
    // 测试及预发布环境
    console.log(APIURL);
    return APIURL;
}

export const getBaseUrl = () => {
    // 开发环境
    if (host.indexOf('localhost') > -1 || host.indexOf('192') > -1 || host.indexOf('127') > -1) {
        return `//live-pre.gaodun.com`;
    }
    let pre = location.host.match(/^.*-/);
    // 正式环境
    if (pre === null) {
        return `//${APIURL}`;
    }
    // 测试及预发布环境
    return `//live-pre.gaodun.com`;
}

export const setWindowNID = (menu, path) => {
    menu = menu || [];
    for (let i = 0, len = menu.length; i < len; i++) {
        if (menu[i].Url === path) {
            window.nid = menu[i].NavigationId
        }
        if (menu[i].ChildNavigations) {
            setWindowNID(menu[i].ChildNavigations, path);
        }
    }
}