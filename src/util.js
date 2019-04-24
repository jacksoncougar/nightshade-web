module.exports = {
  /**
   * Replaces all occurences of the search pattern with the given replacement.
   * @param {string} target the string on witch to apply the replacements
   * @param {string|Regex} search the pattern to replace
   * @param {string} replace the replacement value.
   */
  replaceAll(target, search, replace) {
    return target.split(search).join(replace);
  }
};
