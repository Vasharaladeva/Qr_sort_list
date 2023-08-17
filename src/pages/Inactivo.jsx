import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Inactivo = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [estudiantesCount, setEstudiantesCount] = useState(0);
    const [statusChanged, setStatusChanged] = useState(false);
    const stats = [
        { name: 'Registrados', stat: estudiantesCount},
        { name: 'Aprox. Registros', stat: '58.16%' },
        { name: 'Aprox. Cache', stat: '24.57%' },
      ]
    useEffect(() => {
        axios.get(`http://localhost:2000/api/estudianteina`)
            .then((response) => {
                setEstudiantes(response.data.estudiantes);
                setEstudiantesCount(response.data.estudiantesCount);
            })
            .catch((error) => {
                console.log('Error al obtener usuarios inactivos:', error);
            });
    }, []);

    const handleChangeStatus = () => {
        axios.put('http://localhost:2000/api/estudiante/cambiar-estatus')
            .then((response) => {
                setStatusChanged(true);

                axios.get(`http://localhost:2000/api/estudianteina`)
                    .then((response) => {
                        setEstudiantes(response.data.estudiantes);
                        setEstudiantesCount(response.data.estudiantesCount);
                    })
                    .catch((error) => {
                        console.log('Error al obtener usuarios inactivos:', error);
                    });
            })
            .catch((error) => {
                console.log('Error al cambiar el estatus de los usuarios:', error);
            });
    };

    return (
        <Disclosure as="header" className="bg-white shadow">
            {({ open }) => (
                <>


                    <div className="border-t border-gray-200 pt-4 pb-3">

                        <div className="px-4 sm:px-6 lg:px-8">

                            <div className="px-4 sm:px-6 lg:px-8">
                                <div className="sm:flex sm:items-center">
                                <div>
                                    <h3 className="text-lg font-medium leading-6 text-gray-900">Lista No Escaneados</h3>
                                    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                                        {stats.map((item) => (
                                        <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                                            <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                                            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
                                        </div>
                                        ))}
                                    </dl>
                                    </div>
                                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
                                        <div className="flex space-x-4">
                        
                                                <Link to="/reporteinactivos" target="_blank">
                                                    <button
                                                        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                                    >
                                                        Reporte
                                                    </button>
                                                </Link>
                                           
                                    
                                                <button
                                                    className="w-full px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                                                    onClick={handleChangeStatus}
                                                >
                                                    Inactivo Todo
                                                </button>
                                                {statusChanged}
                                          
                                        </div>
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
                                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                                Perfil
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
            )}
        </Disclosure>
    )
}

export default Inactivo;
