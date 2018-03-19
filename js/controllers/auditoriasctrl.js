angular.module('auditoriaApp')

.controller('auditoriasctrl' , function($scope, ConexionServ, $filter){


	$scope.vercrearauditorias = function(){
		$scope.vermostrandocrarauditorias = true;
	}

 

   $scope.veractuauditoria = function(auditoria){

		$scope.modusers = true;
		$scope.auditoria_editars = auditoria;
	}

	ConexionServ.createTables();


	 $scope.Insertentidadauditoria = function(auditoria_crear){
	  	
	 	consulta ="INSERT INTO auditorias(fecha, hora, entidad) VALUES(?, ?, ?) "
	   ConexionServ.query(consulta,[auditoria_crear.fecha, auditoria_crear.hora, auditoria_crear.entidad]).then(function(result){

           console.log('Auditoria creada', result)
           alert('Auditoria creada exitosamente')

	   } , function(tx){

	   	console.log('Auditoria no se pudo crear' , tx)

	   });


	 } 

	 $scope.vermostrarauditoriastabla = function(){
	   
	   ConexionServ.query('SELECT rowid , fecha, hora, entidad from auditorias', []).then(function(result){

	          $scope.auditorias = result;

		   } , function(tx){

		   	console.log('Error no es posbile traer auditorias' , tx)

		   })
	 } 

	 $scope.vermostrarauditoriastabla();



	 $scope.actusersauditoria = function(auditoria_cambiar){
	  	
	 consulta ="UPDATE  auditorias SET fecha=?, hora=?, entidad=? WHERE rowid=? "
	   ConexionServ.query(consulta,[auditoria_cambiar.fecha, auditoria_cambiar.hora, auditoria_cambiar.entidad,  auditoria_cambiar.rowid]).then(function(result){

           console.log('auditoria  Actualizado', result)
           alert('auditoria actualizado correctamente presione F5 para recargar')

	   } , function(tx){

	   	console.log('auditoria no se pudo actualizar' , tx)

	   });

	 } 

	 $scope.elimninaradutiroiar = function(auditoria){
	  	
	 	consulta ="DELETE FROM auditorias WHERE rowid=? ";

	   ConexionServ.query(consulta,[auditoria.rowid]).then(function(result){


           console.log('auditoria eliminido', result);
           $scope.auditorias = $filter('filter') ($scope.auditorias, {rowid: '!' + auditoria.rowid})
	   } , function(tx){

	   	console.log('auditoria no se pudo Eliminar' , tx)

	   });

	 } 




});

