angular.module('auditoriaApp')

.controller('respuestasctrl' , function($scope, ConexionServ, $filter){


	$scope.vercreandorespuestas = function() {
    

      $scope.vercradasdrepsuestas = true;


	}


	$scope.insertandorespuesats = function(respuestas_crear){
	  	
	 	consulta ="INSERT INTO respuestas(pregunta_id, auditoria_id, respuestas ) VALUES(?, ?, ?) "
	   ConexionServ.query(consulta, [respuestas_crear.pregunta_id, respuestas_crear.auditoria_id, respuestas_crear.respuestas]).then(function(result){

           console.log('respuesta creada', result)
           alert('respuesta creado exitosamente, presiona F5 Para recargar')

	   } , function(tx){

	   	console.log('respuesta no se pudo crear' , tx)

	   });

	 } 

	  $scope.vermostrandotablarespuestas = function(){
	   
	   ConexionServ.query('SELECT rowid , pregunta_id, auditoria_id, respuestas from respuestas', []).then(function(result){

	          $scope.respuestas = result;

		   } , function(tx){

		   	console.log('Error no es posbile traer usuarios' , tx)

		   })
	 } 

	 $scope.vermostrandotablarespuestas();


	$scope.veractuausers = function(respuesta){

		$scope.mostrarrespuesta = true;
		$scope.respuesta_actua = respuesta;
	}



  $scope.acrepuasd = function(respuesta_cambiar){
	  	
	 consulta ="UPDATE  respuestas SET pregunta_id=?, auditoria_id=?, respuestas=? WHERE rowid=? "
	   ConexionServ.query(consulta,[respuesta_cambiar.pregunta_id, respuesta_cambiar.auditoria_id, respuesta_cambiar.respuestas, respuesta_cambiar.rowid, ]).then(function(result){

           console.log('respuesta Actualizado', result)
           alert('respuesta actualizado correctamente presione F5 para recargar')

	   } , function(tx){

	   	console.log('respuesta no se pudo actualizar' , tx)

	   });

	 } 

	 $scope.elimninarespuestas = function(respuesta){
	  	
	 	consulta ="DELETE FROM respuestas WHERE rowid=? ";

	   ConexionServ.query(consulta,[respuesta.rowid]).then(function(result){


           console.log('respuesta eliminido', result);
           $scope.respuestas = $filter('filter') ($scope.respuestas, {rowid: '!' + respuesta.rowid})
	   } , function(tx){

	   	console.log('respuesta no se pudo Eliminar' , tx)

	   });

	 } 


	


});