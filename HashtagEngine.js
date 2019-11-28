module.exports = class HashtagEngine {

    constructor(templateString) {
        this.templatedString = templateString;
    }
    static fromString(templateString) {
        return new HashtagEngine(templateString);
    }

    replace(objKeyValueDictionary) {
        for (let key in objKeyValueDictionary) {
            if (objKeyValueDictionary.hasOwnProperty(key)) {
                this.templatedString = this.templatedString.replace(new RegExp(`#_${key}_#`, `g`), function(match) {
                    return objKeyValueDictionary[key];
                })
            }
        }
        return this;
    }

    delete(objDeleteDictionary) {
        if (!objDeleteDictionary) return this;
        for (let key in objDeleteDictionary) {
            if (objDeleteDictionary.hasOwnProperty(key)) {
                if (!objDeleteDictionary[key]) continue;
                this.templatedString = this.templatedString.replace(
                    new RegExp(`#_delete_on_${key}_#[\\s\\S]*?#_delete_on_${key}_#`, `g`), '');
            }
        }
        // remove the #_delete_on_..._# tags that got not deleted b/c dictionary had not set the keys
        this.templatedString = this.templatedString.replace(/#_delete_on_.*?_#/g, '');
        return this;
    }

    static serializeArray(arr, optBrackets) {
        return `[${arr.map(item => optBrackets ? `${optBrackets}${item}${optBrackets}` : item).join(',')}]`
    }

    toString() {
        return this.templatedString;
    }
}