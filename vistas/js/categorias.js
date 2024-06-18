/*=============================================
EDITAR CATEGORIA
=============================================*/
$(".tablas").on("click", ".btnEditarCategoria", function(){
    let idCategoria = $(this).attr("idCategoria");
    let datos = new FormData();
    datos.append("idCategoria", idCategoria);
    $.ajax({
        url: "ajax/categorias.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType:"json",
        success: function(respuesta){
            $("#editarCategoria").val(respuesta["categoria"]);
            $("#idCategoria").val(respuesta["id"]);
        }
    })
})
/*=============================================
ELIMINAR CATEGORIA
=============================================*/
$('.tablas').on("click", ".btnEliminarCategoria", function(){
    let idCategoria = $(this).attr("idCategoria");
    Swal.fire({
        title: '¿Está seguro de borrar la categoría?',
        text: "¡Si no lo está puede cancelar la acción!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar categoría!'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = "index.php?ruta=categorias&idCategoria="+idCategoria;
        }
    });
})
/*=============================================
    REVISAR SI LA CATEGORÍA YA ESTÁ REGISTRADO
=============================================*/
$("#nuevaCategoria").change(function(){
    $(".alert").remove();
    var categoria = $(this).val();
    var datos = new FormData();
    datos.append("validarCategoria", categoria);
    $.ajax({
        url:"ajax/categorias.ajax.php",
        method:"POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success:function(respuesta){
            if(respuesta){
                $("#nuevaCategoria").parent().after('<div class="alert alert-warning">Esta categoria ya existe en la base de datos</div>');
                $("#nuevaCategoria").val("");
            }
        }
    })
})



