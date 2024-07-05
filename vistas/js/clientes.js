/*=============================================
CARGAR LA TABLA DINÁMICA DE CLIENTES
=============================================*/
$('.tablaClientes').DataTable( {
	"ajax": "ajax/datatable-clientes.ajax.php",
	"deferRender": true,
	"retrieve": true,
	"processing": true,
	"language": {
		"sProcessing":     "Procesando...",
		"sLengthMenu":     "Mostrar _MENU_ registros",
		"sZeroRecords":    "No se encontraron resultados",
		"sEmptyTable":     "Ningún dato disponible en esta tabla",
		"sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
		"sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
		"sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
		"sInfoPostFix":    "",
		"sSearch":         "Buscar:",
		"sUrl":            "",
		"sInfoThousands":  ",",
		"sLoadingRecords": "Cargando...",
		"oPaginate": {
			"sFirst":    "Primero",
			"sLast":     "Último",
			"sNext":     "Siguiente",
			"sPrevious": "Anterior"
		},
		"oAria": {
			"sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
			"sSortDescending": ": Activar para ordenar la columna de manera descendente"
		}
	}
} );
/*=============================================
EDITAR CLIENTE
=============================================*/
$(".tablaClientes tbody").on("click", "button.btnEditarCliente", function(){
	var idCliente = $(this).attr("idCliente");
	var datos = new FormData();
	datos.append("idCliente", idCliente);
	$.ajax({
		url: "ajax/clientes.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(respuesta){
			$("#editarCliente").val(respuesta["nombre"]);
			$("#idCliente").val(respuesta["id"]);
			$("#editarDocumentoId").val(respuesta["documento"]);
			$("#editarEmail").val(respuesta["email"]);
			$("#editarTelefono").val(respuesta["telefono"]);
			$("#editarDireccion").val(respuesta["direccion"]);
			$("#editarFechaNacimiento").val(respuesta["fecha_nacimiento"]);
		}
	});
});
/*=============================================
ELIMINAR CLIENTE
=============================================*/
$('.tablaClientes tbody').on("click", "button.btnEliminarCliente", function(){
	let idCliente = $(this).attr("idCliente");
	Swal.fire({
		title: '¿Está seguro de borrar el cliente?',
		text: "¡Si no lo está puede cancelar la acción!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		cancelButtonText: 'Cancelar',
		confirmButtonText: 'Si, borrar cliente!'
	}).then((result) => {
		if (result.isConfirmed) {
			$.ajax({
				url: "ajax/eliminar-cliente.ajax.php",
				method: "POST",
				data: { idCliente: idCliente },
				dataType: "json",
				success: function(respuesta){
					// Manejo de respuesta después de eliminar cliente
					console.log(respuesta);
					// Puedes mostrar una notificación, recargar la tabla, etc.
				}
			});
		}
	});
});
