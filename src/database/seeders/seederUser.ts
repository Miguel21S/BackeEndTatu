
import { AppDataSource } from "../db";
import { User } from '../../models/User';
import bcrypt from 'bcrypt';

const manuallyFillUsers = () => {
    const users = [
        { name: "John", lastname: "Doe", email: "john@example.com", password: "joh11", role_id: 1 },
        { name: "Elena", lastname: "García", email: "elena@example.com", password: "elena123", role_id: 1 },
        { name: "Carlos", lastname: "Martínez", email: "carlos@example.com", password: "carlos456", role_id: 2 },
        { name: "Laura", lastname: "López", email: "laura@example.com", password: "laura789", role_id: 1 },
        { name: "Juan", lastname: "Sánchez", email: "juan@example.com", password: "juan987", role_id: 1 },
        { name: "María", lastname: "Rodríguez", email: "maria@example.com", password: "maria654", role_id: 1 },
        { name: "Pedro", lastname: "Hernández", email: "pedro@example.com", password: "pedro321", role_id: 1 },
        { name: "Ana", lastname: "Pérez", email: "ana@example.com", password: "ana246", role_id: 1 },
        { name: "David", lastname: "Gómez", email: "david@example.com", password: "david135", role_id: 1 },
        { name: "Sara", lastname: "Díaz", email: "sara@example.com", password: "sara579", role_id: 1 },
        { name: "Mario", lastname: "Muñoz", email: "mario@example.com", password: "mario753", role_id: 1 },
        { name: "Jane", lastname: "Smith", email: "jane@example.com", password: "password2", role_id: 2 },
        { name: "Helena", lastname: "Helen", email: "helena@example.com", password: "password3", role_id: 3 }
    ];

    return users.map(userData => {
        const user = new User();
        user.name = userData.name;
        user.lastname = userData.lastname;
        user.email = userData.email;
        user.password = bcrypt.hashSync(userData.password, 10);
        user.role_id = userData.role_id;
        return user;
    });
};

const userSeedDatabase = async () => {
    try {
        await AppDataSource.initialize();
        const users = manuallyFillUsers();
        await User.save(users);
    } catch (error) {
        console.log(error);
    }
    finally {
        await AppDataSource.destroy();
    }
};

userSeedDatabase();
