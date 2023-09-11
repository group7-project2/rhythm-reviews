const { User } = require('../models');

const userData =
    [
        {
            "username": "Lucas",
            "email": "lucas5@gmail.com",
            "password": "password123"
        },
        {
            "username": "Steren",
            "email": "steren8@gmail.com",
            "password": "password123"
        },
        {
            "username": "Killa",
            "email": "killa2@gmail.com",
            "password": "password123"
        }
    ];

const seedAllUsers = async () => {
    for (const user of userData) {
        await User.create(user);
    }
}

module.exports = seedAllUsers;