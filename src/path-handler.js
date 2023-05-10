const fs = require("fs");

const expandWildCard = function(path) {
  if(!path.includes("*")) return [path];

  const pathTokens = path.split("/");
  let traversedPath = "";
  let paths = [];

  pathTokens.forEach(function(pathToken) {
    if(pathToken === "*") {
      paths = fs.readdirSync(traversedPath).filter(function(path){
        return path.match(/^[^.]/);
      });
    };

    traversedPath += pathToken + "/";
  });

  return paths;
};

exports.expandWildCard = expandWildCard;
