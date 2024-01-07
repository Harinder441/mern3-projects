import React, { useState } from "react";
import axios from "axios";
export default function BookAppointment() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    docter: "",
    where: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        formData
      );
      if (res.status === 201) {
        setSubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch {
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return submitted ? (
    <>
    <h1>Booked Succesfully</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
        provident. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Ipsum, voluptate.
      </p>
      <button onClick={()=>setSubmitted(false)}>Cancel</button>
    </>
  ) : (
    <div>
      <h1>Book a Session</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
        provident. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Ipsum, voluptate.
      </p>
      {loading ? (
        <p>Sheduling .......</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <h6>Basic Info</h6>
            <div>
              <label htmlFor="first_name">First Name</label>
              <input
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="last_name">Last Name</label>
              <input
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <h6>Docter</h6>
            <div>
              <select
                name="docter"
                value={formData.docter}
                onChange={handleChange}
              >
                <option value="">Select Docter</option>
                <option value="1">John Singh</option>
                <option value="2">Mohn Singh</option>
              </select>
            </div>
          </div>
          {formData.docter !== "" && (
            <>
              <div>
                <h6>Where</h6>
                <div>
                  <input
                    id="where1"
                    name="where"
                    type="radio"
                    value="googleMeet"
                    checked={formData.where === "googleMeet"}
                    onChange={handleChange}
                  />
                  <label htmlFor="where1">Google Meet</label>
                </div>
                <div>
                  <input
                    id="where2"
                    name="where"
                    type="radio"
                    value="phone"
                    checked={formData.where === "phone"}
                    onChange={handleChange}
                  />
                  <label htmlFor="where2">Phone</label>
                </div>
              </div>
              <div>
                <h6>When</h6>

                <div>
                  <input
                    id="time"
                    name="time"
                    type="datetime-local"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </>
          )}

          <button>Confirm Booking</button>
        </form>
      )}
    </div>
  );
}
