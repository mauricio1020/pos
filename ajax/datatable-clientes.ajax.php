<?php

require_once "../controladores/clientes.controlador.php";
require_once "../modelos/clientes.modelo.php";

class TablaClientes
{
    public function mostrarTablaClientes()
    {

        $item = null;
        $valor = null;
        $clientes = ControladorClientes::ctrMostrarClientes($item, $valor);

        // Inicializar la cadena JSON
        $datosJson = '{
            "data": [';
        // Recorrer los clientes y agregar al JSON
        for ($i = 0; $i < count($clientes); $i++) {
            // Acciones de botones
            $acciones = "<div class='btn-group'><button class='btn btn-warning btnEditarCliente' idCliente='" . $clientes[$i]["id"] . "' data-toggle='modal' data-target='#modalEditarCliente'><i class='fa fa-pencil'></i></button><button class='btn btn-danger btnEliminarCliente' idBorrarCliente='" . $clientes[$i]["id"] . "'><i class='fa fa-times'></i></button></div>";
            // Construir la fila de datos
            $datosJson .= '[
                        "' . ($i + 1) . '",
                        "' . $clientes[$i]["nombre"] . '",
                        "' . $clientes[$i]["documento"] . '",
                        "' . $clientes[$i]["email"] . '",
                        "' . $clientes[$i]["telefono"] . '",
                        "' . $clientes[$i]["direccion"] . '",
                        "' . $clientes[$i]["fecha_nacimiento"] . '",
                        "' . $clientes[$i]["compras"] . '",            
                        "0000-00-00 00:00:00",
                        "' . $clientes[$i]["fecha"] . '",
                        "' . $acciones . '"
                    ],';

        }
        // Cerrar el JSON
        $datosJson = substr($datosJson, 0, -1);
        $datosJson .= '] 
		}';
        // Imprimir el JSON
        echo $datosJson;
    }
}
// Creamos una instancia de TablaClientes y llamamos a la función mostrarTablaClientes()
$tablaClientes = new TablaClientes();
$tablaClientes->mostrarTablaClientes();