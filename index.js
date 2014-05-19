/*
 URIEmitter - By Louis T. <louist@ltdev.im>
 Emit URI schemes with callbacks.
*/
var events = require('events'),
    util = require('util');

var URIEmitter = function () {
         if (!(this instanceof URIEmitter)) {
            return new URIEmitter();
         };
         events.EventEmitter.call(this);
};
util.inherits(URIEmitter,events.EventEmitter);

/*
 Parse a string with RegEx to a possible URI. Returns null or an array.
 uri.parse('<scheme>://<host>[:<port>][/<path>][?<query>][#<fragment>]');
 uri.parse('<scheme>:<path>[?<query>][#<fragment>]');
*/
URIEmitter.prototype.parse = function (str) {
         var match = null,
             str = str.trim();
         if ((match = str.match(/^(?:(\w+)[@:])((?!\/\/|\s).[^\s\?]*)(\?[^\s#]*|)?(#.[^\s]*|)?$/i))) {
            match = {"link":match[0],scheme:match[1],path:match[2],query:match[3],fragment:match[4]};
          } else if ((match = str.match(/^(?:(\w+):\/\/)(?:(.[^\s@]*)@)?(?:([^:\s@\/?#]*)(?::(\d+))?)(\/[^\s\?#]*)?(\?[^\s#]*|)?(#.[^\s]*|)?$/i))) {
            match = {"link":match[0],scheme:match[1],auth:match[2],host:match[3],port:match[4],path:match[5],query:match[6],fragment:match[7]};
         };
         if (match) {
            for (var key in match) {
                if (match.hasOwnProperty(key) && !match[key]) {
                   delete match[key];
                };
            };
         };
         return match;
};

/*
  Add the same callback for multiple uri schemes.
  uri.multi(<schemes array>,<callback>[,<once>]);
  uri.multi(['http','foo'],function (data) { console.log(data); },true);
*/
URIEmitter.prototype.multi = function (arr,callback,once) {
         var self = this;
         (Array.isArray(arr)?arr:[String(arr)]).forEach(function (key) {
              self[(once?'once':'on')](key,callback);
         });
};

/*
  Check if the input is a URI. Returns true or false.
  uri.check(<input>[,<emit>]); // Emit results if `emit` is true.
  uri.check('foo://username:password@example.com:8042/over/there/index.dtb?type=animal&name=narwhal#nose',true);
*/
URIEmitter.prototype.check = function (input,emit) {
         var match = null;
         if ((match = this.parse(input))) {
            if (emit) {
               this.emit((match.scheme||'unknown').toLowerCase(),match);
            };
            return true;
         };
         return false;
};

/*
  Scan a string for possible URIs. Returns number of URIs found.
  uri.scan(<string>[,<emit>]); // Emit results if `emit` is true.
  uri.scan('example string http://example.com/ more string minecraft://server.tld example string',true);
*/
URIEmitter.prototype.scan = function (str,emit) {
         var self = this,
             found = 0;
         str.split(/\s+/g).forEach(function (key) {
             if (self.check(key,emit)) {
                found++;
             };
         });
         return found; 
};

/*
 Export for require();
*/
module.exports = URIEmitter;
