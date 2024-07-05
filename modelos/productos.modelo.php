<?php

require_once "conexion.php";

class ModeloProductos{
	/*=============================================
	MOSTRAR PRODUCTOS
	=============================================*/
	static public function mdlMostrarProductos3($tabla, $item, $valor){
		if($item != null){
			$stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE $item = :$item ORDER BY id DESC");
			$stmt -> bindParam(":".$item, $valor, PDO::PARAM_STR);
			$stmt -> execute();
			return $stmt -> fetch();
		} else {
            $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla");
            $stmt->execute();
            $resultado = $stmt->fetchAll();
        }
        $stmt = null;
        return $resultado;
	}

    static public function mdlMostrarProductos($tabla, $item, $valor){
        if($item != null){
            $stmt = Conexion::conectar()->prepare("SELECT p.*, c.categoria FROM $tabla p JOIN categorias c ON p.id_categoria = c.id WHERE p.$item = :$item ORDER BY p.id DESC");
            $stmt -> bindParam(":".$item, $valor, PDO::PARAM_STR);
            $stmt -> execute();
            return $stmt -> fetch();
        } else {
            $stmt = Conexion::conectar()->prepare("SELECT p.*, c.categoria FROM $tabla p JOIN categorias c ON p.id_categoria = c.id");
            $stmt->execute();
            $resultado = $stmt->fetchAll();
        }
        $stmt = null;
        return $resultado;
    }
    /*=============================================
    REGISTRO DE PRODUCTO
    =============================================*/
	static public function mdlIngresarProducto($tabla, $datos){
		$stmt = Conexion::conectar()->prepare("INSERT INTO $tabla(id_categoria, codigo, descripcion, imagen, stock, precio_compra, precio_venta) VALUES (:id_categoria, :codigo, :descripcion, :imagen, :stock, :precio_compra, :precio_venta)");
		$stmt->bindParam(":id_categoria", $datos["id_categoria"], PDO::PARAM_INT);
		$stmt->bindParam(":codigo", $datos["codigo"], PDO::PARAM_STR);
		$stmt->bindParam(":descripcion", $datos["descripcion"], PDO::PARAM_STR);
		$stmt->bindParam(":imagen", $datos["imagen"], PDO::PARAM_STR);
		$stmt->bindParam(":stock", $datos["stock"], PDO::PARAM_STR);
		$stmt->bindParam(":precio_compra", $datos["precio_compra"], PDO::PARAM_STR);
		$stmt->bindParam(":precio_venta", $datos["precio_venta"], PDO::PARAM_STR);
        $resultado = ($stmt->execute()) ? "ok" : "error";
        $stmt = null;
        return $resultado;
	}
	/*=============================================
	EDITAR PRODUCTO
	=============================================*/
	static public function mdlEditarProducto($tabla, $datos){
		$stmt = Conexion::conectar()->prepare("UPDATE $tabla SET id_categoria = :id_categoria, descripcion = :descripcion, imagen = :imagen, stock = :stock, precio_compra = :precio_compra, precio_venta = :precio_venta WHERE codigo = :codigo");
		$stmt->bindParam(":id_categoria", $datos["id_categoria"], PDO::PARAM_INT);
		$stmt->bindParam(":codigo", $datos["codigo"], PDO::PARAM_STR);
		$stmt->bindParam(":descripcion", $datos["descripcion"], PDO::PARAM_STR);
		$stmt->bindParam(":imagen", $datos["imagen"], PDO::PARAM_STR);
		$stmt->bindParam(":stock", $datos["stock"], PDO::PARAM_STR);
		$stmt->bindParam(":precio_compra", $datos["precio_compra"], PDO::PARAM_STR);
		$stmt->bindParam(":precio_venta", $datos["precio_venta"], PDO::PARAM_STR);
        $resultado = ($stmt->execute()) ? "ok" : "error";
        $stmt = null;
        return $resultado;
	}
	/*=============================================
	BORRAR PRODUCTO
	=============================================*/
	static public function mdlEliminarProducto($tabla, $datos){
		$stmt = Conexion::conectar()->prepare("DELETE FROM $tabla WHERE id = :id");
		$stmt -> bindParam(":id", $datos, PDO::PARAM_INT);
        $resultado = ($stmt->execute()) ? "ok" : "error";
        $stmt = null;
        return $resultado;
	}
}