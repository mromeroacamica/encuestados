/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id){
    // console.log(this)
    this.modelo.borrarPregunta(id)
      },
editarPregunta: function(value, respuestas,id){
  this.modelo.editarPregunta(value, respuestas,id)
},
borrarTodo:function(){
  this.modelo.borrarTodo();
},
agregarVoto: function(nombrePregunta,respuestaSeleccionada){
  this.modelo.agregarVoto(nombrePregunta,respuestaSeleccionada);
}

};
