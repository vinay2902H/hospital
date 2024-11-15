import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PrescriptionForm = () => {
  const { doctornic, appointmentId } = useParams(); // Get the doctor NIC and appointment ID from the route
  const [prescription, setPrescription] = useState({
    Medication_Name: "",
    Dosage: "",
    Frequency: "",
    Duration_of_Treatment: "",
    Special_Instructions: ""
  });

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/appointment/getprescription/${appointmentId}`,
          { withCredentials: true }
        );
        setPrescription(data.prescription);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };
    fetchPrescription();
  }, [appointmentId]);

  // Handle input change for prescription fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescription((prevPrescription) => ({
      ...prevPrescription,
      [name]: value
    }));
  };

  // Update prescription details for the specific appointment
  const handleUpdatePrescription = async () => {
    try {
      await axios.put(`http://localhost:4000/api/v1/appointment/updateprescription/${appointmentId}`, prescription);
      alert("Prescription updated successfully!");
    } catch (error) {
      console.error("Error updating prescription:", error);
      alert("Failed to update prescription.");
    }
  };

  return (
    <div>
      <h2>Update Prescription</h2>
      <form>
        <label>
          Medication Name:
          <input
            type="text"
            name="Medication_Name"
            value={prescription.Medication_Name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Dosage:
          <input
            type="text"
            name="Dosage"
            value={prescription.Dosage}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Frequency:
          <input
            type="text"
            name="Frequency"
            value={prescription.Frequency}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Duration of Treatment:
          <input
            type="text"
            name="Duration_of_Treatment"
            value={prescription.Duration_of_Treatment}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Special Instructions:
          <input
            type="text"
            name="Special_Instructions"
            value={prescription.Special_Instructions}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleUpdatePrescription}>
          Update Prescription
        </button>
      </form>
    </div>
  );
};

export default PrescriptionForm;
