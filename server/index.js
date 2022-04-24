const bcrypt = require('bcrypt');

bcrypt.hash('letmein', 10, (err, hash) => {
    console.log(hash)
})


