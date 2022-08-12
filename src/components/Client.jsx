import { useNavigate } from "react-router-dom";

const Client = ({customer, handleDelete}) => {
  const {name, company, email, phone, notes, id} = customer;
  
  const navigate = useNavigate();
  return <tr className='border-b hover:bg-gray-200'>
      <td className='p-3 text-center'>{name}</td>
      <td className='p-3 text-center'>
        <p>
          <span className='text-gray-800 uppercase font-bold'>Email: </span>
          {email}
        </p>
        <p>
          <span className='text-gray-800 uppercase font-bold'>Teléfono: </span>
          {phone}
        </p>
      </td>
      <td className='p-3 text-center'>{company}</td>
      <td className='p-3'>
        <button type='button' className='bg-yellow-500 hover:bg-yellow-600 block w-full text-white p-2 uppercase font-bold text-xs' onClick={() => navigate(`/clientes/${id}`)}>
          Ver
        </button>
  <button type='button' className='bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3' onClick={() => navigate(`/clientes/editar/${id}`)}>
          Editar
        </button>
        <button type='button' className='bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs mt-3' onClick={() => handleDelete(id)}>
          Eliminar
        </button>
      </td>
    </tr>;
};

export default Client;