import { useState } from "react";
import "./DeliveryForm.css";

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: "select",
  });
  const nameIsValid = formData.name !== "";
  const phoneIsValid = /^(?:\+251|0)9\d{8}$/.test(formData.phone);
  const selectIsValid = formData.area !== "select";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameIsValid || !phoneIsValid || !selectIsValid) return;
    console.log(formData);
    e.currentTarget.reset();
  };

  return (
    <form id="delivery-form" method="post" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          onChange={handleChange}
        />
        {!nameIsValid && <p>Please enter your name</p>}
      </div>

      <div>
        <label htmlFor="phone">Telebirr Phone:</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="0911223344"
          required
          onChange={handleChange}
        />
        {formData.phone && !phoneIsValid && (
          <p>Please enter a valid TeleBirr phone number</p>
        )}
      </div>

      <div>
        <label htmlFor="area">Delivery Area</label>
        <select name="area" id="area" required onChange={handleChange}>
          <option value="select">Select</option>
          <option value="bole">Bole</option>
          <option value="kazanchis">Kazanchis</option>
          <option value="megenagna">Megenagna</option>
          <option value="piassa">Piassa</option>
        </select>
        {!selectIsValid && <p>Please select area of delivery</p>}
      </div>

      <button disabled={!phoneIsValid} type="submit">
        Submit
      </button>
    </form>
  );
};

export default DeliveryForm;
