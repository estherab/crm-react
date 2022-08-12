import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const SeeClient = () => {
  const [customer, setCustomer] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const getCustomerAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const result = await (await fetch(url)).json();
        setCustomer(result);
      } catch (error) {
        console.log(error);
      }
    };

    getCustomerAPI();
  }, []);

  return Object.keys(customer).length === 0 ? (
    <p>No hay resultados</p>) : 
    (<div>
        <>
          <h1 className='font-black text-4xl text-blue-900'>
            Ver Cliente: {customer.name}
          </h1>
          <p className='mt-3'>Información del cliente</p>

          <p className=' text-gray-600 text-2xl mt-10'>
            <span className='text-gray-800 uppercase font-bold'>Cliente: </span>
            {customer.name}
          </p>

          <p className=' text-gray-600 text-2xl mt-4'>
            <span className='text-gray-800 uppercase font-bold'>Email: </span>
            {customer.email}
          </p>

          {customer.phone && (
            <p className=' text-gray-600 text-2xl mt-4'>
              <span className='text-gray-800 uppercase font-bold'>
                Teléfono:{" "}
              </span>
              {customer.phone}
            </p>
          )}

          {customer.company && (
            <p className=' text-gray-600 text-2xl mt-4'>
              <span className='text-gray-800 uppercase font-bold'>
                Empresa:{" "}
              </span>
              {customer.company}
            </p>
          )}

          {customer.notes && (
            <p className=' text-gray-600 text-2xl mt-4'>
              <span className='text-gray-800 uppercase font-bold'>Notas: </span>
              {customer.notes}
            </p>
          )}
        </>
    </div>
  );
};

export default SeeClient;
