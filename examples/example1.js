var uri = require('../')();
/*
  Add an http listener. Might as well add foo!
*/
uri.multi(['http','foo'],function (data) {
  console.log("Found: "+data.scheme+" - URL: "+data.link+" - Path: "+data.path+" "+(('query' in data)?"- Query: "+data.query:""));
});
// Ok, add one extra foo listener, but only call it once.
uri.multi('foo',function (data) {
    console.log("(ONCE) Found: "+data.scheme+" - URL: "+data.link+" - Path: "+data.path);
},true);

/*
  Add a listener for minecraft.
*/
uri.on('minecraft',function (data) {
    console.log("Found: "+data.scheme+" - Address: "+data.host+":"+(("port" in data)?data.port:"25565"));
});

/*
  Add some spotify, bitcoin and mailto!
*/
uri.multi(['spotify','bitcoin','mailto','magnet'],function (data) {
    console.log("Found: "+data.scheme+" - "+(data.scheme=="mailto"?"Email":"Path")+": "+data.path+" "+(('query' in data)?"- Query: "+data.query:""));
});

/*
  Also, let's try a GIT scheme.
*/
uri.on('git',function (data) {
    var info = data.path.split(/\//).filter(function (x) { return x; });
    console.log("Found: "+data.link+" - Full: "+data.scheme+" - Author: "+info[0].replace(/github\.com:/,'')+" - Project: "+info[1].replace(/\.git/,''));
});

/*
  A random string to run through `uri.scan()`
*/
var content = "Example string. http://example.com/about.html?query=test#fragment - minecraft://server.tld:1234/ "+
              "Here is another minecraft server I guess.... minecraft://server2.tld/ without a port, this time! "+
              "Foo! Bar? foo://username:password@example.com:8042/over/there/index.dtb?type=animal&name=narwhal#nose "+
              "You can get email as well! mailto:joe@dirt.tld?subject=Topic also spotify spotify:track:4fPBB44eDH71YohayI4eKV "+
              "How about a (FAKE) bitcoin address!? bitcoin:THISISFAKE?amount=50&label=A%20LABEL&message=Donation%20for%20project%20xyz"+
              "How about we add another foo! foo://username:password@example.com:8042/over/there/index.dtb?type=animal&name=narwhal#nose "+
              "Let's try a github GIT address! git://github.com/LouisT/URIEmitter.git "+
              "Let's try a github SSH address! git@github.com:LouisT/URIEmitter.git ";

/*
  Run it!
*/
console.log("\nScan found "+uri.scan(content,true)+" URIs!");
