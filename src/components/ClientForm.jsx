import { Form, Formik, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alert from "./Alert";

const ClientForm = ({customer}) => {
  const navigate = useNavigate();

  const newClientSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Mínimo 3 letras")
      .max(20, "Máximo 20 letras")
      .required("El nombre del cliente es obligatorio"),
    company: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no válido")
      .required("El email es obligatorio"),
    phone: Yup.number()
      .integer("Número de teléfono no válido")
      .positive("Número de teléfono no válido")
      .typeError("Número de teléfono no válido"),
  });

  const handleSubmit = async (values) => {
    try {
      if (customer.id) {
        const url = `http://localhost:4000/clientes/${customer.id}`
        const response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
      }

      else {
        const url = "http://localhost:4000/clientes";
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });

      }
        
      navigate("/clientes");
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
        {customer?.name ? 'Editar Cliente' : 'Añadir Cliente'}
      </h1>
      <Formik
        initialValues={{
          name: customer?.name ?? "",
          company: customer?.company ?? "",
          email: customer?.email ?? "",
          phone: customer?.phone ?? "",
          notes: customer?.notes ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm(); 
        }}
        validationSchema={newClientSchema}
      >
        {({ errors, touched }) => {
          return (
            <Form className='mt-10'>
              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='name'>
                  Nombre:
                </label>
                <Field
                  name='name'
                  id='name'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Nombre del cliente'
                />

                {errors.name && touched.name ? (
                  <Alert>{errors.name}</Alert>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='company'>
                  Empresa:
                </label>
                <Field
                  name='company'
                  id='company'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Empresa del cliente'
                />

                {errors.company && touched.company ? (
                  <Alert>{errors.company}</Alert>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='email'>
                  Email:
                </label>
                <Field
                  name='email'
                  id='email'
                  type='email'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Email del cliente'
                />

                {errors.email && touched.email ? (
                  <Alert>{errors.email}</Alert>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='phone'>
                  Número de teléfono:
                </label>
                <Field
                  name='phone'
                  id='phone'
                  type='tel'
                  className='mt-2 block w-full p-3 bg-gray-50'
                  placeholder='Teléfono del cliente'
                />

                {errors.phone && touched.phone ? (
                  <Alert>{errors.phone}</Alert>
                ) : null}
              </div>

              <div className='mb-4'>
                <label className='text-gray-800' htmlFor='notes'>
                  Notas:
                </label>
                <Field
                  name='notes'
                  as='textarea'
                  id='notes'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-50 h-40'
                  placeholder='Notas del cliente'
                />
              </div>

              <input
                type='submit'
                value={customer?.name ? 'Editar Cliente' : 'Añadir Cliente'}
                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg cursor-pointer'
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

ClientForm.defaultProps = {
  customer: {}
}

export default ClientForm;
