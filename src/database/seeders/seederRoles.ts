
import { AppDataSource } from "../db";
import { Role } from "../../models/Role";

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

roleSeedDatabase();
