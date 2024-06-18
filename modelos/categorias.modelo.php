<?php

require_once "conexion.php";

class ModeloCategorias{
    /*=============================================
    CREAR CATEGORÍA
    =============================================*/
    static public function mdlIngresarCategoria($tabla, $datos){
        $stmt = Conexion::conectar()->prepare("INSERT INTO $tabla(categoria) VALUES (:categoria)");
        $stmt->bindParam(":categoria", $datos, PDO::PARAM_STR);
        $resultado = ($stmt->execute()) ? "ok" : "error";
        $stmt = null;
        return $resultado;
    }
    /*=============================================
    MOSTRAR CATEGORÍAS
    =============================================*/
    static public function mdlMostrarCategorias($tabla, $item, $valor){
        if($item != null){
            $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla WHERE $item = :$item");
            $stmt -> bindParam(":".$item, $valor, PDO::PARAM_STR);
            $stmt -> execute();
            $resultado = $stmt->fetch();
        }else{
            $stmt = Conexion::conectar()->prepare("SELECT * FROM $tabla");
            $stmt -> execute();
            $resultado = $stmt->fetchAll();
        }
        $stmt = null;
        return $resultado;
    }
    /*=============================================
    EDITAR CATEGORÍA
    =============================================*/
    static public function mdlEditarCategoria($tabla, $datos){
        $stmt = Conexion::conectar()->prepare("UPDATE $tabla SET categoria = :categoria WHERE id = :id");
        $stmt -> bindParam(":categoria", $datos["categoria"], PDO::PARAM_STR);
        $stmt -> bindParam(":id", $datos["id"], PDO::PARAM_INT);
        $resultado = ($stmt->execute()) ? "ok" : "error";
        $stmt = null;
        return $resultado;
    }
    /*=============================================
    BORRAR CATEGORÍA
    =============================================*/
    static public function mdlBorrarCategoria($tabla, $datos){
        $stmt = Conexion::conectar()->prepare("DELETE FROM $tabla WHERE id = :id");
        $stmt -> bindParam(":id", $datos, PDO::PARAM_INT);
        $resultado = ($stmt->execute()) ? "ok" : "error";
        $stmt = null;
        return $resultado;
    }
}

