const { v4:uuidV4 } = require('uuid');

class Band {
    constructor(name = 'no-name') {
        
        this.id = uuidV4();
        this.votes = 0;
        this.name = name;
    }
}

module.exports = Band;