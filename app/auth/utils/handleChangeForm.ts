export function handleChange<T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: (data: T) => void,
  formData: T
) {
  const { name, value, type, checked } = e.target;
  setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
  });
}
