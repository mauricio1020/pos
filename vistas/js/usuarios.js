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
        swal({
            title: "Error al subir la imagen",
            text: "¡La imagen debe estar en formato JPG o PNG!",
            type: "error",
            confirmButtonText: "¡Cerrar!"
        });
    }else if(imagen["size"] > 2000000){
        $(".nuevaFoto").val("");
        swal({
            title: "Error al subir la imagen",
            text: "¡La imagen no debe pesar más de 2MB!",
            type: "error",
            confirmButtonText: "¡Cerrar!"
        });
    }else{
        let datosImagen = new FileReader;
        datosImagen.readAsDataURL(imagen);
        $(datosImagen).on("load", function(event){
            let rutaImagen = event.target.result;
            $(".previsualizar").attr("src", rutaImagen);

        })

    }
})
/*=============================================
    EDITAR USUARIO
 =============================================*/
$(".btnEditarUsuario").click(function(){
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
            $("#fotoActual").val(data["foto"]);
            $("#passwordActual").val(data["password"]);
            if(data["foto"] !== ""){
                $(".previsualizar").attr("src", data["foto"]);
            }
        }
    })
})
























