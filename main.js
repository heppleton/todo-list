(()=>{"use strict";function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(e){return t(1,arguments),e instanceof Date||"object"==typeof e&&"[object Date]"===Object.prototype.toString.call(e)}function n(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function a(a){if(t(1,arguments),!e(a)&&"number"!=typeof a)return!1;var r=n(a);return!isNaN(Number(r))}var r={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function o(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth,a=t.formats[n]||t.formats[t.defaultWidth];return a}}var i,s={date:o({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:o({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:o({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},d={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function u(t){return function(e,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&t.formattingValues){var o=t.defaultFormattingWidth||t.defaultWidth,i=r.width?String(r.width):o;a=t.formattingValues[i]||t.formattingValues[o]}else{var s=t.defaultWidth,d=r.width?String(r.width):t.defaultWidth;a=t.values[d]||t.values[s]}return a[t.argumentCallback?t.argumentCallback(e):e]}}function l(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=n.width,r=a&&t.matchPatterns[a]||t.matchPatterns[t.defaultMatchWidth],o=e.match(r);if(!o)return null;var i,s=o[0],d=a&&t.parsePatterns[a]||t.parsePatterns[t.defaultParseWidth],u=Array.isArray(d)?h(d,(function(t){return t.test(s)})):c(d,(function(t){return t.test(s)}));i=t.valueCallback?t.valueCallback(u):u,i=n.valueCallback?n.valueCallback(i):i;var l=e.slice(s.length);return{value:i,rest:l}}}function c(t,e){for(var n in t)if(t.hasOwnProperty(n)&&e(t[n]))return n}function h(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n}const g={code:"en-US",formatDistance:function(t,e,n){var a,o=r[t];return a="string"==typeof o?o:1===e?o.one:o.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a},formatLong:s,formatRelative:function(t,e,n,a){return d[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:u({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:u({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:u({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:u({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:u({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(i={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(i.matchPattern);if(!n)return null;var a=n[0],r=t.match(i.parsePattern);if(!r)return null;var o=i.valueCallback?i.valueCallback(r[0]):r[0];o=e.valueCallback?e.valueCallback(o):o;var s=t.slice(a.length);return{value:o,rest:s}}),era:l({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:l({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:l({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:l({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:l({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function m(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function f(e,a){t(2,arguments);var r=n(e).getTime(),o=m(a);return new Date(r+o)}function y(e,n){t(2,arguments);var a=m(n);return f(e,-a)}var p=864e5;function v(e){t(1,arguments);var a=1,r=n(e),o=r.getUTCDay(),i=(o<a?7:0)+o-a;return r.setUTCDate(r.getUTCDate()-i),r.setUTCHours(0,0,0,0),r}function w(e){t(1,arguments);var a=n(e),r=a.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(r+1,0,4),o.setUTCHours(0,0,0,0);var i=v(o),s=new Date(0);s.setUTCFullYear(r,0,4),s.setUTCHours(0,0,0,0);var d=v(s);return a.getTime()>=i.getTime()?r+1:a.getTime()>=d.getTime()?r:r-1}function b(e){t(1,arguments);var n=w(e),a=new Date(0);a.setUTCFullYear(n,0,4),a.setUTCHours(0,0,0,0);var r=v(a);return r}var C=6048e5;function k(e,a){t(1,arguments);var r=a||{},o=r.locale,i=o&&o.options&&o.options.weekStartsOn,s=null==i?0:m(i),d=null==r.weekStartsOn?s:m(r.weekStartsOn);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var u=n(e),l=u.getUTCDay(),c=(l<d?7:0)+l-d;return u.setUTCDate(u.getUTCDate()-c),u.setUTCHours(0,0,0,0),u}function T(e,a){t(1,arguments);var r=n(e),o=r.getUTCFullYear(),i=a||{},s=i.locale,d=s&&s.options&&s.options.firstWeekContainsDate,u=null==d?1:m(d),l=null==i.firstWeekContainsDate?u:m(i.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var c=new Date(0);c.setUTCFullYear(o+1,0,l),c.setUTCHours(0,0,0,0);var h=k(c,a),g=new Date(0);g.setUTCFullYear(o,0,l),g.setUTCHours(0,0,0,0);var f=k(g,a);return r.getTime()>=h.getTime()?o+1:r.getTime()>=f.getTime()?o:o-1}function D(e,n){t(1,arguments);var a=n||{},r=a.locale,o=r&&r.options&&r.options.firstWeekContainsDate,i=null==o?1:m(o),s=null==a.firstWeekContainsDate?i:m(a.firstWeekContainsDate),d=T(e,n),u=new Date(0);u.setUTCFullYear(d,0,s),u.setUTCHours(0,0,0,0);var l=k(u,n);return l}var S=6048e5;function x(t,e){for(var n=t<0?"-":"",a=Math.abs(t).toString();a.length<e;)a="0"+a;return n+a}const M=function(t,e){var n=t.getUTCFullYear(),a=n>0?n:1-n;return x("yy"===e?a%100:a,e.length)},E=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):x(n+1,2)},P=function(t,e){return x(t.getUTCDate(),e.length)},A=function(t,e){return x(t.getUTCHours()%12||12,e.length)},L=function(t,e){return x(t.getUTCHours(),e.length)},N=function(t,e){return x(t.getUTCMinutes(),e.length)},U=function(t,e){return x(t.getUTCSeconds(),e.length)},W=function(t,e){var n=e.length,a=t.getUTCMilliseconds();return x(Math.floor(a*Math.pow(10,n-3)),e.length)};function O(t,e){var n=t>0?"-":"+",a=Math.abs(t),r=Math.floor(a/60),o=a%60;if(0===o)return n+String(r);var i=e||"";return n+String(r)+i+x(o,2)}function Y(t,e){return t%60==0?(t>0?"-":"+")+x(Math.abs(t)/60,2):q(t,e)}function q(t,e){var n=e||"",a=t>0?"-":"+",r=Math.abs(t);return a+x(Math.floor(r/60),2)+n+x(r%60,2)}const H={G:function(t,e,n){var a=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var a=t.getUTCFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return M(t,e)},Y:function(t,e,n,a){var r=T(t,a),o=r>0?r:1-r;return"YY"===e?x(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):x(o,e.length)},R:function(t,e){return x(w(t),e.length)},u:function(t,e){return x(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var a=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(a);case"QQ":return x(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(t,e,n){var a=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(a);case"qq":return x(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(t,e,n){var a=t.getUTCMonth();switch(e){case"M":case"MM":return E(t,e);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(t,e,n){var a=t.getUTCMonth();switch(e){case"L":return String(a+1);case"LL":return x(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(e,a,r,o){var i=function(e,a){t(1,arguments);var r=n(e),o=k(r,a).getTime()-D(r,a).getTime();return Math.round(o/S)+1}(e,o);return"wo"===a?r.ordinalNumber(i,{unit:"week"}):x(i,a.length)},I:function(e,a,r){var o=function(e){t(1,arguments);var a=n(e),r=v(a).getTime()-b(a).getTime();return Math.round(r/C)+1}(e);return"Io"===a?r.ordinalNumber(o,{unit:"week"}):x(o,a.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):P(t,e)},D:function(e,a,r){var o=function(e){t(1,arguments);var a=n(e),r=a.getTime();a.setUTCMonth(0,1),a.setUTCHours(0,0,0,0);var o=a.getTime(),i=r-o;return Math.floor(i/p)+1}(e);return"Do"===a?r.ordinalNumber(o,{unit:"dayOfYear"}):x(o,a.length)},E:function(t,e,n){var a=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(t,e,n,a){var r=t.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return x(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(t,e,n,a){var r=t.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return x(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(t,e,n){var a=t.getUTCDay(),r=0===a?7:a;switch(e){case"i":return String(r);case"ii":return x(r,e.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(t,e,n){var a=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(t,e,n){var a,r=t.getUTCHours();switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(t,e,n){var a,r=t.getUTCHours();switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var a=t.getUTCHours()%12;return 0===a&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return A(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):L(t,e)},K:function(t,e,n){var a=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(a,{unit:"hour"}):x(a,e.length)},k:function(t,e,n){var a=t.getUTCHours();return 0===a&&(a=24),"ko"===e?n.ordinalNumber(a,{unit:"hour"}):x(a,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):N(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):U(t,e)},S:function(t,e){return W(t,e)},X:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();if(0===r)return"Z";switch(e){case"X":return Y(r);case"XXXX":case"XX":return q(r);default:return q(r,":")}},x:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"x":return Y(r);case"xxxx":case"xx":return q(r);default:return q(r,":")}},O:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+O(r,":");default:return"GMT"+q(r,":")}},z:function(t,e,n,a){var r=(a._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+O(r,":");default:return"GMT"+q(r,":")}},t:function(t,e,n,a){var r=a._originalDate||t;return x(Math.floor(r.getTime()/1e3),e.length)},T:function(t,e,n,a){return x((a._originalDate||t).getTime(),e.length)}};function F(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}}function j(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}}var B={p:j,P:function(t,e){var n,a=t.match(/(P+)(p+)?/)||[],r=a[1],o=a[2];if(!o)return F(t,e);switch(r){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",F(r,e)).replace("{{time}}",j(o,e))}};const R=B;function z(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}var I=["D","DD"],G=["YY","YYYY"];function Q(t){return-1!==I.indexOf(t)}function X(t){return-1!==G.indexOf(t)}function J(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var _=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,V=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,$=/^'([^]*?)'?$/,K=/''/g,Z=/[a-zA-Z]/;function tt(e,r,o){t(2,arguments);var i=String(r),s=o||{},d=s.locale||g,u=d.options&&d.options.firstWeekContainsDate,l=null==u?1:m(u),c=null==s.firstWeekContainsDate?l:m(s.firstWeekContainsDate);if(!(c>=1&&c<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=d.options&&d.options.weekStartsOn,f=null==h?0:m(h),p=null==s.weekStartsOn?f:m(s.weekStartsOn);if(!(p>=0&&p<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!d.localize)throw new RangeError("locale must contain localize property");if(!d.formatLong)throw new RangeError("locale must contain formatLong property");var v=n(e);if(!a(v))throw new RangeError("Invalid time value");var w=z(v),b=y(v,w),C={firstWeekContainsDate:c,weekStartsOn:p,locale:d,_originalDate:v},k=i.match(V).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,R[e])(t,d.formatLong,C):t})).join("").match(_).map((function(t){if("''"===t)return"'";var n=t[0];if("'"===n)return et(t);var a=H[n];if(a)return!s.useAdditionalWeekYearTokens&&X(t)&&J(t,r,e),!s.useAdditionalDayOfYearTokens&&Q(t)&&J(t,r,e),a(b,t,d.localize,C);if(n.match(Z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`");return t})).join("");return k}function et(t){return t.match($)[1].replace(K,"'")}function nt(e,a){t(2,arguments);var r=n(e),o=m(a);return isNaN(o)?new Date(NaN):o?(r.setDate(r.getDate()+o),r):r}function at(e){t(1,arguments);var a=n(e);return a.setHours(0,0,0,0),a}var rt=864e5;function ot(e,n){t(2,arguments);var a=at(e),r=at(n),o=a.getTime()-z(a),i=r.getTime()-z(r);return Math.round((o-i)/rt)}const it=(t,e,n)=>{e=(e=e||"No category").slice(0,1).toUpperCase()+e.slice(1,29),t=t.slice(0,149);const a=Date.now()*Math.random();function r(t){if("No due date"==t||!t)return null;const e={Overdue:-1,Today:0,Tomorrow:1,"Next seven days":6};return t in e?nt(new Date,e[t]):new Date(t)}return n&&(n=new Date(n)),{title:t,category:e,id:a,status:{completed:null,isStatus:function(t){return"All"==t||!("Complete"!=t||!this.completed)||"Active"==t&&!this.completed},getCompletedString:function(){return this.completed?tt(this.completed,"yyyy-MM-dd"):""}},due:n,details:"",update:function(t){const e={Category:t=>{this.category=t||"No category"},Date:t=>{this.due=r(t)},Details:t=>{this.details=t.slice(0,2999)},Status:t=>{"Active"!=t?null==this.status.completed&&(this.status.completed=new Date):this.status.completed=null},Title:t=>{this.title=t}};for(var n in t)e[n](t[n])},isCategory:function(t){return"All categories"==t||t==this.category},getDueString:function(){return this.due?tt(this.due,"yyyy-MM-dd"):""},isRelative:function(t){const e=new Date,n=ot(this.due,e);return{"All dates":()=>!0,"No due date":()=>null==this.due,Overdue:()=>n<0,Today:()=>0==n,Tomorrow:()=>1==n,"Next seven days":()=>n>=0&&n<=6}[t]()},toRelative:function(){if(!this.due)return"No due date";const t=ot(this.due,new Date);return t<0?"Overdue":0==t?"Today":1==t?"Tomorrow":tt(this.due,"d MMMM yyyy")},fromRelative:r}},st=(()=>{let t=[];const e=()=>{const e=JSON.stringify(t);localStorage.setItem("taskspaceJSON",e)};return{add:n=>{t.push(n),e()},remove:n=>{const a=t.findIndex((t=>t.id==n.id));t.splice(a,1),e()},update:n=>{const a=t.findIndex((t=>t.id==n.id));t.splice(a,1,n),e()},retrieve:()=>{if(!localStorage.getItem("taskspaceJSON"))return void(t=(()=>{let t=[];const e=t=>t?nt(new Date,t):null;return[{title:"Ring Edgar about the consultancy contract",category:"Work",details:"Tried ringing yesterday but no reply. Sent email asking him to contact me.",due:-1,completed:null},{title:"Get tickets for the symphony's Smetana concert",category:"Leisure",details:"I'm only really familiar with Die Moldau, but I'm sure his other work is good.",due:6,completed:null},{title:"Clear out the garage",category:"House",details:"There is years of rubbish stacked up in there. It needs to go!",due:null,completed:null},{title:"Buy Daisy a new hat",category:"Shopping",details:"The old one with the owls on it is worn out.",due:14,completed:null},{title:"Check out the new dog park.",category:"Leisure",details:"The address is 1475 Boxwood Avenue. Clement can take Mikki there if it's nice.",due:-5,completed:-6},{title:"Repaint Daisy's room",category:"House",details:"Daisy chose pink...",due:-19,completed:-10},{title:"Finish year-end report",category:"Work",details:"The report will need to go to finance first to check the numbers. I should run it by Ellen in business intelligence at some point too. Her feedback is always fab.",due:-1,completed:-3},{title:"Get Steve to eat better",category:"",details:"Less red meat! Even if he just eats chicken instead that would be a start.",due:30,completed:null},{title:"Invent cold fusion",category:"",details:"Easy! Just give me thirty years...",due:10957,completed:null},{title:"Go to the supermarket...",category:"Shopping",details:"The usual stuff, plus:\n                - extra milk\n                - chicken (cook something nice for Steve?)\n                - marzipan for Ellen's thank you cake\n                - different food for Mikki (gone off her usual for some reason)\n                - a towel for travelling",due:1,completed:null},{title:"Walk round Highfield Lane and back past St Helen's Well",category:"Leisure",details:"Leave Clement and Daisy with Steve. Take time for myself.",due:"0",completed:null},{title:"Speak to manager about promotion",category:"Work",details:"He'll be more receptive once he's back from his holiday, so wait til then.",due:80,completed:null},{title:"Flexi: work from home day",category:"Work",details:"",due:3,completed:null},{title:"Get the boiler maintained",category:"House",details:"The gas man cometh.",due:-1,completed:-1},{title:"Read article about the history of contraception",category:"",details:"Emily says it's really funny??? I have the link in her email. We'll have to see how funny it is. She has a strange sense of humour.",due:"0",completed:"0"}].forEach((n=>{const a=it(n.title,n.category),r={Details:n.details,Date:e(n.due)};a.update(r),a.status.completed=e(n.completed),t.push(a)})),t})());const e=localStorage.getItem("taskspaceJSON"),n=JSON.parse(e);t=n.map((t=>{const e=Object.assign(it(""),t);return t.status.completed&&(e.status.completed=new Date(t.status.completed)),t.due&&(e.due=new Date(t.due)),e}))},getMasterArray:()=>t,getTaskByID:e=>{const n=t.findIndex((t=>t.id==e));return t[n]}}})(),dt=(t="")=>{try{const t=document.querySelector(".editing-layout").parentElement,e=st.getTaskByID(t.id);document.querySelector(".display-area").replaceChild(ht(e),t)}catch{}try{const e=document.querySelector(".details").parentElement;return e.removeChild(document.querySelector(".details")),e==t}catch{}},ut=(t,e=[],n="",a={})=>{const r=document.createElement(t);r.classList.add(...e);for(let t in a)r.setAttribute(t,a[t]);return r.textContent=n,r},lt=(()=>{let t="Due",e=0,n=1;const a=a=>{a==t?[e,n]=[n,e]:(t=a,[e,n]=[0,1])},r=n=>n==t&&0==e;return{addSortBar:t=>{const e=ut("div",["sort-bar"]);return["Title","Category","Complete"==ct.getParameter("Status")?"Complete":"Due"].forEach((n=>{const o=ut("div",[],n);t?(o.addEventListener("click",(()=>{a(n),yt.loadContent()})),o.append(ut("span",["sort-bar-arrow"],r(n)?" ▲":" ▼"))):(e.setAttribute("cursor","default"),"Due"!=o.textContent&&"Complete"!=o.textContent||(o.textContent="Due/Complete")),e.appendChild(o)})),e},byChoice:a=>(a.sort(((a,r)=>{const o=[{Category:a.category,Complete:a.status.getCompletedString(),Due:a.getDueString(),Title:a.title},{Category:r.category,Complete:r.status.getCompletedString(),Due:r.getDueString(),Title:r.title}],i=o[e][t],s=o[n][t];return i.localeCompare(s)})),a),chooseProperty:a,isSorted:r}})(),ct=(()=>{let t=[];const e={Date:"All dates",Status:"Active",Category:"All categories"},n=()=>{t=st.getMasterArray().filter((t=>t.isRelative(e.Date)&&t.status.isStatus(e.Status)&&t.isCategory(e.Category)))};return{newFilter:n,changeParameter:(t,n)=>{const a={Date:()=>{e.Category="All categories"},Status:()=>{"Active"!=n||lt.isSorted("Due")||lt.chooseProperty("Due"),"Complete"==n&&(e.Date="All dates",lt.isSorted("Complete")||lt.chooseProperty("Complete"))},Category:()=>{e.Date="All dates"}};e[t]=n,a[t]()},getParameter:t=>e[t],getCategoryCounts:()=>{const t=[],n=st.getMasterArray();n.forEach((e=>{t.includes(e.category)||"No category"==e.category||t.push(e.category)})),t.sort(((t,e)=>t.localeCompare(e))),t.unshift("All categories"),t.push("No category");const a={};t.forEach((t=>{a[t]=0}));const r=n.filter((t=>t.status.isStatus(e.Status)));return r.forEach((t=>{a[t.category]+=1})),a["All categories"]=r.length,a},getWorkingArray:()=>(n(),t=lt.byChoice(t),t)}})(),ht=t=>{let e;e=ut("div",["holder"],"",{draggable:"true"}),e.id=t.id;const n=()=>{dt();const a=ut("div",["editing-layout"]);a.addEventListener("keydown",(t=>{"Enter"===t.code&&(l(),t.preventDefault())}));const r=ut("div",["end-edit-button"],"↺");r.addEventListener("click",n);const o=ut("span",["text-input"],t.title,{contenteditable:"true","data-placeholder":"Title","data-key":"Title"}),i=ut("span",["text-input"],t.category,{contenteditable:"true","data-placeholder":"Category","data-key":"Category"}),s=ut("input",[],"",{type:"date",value:t.getDueString(),"data-key":"Date",min:tt(new Date,"yyyy-MM-dd")}),d=ut("div",["text-button","lowlight"],"Update",{tabindex:0});d.addEventListener("click",(()=>{l()}));const u=ut("div",["text-input","details"],t.details,{contenteditable:"true","data-placeholder":"Details","data-key":"Details"});u.addEventListener("keydown",(t=>{"Enter"===t.code&&t.stopPropagation()})),a.append(r,o,i,s,d,u);const l=()=>{const e={};a.childNodes.forEach((t=>{t.getAttribute("data-key")&&(e[t.getAttribute("data-key")]=t.textContent||t.value)})),t.update(e),st.update(t),yt.loadContent()};e.setAttribute("draggable","false"),e.replaceChildren(a)};return(()=>{const a=ut("div",["basic-layout","lowlight"]),r=ut("div",["edit-button","icon-button"],"✎");r.addEventListener("click",(t=>{t.stopPropagation(),n()}));const o=ut("div",["text-box"],t.title),i=ut("div",["text-box"],t.category),s=ut("div",["text-box"],t.toRelative());t.isRelative("Overdue")&&t.status.isStatus("Active")&&e.classList.add("overdue-task");const d=ut("div",["button-holder"]),u=ut("div",["complete-button","icon-button"],"✔");u.addEventListener("click",(()=>{t.update(t.status.isStatus("Active")?{Status:"Complete"}:{Status:"Active"}),st.update(t),yt.loadContent()}));const l=ut("div",["delete-button","icon-button"],"✘");l.addEventListener("click",(()=>{st.remove(t),ct.getCategoryCounts()[t.category]||ct.getParameter("Category")!=t.category||ct.changeParameter("Category","All categories"),yt.loadContent()})),d.append(u,l);const c=ut("div",["text-box","details"],t.details,{"data-placeholder":"No details."});a.addEventListener("click",(()=>{dt(a)||a.appendChild(c)})),t.isStatus("Complete")&&(e.classList.add("completed-task"),s.textContent=tt(t.status.completed,"d MMMM yyyy"),r.removeEventListener("click",n),r.textContent=""),a.append(r,o,i,s,d),e.append(a)})(),e},gt=(()=>{const t=ut("div",["display-area"]),e=()=>{if("Complete"==ct.getParameter("Status"))return"";const t=ut("div",["input-layout"]);t.addEventListener("keydown",(t=>{"Enter"===t.code&&(o(),t.preventDefault())}));const e=ut("span",["text-input"],"",{contenteditable:"true","data-placeholder":"New task"}),n=ut("span",["text-input"],"",{contenteditable:"true","data-placeholder":"Category"}),a=ut("input",[],"",{type:"date",min:tt(new Date,"yyyy-MM-dd")}),r=ut("div",["text-button","lowlight"],"Add",{tabindex:0});r.addEventListener("click",(()=>{o()})),t.append(e,n,a,r);const o=()=>{if(/[0-9a-zA-Z]/.test(e.textContent)){const t=it(e.textContent,n.textContent,a.value);st.add(t),yt.loadContent()}},i=ct.getParameter("Category");"All categories"!=i&&"No category"!=i&&(n.textContent=i);const s=ct.getParameter("Date");return"No due date"!=s&&"All dates"!=s&&(a.value=tt(it().fromRelative(s),"yyyy-MM-dd")),t};return{load:()=>(t.replaceChildren(),ct.getWorkingArray().forEach((e=>{t.appendChild(ht(e))})),t.hasChildNodes()||t.appendChild(ut("div",["no-entries"],"There are no tasks which meet your selection.")),[lt.addSortBar(!0),t,e()])}})(),mt=((()=>{let t;window.addEventListener("dragstart",(e=>{const n=ut("div",["drag-ghost"],e.target.firstChild.children[1].textContent);e.target.appendChild(n),e.dataTransfer.setDragImage(n,10,10),setTimeout((()=>{dt(),e.target.classList.add("dragging"),t=e.target.id,document.querySelectorAll(".drop-target").forEach((t=>{t.style.backgroundColor="rgba(0, 0, 0, 0.1)"}))}),0)})),window.addEventListener("dragend",(t=>{t.target.classList.remove("dragging"),t.target.removeChild(document.querySelector(".drag-ghost")),document.querySelectorAll(".drop-target").forEach((t=>{t.style.backgroundColor="rgba(0, 0, 0, 0)"}))})),window.addEventListener("dragover",(t=>{t.preventDefault()})),window.addEventListener("dragenter",(t=>{t.target.classList.contains("drop-target")&&(t.target.style.backgroundColor="rgba(0, 0, 0, 0.2)")})),window.addEventListener("dragleave",(t=>{t.target.classList.contains("drop-target")&&(t.target.style.backgroundColor="rgba(0, 0, 0, 0.1)")})),window.addEventListener("drop",(e=>{if(e.preventDefault(),e.target.classList.contains("drop-target")){const n=st.getTaskByID(t);n.update({[e.target.getAttribute("data-key")]:e.target.getAttribute("data-value")}),st.update(n),yt.loadContent()}}))})(),(()=>{const t=t=>{const n=t.toLowerCase(),a=[];""!=n&&st.getMasterArray().forEach((t=>{(t.title.toLowerCase().includes(n)||t.details.toLowerCase().includes(n))&&a.push(t)})),e(a),(()=>{const t=document.querySelector(".search-text"),e=ut("span",["clear-search-button","lowlight"],"✘");e.addEventListener("click",(()=>{yt.loadContent()})),t.appendChild(e),t.setAttribute("contenteditable","false")})()},e=t=>{const e=document.querySelector(".content-area"),n=document.querySelector(".display-area");n.replaceChildren(),t.forEach((t=>{n.appendChild(ht(t))})),n.hasChildNodes()||n.appendChild(ut("div",["no-entries"],"Your search returned no results.")),e.replaceChildren(lt.addSortBar(!1),n)};return{addSearchBox:()=>{const e=ut("div",["search-box"]),n=ut("div",["text-input","search-text"],"",{contenteditable:"true","data-placeholder":"Search"}),a=ut("div",["text-button","lowlight"],"Search",{tabindex:0});return a.addEventListener("click",(()=>{t(n.textContent)}),{once:!0}),e.addEventListener("keydown",(e=>{"Enter"===e.code&&(t(n.textContent),e.preventDefault())})),e.append(n,a),e}}})()),ft={load:()=>{const t=ct.getCategoryCounts(),e=[{type:"Status",text:"Status",options:["Active","Complete"]},{type:"Category",text:"Category",options:Object.keys(t)},{type:"Date",text:"Due date",options:["All dates","Overdue","Today","Tomorrow","Next seven days","No due date"]}],n=ut("div",["side-menu"]);return e.forEach((e=>{const a=ut("span",["side-menu-subheading"],e.text);e.options.forEach((n=>{const r=ut("span",["submenu-option"],n);var o,i,s;r.addEventListener("click",(()=>{ct.changeParameter(e.type,n),yt.loadContent()})),o=r,i=e.type,["All","All dates","All categories"].includes(s=n)||(o.classList.add("drop-target"),o.setAttribute("data-key",i),o.setAttribute("data-value",s)),((t,e,n)=>{ct.getParameter(e)==n&&t.classList.add("selected-option")})(r,e.type,n),"Category"==e.text&&(r.textContent+=` (${t[n]})`),a.appendChild(r)})),n.appendChild(a)})),"Complete"==ct.getParameter("Status")&&n.removeChild(n.lastChild),n}},yt=(()=>{const t=["#000080","#800000","#008000"];let e=0;const n=ut("div",["header"]),a=ut("div",["header-title"],"Deed");a.addEventListener("click",(()=>{l()}));const r=ut("span",["header-accent"],".");r.addEventListener("click",(()=>{document.documentElement.style.setProperty("--accent-color",t[e]),e++,e==t.length&&(e=0)})),a.appendChild(r);const o=ut("div",["middle-area"]),i=document.createElement("div"),s=ut("div",["content-area"]);o.append(i,s,ut("div",["right-spacing"]));const d=ut("div",["footer"],"© 2022 Heppleton Industries");document.querySelector("body").append(n,o,d);const u=()=>{n.replaceChildren(a,mt.addSearchBox()),i.replaceChildren(ft.load()),s.replaceChildren(...gt.load())},l=()=>{const t={Date:"All dates",Status:"Active",Category:"All categories"};for(let e in t)ct.changeParameter(e,t[e]);lt.isSorted("Due")||lt.chooseProperty("Due"),u()};return st.retrieve(),u(),{loadContent:u}})();localStorage.clear()})();