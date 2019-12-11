/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  // console.log(this)
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.sumarVotoRespuesta = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function () {
    // console.log(this)
    return this.ultimoId
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    modelo.ultimoId = id;
    // console.log(respuestas)
    var nuevaPregunta = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    // console.log(nuevaPregunta)
    this.guardar();
    this.preguntaAgregada.notificar();
    // console.log(modelo.preguntas)
  },

  //borra el id tomando el id por parametro de la pregunta.
  borrarPregunta: function (id) {
    // console.log(id)
    const preguntaEncontrada = this.preguntas.find(Element => Element.id === id);
    // console.log(preguntaEncontrada)
    var index = this.preguntas.indexOf(preguntaEncontrada);
    if (index > -1) {
      modelo.preguntas.splice(index, 1);
    };
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  editarPregunta: function (nombre, respuesta, id) {
    // console.log(id)
  
    const preguntaEncontrada = this.preguntas.find(Element => Element.id === id);
    // console.log(preguntaEncontrada)
    var index = this.preguntas.indexOf(preguntaEncontrada);
    if (index > -1) {
      // console.log(modelo.preguntas[index])
      var nuevaPreguntaEditada = { 'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuesta };
      // console.log(nuevaPreguntaEditada)
      // console.log(this.preguntas[index])
      this.preguntas[index] = nuevaPreguntaEditada;

      this.guardar();
      this.preguntaEditada.notificar();
    };

  },
  borrarTodo: function () {
    // console.log(this)
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar();
  },

  agregarVoto: function (nombrePregunta, respuestaSeleccionada) {
    // console.log(nombrePregunta)
    // console.log(respuestaSeleccionada)
    if(respuestaSeleccionada!==undefined){
    const preguntaEncontrada = this.preguntas.find(Element => Element.textoPregunta === nombrePregunta);
    // console.log(preguntaEncontrada)
    var index = this.preguntas.indexOf(preguntaEncontrada);
    if (index > -1) {
      const respuestaEncontrada = this.preguntas[index].cantidadPorRespuesta.find(Element => Element.textoRespuesta === respuestaSeleccionada);

      // console.log(respuestaEncontrada)
      respuestaEncontrada.cantidad++;
      // console.log(respuestaEncontrada)

      // this.preguntas[index].cantidadPorRespuesta.cantidad++;
      this.sumarVotoRespuesta.notificar();
    };
      this.guardar();
    };

  },

  //se guardan las preguntas
  guardar: function () {
    localStorage.setItem('clavePreguntas', JSON.stringify(this.preguntas));

  },

  //recuperar datos guardados
  recuperar: function () {
    var preguntasRecuperadas = JSON.parse(localStorage.getItem('clavePreguntas'));
    this.preguntas = preguntasRecuperadas;
  }

};
