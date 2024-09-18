export function convertirAMayusculas(texto) {
    return texto.toUpperCase();
}
export function obtenerPrimeraPalabra(texto) {
    const [primeraPalabra] = texto.split(" ");
    return primeraPalabra;
}
export function agregarPuntos(numero) {
    let partes = numero.toString().split('.');
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return partes.join('.');
}