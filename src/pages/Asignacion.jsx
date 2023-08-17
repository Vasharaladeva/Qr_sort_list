import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';

const Asignacion = () => {
  const [value, setValue] = useState({
    supervisor: '',
    colegio: '',
  });

  const [estudiantes, setEstudiantes] = useState([]);
  const [selectedEstudiante, setSelectedEstudiante] = useState(null);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/estudiante');
        setEstudiantes(response.data.estudiantes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEstudiantes();
  }, []);

  const [validator] = useState(
    new SimpleReactValidator({
      className: 'errorMessage',
    })
  );

  const changeHandler = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    validator.showMessages();
  };

  const handleEstudianteChange = (e) => {
    const selectedEstudiante = estudiantes.find((estudiante) => estudiante.colegio === e.target.value);
    console.log('Valor seleccionado:', selectedEstudiante); 
    setSelectedEstudiante(selectedEstudiante);
    changeHandler(e);
    
  };

  const handleColegioChange = (e) => {
    changeHandler(e);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (!selectedEstudiante) {
        toast.error('Selecciona un colegio válido');
        return;
      }

      const formData = new FormData();
      formData.append('supervisor', value.supervisor);
      formData.append('colegio', selectedEstudiante.colegio); // Agrega el ID del estudiante a la asignación

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const respuesta = await axios.post('http://localhost:2000/api/asignacion', formData, config);
      console.log(respuesta);
      toast.success('El equipo se agregó correctamente');

      setSelectedEstudiante(null);
    } catch (error) {
      console.log(error);
      toast.error('Hubo un error al agregar el equipo');
    }
  };

  // Filtrar los nombres de los colegios únicos
  const uniqueColegios = [...new Set(estudiantes.map((estudiante) => estudiante.colegio))];

  return (
    <>
      <ToastContainer />

      <form onSubmit={submitForm}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Crear Nuevos Equipos</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="supervisor" className="block text-sm font-medium leading-6 text-gray-900">
                  TITULO
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="supervisor"
                    id="supervisor"
                    value={value.supervisor}
                    onChange={changeHandler}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="colegio" className="block text-sm font-medium leading-6 text-gray-900">
                  Colegio
                </label>
                <div className="mt-2">
                  <select
                    id="colegio"
                    name="colegio"
                    value={value.colegio}
                    onChange={handleEstudianteChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled value="">
                      Seleccionar colegio
                    </option>
                    {uniqueColegios.map((colegio) => (
                      <option key={colegio} value={colegio}>
                        {colegio}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Asignacion;
