import ClientForm from "../components/ClientForm"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditClient = () => {
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

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Utiliza este formulario para editar los datos de un cliente</p>
      
      {customer.name ? (<ClientForm customer={customer}/>) : <p>El cliente no existe</p>}
    </>
  )
}

export default EditClient