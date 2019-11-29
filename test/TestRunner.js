const HashtagEngine = require('../HashtagEngine');
const fs = require('fs');
const assert = require('assert');

let testFilePath = './testfile';

(function testInFileReplacement() {
    try {
        fs.writeFileSync(testFilePath, 'a test meets #_somename_#');
        HashtagEngine.replaceInFile(testFilePath, {somename: 'gamma'});
        let line = fs.readFileSync(testFilePath).toString();
        assert(line.indexOf('gamma') > -1);
    } catch (err) {
        console.error(err);
    } finally {
        fs.unlinkSync(testFilePath);
    }
})();

(function testChainedApiReplacement() {
    let replaced = HashtagEngine
        .fromString('Karl #_verb_# #_object_#')
        .replace({verb: 'eats', object: 'some fish'}).toString();
    assert(replaced === 'Karl eats some fish');
})();

(function testOriginalStringStaysTheSame() {
    let originalString = '#_a-dinosaur-type_#:\n The #_a-dinosaur-type_# eats plants.';
    let replaced = HashtagEngine
        .fromString(originalString)
        .replace({'a-dinosaur-type': 'brontosaurus'}).toString();
    assert(replaced === 'brontosaurus:\n The brontosaurus eats plants.');
    assert(originalString === '#_a-dinosaur-type_#:\n The #_a-dinosaur-type_# eats plants.');
})();

(function testDeletion() {
    let originalString = 'Simba #_delete_on_goodmood_# sometimes #_delete_on_goodmood_# rocks.';
    let result = new HashtagEngine(originalString)
        .delete({goodmood: false});
    assert (result.toString() === 'Simba  sometimes  rocks.');
})();

(function testDeletion() {
    let originalString = 'Simba #_delete_on_goodmood_# sometimes #_delete_on_goodmood_# rocks.';
    let result = new HashtagEngine(originalString)
        .delete({goodmood: true});
    assert (result.toString() === 'Simba  rocks.');
})();

(function testSerializeArray() {
    let array = [1,2,3];
    let result = HashtagEngine.serializeArray(array);
    assert (result === '[1,2,3]');
    result = HashtagEngine.serializeArray(array,`'`);
    assert (result === `['1','2','3']`);
})();