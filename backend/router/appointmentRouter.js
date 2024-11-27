import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
  getAppointmentsByNIC,
  getDoctorAppointments,
  updateAppointmentprescription,
  getdocappointments,
  getprescription,
  
} from "../controller/appointmentController.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
  isDoctorAuthenticated,
} from "../middlewares/auth.js";  

const router = express.Router();

router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
// Add this route for getting patient appointments by NIC
//router.get("/getpatientbynic/:id", isPatientAuthenticated, getAppointmentsByNIC);
router.get("/getpatientbynic/:nicval", isPatientAuthenticated, getAppointmentsByNIC);
router.get("/getdoctor/:doctornic", isDoctorAuthenticated, getDoctorAppointments);
//router.get("/getstatus", isPatientAuthenticated, getPatientAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.get("/getprescription/:appointmentId",getprescription);
router.put("/updateprescription/:appointmentId",updateAppointmentprescription);
router.get("/getappointment/:getappointmentid",isDoctorAuthenticated,getdocappointments);

router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
