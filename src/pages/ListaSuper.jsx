import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'

const ListaSuper = () => {
  const [supervisores, setSupervisores] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [colegios, setColegios] = useState([]);

  useEffect(() => {
    const fetchSupervisores = async () => {
      try {
        const response = await axios.get('http://localhost:2000/api/supervisores'); // Cambiar la URL según corresponda
        setSupervisores(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSupervisores();
  }, []);

  useEffect(() => {
    const fetchEstudiantesBySupervisor = async () => {
      if (selectedSupervisor) {
        console.log('Valor del supervisor seleccionado:', selectedSupervisor); // Agrega este console.log
        try {
          const response = await axios.get(`http://localhost:2000/api/supervisor/${selectedSupervisor}/estudiantes`);
          console.log('Respuesta del servidor:', response.data); // Agrega este console.log
          setEstudiantes(response.data.estudiantes); // Asegúrate de que estás accediendo a response.data.estudiantes
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchEstudiantesBySupervisor();
  }, [selectedSupervisor]);

  const handleSupervisorChange = (e) => {
    const selectedValue = e.target.value;
    console.log('Valor seleccionado:', selectedValue); // Agrega este console.log
    setSelectedSupervisor(selectedValue);
  };

  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
            <div className="relative flex h-16 justify-between">

              <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                <div className="w-full sm:max-w-xs">
                  <label htmlFor="supervisor">Seleccionar Supervisor:</label>
                  <select id="supervisor" name="supervisor" value={selectedSupervisor} onChange={handleSupervisorChange}>
                    <option value="">Seleccionar Supervisor</option>
                    {supervisores.map((supervisor) => (
                      <option key={supervisor._id} value={supervisor.colegio}>
                        {supervisor.supervisor}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>


          </div>

          <div className="border-t border-gray-200 pt-4 pb-3">

            <div className="px-4 sm:px-6 lg:px-8">

              <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                  <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Lista de Estudiantes</h1>
                    <p className="mt-2 text-sm text-gray-700">
                      Lista de estudiantes viajes TRAVELERO.
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Estudiantes
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Info
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Status
                              </th>

                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {estudiantes.map((person) => (
                              <tr key={person.email}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                      <img className="h-10 w-10 rounded-full" src={`http://localhost:2000/${person.imagenPerfil}`} alt="" />
                                    </div>
                                    <div className="ml-4">
                                      <div className="font-medium text-gray-900">{person.nombre} {person.apellido}</div>
                                      <div className="text-gray-500">{person.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <div className="text-gray-900">{person.colegio}</div>
                                  <div className="text-gray-500">{person.destino}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${person.estatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {person.estatus ? 'Activo' : 'Inactivo'}
                                  </span>
                                </td>

                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <Link to={`/estudiante/${person._id}`} className="text-indigo-600 hover:text-indigo-900">
                                    Perfil
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </>
      )
      }
    </Disclosure >
  );
};

export default ListaSuper;


