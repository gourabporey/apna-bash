const fs = require("fs");

class PathHandler {
   isVisible(path) {
      const startsWithChar = /^[^.]/;
      return startsWithChar.test(path);
   }

   isAbsolute(path) {
      path?.startsWith('/');
   }

   normalizePath(path) {
      const pathTokens = path.split("/");
      const normalizePathTokens = [];

      pathTokens.forEach(function (token) {
         if (token === "..") {
            normalizePathTokens.pop();
            return;
         }

         if (token != ".") {
            normalizePathTokens.push(token);
         }
      });

      return normalizePathTokens.join("/");
   }
}


const expandWildCard = function (path) {
   if (!path.includes("*")) return [path];

   const pathTokens = path.split("/");
   let traversedPath = "";
   let paths = [];

   pathTokens.forEach(function (pathToken) {
      if (pathToken === "*") {
         paths = fs.readdirSync(traversedPath).filter(function (path) {
            return path.match(/^[^.]/);
         });
      };

      traversedPath += pathToken + "/";
   });

   return paths;
};

exports.expandWildCard = expandWildCard;
exports.PathHandler = PathHandler;