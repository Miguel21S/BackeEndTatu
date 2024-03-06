
import { AppDataSource } from "../db";
import { Role } from "../../models/Role";
import { Service } from "../../models/Service";
import { User } from '../../models/User';
import bcrypt from 'bcrypt';

/////////////////    SEEDER CREAR ROLES  ///////////////////////
const roleSeedDatabase = async () => {
  try {
    await AppDataSource.initialize();

    const roleUser = new Role();
    roleUser.name = "user"
    await roleUser.save();

    // const createRoleUser = await Role.create({
    //   name: "user"
    // }).save()

    const roleAdmin = new Role();
    roleAdmin.name = "admin"
    await roleAdmin.save();

    const roleSuperAdmin = new Role();
    roleSuperAdmin.name = "superAdmin"
    await roleSuperAdmin.save();

    console.log('---------------------------');
    console.log('Los roles se han guardado correctamente');
    console.log('---------------------------');
  } catch (error) {
    console.log(error);
  } finally {
    await AppDataSource.destroy()
  }
}

/////////////////    SEEDER CREAR SERVICIOS  ///////////////////////
const serviceSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()
    const service1 = new Service()
    service1.service_name = "Custom tatoo"
    service1.description =
      "Customer can bring his design and we ink it on his body"

    service1.id = 1
    await service1.save()
    const service2 = new Service()
    service2.service_name = "Web catalog tatoo"
    service2.description =
      "We have severals desingn on predefined designs in our catalog."

    service2.id = 2
    await service2.save()
    const service3 = new Service()
    service3.service_name = "Old tattoo restoration"
    service3.description = "We can fix old blur tattos"

    service3.id = 3
    await service3.save()
    const service4 = new Service()
    service4.service_name = "Piercing and dilator insertion"
    service4.description =
      "We offer professional services for piercing and dilator placement"

    service4.id = 4
    await service4.save()
    const service5 = new Service()
    service5.service_name = "Sale of piercings and other articles"
    service5.description =
      "In addition to our application services, we offer a selection of piercings and other body art related items. Customers can purchase quality products to complement their unique style."

    service5.id = 5
    await service5.save()

    console.log('---------------------------');
    console.log('Los servicios se han guardado correctamente');
    console.log('---------------------------');
  } catch (error) {
    console.log(error)
  } finally {
    if (AppDataSource) {
      await AppDataSource.destroy()
    }
  }
}

/////////////////    SEEDER CREAR USUARIOS  ///////////////////////
const adtosUsers = () => {
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

const userDatabase = async () => {
    try {
        await AppDataSource.initialize();
        const users = adtosUsers();
        await User.save(users);

        console.log('---------------------------');
        console.log('Los usuarios se han guardado correctamente');
        console.log('---------------------------');
    } catch (error) {
        console.log(error);
    }
    finally {
        await AppDataSource.destroy();
    }
};

userDatabase();
serviceSeedDatabase()
roleSeedDatabase();
