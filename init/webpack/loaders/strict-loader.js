module.exports = function (content) {
  const useStrictPrefix = '\'use strict\';\n\n'
  return useStrictPrefix + content
}