import { useRef, useState } from 'react';
import Input from '../components/FormValidation/Input';
import { validateForm } from '../components/FormValidation/validateForm';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const isError = validateForm(formData, formRef, setErrors);

    console.log(isError);
  };

  return (
    <section className="py-16">
      <div className="xl:container mx-auto">
        <div className="flex mb-4 flex-wrap">
          <div className="w-1/3 px-7 mx-auto">
            <div className="shadow-md border p-4 rounded">
              <h1 className="text-4xl text-white mb-5">Registration</h1>
              <form ref={formRef} onSubmit={handleSubmit}>
                <Input
                  label="Name"
                  name="name"
                  type="text"
                  errors={errors}
                  placeholder="Name..."
                  value={formData.name}
                  onHadleChange={handleChange}
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  errors={errors}
                  placeholder="Example@email.com"
                  value={formData.email}
                  onHadleChange={handleChange}
                />
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  errors={errors}
                  placeholder="password..."
                  value={formData.password}
                  onHadleChange={handleChange}
                />
                <Input
                  label="Confirm Passowrd"
                  name="confirmPassword"
                  type="password"
                  errors={errors}
                  placeholder="Confirm password..."
                  value={formData.confirmPassword}
                  onHadleChange={handleChange}
                />

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-cyan-600 text-white p-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
