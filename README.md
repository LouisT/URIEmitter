URIEmitter (v0.0.2)
======

Install: npm install [uriemitter](https://npmjs.org/package/uriemitter "Title")

This project is [Unlicensed](http://unlicense.org/ "Title").
In other words, I don't care what you do with it.
However, if you make something interesting, I would like to check it out.


Scheme Objects:
------
    NOTE: "anchor" is now "fragment" in the result object.

    Scheme V1: <scheme>://<host>[:<port>][/<path>][?<query>][#<fragment>]
    Scheme V2: <scheme>:<path>[?<query>][#<fragment>*]

    Scheme V1 Object: link, scheme, auth, host, port, path, query, fragment
    Scheme V2 Object: link, scheme, path, query, fragment*

       * Fragment is unlikely, but matches them anyway.


Functions:
------
    Examples in `./examples/` folder.

    URIEmitter.on(<scheme>,<callback>) - Add a listener for <scheme>. Used with `URIEmitter.emit(<scheme>,<scheme object>)`. No return.

         Examples: URIEmitter.on('http',function (data) { console.log(data); });
                   URIEmitter.on('foo',function (data) { console.log(data); });

    URIEmitter.once(<scheme>,<callback>) - Same as URIEmitter.on, only called once. No return.

    URIEmitter.multi(<schemes>,<callback>[,<once>]) - Add multiple schemes in an array. If <once> is true, only emit once. No return.

         Examples: URIEmitter.multi(['http','foo'],function (data) { console.log(data); }); // No return.

    URIEmitter.emit(<scheme>,<scheme object>) - Emits a scheme. See "Scheme Objects" for more information.

    URIEmitter.parse(<str>) - Check to see if <str> matches one of the URI regexes. Returns scheme object or null.

         Examples: console.log(URIEmitter.parse('http://example.com/')); // <V1 OBJECT>
                   console.log(URIEmitter.parse('git@github.com:LouisT/URIEmitter.git')); // <V2 OBJECT>;

    URIEmitter.check(<string>[,<emit>]) - Check if <string> is a URI. Returns Boolean. If <emit> is passed, emit found scheme.

         Examples: URIEmitter.check('http://example.com',true); // true
                   URIEmitter.check('This: is a test string.',true); // false

    URIEmitter.scan(<string>[,<emit>]) - Check if <string> has a URI within it. Returns number of URIs found. If <emit> is passed,
                                         emit any schemes found.

         Examples: URIEmitter.scan('This is a test. http://example.com/ -- git@github.com:LouisT/URIEmitter.git',true) // 2
                   URIEmitter.scan('This is another test.',true) // 0


TODO:
------
- [ ] Add browser support.
- [ ] Write a better README.
- [ ] Make better examples.
- [ ] Write a better TODO.
