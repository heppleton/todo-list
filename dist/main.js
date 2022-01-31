(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){return e(1,arguments),t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}function n(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function a(a){if(e(1,arguments),!t(a)&&"number"!=typeof a)return!1;var r=n(a);return!isNaN(Number(r))}var r={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function o(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.width?String(t.width):e.defaultWidth,a=e.formats[n]||e.formats[e.defaultWidth];return a}}var i,s={date:o({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:o({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:o({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},d={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function u(e){return function(t,n){var a,r=n||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,i=r.width?String(r.width):o;a=e.formattingValues[i]||e.formattingValues[o]}else{var s=e.defaultWidth,d=r.width?String(r.width):e.defaultWidth;a=e.values[d]||e.values[s]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function l(e){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=n.width,r=a&&e.matchPatterns[a]||e.matchPatterns[e.defaultMatchWidth],o=t.match(r);if(!o)return null;var i,s=o[0],d=a&&e.parsePatterns[a]||e.parsePatterns[e.defaultParseWidth],u=Array.isArray(d)?h(d,(function(e){return e.test(s)})):c(d,(function(e){return e.test(s)}));i=e.valueCallback?e.valueCallback(u):u,i=n.valueCallback?n.valueCallback(i):i;var l=t.slice(s.length);return{value:i,rest:l}}}function c(e,t){for(var n in e)if(e.hasOwnProperty(n)&&t(e[n]))return n}function h(e,t){for(var n=0;n<e.length;n++)if(t(e[n]))return n}const g={code:"en-US",formatDistance:function(e,t,n){var a,o=r[e];return a="string"==typeof o?o:1===t?o.one:o.other.replace("{{count}}",t.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+a:a+" ago":a},formatLong:s,formatRelative:function(e,t,n,a){return d[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:u({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:u({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:u({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:u({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:u({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(i={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=e.match(i.matchPattern);if(!n)return null;var a=n[0],r=e.match(i.parsePattern);if(!r)return null;var o=i.valueCallback?i.valueCallback(r[0]):r[0];o=t.valueCallback?t.valueCallback(o):o;var s=e.slice(a.length);return{value:o,rest:s}}),era:l({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:l({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:l({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:l({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:l({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function m(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function f(t,a){e(2,arguments);var r=n(t).getTime(),o=m(a);return new Date(r+o)}function y(t,n){e(2,arguments);var a=m(n);return f(t,-a)}var p=864e5;function v(t){e(1,arguments);var a=1,r=n(t),o=r.getUTCDay(),i=(o<a?7:0)+o-a;return r.setUTCDate(r.getUTCDate()-i),r.setUTCHours(0,0,0,0),r}function w(t){e(1,arguments);var a=n(t),r=a.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(r+1,0,4),o.setUTCHours(0,0,0,0);var i=v(o),s=new Date(0);s.setUTCFullYear(r,0,4),s.setUTCHours(0,0,0,0);var d=v(s);return a.getTime()>=i.getTime()?r+1:a.getTime()>=d.getTime()?r:r-1}function b(t){e(1,arguments);var n=w(t),a=new Date(0);a.setUTCFullYear(n,0,4),a.setUTCHours(0,0,0,0);var r=v(a);return r}var C=6048e5;function k(t,a){e(1,arguments);var r=a||{},o=r.locale,i=o&&o.options&&o.options.weekStartsOn,s=null==i?0:m(i),d=null==r.weekStartsOn?s:m(r.weekStartsOn);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var u=n(t),l=u.getUTCDay(),c=(l<d?7:0)+l-d;return u.setUTCDate(u.getUTCDate()-c),u.setUTCHours(0,0,0,0),u}function T(t,a){e(1,arguments);var r=n(t),o=r.getUTCFullYear(),i=a||{},s=i.locale,d=s&&s.options&&s.options.firstWeekContainsDate,u=null==d?1:m(d),l=null==i.firstWeekContainsDate?u:m(i.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var c=new Date(0);c.setUTCFullYear(o+1,0,l),c.setUTCHours(0,0,0,0);var h=k(c,a),g=new Date(0);g.setUTCFullYear(o,0,l),g.setUTCHours(0,0,0,0);var f=k(g,a);return r.getTime()>=h.getTime()?o+1:r.getTime()>=f.getTime()?o:o-1}function D(t,n){e(1,arguments);var a=n||{},r=a.locale,o=r&&r.options&&r.options.firstWeekContainsDate,i=null==o?1:m(o),s=null==a.firstWeekContainsDate?i:m(a.firstWeekContainsDate),d=T(t,n),u=new Date(0);u.setUTCFullYear(d,0,s),u.setUTCHours(0,0,0,0);var l=k(u,n);return l}var S=6048e5;function x(e,t){for(var n=e<0?"-":"",a=Math.abs(e).toString();a.length<t;)a="0"+a;return n+a}const M=function(e,t){var n=e.getUTCFullYear(),a=n>0?n:1-n;return x("yy"===t?a%100:a,t.length)},E=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):x(n+1,2)},P=function(e,t){return x(e.getUTCDate(),t.length)},A=function(e,t){return x(e.getUTCHours()%12||12,t.length)},L=function(e,t){return x(e.getUTCHours(),t.length)},N=function(e,t){return x(e.getUTCMinutes(),t.length)},U=function(e,t){return x(e.getUTCSeconds(),t.length)},W=function(e,t){var n=t.length,a=e.getUTCMilliseconds();return x(Math.floor(a*Math.pow(10,n-3)),t.length)};function O(e,t){var n=e>0?"-":"+",a=Math.abs(e),r=Math.floor(a/60),o=a%60;if(0===o)return n+String(r);var i=t||"";return n+String(r)+i+x(o,2)}function Y(e,t){return e%60==0?(e>0?"-":"+")+x(Math.abs(e)/60,2):q(e,t)}function q(e,t){var n=t||"",a=e>0?"-":"+",r=Math.abs(e);return a+x(Math.floor(r/60),2)+n+x(r%60,2)}const H={G:function(e,t,n){var a=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var a=e.getUTCFullYear(),r=a>0?a:1-a;return n.ordinalNumber(r,{unit:"year"})}return M(e,t)},Y:function(e,t,n,a){var r=T(e,a),o=r>0?r:1-r;return"YY"===t?x(o%100,2):"Yo"===t?n.ordinalNumber(o,{unit:"year"}):x(o,t.length)},R:function(e,t){return x(w(e),t.length)},u:function(e,t){return x(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return x(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,t,n){var a=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return x(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,t,n){var a=e.getUTCMonth();switch(t){case"M":case"MM":return E(e,t);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,t,n){var a=e.getUTCMonth();switch(t){case"L":return String(a+1);case"LL":return x(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(t,a,r,o){var i=function(t,a){e(1,arguments);var r=n(t),o=k(r,a).getTime()-D(r,a).getTime();return Math.round(o/S)+1}(t,o);return"wo"===a?r.ordinalNumber(i,{unit:"week"}):x(i,a.length)},I:function(t,a,r){var o=function(t){e(1,arguments);var a=n(t),r=v(a).getTime()-b(a).getTime();return Math.round(r/C)+1}(t);return"Io"===a?r.ordinalNumber(o,{unit:"week"}):x(o,a.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):P(e,t)},D:function(t,a,r){var o=function(t){e(1,arguments);var a=n(t),r=a.getTime();a.setUTCMonth(0,1),a.setUTCHours(0,0,0,0);var o=a.getTime(),i=r-o;return Math.floor(i/p)+1}(t);return"Do"===a?r.ordinalNumber(o,{unit:"dayOfYear"}):x(o,a.length)},E:function(e,t,n){var a=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,t,n,a){var r=e.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return x(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,n,a){var r=e.getUTCDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return x(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,n){var a=e.getUTCDay(),r=0===a?7:a;switch(t){case"i":return String(r);case"ii":return x(r,t.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,t,n){var a=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,n){var a,r=e.getUTCHours();switch(a=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,n){var a,r=e.getUTCHours();switch(a=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var a=e.getUTCHours()%12;return 0===a&&(a=12),n.ordinalNumber(a,{unit:"hour"})}return A(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):L(e,t)},K:function(e,t,n){var a=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(a,{unit:"hour"}):x(a,t.length)},k:function(e,t,n){var a=e.getUTCHours();return 0===a&&(a=24),"ko"===t?n.ordinalNumber(a,{unit:"hour"}):x(a,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):N(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):U(e,t)},S:function(e,t){return W(e,t)},X:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();if(0===r)return"Z";switch(t){case"X":return Y(r);case"XXXX":case"XX":return q(r);default:return q(r,":")}},x:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"x":return Y(r);case"xxxx":case"xx":return q(r);default:return q(r,":")}},O:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+O(r,":");default:return"GMT"+q(r,":")}},z:function(e,t,n,a){var r=(a._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+O(r,":");default:return"GMT"+q(r,":")}},t:function(e,t,n,a){var r=a._originalDate||e;return x(Math.floor(r.getTime()/1e3),t.length)},T:function(e,t,n,a){return x((a._originalDate||e).getTime(),t.length)}};function F(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}}function j(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}}var B={p:j,P:function(e,t){var n,a=e.match(/(P+)(p+)?/)||[],r=a[1],o=a[2];if(!o)return F(e,t);switch(r){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",F(r,t)).replace("{{time}}",j(o,t))}};const R=B;function z(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var I=["D","DD"],G=["YY","YYYY"];function Q(e){return-1!==I.indexOf(e)}function X(e){return-1!==G.indexOf(e)}function J(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var _=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,V=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,$=/^'([^]*?)'?$/,K=/''/g,Z=/[a-zA-Z]/;function ee(t,r,o){e(2,arguments);var i=String(r),s=o||{},d=s.locale||g,u=d.options&&d.options.firstWeekContainsDate,l=null==u?1:m(u),c=null==s.firstWeekContainsDate?l:m(s.firstWeekContainsDate);if(!(c>=1&&c<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=d.options&&d.options.weekStartsOn,f=null==h?0:m(h),p=null==s.weekStartsOn?f:m(s.weekStartsOn);if(!(p>=0&&p<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!d.localize)throw new RangeError("locale must contain localize property");if(!d.formatLong)throw new RangeError("locale must contain formatLong property");var v=n(t);if(!a(v))throw new RangeError("Invalid time value");var w=z(v),b=y(v,w),C={firstWeekContainsDate:c,weekStartsOn:p,locale:d,_originalDate:v},k=i.match(V).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,R[t])(e,d.formatLong,C):e})).join("").match(_).map((function(e){if("''"===e)return"'";var n=e[0];if("'"===n)return te(e);var a=H[n];if(a)return!s.useAdditionalWeekYearTokens&&X(e)&&J(e,r,t),!s.useAdditionalDayOfYearTokens&&Q(e)&&J(e,r,t),a(b,e,d.localize,C);if(n.match(Z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`");return e})).join("");return k}function te(e){return e.match($)[1].replace(K,"'")}function ne(t,a){e(2,arguments);var r=n(t),o=m(a);return isNaN(o)?new Date(NaN):o?(r.setDate(r.getDate()+o),r):r}function ae(t){e(1,arguments);var a=n(t);return a.setHours(0,0,0,0),a}var re=864e5;function oe(t,n){e(2,arguments);var a=ae(t),r=ae(n),o=a.getTime()-z(a),i=r.getTime()-z(r);return Math.round((o-i)/re)}const ie=(e,t,n)=>{t=(t=t||"No category").slice(0,1).toUpperCase()+t.slice(1,29);const a=Date.now()*Math.random();n&&(n=new Date(n));const r=function(e){if("No due date"==e||!e)return null;const t={Overdue:-1,Today:0,Tomorrow:1,"Next seven days":6};return e in t?ne(new Date,t[e]):new Date(e)};return{title:e,category:t,id:a,completed:null,due:n,details:"",update:function(e){const t={Category:e=>{this.category=e||"No category"},Date:e=>{this.due=r(e)},Details:e=>{this.details=e},Status:e=>{"Active"!=e?null==this.completed&&(this.completed=new Date):this.completed=null},Title:e=>{this.title=e}};for(var n in e)t[n](e[n])},getCompletedString:function(){return this.completed?ee(this.completed,"yyyy-MM-dd"):""},isStatus:function(e){return"All"==e||!("Complete"!=e||!this.completed)||"Active"==e&&!this.completed},isCategory:function(e){return"All categories"==e||e==this.category},getDueString:function(){return this.due?ee(this.due,"yyyy-MM-dd"):""},isRelative:function(e){const t=new Date,n=oe(this.due,t);return{"All dates":()=>!0,"No due date":()=>null==this.due,Overdue:()=>n<0,Today:()=>0==n,Tomorrow:()=>1==n,"Next seven days":()=>n>=0&&n<=6}[e]()},toRelative:function(){if(!this.due)return"No due date";const e=oe(this.due,new Date);return e<0?"Overdue":0==e?"Today":1==e?"Tomorrow":ee(this.due,"d MMMM yyyy")},fromRelative:r}},se=(()=>{let e=[];const t=()=>{const t=JSON.stringify(e);localStorage.setItem("taskspaceJSON",t)};return{add:n=>{e.push(n),t()},remove:n=>{const a=e.findIndex((e=>e.id==n.id));e.splice(a,1),t()},update:n=>{const a=e.findIndex((e=>e.id==n.id));e.splice(a,1,n),t()},retrieve:()=>{if(!localStorage.getItem("taskspaceJSON"))return void(e=(()=>{let e=[];const t=e=>e?ne(new Date,e):null;return[{title:"Ring Edgar about the consultancy contract",category:"Work",details:"Tried ringing yesterday but no reply. Sent email asking him to contact me.",due:-1,completed:null},{title:"Get tickets for the symphony's Smetana concert",category:"Leisure",details:"I'm only really familiar with Die Moldau, but I'm sure his other work is good.",due:6,completed:null},{title:"Clear out the garage",category:"House",details:"There is years of rubbish stacked up in there. It needs to go!",due:null,completed:null},{title:"Buy Daisy a new hat",category:"Shopping",details:"The old one with the owls on it is worn out.",due:14,completed:null},{title:"Check out the new dog park.",category:"Leisure",details:"The address is 1475 Boxwood Avenue. Clement can take Mikki there if it's nice.",due:-5,completed:-6},{title:"Repaint Daisy's room",category:"House",details:"Daisy chose pink...",due:-19,completed:-10},{title:"Finish year-end report",category:"Work",details:"The report will need to go to finance first to check the numbers. I should run it by Ellen in business intelligence at some point too. Her feedback is always fab.",due:-1,completed:-3},{title:"Get Steve to eat better",category:"",details:"Less red meat! Even if he just eats chicken instead that would be a start.",due:30,completed:null},{title:"Invent cold fusion",category:"",details:"Easy! Just give me thirty years...",due:10957,completed:null},{title:"Go to the supermarket...",category:"Shopping",details:"The usual stuff, plus:\n                - extra milk\n                - chicken (cook something nice for Steve?)\n                - marzipan for Ellen's thank you cake\n                - different food for Mikki (gone off her usual for some reason)\n                - a towel for travelling",due:1,completed:null},{title:"Walk round Highfield Lane and back past St Helen's Well",category:"Leisure",details:"Leave Clement and Daisy with Steve. Take time for myself.",due:"0",completed:null},{title:"Speak to manager about promotion",category:"Work",details:"He'll be more receptive once he's back from his holiday, so wait til then.",due:80,completed:null},{title:"Flexi: work from home day",category:"Work",details:"",due:3,completed:null},{title:"Get the boiler maintained",category:"House",details:"The gas man cometh.",due:-1,completed:-1},{title:"Read article about the history of contraception",category:"",details:"Emily says it's really funny??? I have the link in her email. We'll have to see how funny it is. She has a strange sense of humour.",due:"0",completed:"0"}].forEach((n=>{const a=ie(n.title,n.category),r={Details:n.details,Date:t(n.due)};a.update(r),a.completed=t(n.completed),e.push(a)})),e})());const t=localStorage.getItem("taskspaceJSON"),n=JSON.parse(t);e=n.map((e=>{const t=Object.assign(ie(""),e);return e.completed&&(t.completed=new Date(e.completed)),e.due&&(t.due=new Date(e.due)),t}))},getMasterArray:()=>e,getTaskByID:t=>{const n=e.findIndex((e=>e.id==t));return e[n]}}})(),de=(e="")=>{try{const e=document.querySelector(".editing-layout").parentElement,t=se.getTaskByID(e.id);document.querySelector(".display-area").replaceChild(he(t),e)}catch{}try{const t=document.querySelector(".details").parentElement;return t.removeChild(document.querySelector(".details")),t==e}catch{}},ue=(e,t=[],n="",a={})=>{const r=document.createElement(e);r.classList.add(...t);for(let e in a)r.setAttribute(e,a[e]);return r.textContent=n,r},le=(()=>{let e="Due",t=0,n=1;const a=a=>{a==e?[t,n]=[n,t]:(e=a,[t,n]=[0,1])},r=n=>n==e&&0==t;return{addSortBar:e=>{const t=ue("div",["sort-bar"]);return["Title","Category","Complete"==ce.parameters.Status?"Complete":"Due"].forEach((n=>{const o=ue("div",[],n);e?(o.addEventListener("click",(()=>{a(n),ye.loadContent()})),o.append(ue("span",["sort-bar-arrow"],r(n)?" ▲":" ▼"))):(t.setAttribute("cursor","default"),"Due"!=o.textContent&&"Complete"!=o.textContent||(o.textContent="Due/Complete")),t.appendChild(o)})),t},byChoice:a=>(a.sort(((a,r)=>{const o=[{Category:a.category,Complete:a.getCompletedString(),Due:a.getDueString(),Title:a.title},{Category:r.category,Complete:r.getCompletedString(),Due:r.getDueString(),Title:r.title}],i=o[t][e],s=o[n][e];return i.localeCompare(s)})),a),chooseProperty:a,isSorted:r}})(),ce=(()=>{let e=[];const t={Date:"All dates",Status:"Active",Category:"All categories"},n=()=>{e=se.getMasterArray().filter((e=>e.isRelative(t.Date)&&e.isStatus(t.Status)&&e.isCategory(t.Category)))};return{parameters:t,newFilter:n,changeParameter:(e,n)=>{const a={Date:()=>{t.Category="All categories"},Status:()=>{"Active"!=n||le.isSorted("Due")||le.chooseProperty("Due"),"Complete"==n&&(t.Date="All dates",le.isSorted("Complete")||le.chooseProperty("Complete"))},Category:()=>{t.Date="All dates"}};t[e]=n,a[e]()},getParameter,getCategoryCounts:()=>{const e=[],n=se.getMasterArray();n.forEach((t=>{e.includes(t.category)||"No category"==t.category||e.push(t.category)})),e.sort(((e,t)=>e.localeCompare(t))),e.unshift("All categories"),e.push("No category");const a={};e.forEach((e=>{a[e]=0}));const r=n.filter((e=>e.isStatus(t.Status)));return r.forEach((e=>{a[e.category]+=1})),a["All categories"]=r.length,a},getWorkingArray:()=>(n(),e=le.byChoice(e),e)}})(),he=e=>{let t;t=ue("div",["holder"],"",{draggable:"true"}),t.id=e.id;const n=()=>{de();const a=ue("div",["editing-layout"]);a.addEventListener("keydown",(e=>{"Enter"===e.code&&(l(),e.preventDefault())}));const r=ue("div",["end-edit-button"],"↺");r.addEventListener("click",n);const o=ue("span",["text-input"],e.title,{contenteditable:"true","data-placeholder":"Title","data-key":"Title"}),i=ue("span",["text-input"],e.category,{contenteditable:"true","data-placeholder":"Category","data-key":"Category"}),s=ue("input",[],"",{type:"date",value:e.getDueString(),"data-key":"Date",min:ee(new Date,"yyyy-MM-dd")}),d=ue("div",["text-button","lowlight"],"Update",{tabindex:0});d.addEventListener("click",(()=>{l()}));const u=ue("div",["text-input","details"],e.details,{contenteditable:"true","data-placeholder":"Details","data-key":"Details"});u.addEventListener("keydown",(e=>{"Enter"===e.code&&e.stopPropagation()})),a.append(r,o,i,s,d,u);const l=()=>{const t={};a.childNodes.forEach((e=>{e.getAttribute("data-key")&&(t[e.getAttribute("data-key")]=e.textContent||e.value)})),e.update(t),se.update(e),ye.loadContent()};t.setAttribute("draggable","false"),t.replaceChildren(a)};return(()=>{const a=ue("div",["basic-layout","lowlight"]),r=ue("div",["edit-button","icon-button"],"✎");r.addEventListener("click",(e=>{e.stopPropagation(),n()}));const o=ue("div",["text-box"],e.title),i=ue("div",["text-box"],e.category),s=ue("div",["text-box"],e.toRelative());e.isRelative("Overdue")&&e.isStatus("Active")&&t.classList.add("overdue-task");const d=ue("div",["button-holder"]),u=ue("div",["complete-button","icon-button"],"✔");u.addEventListener("click",(()=>{e.update(e.isStatus("Active")?{Status:"Complete"}:{Status:"Active"}),se.update(e),ye.loadContent()}));const l=ue("div",["delete-button","icon-button"],"✘");l.addEventListener("click",(()=>{se.remove(e),ce.getCategoryCounts()[e.category]||ce.parameters.Category!=e.category||ce.changeParameter("Category","All categories"),ye.loadContent()})),d.append(u,l);const c=ue("div",["text-box","details"],e.details,{"data-placeholder":"No details."});a.addEventListener("click",(()=>{de(a)||a.appendChild(c)})),e.isStatus("Complete")&&(t.classList.add("completed-task"),s.textContent=ee(e.completed,"d MMMM yyyy"),r.removeEventListener("click",n),r.textContent=""),a.append(r,o,i,s,d),t.append(a)})(),t},ge=(()=>{const e=ue("div",["display-area"]),t=()=>{if("Complete"==ce.parameters.Status)return"";const e=ue("div",["input-layout"]);e.addEventListener("keydown",(e=>{"Enter"===e.code&&(o(),e.preventDefault())}));const t=ue("span",["text-input"],"",{contenteditable:"true","data-placeholder":"New task"}),n=ue("span",["text-input"],"",{contenteditable:"true","data-placeholder":"Category"}),a=ue("input",[],"",{type:"date",min:ee(new Date,"yyyy-MM-dd")}),r=ue("div",["text-button","lowlight"],"Add",{tabindex:0});r.addEventListener("click",(()=>{o()})),e.append(t,n,a,r);const o=()=>{if(/[0-9a-zA-Z]/.test(t.textContent)){const e=ie(t.textContent,n.textContent,a.value);se.add(e),ye.loadContent()}},i=ce.parameters.Category;"All categories"!=i&&"No category"!=i&&(n.textContent=i);const s=ce.parameters.Date;return"No due date"!=s&&"All dates"!=s&&(a.value=ee(ie().fromRelative(s),"yyyy-MM-dd")),e};return{load:()=>(e.replaceChildren(),ce.getWorkingArray().forEach((t=>{e.appendChild(he(t))})),e.hasChildNodes()||e.appendChild(ue("div",["no-entries"],"There are no tasks which meet your selection.")),[le.addSortBar(!0),e,t()])}})(),me=((()=>{let e;window.addEventListener("dragstart",(t=>{const n=ue("div",["drag-ghost"],t.target.firstChild.children[1].textContent);t.target.appendChild(n),t.dataTransfer.setDragImage(n,10,10),setTimeout((()=>{de(),t.target.classList.add("dragging"),e=t.target.id,document.querySelectorAll(".drop-target").forEach((e=>{e.style.backgroundColor="rgba(0, 0, 0, 0.1)"}))}),0)})),window.addEventListener("dragend",(e=>{e.target.classList.remove("dragging"),e.target.removeChild(document.querySelector(".drag-ghost")),document.querySelectorAll(".drop-target").forEach((e=>{e.style.backgroundColor="rgba(0, 0, 0, 0)"}))})),window.addEventListener("dragover",(e=>{e.preventDefault()})),window.addEventListener("dragenter",(e=>{e.target.classList.contains("drop-target")&&(e.target.style.backgroundColor="rgba(0, 0, 0, 0.2)")})),window.addEventListener("dragleave",(e=>{e.target.classList.contains("drop-target")&&(e.target.style.backgroundColor="rgba(0, 0, 0, 0.1)")})),window.addEventListener("drop",(t=>{if(t.preventDefault(),t.target.classList.contains("drop-target")){const n=se.getTaskByID(e);n.update({[t.target.getAttribute("data-key")]:t.target.getAttribute("data-value")}),se.update(n),ye.loadContent()}}))})(),(()=>{const e=e=>{const n=e.toLowerCase(),a=[];""!=n&&se.getMasterArray().forEach((e=>{(e.title.toLowerCase().includes(n)||e.details.toLowerCase().includes(n))&&a.push(e)})),t(a),(()=>{const e=document.querySelector(".search-text"),t=ue("span",["clear-search-button","lowlight"],"✘");t.addEventListener("click",(()=>{ye.loadContent()})),e.appendChild(t),e.setAttribute("contenteditable","false")})()},t=e=>{const t=document.querySelector(".content-area"),n=document.querySelector(".display-area");n.replaceChildren(),e.forEach((e=>{n.appendChild(he(e))})),n.hasChildNodes()||n.appendChild(ue("div",["no-entries"],"Your search returned no results.")),t.replaceChildren(le.addSortBar(!1),n)};return{addSearchBox:()=>{const t=ue("div",["search-box"]),n=ue("div",["text-input","search-text"],"",{contenteditable:"true","data-placeholder":"Search"}),a=ue("div",["text-button","lowlight"],"Search",{tabindex:0});return a.addEventListener("click",(()=>{e(n.textContent)})),t.addEventListener("keydown",(t=>{"Enter"===t.code&&(e(n.textContent),t.preventDefault())})),t.append(n,a),t}}})()),fe={load:()=>{const e=ce.getCategoryCounts(),t=[{type:"Status",text:"Status",options:["Active","Complete"]},{type:"Category",text:"Category",options:Object.keys(e)},{type:"Date",text:"Due date",options:["All dates","Overdue","Today","Tomorrow","Next seven days","No due date"]}],n=ue("div",["side-menu"]);return t.forEach((t=>{const a=ue("span",["side-menu-subheading"],t.text);t.options.forEach((n=>{const r=ue("span",["submenu-option"],n);var o,i,s;r.addEventListener("click",(()=>{ce.changeParameter(t.type,n),ye.loadContent()})),o=r,i=t.type,["All","All dates","All categories"].includes(s=n)||(o.classList.add("drop-target"),o.setAttribute("data-key",i),o.setAttribute("data-value",s)),((e,t,n)=>{ce.parameters[t]==n&&e.classList.add("selected-option")})(r,t.type,n),"Category"==t.text&&(r.textContent+=` (${e[n]})`),a.appendChild(r)})),n.appendChild(a)})),"Complete"==ce.parameters.Status&&n.removeChild(n.lastChild),n}},ye=(()=>{const e=["#000080","#800000","#008000"];let t=0;const n=ue("div",["header"]),a=ue("div",["header-title"],"Deed");a.addEventListener("click",(()=>{l()}));const r=ue("span",["header-accent"],".");r.addEventListener("click",(()=>{document.documentElement.style.setProperty("--accent-color",e[t]),t++,t==e.length&&(t=0)})),a.appendChild(r);const o=ue("div",["middle-area"]),i=document.createElement("div"),s=ue("div",["content-area"]);o.append(i,s,ue("div",["right-spacing"]));const d=ue("div",["footer"],"© 2022 Heppleton Industries");document.querySelector("body").append(n,o,d);const u=()=>{n.replaceChildren(a,me.addSearchBox()),i.replaceChildren(fe.load()),s.replaceChildren(...ge.load())},l=()=>{const e={Date:"All dates",Status:"Active",Category:"All categories"};for(let t in e)ce.changeParameter(t,e[t]);le.isSorted("Due")||le.chooseProperty("Due"),u()};return se.retrieve(),u(),{loadContent:u}})();localStorage.clear()})();