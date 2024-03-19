
import { AppDataSource } from "../db";
import { Appointment } from "../../models/Appointment";

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomDate = () => {
  const start = new Date(2024, 0, 1); // Start date: January 1, 2024
  const end = new Date(); // Current date
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const appointmentSeedDatabase = async () => {
  try {
    await AppDataSource.initialize();

    const numAppointments = 10; // Number of appointments to create

    for (let i = 0; i < numAppointments; i++) {
      const appointment = new Appointment();
      appointment.user_id = randomInt(1, 12); // Assuming you have 12 users
      appointment.services_id = randomInt(1, 5); // Assuming you have 5 services
      appointment.appointments_date = randomDate();
      
      await appointment.save();
    }

    console.log('---------------------------');
    console.log('Los appointments se han guardado correctamente');
    console.log('---------------------------');
  } catch (error) {
    console.log(error);
  } finally {
    await AppDataSource.destroy()
  }
}

appointmentSeedDatabase();
