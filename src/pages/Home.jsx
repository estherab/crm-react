import { useState, useEffect } from "react";
import Client from "../components/Client";

const Home = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const getCustomersAPI = async () => {
      try {
        const url = "http://localhost:4000/clientes";
        const result = await (await fetch(url)).json();
        setCustomers(result);
      } catch (error) {
        console.log(error);
      }
    };

    getCustomersAPI();
  }, []);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const conf = confirm('¿Quieres eliminar el cliente?');

    if (conf) {
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const response = await fetch(url, {
          method: 'DELETE'
        })

        const arrayCustomer = customers.filter(customer => customer.id != id)
        setCustomers(arrayCustomer);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>
        Administra tus clientes
      </p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
           {customers.map(customer => (
              <Client key={customer.id} customer={customer} handleDelete={handleDelete}/>
           ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
