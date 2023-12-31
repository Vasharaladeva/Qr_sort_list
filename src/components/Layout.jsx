// import { Outlet, Link, useLocation } from 'react-router-dom'
// import img from '../../public/logo.jpeg'

// function Layout() {
//     const location = useLocation()
//     return (
//         <div className='md:flex md:min-h-screen'>
//             <aside className='md:w-1/4 bg-white px-5 py-10'>

//                 <div className="flex flex-shrink-0 items-center">
//                     <img
//                         className="block h-8 w-auto lg:hidden"
//                         src={img}
//                         alt="Your Company"
//                     />
//                     <img
//                         className="hidden h-8 w-auto lg:block"
//                         src={img}
//                         alt="Your Company"
//                     />
//                 </div>
//                 <nav className='mt-10'>
//                     <Link
//                         className={`${location.pathname === '/' ? 'text-blue-300' : 'text-blue-900'} text-2xl block mt-2 hover:text-blue-600 `}
//                         to="/">Lista</Link>

//                     <Link
//                         className={`${location.pathname === '/clientes/nuevo' ? 'text-blue-300' : 'text-blue-900'} text-2xl block mt-2 hover:text-blue-600 `}
//                         to="/clientes/nuevo">Escanear Estudiante</Link>
//                     <Link
//                         className={`${location.pathname === '/formulario' ? 'text-blue-300' : 'text-blue-900'} text-2xl block mt-2 hover:text-blue-600 `}
//                         to="/formulario">Formulario</Link>
//                     <Link
//                         className={`${location.pathname === '/inactivo' ? 'text-blue-300' : 'text-blue-900'} text-2xl block mt-2 hover:text-blue-600 `}
//                         to="/inactivo">Lista Inactivo</Link>
//                     <Link
//                         className={`${location.pathname === '/asignaciones' ? 'text-blue-300' : 'text-blue-900'} text-2xl block mt-2 hover:text-blue-600 `}
//                         to="/asignaciones">Asignaciones</Link>
//                     <Link
//                         className={`${location.pathname === '/supervisor' ? 'text-blue-300' : 'text-blue-900'} text-2xl block mt-2 hover:text-blue-600 `}
//                         to="/supervisor">Lista Supervisores</Link>
//                 </nav>
//             </aside>

//             <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
//                 <Outlet />
//             </main>
//         </div>
//     )
// }

// export default Layout
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Outlet, Link, useLocation } from 'react-router-dom'
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import img from '../../public/logo.jpeg'
const navigation = [
  { name: 'Lista', to: '/', icon: HomeIcon, current: false },
  { name: 'Formulario', to: '/formulario', icon: UsersIcon, current: false },
  { name: 'Escanear Estudiante', to: '/clientes/nuevo', icon: FolderIcon, current: false },
  { name: 'Lista Inactivos', to: '/inactivo', icon: CalendarIcon, current: false },
  { name: 'Asignaciones', to: '/asignaciones', icon: InboxIcon, current: false },
  { name: 'Supervisores', to: '/supervisor', icon: ChartBarIcon, current: false },
]
const userNavigation = [
  { name: 'Your Profile', to: '#' },
  { name: 'Settings', to: '#' },
  { name: 'Sign out', to: '#' },
]
const stats = [
    { name: 'Total Subscribers', stat: '71,897' },
    { name: 'Avg. Open Rate', stat: '58.16%' },
    { name: 'Avg. Click Rate', stat: '24.57%' },
  ]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src={img}
                      alt="Your Company"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                 <Link
                       
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
            <img
                      className="h-8 w-auto"
                      src={img}
                      alt="Your Company"
                    />
            </div>
            <div className="mt-5 flex flex-grow flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {navigation.map((item) => (
                                   <Link
                       
                                   key={item.name}
                                   to={item.to}
                                   className={classNames(
                                     item.current
                                       ? 'bg-gray-100 text-gray-900'
                                       : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                     'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                   )}
                                 >
                                   <item.icon
                                     className={classNames(
                                       item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                       'mr-4 flex-shrink-0 h-6 w-6'
                                     )}
                                     aria-hidden="true"
                                   />
                                   {item.name}
                                 </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                {/* <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form> */}
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                {/* <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              to={item.to}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
                
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1> */}

              </div>
              
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                
                {/* <div className="py-4">
                  <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                </div> */}
                
                 <Outlet />
                {/* /End replace */}
                
              </div>
            </div>
          </main>
          
        </div>
      </div>
    </>
  )
}
