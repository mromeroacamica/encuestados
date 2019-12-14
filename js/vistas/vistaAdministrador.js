/*
 * Vista administrador
 */
var VistaAdministrador = function (modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function () {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function () {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function () {
    contexto.reconstruirLista();
  });
  this.modelo.preguntasBorradas.suscribir(function () {
    contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function () {
    this.modelo.recuperar();
    this.configuracionDeBotones();
    validacionDeFormulario();
    // console.log(this.modelo.preguntas.length)
    if(this.modelo.preguntas.length > 0){

    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    console.log(this.modelo.preguntas)
    this.reconstruirLista();
    // this.reconstruirLista();
  }
},

  construirElementoPregunta: function (pregunta) {
    var contexto = this;
    // console.log(pregunta)
    var nuevoItem;
    //completar
    // console.log(pregunta.textoPregunta)
    nuevoItem = $('<li>', { 'class': 'list-group-item', 'id': pregunta.id, 'textoPregunta': pregunta.textoPregunta })


    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"

    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function (resp) {
      // console.log(resp.textoRespuesta) aca estaba puesto resp.textoRespuesta y daba error
      // console.log(resp)
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },

  reconstruirLista: function () {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;

    // console.log(this.modelo.preguntas)
    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    };

  },

  configuracionDeBotones: function () {
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function () {
      // console.log(e)
      if (e.pregunta.val() === '') {

      } else {
        var value = e.pregunta.val();
        var respuestas = [];

        $('[name="option[]"]').each(function () {
          //completar
          if (this.value === '') {

          } else {
            var cantVotos = 0
            respuestas.push({ 'textoRespuesta': this.value, 'cantidad': cantVotos });

          }
          // console.log(this.value)
          // console.log($('[name="option[]"]')[0].value)
          // console.log($('[name="option[]"]')[1].value)
          // respuestas.push
          // console.log(respuestas)
        })
        // console.log(respuestas)
        // console.log(contexto)
        contexto.limpiarFormulario();
        contexto.controlador.agregarPregunta(value, respuestas);
      }
    });
    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function () {
      // console.log('hola')
      var id = parseInt($('.list-group-item.active').attr('id'));
      contexto.controlador.borrarPregunta(id)
    });

    e.botonEditarPregunta.click(function () {
      var id = parseInt($('.list-group-item.active').attr('id'));

      if (e.pregunta.val() === '') {

      } else {
        var value = e.pregunta.val();
        // console.log(value)
        var respuestas = [];

        $('[name="option[]"]').each(function () {
          //completar
          // console.log(this)
          if (this.value !== '') {
            var cantVotos = 0
            respuestas.push({ 'textoRespuesta': this.value, 'cantidad': cantVotos });
            // console.log(respuestas)
          }


        })

      }
      contexto.limpiarFormulario();
      contexto.controlador.editarPregunta(value, respuestas, id);

    });


    e.borrarTodo.click(function () {
      contexto.limpiarFormulario();
      contexto.controlador.borrarTodo();
    });


  },

  limpiarFormulario: function () {
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
