/*=============================================
CARGAR LA TABLA DINÁMICA DE PRODUCTOS
=============================================*/
$('.tablaProductos').DataTable( {
    "ajax": "ajax/datatable-productos.ajax.php",
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
CAPTURANDO LA CATEGORIA PARA ASIGNAR CÓDIGO
=============================================*/
$("#nuevaCategoria").change(function(){
	let idCategoria = $(this).val();
	let datos = new FormData();
  	datos.append("idCategoria", idCategoria);
  	$.ajax({
      url:"ajax/productos.ajax.php",
      method: "POST",
      data: datos,
      cache: false,
      contentType: false,
      processData: false,
      dataType:"json",
      success:function(respuesta){
      	if(!respuesta){
      		let nuevoCodigo = idCategoria+"01";
      		$("#nuevoCodigo").val(nuevoCodigo);
      	}else{
      		let nuevoCodigo = Number(respuesta["codigo"]) + 1;
          	$("#nuevoCodigo").val(nuevoCodigo);
      	}
      }
  	})
})
/*=============================================
AGREGANDO PRECIO DE VENTA
=============================================*/
$("#nuevoPrecioCompra, #editarPrecioCompra").change(function(){
	if($(".porcentaje").prop("checked")){
		let valorPorcentaje = $(".nuevoPorcentaje").val();
		let porcentaje = Number(($("#nuevoPrecioCompra").val()*valorPorcentaje/100))+Number($("#nuevoPrecioCompra").val());
		let editarPorcentaje = Number(($("#editarPrecioCompra").val()*valorPorcentaje/100))+Number($("#editarPrecioCompra").val());
		$("#nuevoPrecioVenta").val(porcentaje);
		$("#nuevoPrecioVenta").prop("readonly",true);
		$("#editarPrecioVenta").val(editarPorcentaje);
		$("#editarPrecioVenta").prop("readonly",true);
	}
})
/*=============================================
CAMBIO DE PORCENTAJE
=============================================*/
$(".nuevoPorcentaje").change(function(){
	if($(".porcentaje").prop("checked")){
		var valorPorcentaje = $(this).val();
		var porcentaje = Number(($("#nuevoPrecioCompra").val()*valorPorcentaje/100))+Number($("#nuevoPrecioCompra").val());
		var editarPorcentaje = Number(($("#editarPrecioCompra").val()*valorPorcentaje/100))+Number($("#editarPrecioCompra").val());
		$("#nuevoPrecioVenta").val(porcentaje);
		$("#nuevoPrecioVenta").prop("readonly",true);
		$("#editarPrecioVenta").val(editarPorcentaje);
		$("#editarPrecioVenta").prop("readonly",true);
	}
})
$('.porcentaje').on("ifUnchecked",function(){
	$("#nuevoPrecioVenta").prop("readonly",false);
	$("#editarPrecioVenta").prop("readonly",false);
})
$('.porcentaje').on("ifChecked",function(){
	$("#nuevoPrecioVenta").prop("readonly",true);
	$("#editarPrecioVenta").prop("readonly",true);
})
/*=============================================
SUBIENDO LA FOTO DEL PRODUCTO
=============================================*/
$(".nuevaImagen").change(function(){
	var imagen = this.files[0];
	/*=============================================
  	VALIDAMOS EL FORMATO DE LA IMAGEN SEA JPG O PNG
  	=============================================*/
  	if(imagen["type"] != "image/jpeg" && imagen["type"] != "image/png"){
  		$(".nuevaImagen").val("");
			Swal.fire({
				icon: "error",
				title: "Error al subir la imagen",
				text: "¡La imagen debe estar en formato JPG o PNG!",
				confirmButtonText: "¡Cerrar!"
			});
  	}else if(imagen["size"] > 2000000){
  		$(".nuevaImagen").val("");
			Swal.fire({
				icon: "error",
				title: "Error al subir la imagen",
				text: "¡La imagen no debe pesar más de 2MB!",
				confirmButtonText: "¡Cerrar!"
			});
  	}else{
  		var datosImagen = new FileReader;
  		datosImagen.readAsDataURL(imagen);
  		$(datosImagen).on("load", function(event){
  			let rutaImagen = event.target.result;
  			$(".previsualizar").attr("src", rutaImagen);
  		})
  	}
})
/*=============================================
EDITAR PRODUCTO
=============================================*/
/*$('.tablaProductos tbody').on("click", "button.btnEditarProducto3", function(){
	let idProducto = $(this).attr("idProducto");
	let datos = new FormData();
    datos.append("idProducto", idProducto);

     $.ajax({
      url:"ajax/productos.ajax.php",
      method: "POST",
      data: datos,
      cache: false,
      contentType: false,
      processData: false,
      dataType:"json",
      success:function(respuesta){
          let datosCategoria = new FormData();
          datosCategoria.append("idCategoria",respuesta["id_categoria"]);
           $.ajax({
              url:"ajax/categorias.ajax.php",
              method: "POST",
              data: datosCategoria,
              cache: false,
              contentType: false,
              processData: false,
              dataType:"json",
              success:function(respuesta){
                  $("#editarCategoria").val(respuesta["id"]);
                  $("#editarCategoria").html(respuesta["categoria"]);
              }
          })
           $("#editarCodigo").val(respuesta["codigo"]);
           $("#editarDescripcion").val(respuesta["descripcion"]);
           $("#editarStock").val(respuesta["stock"]);
           $("#editarPrecioCompra").val(respuesta["precio_compra"]);
           $("#editarPrecioVenta").val(respuesta["precio_venta"]);
           if(respuesta["imagen"] != ""){
           	$("#imagenActual").val(respuesta["imagen"]);
           	$(".previsualizar").attr("src",  respuesta["imagen"]);
           }
      }
  })
})*/
$('.tablaProductos tbody').on("click", "button.btnEditarProducto", function(){
	let idProducto = $(this).attr("idProducto");
	let datos = new FormData();
	datos.append("idProducto", idProducto);
	$.ajax({
		url: "ajax/productos.ajax.php",
		method: "POST",
		data: datos,
		cache: false,
		contentType: false,
		processData: false,
		dataType: "json",
		success: function(respuesta){
			//console.log(respuesta)
			$('#editarCategoria').val(respuesta["id_categoria"]);
			$('#editarCategoria').html(respuesta["categoria"]);
			$('#editarCodigo').val(respuesta["codigo"]);
			$('#editarDescripcion').val(respuesta["descripcion"]);
			$('#editarStock').val(respuesta["stock"]);
			$('#editarPrecioCompra').val(respuesta["precio_compra"]);
			$('#editarPrecioVenta').val(respuesta["precio_venta"]);
			if(respuesta["imagen"] != ""){
				$("#imagenActual").val(respuesta["imagen"]);
				$(".previsualizar").attr("src",  respuesta["imagen"]);
			}
		}
	});
});
/*=============================================
ELIMINAR PRODUCTO
=============================================*/
$('.tablaProductos tbody').on("click", "button.btnEliminarProducto", function(){
	let idProducto = $(this).attr("idProducto");
	let codigo = $(this).attr("codigo");
	let imagen = $(this).attr("imagen");
	Swal.fire({
		title: '¿Está seguro de borrar el producto?',
		text: "¡Si no lo está puede cancelar la acción!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		cancelButtonText: 'Cancelar',
		confirmButtonText: 'Si, borrar producto!'
	}).then((result) => {
		if (result.isConfirmed) {
			window.location = "index.php?ruta=productos&idProducto="+idProducto+"&imagen="+imagen+"&codigo="+codigo;
		}
	});
})
	
