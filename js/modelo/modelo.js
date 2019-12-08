/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  // console.log(this)
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntaEditada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    // console.log(this)
    return this.ultimoId
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    modelo.ultimoId=id;
    // console.log(respuestas)
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    // console.log(nuevaPregunta)
    this.guardar();
    this.preguntaAgregada.notificar();
    // console.log(modelo.preguntas)
  },

  //borra el id tomando el id por parametro de la pregunta.
  borrarPregunta: function(id){
// console.log(id)
const preguntaEncontrada= this.preguntas.find(Element=>Element.id===id);
// console.log(preguntaEncontrada)
var index= this.preguntas.indexOf(preguntaEncontrada);
if(index>-1){
  modelo.preguntas.splice(index,1);
};
this.preguntaEliminada.notificar();
  },

  editarPregunta: function(nombre, respuesta,id){
    // console.log(id)
    const preguntaEncontrada= this.preguntas.find(Element=>Element.id===id);
    // console.log(preguntaEncontrada)
    var index= this.preguntas.indexOf(preguntaEncontrada);
    if(index>-1){
      // console.log(modelo.preguntas[index])
      var nuevaPreguntaEditada= {'textoPregunta':nombre, 'id': id, 'cantidadPorRespuesta':respuesta};
      // console.log(nuevaPreguntaEditada)
      // console.log(this.preguntas[index])
      this.preguntas[index]= nuevaPreguntaEditada;
      
      this.preguntaEditada.notificar();
    };
    
      },

  //se guardan las preguntas
  guardar: function(){
  },
};
