<?php

require_once "../controladores/clientes.controlador.php";
require_once "../modelos/clientes.modelo.php";

class AjaxClientes{
    public $idCliente;

    /*=============================================
    EDITAR CLIENTE
    =============================================*/
    public function ajaxEditarCliente(){
        $item = "id";
        $valor = $this->idCliente;
        $respuesta = ControladorClientes::ctrMostrarClientes($item, $valor);
        echo json_encode($respuesta);
    }
    /*=============================================
    EDITAR CLIENTE
    =============================================*/
    public function ajaxBorrarCliente(){
        $valor = $this->idCliente;
        $respuesta = ControladorClientes::ctrEliminarCliente($valor);
        echo json_encode($respuesta);
    }
}
/*=============================================
EDITAR CLIENTE
=============================================*/
if(isset($_POST["idCliente"])){
    $cliente = new AjaxClientes();
    $cliente -> idCliente = $_POST["idCliente"];
    $cliente -> ajaxEditarCliente();
}
/*=============================================
BORRAR CLIENTE
=============================================*/
if(isset($_POST["idBorrarCliente"])){
    $cliente = new AjaxClientes();
    $cliente->idCliente = $_POST["idBorrarCliente"];
    $cliente -> ajaxBorrarCliente();
}