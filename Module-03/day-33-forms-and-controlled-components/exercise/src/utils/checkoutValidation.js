const phonePattern = /^(?:\+251|0)9\d{8}$/;
const validate = (form) => {
  const errors = {};

  if (form.orderMode !== "delivery" && form.orderMode !== "pickup") {
    errors.orderMode = "Please choose delivery mode";
  }

  if (!form.name.trim()) {
    errors.name = "Please enter your name";
  } else if (form.name.trim().length > 100) {
    errors.name = "Text exceeds 100 characters";
  }

  if (!form.phone.trim()) {
    errors.phone = "Please enter your phone number";
  } else if (!phonePattern.test(form.phone.trim())) {
    errors.phone = "Use 09... or +2519... (TeleBirr number)";
  }

  if (
    form.orderMode === "delivery" &&
    (form.area === "select" || form.area === "")
  ) {
    errors.area = "Please choose delivery area";
  }

  if (form.notes.trim().length > 255) {
    errors.notes = "Text too long, please make it shorter";
  }
  return errors;
};

export default validate;
