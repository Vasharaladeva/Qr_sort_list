export async function obtenerClientes() {
    const respuesta = await fetch('http://localhost:2000/api/estudiante')
    const resultado = await respuesta.json()
    return resultado
}

export async function obtenerCliente(id) {
    const respuesta = await fetch(`http://localhost:2000/api/estudiante/${id}`)
    const resultado = await respuesta.json()
    return resultado
}

