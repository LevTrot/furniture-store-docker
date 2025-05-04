const mongoose = require('mongoose');
const Role = require('./Role');
const User = require('./User');

mongoose.connect('mongodb://localhost:27017/furniture_store')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connectiong error:', err));

const createRoles = async () => {
    await Role.deleteMany();

    const readRole = new Role({
        name: 'read',
        permissions: ['read']
    });

    const writeRole = new Role({
        name: 'write',
        permissions: ['read', 'write']
    });

    const adminRole = new Role ({
        name: 'admin',
        permissions: ['read', 'write', 'delete']
    });

    await readRole.save();
    await writeRole.save();
    await adminRole.save();

    console.log('Roles saved:', await Role.find());
};

const createUsers = async () => {
    const readRole = await Role.findOne({ name: 'read'});
    const writeRole = await Role.findOne({ name: 'write'});
    const adminRole = await Role.findOne({ name: 'admin'});

    console.log('Found roles:', {readRole, writeRole, adminRole});

    const userReader = new User({
        username: 'reader',
        password: 'reader',
        email: 'user1@gmail.com',
        role: readRole._id
    });

    const userWriter = new User({
        username: 'writer',
        password: 'writer',
        email: 'user2@gmail.com',
        role: writeRole._id
    });

    const userAdmin = new User({
        username: 'admin',
        password: 'admin',
        email: 'user3@gmail.com',
        role: adminRole._id
    });

    userReader.save();
    userWriter.save();
    userAdmin.save();

    console.log('Users saved:', await User.find().populate('role'));
};

createRoles()
    .then(createUsers)
    .then(() => {
        console.log('Roles and Users successfully created');
        mongoose.disconnect();
    })
    .catch((err) => {
        console.log(err);
        mongoose.disconnect();
    });