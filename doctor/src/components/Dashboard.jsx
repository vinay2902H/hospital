import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { doctornic } = useParams();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/appointment/getdoctor/${doctornic}`,
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (err) {
        setError("No appointments found.");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [doctornic]);

  const { isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <section className="dashboardpage">
        <div className="appointments-section">
          {loading ? (
            <p><img src="/Loading.gif" alt="Loading..." /></p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="banner">
              <h5>Appointments</h5>
              <table>
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Prescription</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments && appointments.length > 0 ? (
                    appointments
                      .filter((appointment) => appointment.status === "Accepted")
                      .map((appointment) => (
                        <tr key={appointment._id}>
                          <td>{appointment.nic}</td>
                          <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                          <td>{appointment.appointment_date.substring(0, 10)}</td>
                          <td>{appointment.email}</td>
                          
                          
                          <td>
                          {appointment.hasvisited === false ? (
                          <span>Not Visited</span>
                          ) : (
                          <span>Visited</span>
                          )}
                          </td>
                          <td>
                          <Link to={`/prescription/${appointment._id}`} className="button-link">Update</Link>

                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="6">No Appointments Found!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
