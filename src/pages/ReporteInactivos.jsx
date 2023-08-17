// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
// import axios from 'axios';

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4',
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   item: {
//     fontSize: 12,
//     marginBottom: 5,
//   },
// });

// const ReporteInactivos = () => {
//   const [estudiantes, setEstudiantes] = React.useState([]);

//   React.useEffect(() => {
//     axios
//       .get('http://localhost:2000/api/estudianteina')
//       .then((response) => {
//         setEstudiantes(response.data.estudiantes);
//       })
//       .catch((error) => {
//         console.log('Error al obtener usuarios inactivos:', error);
//       });
//   }, []);

//   return (
//     <PDFViewer style={{ width: '100%', height: '100vh' }}>
//       <Document>
//         <Page size="A4" style={styles.page}>
//           <View style={styles.section}>
//             <Text style={styles.heading}>Reporte de Usuarios Inactivos</Text>
//             {estudiantes.map((person) => (
//               <View key={person.email} style={styles.item}>
//                 <Text>
//                   Nombre: {person.nombre} {person.apellido}
//                 </Text>
//                 <Text>Telefono:: {person.telefono}</Text>
//                 <Text>Email: {person.email}</Text>
//                 <Text>Colegio: {person.colegio}</Text>
//                 {/* Agrega aquí los demás campos que desees mostrar en el reporte */}
//               </View>
//             ))}
//           </View>
//         </Page>
//       </Document>
//     </PDFViewer>
//   );
// };

// export default ReporteInactivos;


import React from 'react';
import axios from 'axios';
import '../../public/assets/css/styless.css';
import logo from '../../public/logo.jpeg';
// import logoHospital from '../../public/assets/img/logo-hospital.svg';
// import hospitalBg from '../../public/assets/img/template/hospital_bg.png';
// import { PDFViewer, Document, Page, Text, View } from '@react-pdf/renderer';


const Invoice = () => {
  const generatePDF = () => {
    const input = document.getElementById('download_section');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('invoice.pdf');
    });
  };

  const [estudiantes, setEstudiantes] = React.useState([]);
  const [estudiantesCount, setEstudiantesCount] = React.useState(0);

  React.useEffect(() => {
    axios
      .get('http://localhost:2000/api/estudianteina')
      .then((response) => {
        setEstudiantes(response.data.estudiantes);
        setEstudiantesCount(response.data.estudiantesCount);
      })
      .catch((error) => {
        console.log('Error al obtener usuarios inactivos:', error);
      });
  }, []);

    const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
  const day = currentDate.getDate();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="hospital-template">
      <div className="invoice-container-wrap">
        <div className="invoice-container">
          <main>
            <div className="invoice-container">
              <main>
                <div className="th-invoice invoice_style8" >
                  <div className="download-inner" id="download_section">
                    <header className="th-header header-layout5">
                      <div className="row justify-content-between">
                        <div className="col-auto">
                          <div className="header-logo">
                            <a href="index.html">
                            <img src={logo} alt="Invar" width="300" height="300" />

                            </a>
                          </div>
                        </div>
                        <div className="col-auto">
                          <p className="big-title">Reporte</p>
                          <p className="title"><b>Responsable: </b>Brayam</p>
                          <p className="invoice-number mb-2">
                            <b>reporte No: </b>#935648
                          </p>
                          <p className="invoice-date">
                            <b>Fecha: </b>{formattedDate}
                          </p>
                        </div>
                      </div>
                    </header>
                    <div className="row justify-content-between my-4">
                      <div className="col-auto">
                        <div className="invoice-left">
                          <b>Reporte para:</b>
                          <address>
                            Viajes Travelero <br />
                            Santa Cruz, <br />
                            Direccion, <br />
                            Bolivia
                          </address>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="table-title text-center">
                        <b>Estudiantes:</b>
                      </p>

                      <table className="invoice-table table-stripe-column">
                        <thead>
                          <tr>
                            <th>Nro</th>
                            <th>Estudiantes</th>
                            <th>Telefono</th>
                            <th>Destino</th>
                            <th>Colegio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {estudiantes.map((estudiante, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{estudiante.nombre} {estudiante.apellido} </td>
                              <td>{estudiante.telefono}</td>
                              <td>{estudiante.destino}</td>
                              <td>{estudiante.colegio}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan="4">
                              <b>Total Estudiantes:</b>
                            </td>
                            <td>{estudiantesCount}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <div className="invoice-buttons">
                    <button className="print_btn">
                      {/* ... SVG code ... */}
                    </button>
                    <button id="download_btn" className="download_btn" onClick={generatePDF}>
                      {/* ... SVG code ... */}
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Invoice;

// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, Link } from '@react-pdf/renderer';
// import axios from 'axios';

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: 'white', // Cambiar el color de fondo
//     padding: 20, // Aumentar el espacio interno en todas las páginas
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//     borderWidth: 1, // Agregar borde
//     borderColor: '#ccc', // Color del borde
//     borderStyle: 'solid', // Estilo del borde
//     borderRadius: 8, // Radio de la esquina del borde
//     boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)', // Agregar sombra
//   },
//   heading: {
//     fontSize: 28, // Aumentar el tamaño de la fuente
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center', // Alinear al centro
//     color: '#333', // Cambiar el color del texto
//   },
//   subheading: {
//     fontSize: 18, // Tamaño de fuente para subtítulos
//     fontWeight: 'bold',
//     marginBottom: 10, // Espacio entre subtítulos y contenido
//     color: '#555', // Color del texto
//   },
//   item: {
//     fontSize: 14, // Aumentar el tamaño de la fuente
//     marginBottom: 5,
//   },
//   separator: {
//     borderBottom: '1px solid #ccc', // Línea divisoria con color gris claro
//     marginBottom: 10, // Espacio después del separador
//   },
//   pageNumber: {
//     position: 'absolute',
//     bottom: 20, // Posición en la parte inferior
//     left: 0,
//     right: 0,
//     textAlign: 'center',
//     fontSize: 10, // Tamaño de fuente del número de página
//     color: '#555', // Color del número de página
//   },
//   logoContainer: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     right: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 200, // Ancho de la imagen del logo
//     height: 50, // Alto de la imagen del logo
//   },
//   studentContainer: {
//     flexDirection: 'row', // Mostrar imagen y texto en una fila
//     alignItems: 'center', // Centrar verticalmente
//     marginBottom: 10, // Espacio entre cada estudiante
//     paddingBottom: 10, // Espacio inferior dentro del contenedor del estudiante
//     borderBottom: '1px solid #ccc', // Línea divisoria entre estudiantes
//   },
//   studentImage: {
//     width: 60, // Ancho de la imagen del estudiante
//     height: 60, // Alto de la imagen del estudiante
//     marginRight: 10, // Espacio entre la imagen y el texto
//   },
//   phoneNumber: {
//     color: 'blue', // Color del texto del número de teléfono (azul para parecer un enlace)
//     textDecoration: 'underline', // Subrayar el texto para indicar que es un enlace
//     marginLeft: 5, // Espacio entre el texto y el ícono de WhatsApp
//   },
//   whatsappIcon: {
//     fontSize: 12, // Tamaño del ícono de WhatsApp
//     color: 'green', // Color del ícono de WhatsApp (verde)
//   },
// });

// const ReporteInactivos = () => {
//   const [estudiantes, setEstudiantes] = React.useState([]);

//   React.useEffect(() => {
//     axios
//       .get('http://localhost:2000/estudianteina')
//       .then((response) => {
//         setEstudiantes(response.data.estudiantes);
//       })
//       .catch((error) => {
//         console.log('Error al obtener usuarios inactivos:', error);
//       });
//   }, []);

//   const getCurrentDateAndTime = () => {
//     const currentDate = new Date();
//     return currentDate.toLocaleString();
//   };

//   // Función para crear enlaces de WhatsApp
//   const getWhatsAppLink = (phoneNumber) => {
//     const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
//     return `https://wa.me/${formattedPhoneNumber}`; // Agregar el prefijo de enlace de WhatsApp
//   };

//   return (
//     <PDFViewer style={{ width: '100%', height: '100vh' }}>
//       <Document>
//         <Page size="A4" style={styles.page}>
//           <View style={styles.section}>
//             <Image
//               src="../../public/logo1.png" // Ruta relativa a la imagen del logo
//               style={styles.logo}
//             />
//             <Text style={styles.heading}>Reporte de Usuarios Inactivos</Text>
//             <View style={styles.separator} />
//             <Text style={styles.subheading}>Fecha y Hora: {getCurrentDateAndTime()}</Text>
//             <View style={styles.separator} />
//             <View style={styles.item}>
//               {estudiantes.map((person) => (
//                 <View key={person.email} style={styles.studentContainer}>
//                   <Image
//                     src={`http://localhost:2000/${person.imagenPerfil}`} // Ruta absoluta de la imagen
//                     style={styles.studentImage} // Estilo de la imagen
//                   />
//                   <View>
//                     <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
//                       Nombre: {person.nombre} {person.apellido}
//                     </Text>
//                     <Text>Email: {person.email}</Text>
//                     <Text>Colegio: {person.colegio}</Text>
//                     <Text>
//                       Telefono:
//                       <Link src={getWhatsAppLink(person.telefono)}>
//                         <Text style={styles.phoneNumber}>{person.telefono}</Text>
//                       </Link>
//                     </Text>
//                     {/* Agrega aquí los demás campos que desees mostrar en el reporte */}
//                   </View>
//                   <View style={styles.separator} />
//                 </View>
//               ))}
//             </View>
//             {/* Números de página */}
//             <Text
//               style={styles.pageNumber}
//               render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
//               fixed
//             />
//           </View>
//         </Page>
//       </Document>
//     </PDFViewer>
//   );
// };

// export default ReporteInactivos;