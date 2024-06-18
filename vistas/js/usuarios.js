/*=============================================
    SUBIENDO LA FOTO DEL USUARIO
=============================================*/
$(".nuevaFoto").change(function(){
    let imagen = this.files[0];
    /*=============================================
        VALIDAMOS EL FORMATO DE LA IMAGEN SEA JPG O PNG
    =============================================*/
    if(imagen["type"] !== "image/jpeg" && imagen["type"] !== "image/png"){
        $(".nuevaFoto").val("");
        Swal.fire({
            icon: "error",
            title: "Error al subir la imagen",
            text: "¡La imagen debe estar en formato JPG o PNG!",
            confirmButtonText: "¡Cerrar!"
        });
    }else if(imagen["size"] > 2000000){
        $(".nuevaFoto").val("");
        Swal.fire({
            icon: "error",
            title: "Error al subir la imagen",
            text: "¡La imagen no debe pesar más de 2MB!",
            confirmButtonText: "¡Cerrar!"
        });
    }else{
        let datosImagen = new FileReader();
        datosImagen.readAsDataURL(imagen);
        datosImagen.onload = function(event){
            let rutaImagen = event.target.result;
            $(".previsualizar").attr("src", rutaImagen);
        };
    }
});

/*=============================================
    EDITAR USUARIO
 =============================================*/
$(document).on("click", ".btnEditarUsuario", function(){
    let idUsuario =$(this).attr("idUsuario");
    let datos = new FormData();
    datos.append("idUsuario", idUsuario);
    $.ajax({
        url:"ajax/usuarios.ajax.php",
        method: "POST",
        data: datos,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function(data){
            $("#editarNombre").val(data["nombre"]);
            $("#editarUsuario").val(data["usuario"]);
            $("#editarPerfil").html(data["perfil"]);
            $("#editarPerfil").val(data["perfil"]);
            $("#fotoActual").val(data["foto"]);
            $("#passwordActual").val(data["password"]);
            if(data["foto"] !== ""){
                $(".previsualizar").attr("src", data["foto"]);
            }
        }
    })
})
/*=============================================
    ACTIVAR USUARIO
 =============================================*/
$(document).on("click", ".btnActivar", function(){
    let idUsuario = $(this).attr("idUsuario");
    let estadoUsuario = $(this).attr("estadoUsuario");

    let datos = new FormData();
    datos.append("activarId", idUsuario);
    datos.append("activarUsuario", estadoUsuario);

    $.ajax({
        url:"ajax/usuarios.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        success: function(respuesta){
            if(window.matchMedia("(max-width:767px)").matches){
                Swal.fire({
                    title: "El usuario ha sido actualizado",
                    icon: "success",
                    confirmButtonText: "¡Cerrar!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location = "usuarios";
                    }
                });

            }
        }
    })
    if(estadoUsuario == 0){
        $(this).removeClass('btn-success');
        $(this).addClass('btn-danger');
        $(this).html('Desactivado');
        $(this).attr('estadoUsuario',1);
    }else{
        $(this).addClass('btn-success');
        $(this).removeClass('btn-danger');
        $(this).html('Activado');
        $(this).attr('estadoUsuario',0);
    }
})
/*=============================================
    REVISAR SI EL USUARIO YA ESTÁ REGISTRADO
=============================================*/
$("#nuevoUsuario").change(function(){
    $(".alert").remove();
    var usuario = $(this).val();
    var datos = new FormData();
    datos.append("validarUsuario", usuario);
    $.ajax({
        url:"ajax/usuarios.ajax.php",
        method:"POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success:function(respuesta){
            if(respuesta){
                $("#nuevoUsuario").parent().after('<div class="alert alert-warning">Este usuario ya existe en la base de datos</div>');
                $("#nuevoUsuario").val("");
            }
        }
    })
})
/*=============================================
    ELIMINAR USUARIO
=============================================*/
$(document).on("click", ".btnEliminarUsuario", function(){
    let idUsuario = $(this).attr("idUsuario");
    let fotoUsuario = $(this).attr("fotoUsuario");
    let usuario = $(this).attr("usuario");
    Swal.fire({
        title: '¿Está seguro de borrar el usuario?',
        text: "¡Si no lo está puede cancelar la acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar usuario!'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = "index.php?ruta=usuarios&idUsuario="+idUsuario+"&usuario="+usuario+"&fotoUsuario="+fotoUsuario;
        }
    });
});
/*=============================================
    LIMPIAR CAMPO FOTO MODAL AGREGAR USUARIO
=============================================*/
$('#modalAgregarUsuario').on('show.bs.modal', function () {
    // Limpiar el campo de subida de foto
    $(".nuevaFoto").val("");
    // Restablecer la previsualización de la foto
    $(".previsualizar").attr("src", "vistas/img/usuarios/default/anonymous.png");
});