// var gaodun_callback = {
//     id: 1,
//     m: {},
//     callback: function (id, s) {
//         var gd_cb = gaodun_callback;
//         if (!gd_cb.m[gd_cb.id]) {
//             return;
//         }
//         var f = gd_cb.m[gd_cb.id];
//         if (typeof f !== "function") {
//             return;
//         }
//
//         var obj = JSON.parse(s);
//         f(obj);
//     },
//     invoke: function (type, url, cb) {
//         var gd_cb = gaodun_callback;
//
//         gd_cb.m[gd_cb.id] = cb;
//
//         window.gaodun_app.postMessage(type, id, url);
//
//         gd_cb.id++;
//     }
// };
// window.gaodun_callback = gaodun_callback;
// gaodun_callback.callback(type, id, responseBody);

var gaodun_callback = gaodun_callback || {
    Config: {
        domain: "live-pre.gaodun.com",
        // domain: "live-hz.gaodun.com",
        // domain: "live-t.gaodun.com",
        app: false,
        id: new Date().getTime(),
        type: 1,
        m: {},
    },
    callback: function (obj) {
        // window.alert(JSON.stringify(obj));
        // window.alert(obj.type, obj.id, obj.response);

        var gd_cb = gaodun_callback.Config;
        if (!gd_cb.m[obj.id]) {
            window.alert(obj.id);
            return;
        }
        var f = gd_cb.m[obj.id];
        if (typeof f !== "function") {
            window.alert(obj.id + '222');
            return;
        }

        f(obj.response);
    },
};

// Common Methods.
(function () {
    if ((gaodun_callback.Methods !== undefined) && (gaodun_callback.Methods !== null)) {
        return;
    }

    gaodun_callback.Methods = {
        tips: function (info) {
            var div = document.createElement('div');
            div.className = 'classTip';
            var span = document.createElement('span');
            span.innerText = info;
            div.appendChild(span);
            document.getElementsByTagName('body')[0].appendChild(div);

            var height = div.clientHeight;
            var width = div.clientWidth;
            div.style.marginLeft = "-" + width / 2 + "px";
            div.style.marginTop = "-" + height / 2 + "px";
            setTimeout(function () {
                div.remove();
            }, 3000);

        },
        isValid: function (obj) {
            return (obj === undefined || obj === null) ? false : true;
        },
        n2s: function (n) {
            return (n >= 10) ? (n.toString()) : ("0" + n.toString());
        },
        formatTime: function (ms, date, time) {
            var n2s = function (n) {
                return (n >= 10) ? (n.toString()) : ("0" + n.toString());
            };

            var t = new Date(ms);

            var s = t.getFullYear() + "-" + n2s(t.getMonth() + 1) + "-" + n2s(t.getDate());
            if (date) {
                return s;
            }
            if (time) {
                return n2s(t.getHours()) + ":" + n2s(t.getMinutes());
            }
            return s + " " + n2s(t.getHours()) + ":" + n2s(t.getMinutes()); // + ":" + n2s(t.getSeconds());
        },
        sortArr: function (arr) {
            var temp;
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0; j < arr.length - 1; j++) {
                    if (arr[j].startTime > arr[j + 1].startTime) {
                        temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
            return arr;
        },
        // formatDuration: function(ms) {
        // 	var d = (new Date()).getTime() - ms;

        // 	var days = Math.floor(d / (24 * 60 * 60 * 1000));
        // 	if (days > 0) {
        // 		d -= days * 24 * 60 * 60 * 1000;
        // 	}

        // 	var hours = Math.floor(d / (60 * 60 * 1000));
        // 	if (hours > 0) {
        // 		d -= hours * 60 * 60 * 1000;
        // 	}

        // 	var minutes = Math.floor(d / (60 * 1000));
        // 	if (minutes > 0) {
        // 		d -= minutes * 60 * 1000;
        // 	}

        // 	var r = (hours >= 10 ? hours : ("0" + hours)) + ":" +
        // 		(minutes >= 10 ? minutes : ("0" + minutes)) + ":" +
        // 		(d >= 10 ? d : ("0" + d));

        // 	if (days > 0) {
        // 		return days + " " + r;
        // 	}

        // 	return r;
        // },
        formatDuration: function (seconds) {
            var d = seconds;

            var days = Math.floor(d / (24 * 60 * 60));
            if (days > 0) {
                d -= days * 24 * 60 * 60;
            }

            var hours = Math.floor(d / (60 * 60));
            if (hours > 0) {
                d -= hours * 60 * 60;
            }

            var minutes = Math.floor(d / 60);
            if (minutes > 0) {
                d -= minutes * 60;
            }

            var seconds = Math.floor(d);

            var r = (hours >= 10 ? hours : ("0" + hours)) + ":" +
                (minutes >= 10 ? minutes : ("0" + minutes)) + ":" +
                (seconds >= 10 ? seconds : ("0" + seconds));

            if (days > 0) {
                return days + " " + r;
            }

            return r;
        },
        convert: function (pageTemplate, timeStrict, askTemplate) {
            var n = pageTemplate;
            if (timeStrict === 1) {
                n |= 0x10;
            }
            if (askTemplate === 1) {
                n |= 0x20;
            }
            return n;
        },
        backConvert: function (num) {
            var pageTemplate = num & 0x0f;
            var timeStrict = ((num & 0x10) === 16) ? 1 : 0;
            var askTemplate = ((num & 0x20) === 32) ? 1 : 0;
            // console.log(pageTemplate, timeStrict, askTemplate);
            var arr = [pageTemplate, timeStrict, askTemplate];
            return arr;
        },
        getMeetingTypeName: function (id) {
            switch (id) {
                case 0:
                    return "Live";
                case 1:
                    return "Live | Mock";
                case 2:
                    return "Mock";
                default:
                    return this.g.EN ? "Unknown" : "鏈煡";
            }
        },

        answerArray2HexString: function (arr) {
            if (!gaodun_callback.Methods.isValid(arr) || arr.length === 0) {
                return "";
            }

            var result = "";
            for (var i = 0; i < arr.length; i++) {
                var answer = arr[i];

                // Check the answer itself.
                if (!gaodun_callback.Methods.isValid(answer) || answer.length === 0) {
                    result += "00";
                    continue;
                }

                // Get its binary value.
                var b = 0x00;
                for (var j = 0; j < answer.length; j++) {
                    if (answer[j] !== '0') {
                        b |= (0x01 << j);
                    }
                }

                // Translate this byte to HEX string.
                var s = b.toString(16);
                if (s.length === 1) {
                    result += "0";
                }
                result += s;
            }
            return result;
        },
        md5: function (string) {
            var md5_RotateLeft = function (lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
            };

            var md5_AddUnsigned = function (lX, lY) {
                var lX4, lY4, lX8, lY8, lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
                } else {
                    return (lResult ^ lX8 ^ lY8);
                }
            };

            var md5_F = function (x, y, z) {
                return (x & y) | ((~x) & z);
            };

            var md5_G = function (x, y, z) {
                return (x & z) | (y & (~z));
            };

            var md5_H = function (x, y, z) {
                return (x ^ y ^ z);
            };

            var md5_I = function (x, y, z) {
                return (y ^ (x | (~z)));
            };

            var md5_FF = function (a, b, c, d, x, s, ac) {
                a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
                return md5_AddUnsigned(md5_RotateLeft(a, s), b);
            };

            var md5_GG = function (a, b, c, d, x, s, ac) {
                a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
                return md5_AddUnsigned(md5_RotateLeft(a, s), b);
            };

            var md5_HH = function (a, b, c, d, x, s, ac) {
                a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
                return md5_AddUnsigned(md5_RotateLeft(a, s), b);
            };

            var md5_II = function (a, b, c, d, x, s, ac) {
                a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
                return md5_AddUnsigned(md5_RotateLeft(a, s), b);
            };

            var md5_ConvertToWordArray = function (string) {
                var lWordCount;
                var lMessageLength = string.length;
                var lNumberOfWords_temp1 = lMessageLength + 8;
                var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
                var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                var lWordArray = Array(lNumberOfWords - 1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while (lByteCount < lMessageLength) {
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                    lByteCount++;
                }
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray;
            };

            var md5_WordToHex = function (lValue) {
                var WordToHexValue = "",
                    WordToHexValue_temp = "",
                    lByte, lCount;
                for (lCount = 0; lCount <= 3; lCount++) {
                    lByte = (lValue >>> (lCount * 8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
                }
                return WordToHexValue;
            };

            var md5_Utf8Encode = function (string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";
                for (var n = 0; n < string.length; n++) {
                    var c = string.charCodeAt(n);
                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }
                }
                return utftext;
            };

            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11 = 7,
                S12 = 12,
                S13 = 17,
                S14 = 22;
            var S21 = 5,
                S22 = 9,
                S23 = 14,
                S24 = 20;
            var S31 = 4,
                S32 = 11,
                S33 = 16,
                S34 = 23;
            var S41 = 6,
                S42 = 10,
                S43 = 15,
                S44 = 21;
            string = md5_Utf8Encode(string);
            x = md5_ConvertToWordArray(string);
            a = 0x67452301;
            b = 0xEFCDAB89;
            c = 0x98BADCFE;
            d = 0x10325476;
            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = md5_AddUnsigned(a, AA);
                b = md5_AddUnsigned(b, BB);
                c = md5_AddUnsigned(c, CC);
                d = md5_AddUnsigned(d, DD);
            }
            return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toLowerCase();
        }
    };
})();

(function () {
    if (window.gaodun_app && (typeof window.gaodun_app === "object") || (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.gaodun_app)) {
        gaodun_callback.Config.app = true;
    }
    // gaodun_callback.Methods.tips(gaodun_callback.Config.app)
})();
// Data.
(function () {
    if (gaodun_callback.Methods.isValid(gaodun_callback.Data)) {
        return;
    }

    var storageKey = "gaodun_callbackData";

    // Data-related methods.
    gaodun_callback.Methods.initData = function (english) {
        gaodun_callback.Data = {
            COMPONENT: {
                UNKNOWN: 0,
                GROUP: 1,
                CLASS: 2,
                MEETING: 3,
                EXAM: 4,
                REPLAY: 5,
                SLIDES: 6,
                VIDEO: 7
            },

            // STORAGE: gaodun_callback.Methods.isValid(localStorage) ? true : false,
            EN: gaodun_callback.Methods.isValid(english) ? english : (navigator.language.indexOf("zh") === 0 ? false : true),

            me: {
                id: 0,
                nickname: "",
                role: ""
            },

            users: {},

            groups: [],
            // currentKlass: [], // Array of current class.
            classes: [], // Array of class objects within current group or paid list.

            meetings: [], // Array of meeting objects within current class.
            students: [], // Array of user IDs within current class.
            currentMeetingObj: {}, // obj of current meeting.
            progresses: {}, // Map from class ID to object of users' progresses.

            currentStudent: {}, // Map of current student.
            studentsNum: 0, // number fo students within current class.
            exam: {}, // Map of exam statistics
            timestamp: 0,

            currentGroup: 0,
            currentGroupName: "",
            currentClass: {},
            currentMeeting: 0,
            currentComponent: 0,
        };
    };
    gaodun_callback.Methods.saveData = function () {
        // if (gaodun_callback.Data.STORAGE !== true) {
        // return;
        // }
        localStorage.setItem(storageKey, JSON.stringify(gaodun_callback.Data));
    };
    gaodun_callback.Methods.loadData = function () {
        // if (!localStorage) {
        // return false;
        // }

        var s = localStorage.getItem(storageKey);
        if (s === null) {
            return false;
        }

        gaodun_callback.Data = eval("(" + s + ")");
        return true;
    };
    gaodun_callback.Methods.removeData = function () {
        var english = gaodun_callback.Data.EN;
        gaodun_callback.Methods.initData(english);
        localStorage.removeItem(storageKey);

        if (gaodun_callback.Data.STORAGE === true) {
            gaodun_callback.Methods.saveData();
        }
    };
    if (gaodun_callback.Config.app === false) {
        gaodun_callback.Methods.onXMLHttpError = function (n) {
            localStorage.clear();
            window.location.href = "#/login";
        };
    }

    // Try to load it from local storage.
    if (!gaodun_callback.Methods.loadData()) {
        // Clear everything.
        gaodun_callback.Methods.initData();
    }
})();

// Request sender.
(function () {
    if (gaodun_callback.Methods.isValid(gaodun_callback.Sender)) {
        return;
    }
    //web request
    var RequestSender = {

        createNew: function (apiPrefix) {

            //web request
            var instance = {
                apiPrefix: apiPrefix,
                q: [],
                isWorking: false
            };

            instance.newInvocation = function (url, cb) {
                var gd_cb = gaodun_callback.Config;

                gd_cb.m[gd_cb.id] = cb;
                // if (!window.webkit) {
                //     window.alert("!window.webkit");
                // } else if (!window.webkit.messageHandlers) {
                //     window.alert("!window.webkit.messageHandlers");
                // } else if (!window.webkit.messageHandlers.gaodun_app) {
                //     window.alert("!window.webkit.messageHandlers.gaodun_app");
                // }
                if (window.gaodun_app) {
                    // window.alert("BEFORE Android");
                    window.gaodun_app.postMessage(gd_cb.type, gd_cb.id, url);
                    // window.alert("AFTER Android");
                } else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.gaodun_app) {
                    // window.alert("BEFORE iOS");
                    window.webkit.messageHandlers.gaodun_app.postMessage({
                        "type": gd_cb.type,
                        "id": gd_cb.id,
                        "url": url
                    });
                    // window.alert("AFTER iOS");
                } else {
                    console.log("!gaodun_app");
                    if (gd_cb.type !== 1) {
                        return cb(gaodun_callback.Data.currentClass);
                    }
                    instance.q.push({
                        json: true,
                        method: "POST",
                        url: instance.apiPrefix + url,
                        withSession: true,
                        data: null,
                        onSuccess: cb,
                        onError: gaodun_callback.Methods.onXMLHttpError,
                        onOpened: null,
                        onProgress: null
                    });
                    // console.log(instance.q);
                    startToWork();
                }
                gd_cb.id++;
            };

            instance.setTime = function (time) {
                localStorage.setItem("time", time);
            };
            instance.setID = function (id) {
                // if (localStorage) {
                localStorage.setItem("id", id);
                // } else {
                // 	var s = document.cookie;
                // 	if (s.length === 0) {
                // 		document.cookie = (id + "=");
                // 	} else {
                // 		document.cookie = (id + "=" + (s.split("="))[1]);
                // 	}
                // }
            };
            instance.getID = function () {
                // if (localStorage) {
                return localStorage.getItem("id");
                // } else {
                // 	var s = document.cookie;
                // 	if (s.length === 0) {
                // 		return "";
                // 	} else {
                // 		return (s.split("="))[0];
                // 	}
                // }
            };
            instance.setToken = function (token) {
                // if (localStorage) {
                localStorage.setItem("token", token);
                // } else {
                // 	var s = document.cookie;
                // 	if (s.length === 0) {
                // 		document.cookie = ("=" + token);
                // 	} else {
                // 		document.cookie = ((s.split("="))[0] + "=" + token);
                // 	}
                // }
            };
            instance.getToken = function () {
                // if (localStorage) {
                return localStorage.getItem("token");
                // } else {
                // 	var s = document.cookie;
                // 	if (s.length === 0) {
                // 		return "";
                // 	} else {
                // 		return (s.split("="))[1];
                // 	}
                // }
            };
            console.log(instance.q);
            var startToWork = function () {
                if (instance.q.length === 0) {
                    return;
                }

                // Get a request for the queue.
                var r = instance.q[0];

                if (r.withSession === true) {
                    if (instance.isWorking === true) {
                        return;
                    } else {
                        instance.isWorking = true;
                    }
                }

                // Remove this request from the queue.
                instance.q.splice(0, 1);
                // Send it.
                request(
                    r.method,
                    r.url,
                    r.withSession,
                    r.data,
                    function (s) {
                        if ((r.onSuccess !== undefined) && (r.onSuccess !== null)) {
                            if (r.json === true) {
                                var obj = eval("(" + s + ")");
                                r.onSuccess(obj);
                            } else {
                                r.onSuccess(s);
                            }
                        }

                        // Process next request, if it exists.
                        if (r.withSession === true) {
                            instance.isWorking = false;
                        }
                        startToWork();
                    },
                    function (n) {
                        if ((r.onError !== undefined) && (r.onError !== null)) {
                            r.onError(n);
                        }

                        // Process next request, if it exists.
                        if (r.withSession === true) {
                            instance.isWorking = false;
                        }
                        startToWork();
                    },
                    r.onOpened,
                    r.onProgress
                );
            };

            var request = function (method, url, withSession, data, onSuccess, onError, onOpened, onProgress) {
                var xmlHttp = null;

                // Create an XML request.
                if (window.XMLHttpRequest) {
                    xmlHttp = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    try {
                        xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (e) {
                        try {
                            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                        } catch (e) {
                            xmlHttp = null;
                        }
                    }
                }

                // XML request is unsupported.
                if (xmlHttp === null) {
                    if ((onError !== undefined) && (onError !== null)) {
                        onError(0);
                    }
                }

                // Append session ID and token, if their are required.
                var s = url;
                if (withSession === true) {
                    var userID = instance.getID();
                    var token = instance.getToken();

                    if ((userID !== null) && (token !== null)) {
                        if (s.indexOf("?") >= 0) {
                            s += "&";
                        } else {
                            s += "?";
                        }
                        s += "session=" + userID + "&token=" + token;
                    }
                }

                // Set callbacks.
                xmlHttp.open(method, s, true);
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState === 1) {
                        // Invoke the callback function for onOpened event.
                        if ((onOpened !== undefined) && (onOpened !== null)) {
                            onOpened();
                        }
                        // Register the callback function for onProgress event.
                        if ((onProgress !== undefined) && (onProgress !== null)) {
                            xmlHttp.upload.onprogress = onProgress;
                        }
                    } else if (xmlHttp.readyState === 4) {
                        if (xmlHttp.status === 200) {
                            if (withSession === true) {
                                var token = xmlHttp.getResponseHeader("token");
                                if ((token !== undefined) && (token !== null) && (token !== "")) {
                                    instance.setToken(token);
                                }

                                var sLastDate = xmlHttp.getResponseHeader("date");
                                if ((sLastDate !== undefined) && (sLastDate !== null) && (sLastDate !== "")) {
                                    // gaodun_callback.Data.lastDate = new Date(sLastDate);
                                    gaodun_callback.Data.timestamp = (new Date(sLastDate)).getTime();
                                }
                            }

                            if ((onSuccess !== undefined) && (onSuccess !== null)) {
                                onSuccess(xmlHttp.responseText);
                            }
                        } else {
                            if ((onError !== undefined) && (onError !== null)) {
                                onError(xmlHttp.status);
                            }
                        }
                    }
                };

                // Send the request.
                xmlHttp.send(data);
            };
            return instance;
        }
    };

    gaodun_callback.Sender = RequestSender.createNew((!gaodun_callback.Methods.isValid(gaodun_callback.Config.domain) || gaodun_callback.Config.domain === "") ? "" : (window.location.protocol + "//" + gaodun_callback.Config.domain));
})();

// User-related methods.
(function () {
    if (gaodun_callback.Methods.isValid(gaodun_callback.User)) {
        return;
    }

    gaodun_callback.User = {
        register: function (userName, userPassword, token, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/user/register?name=" + encodeURIComponent(userName) + "&password=" + gaodun_callback.Methods.md5(userPassword) + "&token=" + encodeURIComponent(token),
                onCallback
            );
        },
        login: function (userName, userPassword, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/user/login?name=" + encodeURIComponent(userName) + "&password=" + gaodun_callback.Methods.md5(userPassword),
                function (resp) {
                    if (resp.status === 0) {
                        gaodun_callback.Data.me = resp.result;

                        gaodun_callback.Sender.setID(gaodun_callback.Data.me.id);
                        gaodun_callback.Methods.saveData();
                        onCallback(resp);
                    } else {
                        if (gaodun_callback.Methods.isValid(onCallback)) {
                            onCallback(resp);
                        }
                    }
                }
            );
        },
        loginAsGaodunUser: function (userName, userPassword, onCallback, onError) {
            gaodun_callback.Sender.newInvocation(
                "/gaodun/login?name=" + encodeURIComponent(userName) + "&password=" + encodeURIComponent(userPassword),
                function (resp) {
                    if (resp.status === 0) {
                        // Update groups.
                        gaodun_callback.Data.me.role = "STUDENT";
                        gaodun_callback.Data.me = resp.result;
                        gaodun_callback.Sender.setID(resp.result.id);
                        onCallback(resp);
                        // gaodun_callback.queryClass(
                        // 	function (resp) {
                        // 		if (gaodun_callback.isFunction(onCallback)) {
                        // 			onCallback(resp);
                        // 		}
                        // 	}
                        // );
                    }
                },
                onError
            );
        },
        loginAsGaodunStudent: function (password, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/gaodun/pass?password=" + password,
                function (resp) {
                    if (resp.status === 0) {
                        gaodun_callback.Data.me.id = resp.result.id;
                        gaodun_callback.Data.me.nickname = resp.result.nickname;
                        gaodun_callback.Data.me.role = "STUDENT";
                        gaodun_callback.Data.currentClass = resp.result.class;

                        gaodun_callback.Sender.setID(gaodun_callback.Data.me.id);

                        gaodun_callback.Sender.newInvocation(
                            "/class/meeting/query?class=" + resp.result.class,
                            true,
                            onCallback
                        );
                    } else {
                        if (gaodun_callback.Methods.isValid(onCallback)) {
                            onCallback(resp);
                        }
                    }
                }
            );
        },
        logout: function (onCallback) {
            gaodun_callback.Methods.removeData();

            gaodun_callback.Sender.setID("");
            gaodun_callback.Sender.setToken("");

            if (gaodun_callback.Methods.isValid(onCallback)) {
                onCallback(resp);
            }
            ;

            window.location.reload();
        },
        changePassword: function (oldPassword, newPassword, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/user/password/change?oldPassword=" + gaodun_callback.Methods.md5(oldPassword) + "&password=" + gaodun_callback.Methods.md5(newPassword),
                onCallback
            );
        },
        changeProfile: function (nickname, mail, phone, qq, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/user/profile/change?nickname=" + encodeURIComponent(nickname) + "&mail=" + encodeURIComponent(mail) + "&phone=" + encodeURIComponent(phone) + "&qq=" + encodeURIComponent(qq),
                function (resp) {
                    if (resp.status === 0) {
                        gaodun_callback.Data.me.nickname = nickname;
                        gaodun_callback.Methods.saveData();
                    }
                    if (gaodun_callback.Methods.isValid(onCallback)) {
                        onCallback(resp);
                    }
                }
            );
        },
        remark: function (remark, userID, classID, name, type, onCallback) {
            var params = "";
            if (type === 0) {
                params = "&student=";
            } else {
                params = "&teacher=";
            }
            gaodun_callback.Sender.newInvocation(
                "/class/student/remark?remark=" + encodeURIComponent(remark) + params + userID + "&class=" + classID + "&name=" + name,
                onCallback
            );
        },
        queryGaodunStudentInfo: function (gaodunStudentID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/gaodun/student/info/query?id=" + gaodunStudentID,
                onCallback
            );
        },
    };
})();


// Group-related methods.
(function () {
    if (gaodun_callback.Methods.isValid(gaodun_callback.Group)) {
        return;
    }

    gaodun_callback.Group = {
        query: function (onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/user/group/query",
                function (resp) {
                    if (resp.status === 0) {
                        gaodun_callback.Data.groups = resp.result.group;
                        // gaodun_callback.Data.currentComponent = gaodun_callback.Data.COMPONENT.CLASS;
                        // gaodun_callback.Methods.saveData();
                    }
                    if (gaodun_callback.Methods.isValid(onCallback)) {
                        onCallback(resp);
                    }
                    ;
                }
            );
        },
        // 查询科目
        querySubject: function (onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/subject/query",
                onCallback
            );
        },
        querySubjectForGroup: function (groupID, onCallback) {
            var s = "/group/subject/query";
            if (groupID) {
                s += "?group=" + groupID;
            }

            gaodun_callback.Sender.newInvocation(s, onCallback);
        },
        // 标签
        // 查询
        queryTag: function (groupID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/tag/query?group=" + groupID,
                onCallback
            );
        },
        //查询预约
        getBooking: function (groupID, subject, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/booking/get?subject=" + subject + "&group=" + groupID,
                onCallback
            );
        },
        //增加预约
        setBooking: function (groupID, subject, date, startTime, phone, question, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/booking/set?subject=" + subject + "&group=" + groupID + "&date=" + date + "&startTime=" + startTime + "&phone=" + encodeURIComponent(phone) + "&question=" + encodeURIComponent(question),
                onCallback
            );
        },
    };
})();

// Class-related methods.
(function () {
    if (gaodun_callback.Methods.isValid(gaodun_callback.Class)) {
        return;
    }

    gaodun_callback.Class = {
        getOneClass: function (classID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/class/get?class=" + classID,
                onCallback
            );
        },
        query: function (onCallback, groupID) {
            var params = "";
            if (gaodun_callback.Data.me.role === "SYSTEM") {
                params += "?group=" + groupID;
            }
            gaodun_callback.Sender.newInvocation(
                "/class/query" + params,
                function (resp) {
                    if (resp.status === 0) {
                        gaodun_callback.Data.classes = resp.result.classList;
                        gaodun_callback.Data.currentGroup = groupID;
                        gaodun_callback.Data.currentComponent = gaodun_callback.Data.COMPONENT.CLASS;
                        gaodun_callback.Methods.saveData();
                    }
                    if (gaodun_callback.Methods.isValid(onCallback)) {
                        onCallback(resp);
                    }
                    ;
                }
            );
        },
        //获取班级笔记
        getNote: function (classID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/note/get?class=" + classID,
                onCallback
            );
        },
        //记笔记
        sendNote: function (classID, meetingID, type, key, subkey, body, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/note/add?class=" + classID + "&meeting=" + meetingID + "&type=" + type +
                "&key=" + key + "&subKey=" + subkey + "&body=" + encodeURIComponent(body),
                onCallback
            );
        },

        //提问题
        askQuestion: function (classID, meetingID, type, key, subkey, question, onCallback) {
            question = encodeURIComponent(question);
            gaodun_callback.Sender.newInvocation(
                "/class/issue/ask?class=" + classID + "&meeting=" + meetingID + "&type=" + type + "&key=" + key + "&subKey=" +
                subkey + "&question=" + question,
                onCallback
            );
        },
        // 获取班级所有问题
        issueGet: function (classID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/class/issue/get?class=" + classID,
                onCallback
            );
        },

        // 回答问题
        answerIssue: function (classID, issueID, answer, onCallback) {
            answer = encodeURIComponent(LZString.compressToBase64(answer));
            gaodun_callback.Sender.newInvocation(
                "/class/issue/answer?class=" + classID + "&issue=" + issueID + "&answer=" + answer,
                onCallback
            );
        },

    };
})();

// Meeting-related methods.
(function () {
    if (gaodun_callback.Methods.isValid(gaodun_callback.Meeting)) {
        return;
    }

    gaodun_callback.Meeting = {
        getOneMeeting: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/get?meeting=" + meetingID,
                onCallback
            );
        },
        queryByClass: function (classID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/class/meeting/query?class=" + classID,
                onCallback
                // function(resp) {
                // 	if (resp.status === 0) {
                // 		// gaodun_callback.Data.currentClass = classID;
                // 		// gaodun_callback.Data.meetings = resp.result.meeting;
                // 		// gaodun_callback.Data.currentComponent = gaodun_callback.Data.COMPONENT.MEETING;

                // 		// gaodun_callback.Methods.saveData();
                // 	}

                // 	if (gaodun_callback.Methods.isValid(onCallback)) {
                // 		onCallback(resp);
                // 	}
                // }
            );
        },
        authorizeVideos: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/video/authorize?meeting=" + meetingID,
                onCallback
            );
        },
        authorizeReplays: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/replay/authorize?meeting=" + meetingID,
                onCallback
            );
        },
        resyncExam: function (meetingID, examID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/exam/resync?meeting=" + meetingID + "&exam=" + examID,
                onCallback
                // function(resp) {
                // 	if (resp.status === 0) {
                // 		gaodun_callback.Meeting.queryByClass(gaodun_callback.Data.currentClass, onCallback);
                // 	} else {
                // 		if (gaodun_callback.Methods.isValid(onCallback)) {
                // 			onCallback(resp);
                // 		}
                // 	}
                // }
            );
        },
        // 获取每节课某一试卷  所有学员的答案
        queryExamAnswer: function (meetingID, examID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/exam/answer/get?meeting=" + meetingID + "&exam=" + examID,
                onCallback
            );
        },

        askForLeave: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/leave?meeting=" + meetingID + "&cancel=0",
                onCallback
            );
        },
        cancelLeave: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/leave?meeting=" + meetingID + "&cancel=1",
                onCallback
            );
        },
        join: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/join?meeting=" + meetingID,
                onCallback
            );
        },
        // get feedback
        getFeedback: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/feedback/get?meeting=" + meetingID,
                onCallback
            );
        }
    };
})();

// Student-related methods.
(function () {
    if (gaodun_callback.Methods.isValid(gaodun_callback.Student)) {
        return;
    }

    gaodun_callback.Student = {
        queryByClass: function (classID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/class/student/query?class=" + classID,
                function (resp) {
                    if (resp.status === 0) {
                        gaodun_callback.Data.students = [];
                        for (var userID in resp.result.user) {
                            gaodun_callback.Data.students.push({
                                id: userID,
                                nickname: resp.result.user[userID].nickname,
                                gaodunStudentID: gaodun_callback.Methods.isValid(resp.result.user[userID].gaodunStudentID) ? resp.result.user[userID].gaodunStudentID : 0,
                                remark: resp.result.user[userID].remark
                            });
                        }
                    }
                    if (gaodun_callback.Methods.isValid(onCallback)) {
                        onCallback(resp);
                    }
                }
            );
        },
    };
})();

// Progress-related methods.
(function () {
    if (gaodun_callback.Methods.isValid(gaodun_callback.Progress)) {
        return;
    }

    gaodun_callback.Progress = {
        queryByClassAndUser: function (classID, userID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/class/progress/query?class=" + classID + "&user=" + userID,
                onCallback
            );
        },
        queryByMeeting: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/progress/query?meeting=" + meetingID,
                onCallback
            );
        },
        queryMineByClass: function (classID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/class/progress/query?class=" + classID,
                onCallback
            );
        },
        queryMineByMeeting: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/progress/query?meeting=" + meetingID,
                onCallback
            );
        },
        finishCourseware: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/courseware/finish?meeting=" + meetingID,
                onCallback
            );
        },
        finishVideo: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/video/finish?meeting=" + meetingID,
                onCallback
            );
        },
        finishMeeting: function (meetingID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/finish?meeting=" + meetingID,
                onCallback
            );
        },
        authorizeExam: function (meetingID, examID, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/exam/authorize?meeting=" + meetingID + "&exam=" + examID,
                onCallback
            );
        },
        answerExam: function (meetingID, examID, answer, onCallback) {
            gaodun_callback.Sender.newInvocation(
                "/meeting/exam/answer?meeting=" + meetingID + "&exam=" + examID + "&answer=" + answer,
                onCallback
            );
        },
        summarizeProgressOfClass: function (classID, onCallback) {
            // Get all meetings within this class.
            gaodun_callback.Meeting.queryByClass(
                classID,
                function (resp) {
                    // Check status code.
                    if (resp.status !== 0) {
                        if (gaodun_callback.Methods.isValid(onCallback)) {
                            onCallback(resp);
                        }
                        return;
                    }

                    // Arrange meetings according to their start time.
                    resp.result.meeting.sort(function (a, b) {
                        return a.startTime - b.startTime;
                    });

                    // Select valid meetings.
                    var meetings = [];
                    var now = (new Date()).getTime();
                    for (var i = 0; i < resp.result.meeting.length; i++) {
                        // Get the meeting itself.
                        var m = resp.result.meeting[i];

                        // Ignore invalid meetings.
                        if (!gaodun_callback.Methods.isValid(m)) {
                            continue;
                        }

                        // Ignore meetings whose start time is after now.
                        if (m.startTime > now) {
                            break;
                        }

                        // Record this meeting.
                        meetings.push(m);
                    }

                    // Get overall progress of each meeting, respectively.
                    var result = {};
                    for (var i = 0; i < meetings.length; i++) {
                        // Get the meeting itself.
                        let index = i;
                        let m = meetings[i];

                        // Ignore invalid meetings.
                        if (!gaodun_callback.Methods.isValid(m)) {
                            continue;
                        }
                        // Ignore meetings whose start time is after now.
                        if (m.startTime > now) {
                            break;
                        }

                        // Get students' progresses of this meeting.
                        gaodun_callback.Progress.queryByMeeting(
                            m.id,
                            function (resp) {
                                // Check status code.
                                if (resp.status !== 0) {
                                    // TODO:
                                    // if (gaodun_callback.Methods.isValid(onCallback)) {
                                    // 	onCallback(resp);
                                    // }
                                    return;
                                }

                                for (var j = 0; j < resp.result.progress.length; j++) {
                                    // Get a student's progress.
                                    var p = resp.result.progress[j];

                                    // Get user ID of this student.
                                    if (!gaodun_callback.Methods.isValid(result[p.userID])) {
                                        // Initiate an array for this student.
                                        result[p.userID] = [];
                                    }

                                    // Append to the array.
                                    result[p.userID].push(p);
                                }

                                if (index === meetings.length - 1) { // This is the last meeting.
                                    gaodun_callback.Data.progresses[classID] = result;
                                    gaodun_callback.Methods.saveData();

                                    if (gaodun_callback.Methods.isValid(onCallback)) {
                                        onCallback({
                                            status: 0,
                                            info: "Okay.",
                                            result: result
                                        });
                                    }
                                }
                            }
                        );
                    }
                }
            );
        },
    };
})();

// getDate from APP || web
(function () {

    gaodun_callback.GetData = {

        getClass: function (typeID, onCallback) {
            gaodun_callback.Config.type = typeID;
            gaodun_callback.Sender.newInvocation(
                "/?type=" + typeID,
                onCallback
            );
        }
    };
})();
// 播放视频
(function () {
    gaodun_callback.DoVideoCmd = {
        playVideo: function (videoID, videoName, onCallback) {
            gaodun_callback.Config.type = 3;
            gaodun_callback.Sender.newInvocation(
                "/?videoID=" + videoID + "&videoName=" + videoName,
                onCallback
            );
        }
    };
})();
window.gaodun_callback = gaodun_callback;
