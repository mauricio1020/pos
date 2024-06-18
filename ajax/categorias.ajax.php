<?php
require_once "../controladores/categorias.controlador.php";
require_once "../modelos/categorias.modelo.php";

class AjaxCategorias{
    /*=============================================
	EDITAR CATEGORÍA
	=============================================*/
    public $idCategoria;

    public function ajaxEditarCategoria(){
        $item = "id";
        $valor = $this->idCategoria;
        $respuesta = ControladorCategorias::ctrMostrarCategorias($item, $valor);
        echo json_encode($respuesta);
    }
    /*=============================================
	VALIDAR NO REPETIR USUARIO
	=============================================*/
    public $validarCategoria;

    public function ajaxValidarCategoria(){
        $item = "categoria";
        $valor = $this->validarCategoria;
        $respuesta = ControladorCategorias::ctrMostrarCategorias($item, $valor);
        echo json_encode($respuesta);
    }
}
/*=============================================
VALIDAR NO REPETIR CATEGORÍA
=============================================*/
if(isset( $_POST["validarCategoria"])){
    $valUsuario = new AjaxCategorias();
    $valUsuario->validarCategoria = $_POST["validarCategoria"];
    $valUsuario->ajaxValidarCategoria();
}
/*=============================================
EDITAR CATEGORÍA
=============================================*/
if(isset($_POST["idCategoria"])){
    $categoria = new AjaxCategorias();
    $categoria -> idCategoria = $_POST["idCategoria"];
    $categoria -> ajaxEditarCategoria();
}