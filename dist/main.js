(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){return e(1,arguments),t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)}function a(t){e(1,arguments);var a=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===a?new Date(t.getTime()):"number"==typeof t||"[object Number]"===a?new Date(t):("string"!=typeof t&&"[object String]"!==a||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(n){if(e(1,arguments),!t(n)&&"number"!=typeof n)return!1;var r=a(n);return!isNaN(Number(r))}var r={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function o(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},a=t.width?String(t.width):e.defaultWidth,n=e.formats[a]||e.formats[e.defaultWidth];return n}}var i,s={date:o({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:o({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:o({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},u={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function d(e){return function(t,a){var n,r=a||{};if("formatting"===(r.context?String(r.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,i=r.width?String(r.width):o;n=e.formattingValues[i]||e.formattingValues[o]}else{var s=e.defaultWidth,u=r.width?String(r.width):e.defaultWidth;n=e.values[u]||e.values[s]}return n[e.argumentCallback?e.argumentCallback(t):t]}}function l(e){return function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=a.width,r=n&&e.matchPatterns[n]||e.matchPatterns[e.defaultMatchWidth],o=t.match(r);if(!o)return null;var i,s=o[0],u=n&&e.parsePatterns[n]||e.parsePatterns[e.defaultParseWidth],d=Array.isArray(u)?h(u,(function(e){return e.test(s)})):c(u,(function(e){return e.test(s)}));i=e.valueCallback?e.valueCallback(d):d,i=a.valueCallback?a.valueCallback(i):i;var l=t.slice(s.length);return{value:i,rest:l}}}function c(e,t){for(var a in e)if(e.hasOwnProperty(a)&&t(e[a]))return a}function h(e,t){for(var a=0;a<e.length;a++)if(t(e[a]))return a}const g={code:"en-US",formatDistance:function(e,t,a){var n,o=r[e];return n="string"==typeof o?o:1===t?o.one:o.other.replace("{{count}}",t.toString()),null!=a&&a.addSuffix?a.comparison&&a.comparison>0?"in "+n:n+" ago":n},formatLong:s,formatRelative:function(e,t,a,n){return u[e]},localize:{ordinalNumber:function(e,t){var a=Number(e),n=a%100;if(n>20||n<10)switch(n%10){case 1:return a+"st";case 2:return a+"nd";case 3:return a+"rd"}return a+"th"},era:d({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:d({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:d({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:d({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:d({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(i={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=e.match(i.matchPattern);if(!a)return null;var n=a[0],r=e.match(i.parsePattern);if(!r)return null;var o=i.valueCallback?i.valueCallback(r[0]):r[0];o=t.valueCallback?t.valueCallback(o):o;var s=e.slice(n.length);return{value:o,rest:s}}),era:l({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:l({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:l({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:l({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:l({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function m(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function f(t,n){e(2,arguments);var r=a(t).getTime(),o=m(n);return new Date(r+o)}function y(t,a){e(2,arguments);var n=m(a);return f(t,-n)}var p=864e5;function v(t){e(1,arguments);var n=1,r=a(t),o=r.getUTCDay(),i=(o<n?7:0)+o-n;return r.setUTCDate(r.getUTCDate()-i),r.setUTCHours(0,0,0,0),r}function w(t){e(1,arguments);var n=a(t),r=n.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(r+1,0,4),o.setUTCHours(0,0,0,0);var i=v(o),s=new Date(0);s.setUTCFullYear(r,0,4),s.setUTCHours(0,0,0,0);var u=v(s);return n.getTime()>=i.getTime()?r+1:n.getTime()>=u.getTime()?r:r-1}function b(t){e(1,arguments);var a=w(t),n=new Date(0);n.setUTCFullYear(a,0,4),n.setUTCHours(0,0,0,0);var r=v(n);return r}var C=6048e5;function D(t,n){e(1,arguments);var r=n||{},o=r.locale,i=o&&o.options&&o.options.weekStartsOn,s=null==i?0:m(i),u=null==r.weekStartsOn?s:m(r.weekStartsOn);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var d=a(t),l=d.getUTCDay(),c=(l<u?7:0)+l-u;return d.setUTCDate(d.getUTCDate()-c),d.setUTCHours(0,0,0,0),d}function T(t,n){e(1,arguments);var r=a(t),o=r.getUTCFullYear(),i=n||{},s=i.locale,u=s&&s.options&&s.options.firstWeekContainsDate,d=null==u?1:m(u),l=null==i.firstWeekContainsDate?d:m(i.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var c=new Date(0);c.setUTCFullYear(o+1,0,l),c.setUTCHours(0,0,0,0);var h=D(c,n),g=new Date(0);g.setUTCFullYear(o,0,l),g.setUTCHours(0,0,0,0);var f=D(g,n);return r.getTime()>=h.getTime()?o+1:r.getTime()>=f.getTime()?o:o-1}function k(t,a){e(1,arguments);var n=a||{},r=n.locale,o=r&&r.options&&r.options.firstWeekContainsDate,i=null==o?1:m(o),s=null==n.firstWeekContainsDate?i:m(n.firstWeekContainsDate),u=T(t,a),d=new Date(0);d.setUTCFullYear(u,0,s),d.setUTCHours(0,0,0,0);var l=D(d,a);return l}var S=6048e5;function M(e,t){for(var a=e<0?"-":"",n=Math.abs(e).toString();n.length<t;)n="0"+n;return a+n}const x=function(e,t){var a=e.getUTCFullYear(),n=a>0?a:1-a;return M("yy"===t?n%100:n,t.length)},E=function(e,t){var a=e.getUTCMonth();return"M"===t?String(a+1):M(a+1,2)},P=function(e,t){return M(e.getUTCDate(),t.length)},A=function(e,t){return M(e.getUTCHours()%12||12,t.length)},L=function(e,t){return M(e.getUTCHours(),t.length)},U=function(e,t){return M(e.getUTCMinutes(),t.length)},N=function(e,t){return M(e.getUTCSeconds(),t.length)},W=function(e,t){var a=t.length,n=e.getUTCMilliseconds();return M(Math.floor(n*Math.pow(10,a-3)),t.length)};function O(e,t){var a=e>0?"-":"+",n=Math.abs(e),r=Math.floor(n/60),o=n%60;if(0===o)return a+String(r);var i=t||"";return a+String(r)+i+M(o,2)}function Y(e,t){return e%60==0?(e>0?"-":"+")+M(Math.abs(e)/60,2):q(e,t)}function q(e,t){var a=t||"",n=e>0?"-":"+",r=Math.abs(e);return n+M(Math.floor(r/60),2)+a+M(r%60,2)}const H={G:function(e,t,a){var n=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return a.era(n,{width:"abbreviated"});case"GGGGG":return a.era(n,{width:"narrow"});default:return a.era(n,{width:"wide"})}},y:function(e,t,a){if("yo"===t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return a.ordinalNumber(r,{unit:"year"})}return x(e,t)},Y:function(e,t,a,n){var r=T(e,n),o=r>0?r:1-r;return"YY"===t?M(o%100,2):"Yo"===t?a.ordinalNumber(o,{unit:"year"}):M(o,t.length)},R:function(e,t){return M(w(e),t.length)},u:function(e,t){return M(e.getUTCFullYear(),t.length)},Q:function(e,t,a){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(n);case"QQ":return M(n,2);case"Qo":return a.ordinalNumber(n,{unit:"quarter"});case"QQQ":return a.quarter(n,{width:"abbreviated",context:"formatting"});case"QQQQQ":return a.quarter(n,{width:"narrow",context:"formatting"});default:return a.quarter(n,{width:"wide",context:"formatting"})}},q:function(e,t,a){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(n);case"qq":return M(n,2);case"qo":return a.ordinalNumber(n,{unit:"quarter"});case"qqq":return a.quarter(n,{width:"abbreviated",context:"standalone"});case"qqqqq":return a.quarter(n,{width:"narrow",context:"standalone"});default:return a.quarter(n,{width:"wide",context:"standalone"})}},M:function(e,t,a){var n=e.getUTCMonth();switch(t){case"M":case"MM":return E(e,t);case"Mo":return a.ordinalNumber(n+1,{unit:"month"});case"MMM":return a.month(n,{width:"abbreviated",context:"formatting"});case"MMMMM":return a.month(n,{width:"narrow",context:"formatting"});default:return a.month(n,{width:"wide",context:"formatting"})}},L:function(e,t,a){var n=e.getUTCMonth();switch(t){case"L":return String(n+1);case"LL":return M(n+1,2);case"Lo":return a.ordinalNumber(n+1,{unit:"month"});case"LLL":return a.month(n,{width:"abbreviated",context:"standalone"});case"LLLLL":return a.month(n,{width:"narrow",context:"standalone"});default:return a.month(n,{width:"wide",context:"standalone"})}},w:function(t,n,r,o){var i=function(t,n){e(1,arguments);var r=a(t),o=D(r,n).getTime()-k(r,n).getTime();return Math.round(o/S)+1}(t,o);return"wo"===n?r.ordinalNumber(i,{unit:"week"}):M(i,n.length)},I:function(t,n,r){var o=function(t){e(1,arguments);var n=a(t),r=v(n).getTime()-b(n).getTime();return Math.round(r/C)+1}(t);return"Io"===n?r.ordinalNumber(o,{unit:"week"}):M(o,n.length)},d:function(e,t,a){return"do"===t?a.ordinalNumber(e.getUTCDate(),{unit:"date"}):P(e,t)},D:function(t,n,r){var o=function(t){e(1,arguments);var n=a(t),r=n.getTime();n.setUTCMonth(0,1),n.setUTCHours(0,0,0,0);var o=n.getTime(),i=r-o;return Math.floor(i/p)+1}(t);return"Do"===n?r.ordinalNumber(o,{unit:"dayOfYear"}):M(o,n.length)},E:function(e,t,a){var n=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return a.day(n,{width:"abbreviated",context:"formatting"});case"EEEEE":return a.day(n,{width:"narrow",context:"formatting"});case"EEEEEE":return a.day(n,{width:"short",context:"formatting"});default:return a.day(n,{width:"wide",context:"formatting"})}},e:function(e,t,a,n){var r=e.getUTCDay(),o=(r-n.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return M(o,2);case"eo":return a.ordinalNumber(o,{unit:"day"});case"eee":return a.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return a.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return a.day(r,{width:"short",context:"formatting"});default:return a.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,a,n){var r=e.getUTCDay(),o=(r-n.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return M(o,t.length);case"co":return a.ordinalNumber(o,{unit:"day"});case"ccc":return a.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return a.day(r,{width:"narrow",context:"standalone"});case"cccccc":return a.day(r,{width:"short",context:"standalone"});default:return a.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,a){var n=e.getUTCDay(),r=0===n?7:n;switch(t){case"i":return String(r);case"ii":return M(r,t.length);case"io":return a.ordinalNumber(r,{unit:"day"});case"iii":return a.day(n,{width:"abbreviated",context:"formatting"});case"iiiii":return a.day(n,{width:"narrow",context:"formatting"});case"iiiiii":return a.day(n,{width:"short",context:"formatting"});default:return a.day(n,{width:"wide",context:"formatting"})}},a:function(e,t,a){var n=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return a.dayPeriod(n,{width:"abbreviated",context:"formatting"});case"aaa":return a.dayPeriod(n,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return a.dayPeriod(n,{width:"narrow",context:"formatting"});default:return a.dayPeriod(n,{width:"wide",context:"formatting"})}},b:function(e,t,a){var n,r=e.getUTCHours();switch(n=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",t){case"b":case"bb":return a.dayPeriod(n,{width:"abbreviated",context:"formatting"});case"bbb":return a.dayPeriod(n,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return a.dayPeriod(n,{width:"narrow",context:"formatting"});default:return a.dayPeriod(n,{width:"wide",context:"formatting"})}},B:function(e,t,a){var n,r=e.getUTCHours();switch(n=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",t){case"B":case"BB":case"BBB":return a.dayPeriod(n,{width:"abbreviated",context:"formatting"});case"BBBBB":return a.dayPeriod(n,{width:"narrow",context:"formatting"});default:return a.dayPeriod(n,{width:"wide",context:"formatting"})}},h:function(e,t,a){if("ho"===t){var n=e.getUTCHours()%12;return 0===n&&(n=12),a.ordinalNumber(n,{unit:"hour"})}return A(e,t)},H:function(e,t,a){return"Ho"===t?a.ordinalNumber(e.getUTCHours(),{unit:"hour"}):L(e,t)},K:function(e,t,a){var n=e.getUTCHours()%12;return"Ko"===t?a.ordinalNumber(n,{unit:"hour"}):M(n,t.length)},k:function(e,t,a){var n=e.getUTCHours();return 0===n&&(n=24),"ko"===t?a.ordinalNumber(n,{unit:"hour"}):M(n,t.length)},m:function(e,t,a){return"mo"===t?a.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):U(e,t)},s:function(e,t,a){return"so"===t?a.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):N(e,t)},S:function(e,t){return W(e,t)},X:function(e,t,a,n){var r=(n._originalDate||e).getTimezoneOffset();if(0===r)return"Z";switch(t){case"X":return Y(r);case"XXXX":case"XX":return q(r);default:return q(r,":")}},x:function(e,t,a,n){var r=(n._originalDate||e).getTimezoneOffset();switch(t){case"x":return Y(r);case"xxxx":case"xx":return q(r);default:return q(r,":")}},O:function(e,t,a,n){var r=(n._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+O(r,":");default:return"GMT"+q(r,":")}},z:function(e,t,a,n){var r=(n._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+O(r,":");default:return"GMT"+q(r,":")}},t:function(e,t,a,n){var r=n._originalDate||e;return M(Math.floor(r.getTime()/1e3),t.length)},T:function(e,t,a,n){return M((n._originalDate||e).getTime(),t.length)}};function F(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}}function j(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}}var R={p:j,P:function(e,t){var a,n=e.match(/(P+)(p+)?/)||[],r=n[1],o=n[2];if(!o)return F(e,t);switch(r){case"P":a=t.dateTime({width:"short"});break;case"PP":a=t.dateTime({width:"medium"});break;case"PPP":a=t.dateTime({width:"long"});break;default:a=t.dateTime({width:"full"})}return a.replace("{{date}}",F(r,t)).replace("{{time}}",j(o,t))}};const B=R;function z(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var I=["D","DD"],G=["YY","YYYY"];function Q(e){return-1!==I.indexOf(e)}function X(e){return-1!==G.indexOf(e)}function J(e,t,a){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(a,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(a,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(a,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(a,"`; see: https://git.io/fxCyr"))}var _=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,V=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,$=/^'([^]*?)'?$/,K=/''/g,Z=/[a-zA-Z]/;function ee(t,r,o){e(2,arguments);var i=String(r),s=o||{},u=s.locale||g,d=u.options&&u.options.firstWeekContainsDate,l=null==d?1:m(d),c=null==s.firstWeekContainsDate?l:m(s.firstWeekContainsDate);if(!(c>=1&&c<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=u.options&&u.options.weekStartsOn,f=null==h?0:m(h),p=null==s.weekStartsOn?f:m(s.weekStartsOn);if(!(p>=0&&p<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!u.localize)throw new RangeError("locale must contain localize property");if(!u.formatLong)throw new RangeError("locale must contain formatLong property");var v=a(t);if(!n(v))throw new RangeError("Invalid time value");var w=z(v),b=y(v,w),C={firstWeekContainsDate:c,weekStartsOn:p,locale:u,_originalDate:v},D=i.match(V).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,B[t])(e,u.formatLong,C):e})).join("").match(_).map((function(e){if("''"===e)return"'";var a=e[0];if("'"===a)return te(e);var n=H[a];if(n)return!s.useAdditionalWeekYearTokens&&X(e)&&J(e,r,t),!s.useAdditionalDayOfYearTokens&&Q(e)&&J(e,r,t),n(b,e,u.localize,C);if(a.match(Z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+a+"`");return e})).join("");return D}function te(e){return e.match($)[1].replace(K,"'")}function ae(t,n){e(2,arguments);var r=a(t),o=m(n);return isNaN(o)?new Date(NaN):o?(r.setDate(r.getDate()+o),r):r}function ne(t){e(1,arguments);var n=a(t);return n.setHours(0,0,0,0),n}var re=864e5;function oe(t,a){e(2,arguments);var n=ne(t),r=ne(a),o=n.getTime()-z(n),i=r.getTime()-z(r);return Math.round((o-i)/re)}const ie=(e,t,a)=>{t=(t=t||"No category").slice(0,1).toUpperCase()+t.slice(1);const n=Date.now()*Math.random(),r=((i=a)&&(i=new Date(i)),{date:i,formatDate:function(e="yyyy-MM-dd"){return this.date?ee(this.date,e):""},isRelative:function(e){const t=new Date,a=oe(this.date,t);return{"All dates":()=>!0,"No due date":()=>null==this.date,Overdue:()=>a<0,Today:()=>0==a,Tomorrow:()=>1==a,"Next seven days":()=>a>=0&&a<=6}[e]()},toRelative:function(){if(!this.date)return"No due date";const e=oe(this.date,new Date);return e<0?"Overdue":0==e?"Today":1==e?"Tomorrow":ee(this.date,"d MMMM yyyy")},fromRelative:function(e){if("No due date"==e||!e)return null;const t={Overdue:-1,Today:0,Tomorrow:1,"Next seven days":6};return e in t?ae(new Date,t[e]):new Date(e)}}),o={completed:null,changeStatus:function(e){"Active"!=e?null==this.completed&&(this.completed=new Date):this.completed=null},formatDate:function(e){return this.completed?ee(this.completed,e):""},isStatus:function(e){return"All"==e||!("Complete"!=e||!this.completed)||"Active"==e&&!this.completed}};var i;return{title:e,category:t,id:n,details:"",update:function(e){const t={Category:e=>this.category=e||"No category",Date:e=>this.due.date=r.fromRelative(e),Details:e=>this.details=e.slice(0,2999),Status:e=>o.changeStatus(e),Title:e=>this.title=e};for(var a in e)t[a](e[a])},status:o,due:r,isCategory:function(e){return"All categories"==e||e==this.category}}},se=(()=>{let e=[];const t=()=>{const t=JSON.stringify(e);localStorage.setItem("taskspaceJSON",t)};return{add:a=>{e.push(a),t()},remove:a=>{const n=e.findIndex((e=>e.id==a.id));e.splice(n,1),t()},update:a=>{const n=e.findIndex((e=>e.id==a.id));e.splice(n,1,a),t()},retrieve:()=>{if(localStorage.clear(),!localStorage.getItem("taskspaceJSON"))return void(e=(()=>{const e=e=>e?ae(new Date,e):null;return[{title:"Ring Edgar about the consultancy contract",category:"Work",details:"Tried ringing yesterday but no reply. Sent email asking him to contact me.",due:-1,completed:null},{title:"Get tickets for the symphony's Smetana concert",category:"Leisure",details:"I'm only really familiar with Die Moldau, but I'm sure his other work is good.",due:6,completed:null},{title:"Clear out the garage",category:"House",details:"There is years of rubbish stacked up in there. It needs to go!",due:null,completed:null},{title:"Buy Daisy a new hat",category:"Shopping",details:"The old one with the owls on it is worn out.",due:14,completed:null},{title:"Check out the new dog park.",category:"Leisure",details:"The address is 1475 Boxwood Avenue. Clement can take Mikki there if it's nice.",due:-5,completed:-6},{title:"Repaint Daisy's room",category:"House",details:"Daisy chose pink...",due:-19,completed:-10},{title:"Finish year-end report",category:"Work",details:"The report will need to go to finance first to check the numbers. I should run it by Ellen in business intelligence at some point too. Her feedback is always fab.",due:-1,completed:-3},{title:"Get Steve to eat better",category:"",details:"Less red meat! Even if he just eats chicken instead that would be a start.",due:30,completed:null},{title:"Invent cold fusion",category:"",details:"Easy! Just give me thirty years...",due:10957,completed:null},{title:"Go to the supermarket...",category:"Shopping",details:"The usual stuff, plus:\n            - extra milk\n            - chicken (cook something nice for Steve?)\n            - marzipan for Ellen's thank you cake\n            - different food for Mikki (gone off her usual for some reason)\n            - a towel for travelling",due:1,completed:null},{title:"Walk round Highfield Lane and back past St Helen's Well",category:"Leisure",details:"Leave Clement and Daisy with Steve. Take time for myself.",due:"0",completed:null},{title:"Speak to manager about promotion",category:"Work",details:"He'll be more receptive once he's back from his holiday, so wait til then.",due:80,completed:null},{title:"Flexi: work from home day",category:"Work",details:"",due:3,completed:null},{title:"Get the boiler maintained",category:"House",details:"The gas man cometh.",due:-1,completed:-1},{title:"Read article about the history of contraception",category:"",details:"Emily says it's really funny??? I have the link in her email. We'll have to see how funny it is. She has a strange sense of humour.",due:"0",completed:"0"}].map((t=>{const a=ie(t.title,t.category),n={Details:t.details,Date:e(t.due)};return a.update(n),a.status.completed=e(t.completed),a}))})());const t=localStorage.getItem("taskspaceJSON"),a=JSON.parse(t);e=a.map((e=>{const t=ie(e.title,e.category,e.due.date);return e.status.completed&&(t.status.completed=new Date(e.status.completed)),t.id=e.id,t.details=e.details,t}))},getMasterArray:()=>e,getTaskByID:t=>e.find((e=>e.id==t))}})(),ue=(e="")=>{try{const e=document.querySelector(".editing-layout").parentElement,t=se.getTaskByID(e.id);document.querySelector(".display-area").replaceChild(ge(t),e)}catch{}try{const t=document.querySelector(".details").parentElement;return t.removeChild(document.querySelector(".details")),t==e}catch{}},de=(e,t=[],a="",n={})=>{const r=document.createElement(e);r.classList.add(...t);for(let e in n)r.setAttribute(e,n[e]);return r.textContent=a,r},le=(e,t,a)=>{e.querySelector(".tooltip-text")&&e.removeChild(e.querySelector(".tooltip-text")),e.classList.add("tooltip");const n=de("span",["tooltip-text"],t);n.style[{left:"right",right:"left"}[a]]="100%",e.appendChild(n)},ce=(()=>{let e="Due",t=0,a=1;const n=n=>{n==e?[t,a]=[a,t]:(e=n,[t,a]=[0,1])},r=a=>a==e&&0==t;return{addSortBar:e=>{const t=de("div",["sort-bar"]);return["Title","Category","Complete"==he.getParameter("Status")?"Complete":"Due"].forEach((a=>{const o=de("div",[],a);e?(o.addEventListener("click",(()=>{n(a),pe.loadContent()})),o.append(de("span",["sort-bar-arrow"],r(a)?" ▲":" ▼"))):(t.setAttribute("cursor","default"),"Due"!=o.textContent&&"Complete"!=o.textContent||(o.textContent="Due/Complete")),t.appendChild(o)})),t},byChoice:n=>(n.sort(((n,r)=>{const o=[{Category:n.category,Complete:n.status.formatDate("yyyy-MM-dd"),Due:n.due.formatDate(),Title:n.title},{Category:r.category,Complete:r.status.formatDate("yyyy-MM-dd"),Due:r.due.formatDate(),Title:r.title}],i=o[t][e],s=o[a][e];return i.localeCompare(s)})),n),chooseProperty:n,isSorted:r}})(),he=(()=>{let e=[];const t={Date:"All dates",Status:"Active",Category:"All categories"},a=()=>{e=se.getMasterArray().filter((e=>e.due.isRelative(t.Date)&&e.status.isStatus(t.Status)&&e.isCategory(t.Category)))};return{newFilter:a,changeParameter:(e,a)=>{const n={Date:()=>{t.Category="All categories"},Status:()=>{"Active"!=a||ce.isSorted("Due")||ce.chooseProperty("Due"),"Complete"==a&&(t.Date="All dates",ce.isSorted("Complete")||ce.chooseProperty("Complete"))},Category:()=>{t.Date="All dates"}};t[e]=a,n[e]()},getParameter:e=>t[e],getCategoryCounts:()=>{const e=[],a=se.getMasterArray();a.forEach((t=>{e.includes(t.category)||"No category"==t.category||e.push(t.category)})),e.sort(((e,t)=>e.localeCompare(t))),e.unshift("All categories"),e.push("No category");const n={};e.forEach((e=>{n[e]=0}));const r=a.filter((e=>e.status.isStatus(t.Status)));return r.forEach((e=>{n[e.category]+=1})),n["All categories"]=r.length,n},getWorkingArray:()=>(a(),e=ce.byChoice(e),e)}})(),ge=e=>{let t;t=de("div",["holder"],"",{draggable:"true"}),t.id=e.id;const a=()=>{ue();const n=de("form",["editing-layout"]);n.addEventListener("keydown",(e=>{"Enter"===e.code&&(l(),e.preventDefault())}));const r=de("div",["end-edit-button"],"↺");r.addEventListener("click",a),le(r,"Undo editing","right");const o=de("input",[],"",{value:e.title,type:"text",placeholder:"Title",name:"Title",maxlength:200}),i=de("input",[],"",{value:e.category,type:"text",placeholder:"Category",name:"Category",maxlength:30}),s=de("input",[],"",{type:"date",value:e.due.formatDate(),name:"Date",min:ee(new Date,"yyyy-MM-dd")}),u=de("button",["lowlight"],"Update",{type:"button"});u.addEventListener("click",(()=>{l()}));const d=de("textarea",["details"],e.details,{placeholder:"Details",name:"Details",maxlength:1e3});d.addEventListener("keydown",(e=>{"Enter"===e.code&&e.stopPropagation()})),n.append(r,o,i,s,u,d);const l=()=>{const t=new FormData(document.querySelector(".editing-layout"));e.update(Object.fromEntries(t)),se.update(e),pe.loadContent()};t.setAttribute("draggable","false"),t.replaceChildren(n)};return(()=>{const n=de("div",["basic-layout","lowlight"]),r=de("div",["edit-button","icon-button"],"✎");r.addEventListener("click",(e=>{e.stopPropagation(),a()})),le(r,"Edit task","right");const o=de("div",["text-box"],e.title),i=de("div",["text-box"],e.category),s=de("div",["text-box"],e.due.toRelative());e.due.isRelative("Overdue")&&e.status.isStatus("Active")&&t.classList.add("overdue-task");const u=de("div",["button-holder"]),d=de("div",["complete-button","icon-button"],"✔");d.addEventListener("click",(()=>{e.update(e.status.isStatus("Active")?{Status:"Complete"}:{Status:"Active"}),se.update(e),pe.loadContent()})),le(d,"Complete","left");const l=de("div",["delete-button","icon-button"],"✘");l.addEventListener("click",(()=>{se.remove(e),he.getCategoryCounts()[e.category]||he.getParameter("Category")!=e.category||he.changeParameter("Category","All categories"),pe.loadContent()})),le(l,"Delete","left"),u.append(d,l);const c=de("div",["text-box","details"],e.details,{"data-placeholder":"No details."});n.addEventListener("click",(()=>{ue(n)||n.appendChild(c)})),e.status.isStatus("Complete")&&(t.classList.add("completed-task"),s.textContent=e.status.formatDate("d MMMM yyyy"),r.removeEventListener("click",a),r.textContent="",le(d,"Reactivate","left")),n.append(r,o,i,s,u),t.append(n)})(),t},me=(()=>{const e=de("div",["display-area"]),t=()=>{if("Complete"==he.getParameter("Status"))return"";const e=de("div",["input-layout"]);e.addEventListener("keydown",(e=>{"Enter"===e.code&&(o(),e.preventDefault())}));const t=de("input",[],"",{type:"text",placeholder:"New task",maxlength:200}),a=de("input",[],"",{type:"text",placeholder:"Category",maxlength:30}),n=de("input",[],"",{type:"date",min:ee(new Date,"yyyy-MM-dd")}),r=de("button",["lowlight"],"Add",{type:"button"});r.addEventListener("click",(()=>{o()})),e.append(t,a,n,r);const o=()=>{if(/[0-9a-zA-Z]/.test(t.value)){const e=ie(t.value,a.value,n.value);se.add(e),pe.loadContent()}},i=he.getParameter("Category");"All categories"!=i&&"No category"!=i&&(a.value=i);const s=he.getParameter("Date");return"No due date"!=s&&"All dates"!=s&&(n.value=ee(ie().due.fromRelative(s),"yyyy-MM-dd")),e};return{load:()=>(e.replaceChildren(),he.getWorkingArray().forEach((t=>{e.appendChild(ge(t))})),e.hasChildNodes()||e.appendChild(de("div",["no-entries"],"There are no tasks which meet your selection.")),[ce.addSortBar(!0),e,t()])}})(),fe=((()=>{let e;window.addEventListener("dragstart",(t=>{const a=de("div",["drag-ghost"],t.target.firstChild.children[1].textContent);t.target.appendChild(a),t.dataTransfer.setDragImage(a,10,10),setTimeout((()=>{ue(),t.target.classList.add("dragging"),e=t.target.id,document.querySelectorAll(".drop-target").forEach((e=>{e.style.backgroundColor="rgba(0, 0, 0, 0.1)"}))}),0)})),window.addEventListener("dragend",(e=>{e.target.classList.remove("dragging"),e.target.removeChild(document.querySelector(".drag-ghost")),document.querySelectorAll(".drop-target").forEach((e=>{e.style.backgroundColor="rgba(0, 0, 0, 0)"}))})),window.addEventListener("dragover",(e=>{e.preventDefault()})),window.addEventListener("dragenter",(e=>{e.target.classList.contains("drop-target")&&(e.target.style.backgroundColor="rgba(0, 0, 0, 0.2)")})),window.addEventListener("dragleave",(e=>{e.target.classList.contains("drop-target")&&(e.target.style.backgroundColor="rgba(0, 0, 0, 0.1)")})),window.addEventListener("drop",(t=>{if(t.preventDefault(),t.target.classList.contains("drop-target")){const a=se.getTaskByID(e);a.update({[t.target.getAttribute("data-key")]:t.target.getAttribute("data-value")}),se.update(a),pe.loadContent()}}))})(),(()=>{const e=e=>{const a=e.toLowerCase();let n=[];""!=a&&(n=se.getMasterArray().filter((e=>e.title.toLowerCase().includes(a)||e.details.toLowerCase().includes(a)))),t(n)},t=e=>{const t=document.querySelector(".content-area"),a=document.querySelector(".display-area");a.replaceChildren(),e.forEach((e=>{a.appendChild(ge(e))})),a.hasChildNodes()||a.appendChild(de("div",["no-entries"],"Your search returned no results.")),t.replaceChildren(ce.addSortBar(!1),a)};return{addSearchBox:()=>{const t=de("div",["search-box"]),a=de("input",["search-text"],"",{type:"text",placeholder:"Search",maxlength:50}),n=de("button",["lowlight"],"Search",{type:"button"});return n.addEventListener("click",(()=>{e(a.value)})),t.addEventListener("keydown",(t=>{"Enter"===t.code&&(e(a.value),t.preventDefault())})),t.append(a,n),t}}})()),ye={load:()=>{const e=he.getCategoryCounts(),t=[{type:"Status",text:"Status",options:["Active","Complete"]},{type:"Category",text:"Category",options:Object.keys(e)},{type:"Date",text:"Due date",options:["All dates","Overdue","Today","Tomorrow","Next seven days","No due date"]}],a=de("div",["side-menu"]);return t.forEach((t=>{const n=de("span",["side-menu-subheading"],t.text);t.options.forEach((a=>{const r=de("span",["submenu-option"],a);var o,i,s;r.addEventListener("click",(()=>{he.changeParameter(t.type,a),pe.loadContent()})),o=r,i=t.type,["All","All dates","All categories"].includes(s=a)||(o.classList.add("drop-target"),o.setAttribute("data-key",i),o.setAttribute("data-value",s)),((e,t,a)=>{he.getParameter(t)==a&&e.classList.add("selected-option")})(r,t.type,a),"Category"==t.text&&(r.textContent+=` (${e[a]})`),n.appendChild(r)})),a.appendChild(n)})),"Complete"==he.getParameter("Status")&&a.removeChild(a.lastChild),a}},pe=(()=>{const e=["#000080","#800000","#008000"];let t=0;const a=de("div",["header"]),n=de("div",["header-title"],"Deed");n.addEventListener("click",(()=>{l()}));const r=de("span",["header-accent"],".");r.addEventListener("click",(()=>{document.documentElement.style.setProperty("--accent-color",e[t]),t++,t==e.length&&(t=0)})),n.appendChild(r);const o=de("div",["middle-area"]),i=document.createElement("div"),s=de("div",["content-area"]);o.append(i,s,de("div",["right-spacing"]));const u=de("div",["footer"],"© 2022 Heppleton Industries");document.querySelector("body").append(a,o,u);const d=()=>{a.replaceChildren(n,fe.addSearchBox()),i.replaceChildren(ye.load()),s.replaceChildren(...me.load())},l=()=>{const e={Date:"All dates",Status:"Active",Category:"All categories"};for(let t in e)he.changeParameter(t,e[t]);ce.isSorted("Due")||ce.chooseProperty("Due"),d()};return se.retrieve(),d(),{loadContent:d}})()})();