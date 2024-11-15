import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AppointmentsList = ({ doctornic }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/appointment/getdoctor/${doctornic}`,
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (err) {
        setError("No Appointments Found.");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [doctornic]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Doctor</th>
            <th>Department</th>
            <th>Status</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.firstName}</td>
              <td>{appointment.date}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.department}</td>
              <td>{appointment.status}</td>
              <td>
                {/* Link to update prescription for the specific appointment */}
                <Link to={`/updateprescription/${doctornic}/${appointment._id}`}>
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsList;
