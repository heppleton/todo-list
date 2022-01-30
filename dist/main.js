(()=>{"use strict";function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(e){return t(1,arguments),e instanceof Date||"object"==typeof e&&"[object Date]"===Object.prototype.toString.call(e)}function n(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(r){if(t(1,arguments),!e(r)&&"number"!=typeof r)return!1;var a=n(r);return!isNaN(Number(a))}var a={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function o(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth,r=t.formats[n]||t.formats[t.defaultWidth];return r}}var i,d={date:o({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:o({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:o({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},s={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function u(t){return function(e,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&t.formattingValues){var o=t.defaultFormattingWidth||t.defaultWidth,i=a.width?String(a.width):o;r=t.formattingValues[i]||t.formattingValues[o]}else{var d=t.defaultWidth,s=a.width?String(a.width):t.defaultWidth;r=t.values[s]||t.values[d]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function c(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],o=e.match(a);if(!o)return null;var i,d=o[0],s=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],u=Array.isArray(s)?h(s,(function(t){return t.test(d)})):l(s,(function(t){return t.test(d)}));i=t.valueCallback?t.valueCallback(u):u,i=n.valueCallback?n.valueCallback(i):i;var c=e.slice(d.length);return{value:i,rest:c}}}function l(t,e){for(var n in t)if(t.hasOwnProperty(n)&&e(t[n]))return n}function h(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n}const g={code:"en-US",formatDistance:function(t,e,n){var r,o=a[t];return r="string"==typeof o?o:1===e?o.one:o.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:d,formatRelative:function(t,e,n,r){return s[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:u({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:u({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:u({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:u({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:u({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(i={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(i.matchPattern);if(!n)return null;var r=n[0],a=t.match(i.parsePattern);if(!a)return null;var o=i.valueCallback?i.valueCallback(a[0]):a[0];o=e.valueCallback?e.valueCallback(o):o;var d=t.slice(r.length);return{value:o,rest:d}}),era:c({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:c({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:c({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:c({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:c({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function m(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function f(e,r){t(2,arguments);var a=n(e).getTime(),o=m(r);return new Date(a+o)}function y(e,n){t(2,arguments);var r=m(n);return f(e,-r)}var p=864e5;function v(e){t(1,arguments);var r=1,a=n(e),o=a.getUTCDay(),i=(o<r?7:0)+o-r;return a.setUTCDate(a.getUTCDate()-i),a.setUTCHours(0,0,0,0),a}function w(e){t(1,arguments);var r=n(e),a=r.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(a+1,0,4),o.setUTCHours(0,0,0,0);var i=v(o),d=new Date(0);d.setUTCFullYear(a,0,4),d.setUTCHours(0,0,0,0);var s=v(d);return r.getTime()>=i.getTime()?a+1:r.getTime()>=s.getTime()?a:a-1}function b(e){t(1,arguments);var n=w(e),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=v(r);return a}var C=6048e5;function T(e,r){t(1,arguments);var a=r||{},o=a.locale,i=o&&o.options&&o.options.weekStartsOn,d=null==i?0:m(i),s=null==a.weekStartsOn?d:m(a.weekStartsOn);if(!(s>=0&&s<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var u=n(e),c=u.getUTCDay(),l=(c<s?7:0)+c-s;return u.setUTCDate(u.getUTCDate()-l),u.setUTCHours(0,0,0,0),u}function D(e,r){t(1,arguments);var a=n(e),o=a.getUTCFullYear(),i=r||{},d=i.locale,s=d&&d.options&&d.options.firstWeekContainsDate,u=null==s?1:m(s),c=null==i.firstWeekContainsDate?u:m(i.firstWeekContainsDate);if(!(c>=1&&c<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(o+1,0,c),l.setUTCHours(0,0,0,0);var h=T(l,r),g=new Date(0);g.setUTCFullYear(o,0,c),g.setUTCHours(0,0,0,0);var f=T(g,r);return a.getTime()>=h.getTime()?o+1:a.getTime()>=f.getTime()?o:o-1}function x(e,n){t(1,arguments);var r=n||{},a=r.locale,o=a&&a.options&&a.options.firstWeekContainsDate,i=null==o?1:m(o),d=null==r.firstWeekContainsDate?i:m(r.firstWeekContainsDate),s=D(e,n),u=new Date(0);u.setUTCFullYear(s,0,d),u.setUTCHours(0,0,0,0);var c=T(u,n);return c}var M=6048e5;function S(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const k=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return S("yy"===e?r%100:r,e.length)},E=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):S(n+1,2)},P=function(t,e){return S(t.getUTCDate(),e.length)},A=function(t,e){return S(t.getUTCHours()%12||12,e.length)},N=function(t,e){return S(t.getUTCHours(),e.length)},U=function(t,e){return S(t.getUTCMinutes(),e.length)},L=function(t,e){return S(t.getUTCSeconds(),e.length)},W=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return S(Math.floor(r*Math.pow(10,n-3)),e.length)};function O(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),o=r%60;if(0===o)return n+String(a);var i=e||"";return n+String(a)+i+S(o,2)}function Y(t,e){return t%60==0?(t>0?"-":"+")+S(Math.abs(t)/60,2):q(t,e)}function q(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+S(Math.floor(a/60),2)+n+S(a%60,2)}const j={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return k(t,e)},Y:function(t,e,n,r){var a=D(t,r),o=a>0?a:1-a;return"YY"===e?S(o%100,2):"Yo"===e?n.ordinalNumber(o,{unit:"year"}):S(o,e.length)},R:function(t,e){return S(w(t),e.length)},u:function(t,e){return S(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return S(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return S(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return E(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return S(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(e,r,a,o){var i=function(e,r){t(1,arguments);var a=n(e),o=T(a,r).getTime()-x(a,r).getTime();return Math.round(o/M)+1}(e,o);return"wo"===r?a.ordinalNumber(i,{unit:"week"}):S(i,r.length)},I:function(e,r,a){var o=function(e){t(1,arguments);var r=n(e),a=v(r).getTime()-b(r).getTime();return Math.round(a/C)+1}(e);return"Io"===r?a.ordinalNumber(o,{unit:"week"}):S(o,r.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):P(t,e)},D:function(e,r,a){var o=function(e){t(1,arguments);var r=n(e),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var o=r.getTime(),i=a-o;return Math.floor(i/p)+1}(e);return"Do"===r?a.ordinalNumber(o,{unit:"dayOfYear"}):S(o,r.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(o);case"ee":return S(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(o);case"cc":return S(o,e.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return S(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return A(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):N(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):S(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):S(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):U(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):L(t,e)},S:function(t,e){return W(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return Y(a);case"XXXX":case"XX":return q(a);default:return q(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return Y(a);case"xxxx":case"xx":return q(a);default:return q(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+O(a,":");default:return"GMT"+q(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+O(a,":");default:return"GMT"+q(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return S(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return S((r._originalDate||t).getTime(),e.length)}};function F(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}}function H(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}}var B={p:H,P:function(t,e){var n,r=t.match(/(P+)(p+)?/)||[],a=r[1],o=r[2];if(!o)return F(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",F(a,e)).replace("{{time}}",H(o,e))}};const z=B;function R(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}var Q=["D","DD"],I=["YY","YYYY"];function G(t){return-1!==Q.indexOf(t)}function X(t){return-1!==I.indexOf(t)}function J(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var _=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,V=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,$=/^'([^]*?)'?$/,K=/''/g,Z=/[a-zA-Z]/;function tt(e,a,o){t(2,arguments);var i=String(a),d=o||{},s=d.locale||g,u=s.options&&s.options.firstWeekContainsDate,c=null==u?1:m(u),l=null==d.firstWeekContainsDate?c:m(d.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=s.options&&s.options.weekStartsOn,f=null==h?0:m(h),p=null==d.weekStartsOn?f:m(d.weekStartsOn);if(!(p>=0&&p<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!s.localize)throw new RangeError("locale must contain localize property");if(!s.formatLong)throw new RangeError("locale must contain formatLong property");var v=n(e);if(!r(v))throw new RangeError("Invalid time value");var w=R(v),b=y(v,w),C={firstWeekContainsDate:l,weekStartsOn:p,locale:s,_originalDate:v},T=i.match(V).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,z[e])(t,s.formatLong,C):t})).join("").match(_).map((function(t){if("''"===t)return"'";var n=t[0];if("'"===n)return et(t);var r=j[n];if(r)return!d.useAdditionalWeekYearTokens&&X(t)&&J(t,a,e),!d.useAdditionalDayOfYearTokens&&G(t)&&J(t,a,e),r(b,t,s.localize,C);if(n.match(Z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`");return t})).join("");return T}function et(t){return t.match($)[1].replace(K,"'")}function nt(e){t(1,arguments);var r=n(e);return r.setHours(0,0,0,0),r}var rt=864e5;function at(e,n){t(2,arguments);var r=nt(e),a=nt(n),o=r.getTime()-R(r),i=a.getTime()-R(a);return Math.round((o-i)/rt)}const ot=(e,r,a)=>{r=(r=r||"No category").slice(0,1).toUpperCase()+r.slice(1,29);const o=(new Date).toString();a&&(a=new Date(a));const i=function(e){if("No due date"==e)return null;const r={Overdue:-1,Today:0,Tomorrow:1,"Next seven days":6};if(!(e in r))return new Date(e);const a=function(e,r){t(2,arguments);var a=n(e),o=m(r);return isNaN(o)?new Date(NaN):o?(a.setDate(a.getDate()+o),a):a}(new Date,r[e]);return a};return{title:e,category:r,added:o,completed:null,due:a,details:"",update:function(t){const e={Category:t=>{this.category=t||"No category"},Date:t=>{this.due=i(t)},Details:t=>{this.details=t},Status:t=>{"Active"!=t?null==this.completed&&(this.completed=new Date):this.completed=null},Title:t=>{this.title=t}};for(var n in t)e[n](t[n])},getCompletedString:function(){return this.completed?tt(this.completed,"yyyy-MM-dd"):""},isStatus:function(t){return"All"==t||!("Complete"!=t||!this.completed)||"Active"==t&&!this.completed},isCategory:function(t){return"All categories"==t||t==this.category},getDueString:function(){return this.due?tt(this.due,"yyyy-MM-dd"):""},isRelative:function(t){const e=new Date,n=at(this.due,e);return{"All dates":()=>!0,"No due date":()=>null==this.due,Overdue:()=>n<0,Today:()=>0==n,Tomorrow:()=>1==n,"Next seven days":()=>n>=0&&n<=6}[t]()},toRelative:function(){if(!this.due)return"No due date";const t=at(this.due,new Date);return t<0?"Overdue":0==t?"Today":1==t?"Tomorrow":tt(this.due,"d MMMM yyyy")},fromRelative:i}},it=(()=>{let t=[];const e=()=>{const e=JSON.stringify(t);localStorage.setItem("taskspaceJSON",e)};return{add:n=>{t.push(n),e()},remove:n=>{const r=t.findIndex((t=>t.added==n.added));t.splice(r,1),e()},update:n=>{const r=t.findIndex((t=>t.added==n.added));t.splice(r,1,n),e()},retrieve:()=>{if(!localStorage.getItem("taskspaceJSON"))return;const e=localStorage.getItem("taskspaceJSON"),n=JSON.parse(e);t=n.map((t=>{const e=Object.assign(ot(""),t);return t.completed&&(e.completed=new Date(t.completed)),t.due&&(e.due=new Date(t.due)),e}))},getMasterArray:()=>t,getTaskByID:e=>{const n=t.findIndex((t=>t.added==e));return t[n]}}})(),dt=(t="")=>{try{const t=document.querySelector(".editing-layout").parentElement,e=it.getTaskByID(t.id);document.querySelector(".display-area").replaceChild(lt(e),t)}catch{}try{const e=document.querySelector(".details-box").parentElement;return e.removeChild(document.querySelector(".details-box")),e==t}catch{}},st=(t,e=[],n="",r={})=>{const a=document.createElement(t);a.classList.add(...e);for(let t in r)a.setAttribute(t,r[t]);return a.textContent=n,a},ut=(()=>{let t="Due",e=0,n=1;const r=r=>{r==t?[e,n]=[n,e]:(t=r,[e,n]=[0,1])},a=n=>n==t&&0==e;return{addSortBar:()=>{const t=st("div",["sort-bar"]);return["Title","Category","Complete"==ct.parameters.Status?"Complete":"Due"].forEach((e=>{const n=st("div",[],e);n.addEventListener("click",(()=>{r(e),ft.loadContent()})),n.append(st("span",["sort-bar-arrow"],a(e)?" ▲":" ▼")),t.appendChild(n)})),t},byChoice:r=>(r.sort(((r,a)=>{const o=[{Category:r.category,Complete:r.getCompletedString(),Due:r.getDueString(),Title:r.title},{Category:a.category,Complete:a.getCompletedString(),Due:a.getDueString(),Title:a.title}],i=o[e][t],d=o[n][t];return i.localeCompare(d)})),r),chooseProperty:r,isSorted:a}})(),ct=(()=>{let t=[];const e={Date:"All dates",Status:"Active",Category:"All categories"},n=()=>{t=it.getMasterArray().filter((t=>t.isRelative(e.Date)&&t.isStatus(e.Status)&&t.isCategory(e.Category)))},r=()=>{t=ut.byChoice(t)};return{parameters:e,newFilter:n,changeParameter:(t,n)=>{const r={Date:()=>{e.Category="All categories"},Status:()=>{"Active"!=n||ut.isSorted("Due")||ut.chooseProperty("Due"),"Complete"==n&&(e.Date="All dates",ut.isSorted("Complete")||ut.chooseProperty("Complete"))},Category:()=>{e.Date="All dates"}};e[t]=n,r[t]()},sortArray:r,getCategoryCounts:()=>{const t=[];it.getMasterArray().forEach((e=>{t.includes(e.category)||"No category"==e.category||t.push(e.category)})),t.sort(((t,e)=>t.localeCompare(e))),t.unshift("All categories"),t.push("No category");const n={};t.forEach((t=>{n[t]=0}));const r=it.getMasterArray().filter((t=>t.isStatus(e.Status)));return r.forEach((t=>{n[t.category]+=1})),n["All categories"]=r.length,n},getWorkingArray:()=>(n(),r(),t)}})(),lt=t=>{let e;e=st("div",["holder"],"",{draggable:"true"}),e.id=t.added;const n=()=>{dt();const r=st("div",["editing-layout"]);r.addEventListener("keydown",(t=>{"Enter"===t.code&&(c(),t.preventDefault())}));const a=st("div",["end-edit-button"],"↺");a.addEventListener("click",n);const o=st("span",["text-input"],t.title,{contenteditable:"true","data-placeholder":"Title","data-key":"Title"}),i=st("span",["text-input"],t.category,{contenteditable:"true","data-placeholder":"Category","data-key":"Category"}),d=st("input",[],"",{type:"date",value:tt(t.due,"yyyy-MM-dd"),"data-key":"Date",min:tt(new Date,"yyyy-MM-dd")}),s=st("div",["button","lowlight"],"Update",{tabindex:0});s.addEventListener("click",(()=>{c()}));const u=st("div",["text-input","box-input"],t.details,{contenteditable:"true","data-placeholder":"Details","data-key":"Details"});r.append(a,o,i,d,s,u);const c=()=>{const e={};r.childNodes.forEach((t=>{t.getAttribute("data-key")&&(e[t.getAttribute("data-key")]=t.textContent||t.value)})),t.update(e),it.update(t),ft.loadContent()};e.setAttribute("draggable","false"),e.replaceChildren(r)},r=(()=>{const r=st("div",["basic-layout","lowlight"]),a=st("div",["edit-button"],"✎");a.addEventListener("click",(t=>{t.stopPropagation(),n()}));const o=st("div",["text-box"],t.title),i=st("div",["text-box"],t.category),d=st("div",["text-box"],t.toRelative()),s=st("div",["button-holder"]),u=st("div",["complete-button"],"✔");u.addEventListener("click",(()=>{t.update(t.isStatus("Active")?{Status:"Complete"}:{Status:"Active"}),it.update(t),ft.loadContent()}));const c=st("div",["delete-button"],"✘");c.addEventListener("click",(()=>{it.remove(t),ct.getCategoryCounts()[t.category]||ct.parameters.Category!=t.category||ct.changeParameter("Category","All categories"),ft.loadContent()})),s.append(u,c);const l=st("div",["details-box","text-box"],t.details,{"data-placeholder":"No details."});return r.addEventListener("click",(()=>{dt(r)||r.appendChild(l)})),r.append(a,o,i,d,s),e.append(r),{layout:r,due:d,editButton:a}})();return t.isStatus("Complete")&&(e.classList.add("completed-task"),r.due.textContent=tt(t.completed,"d MMMM yyyy"),r.editButton.removeEventListener("click",n),r.editButton.textContent=""),t.isRelative("Overdue")&&t.isStatus("Active")&&e.classList.add("overdue-task"),e},ht=(()=>{const t=st("div",["display-area"]),e=()=>{const t=st("div",["input-layout"]);if("Complete"==ct.parameters.Status)return t;t.addEventListener("keydown",(t=>{"Enter"===t.code&&(o(),t.preventDefault())}));const e=st("span",["text-input"],"",{contenteditable:"true","data-placeholder":"New task"}),n=st("span",["text-input"],"",{contenteditable:"true","data-placeholder":"Category"}),r=st("input",[],"",{type:"date",min:tt(new Date,"yyyy-MM-dd")}),a=st("div",["button","lowlight"],"Add",{tabindex:0});a.addEventListener("click",(()=>{o()})),t.append(e,n,r,a);const o=()=>{if(/[0-9a-zA-Z]/.test(e.textContent)){const t=ot(e.textContent,n.textContent,r.value);it.add(t),ft.loadContent()}},i=ct.parameters.Category;"All categories"!=i&&"No category"!=i&&(n.textContent=i);const d=ct.parameters.Date;return"No due date"!=d&&"All dates"!=d&&(r.value=tt(ot().fromRelative(d),"yyyy-MM-dd")),t};return{load:()=>(t.replaceChildren(),ct.getWorkingArray().forEach((e=>{t.appendChild(lt(e))})),t.hasChildNodes()||t.appendChild(st("div",["no-entries"],"There are no tasks which meet your selection.")),[ut.addSortBar(),t,e()])}})(),gt=((()=>{let t;window.addEventListener("dragstart",(e=>{const n=st("div",["drag-ghost"],e.target.firstChild.children[1].textContent);e.target.appendChild(n),e.dataTransfer.setDragImage(n,10,10),setTimeout((()=>{dt(),e.target.classList.add("dragging"),t=e.target.id,document.querySelectorAll(".drop-target").forEach((t=>{t.style.backgroundColor="rgba(0, 0, 0, 0.1)"}))}),0)})),window.addEventListener("dragend",(t=>{t.target.classList.remove("dragging"),t.target.removeChild(document.querySelector(".drag-ghost")),document.querySelectorAll(".drop-target").forEach((t=>{t.style.backgroundColor="rgba(0, 0, 0, 0)"}))})),window.addEventListener("dragover",(t=>{t.preventDefault()})),window.addEventListener("dragenter",(t=>{t.target.classList.contains("drop-target")&&(t.target.style.backgroundColor="rgba(0, 0, 0, 0.2)")})),window.addEventListener("dragleave",(t=>{t.target.classList.contains("drop-target")&&(t.target.style.backgroundColor="rgba(0, 0, 0, 0.1)")})),window.addEventListener("drop",(e=>{if(e.preventDefault(),e.target.classList.contains("drop-target")){const n=it.getTaskByID(t);n.update({[e.target.getAttribute("data-key")]:e.target.getAttribute("data-value")}),it.update(n),ft.loadContent()}}))})(),(()=>{const t=t=>{const n=t.toLowerCase(),r=[];""!=n&&it.getMasterArray().forEach((t=>{(t.title.toLowerCase().includes(n)||t.details.toLowerCase().includes(n))&&r.push(t)})),e(r),(()=>{const t=document.querySelector(".search-text"),e=st("span",["clear-search-button"],"✘");e.addEventListener("click",(()=>{ft.loadContent()})),t.appendChild(e),t.setAttribute("contenteditable","false")})()},e=t=>{const e=document.querySelector(".display-area");e.replaceChildren(),t.forEach((t=>{e.appendChild(lt(t))})),e.hasChildNodes()||e.appendChild(st("div",["no-entries"],"Your search returned no results."))};return{addSearchBox:()=>{const e=st("div",["search-box"]),n=st("div",["text-input","search-text"],"",{contenteditable:"true","data-placeholder":"Search"}),r=st("div",["button","lowlight"],"Search",{tabindex:0});return r.addEventListener("click",(()=>{t(n.textContent)})),e.addEventListener("keydown",(e=>{"Enter"===e.code&&(t(n.textContent),e.preventDefault())})),e.append(n,r),e}}})()),mt={load:()=>{const t=[{type:"Status",text:"Status",options:["Active","Complete"]},{type:"Category",text:"Category",options:Object.keys(ct.getCategoryCounts())},{type:"Date",text:"Due date",options:["All dates","Overdue","Today","Tomorrow","Next seven days","No due date"]}],e=st("div",["side-menu"]);return t.forEach((t=>{const n=st("span",["side-menu-sublist"],t.text);t.options.forEach((e=>{const r=st("span",[],e);var a,o,i;r.addEventListener("click",(()=>{ct.changeParameter(t.type,e),ft.loadContent()})),a=r,o=t.type,["All","All dates","All categories"].includes(i=e)||(a.classList.add("drop-target"),a.setAttribute("data-key",o),a.setAttribute("data-value",i)),((t,e,n)=>{ct.parameters[e]==n&&t.classList.add("selected-option")})(r,t.type,e),"Category"==t.text&&(r.textContent+=` (${ct.getCategoryCounts()[e]})`),n.appendChild(r)})),e.appendChild(n)})),"Complete"==ct.parameters.Status&&e.removeChild(e.lastChild),e}},ft=(()=>{const t=["#000080","#800000","#008000"];let e=0;const n=st("div",["header"]),r=st("div",["header-title"],"Deed");r.addEventListener("click",(()=>{c()}));const a=st("span",["header-accent"],".");a.addEventListener("click",(()=>{document.documentElement.style.setProperty("--accent-color",t[e]),e++,e==t.length&&(e=0)})),r.appendChild(a);const o=st("div",["middle-area"]),i=document.createElement("div"),d=st("div",["content-area"]);o.append(i,d,st("div",["right-spacing"]));const s=st("div",["footer"],"© 2022 Heppleton Industries");document.querySelector("body").append(n,o,s);const u=()=>{n.replaceChildren(r,gt.addSearchBox()),i.replaceChildren(mt.load()),d.replaceChildren(...ht.load())},c=()=>{const t={Date:"All dates",Status:"Active",Category:"All categories"};for(let e in t)ct.changeParameter(e,t[e]);ut.isSorted("Due")||ut.chooseProperty("Due"),u()};return it.retrieve(),u(),{loadContent:u}})()})();