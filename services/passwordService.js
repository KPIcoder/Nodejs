const bcrypt = require('bcrypt');

module.exports= {
    hash: (password) => bcrypt.hash(password, 10),
    compareHashed: (hashed, password) =>  bcrypt.compare(password, hashed)
}
