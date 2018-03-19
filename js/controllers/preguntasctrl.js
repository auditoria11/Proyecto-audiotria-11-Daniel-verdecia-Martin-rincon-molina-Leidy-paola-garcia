angular.module('auditoriaApp')

.controller('preguntasctrl' , function($scope, ConexionServ, $filter){



ConexionServ.createTables();

$scope.veractpregunta = function(pregunta){

		$scope.actuasdpregunta = true;
		$scope.pregunta_editar = pregunta;
	}


	 $scope.Insertpreguntas = function(pregunta_crear){
	  	
	 	consulta ="INSERT INTO preguntas(definition, tipo, option1 ,option2, option3, option4, option5, option6, option7 ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?) "
	   ConexionServ.query(consulta, [pregunta_crear.definition, pregunta_crear.tipo, pregunta_crear.option1, pregunta_crear.option2, pregunta_crear.option3, pregunta_crear.option4, pregunta_crear.option5, pregunta_crear.option6, pregunta_crear.option7]).then(function(result){

           console.log('pregunta creada', result)
           alert('pregunta creado exitosamente, presiona F5 Para recargar')

	   } , function(tx){

	   	console.log('pregunta no se pudo crear' , tx)

	   });

	 } 


	 $scope.vercrearpregunta = function() {

	 	$scope.vercreando = true;
	 }


	   $scope.vertablapreguntarosmostrar = function(){
	    
	   ConexionServ.query('SELECT rowid , definition, tipo, option1 ,option2, option3, option4, option5, option6, option7  from preguntas', []).then(function(result){

	          $scope.preguntas = result;

		   } , function(tx){

		   	console.log('Error no es posbile traer preguntas' , tx)

		   })
	 } 

	 $scope.vertablapreguntarosmostrar();


	 $scope.preguntactua = function(pregunta_cambiar){
	  	
	 consulta ="UPDATE  preguntas SET definition=?, tipo=?, option1=? ,option2=?, option3=?, option4=?, option5=?, option6=?, option7=? WHERE rowid=? "
	   ConexionServ.query(consulta,[pregunta_cambiar.definition, pregunta_cambiar.tipo, pregunta_cambiar.option1, pregunta_cambiar.option2, pregunta_cambiar.option3, pregunta_cambiar.option4, pregunta_cambiar.option5, pregunta_cambiar.option6, pregunta_cambiar.option7, pregunta_cambiar.rowid]).then(function(result){

           console.log('Pregunta Actualizado', result)
           alert('Pregunta actualizado correctamente presione F5 para recargar')

	   } , function(tx){

	   	console.log('Pregunta no se pudo actualizar' , tx)

	   });

	 } 


	  $scope.c = function(pregunta){
	  	
	 	consulta ="DELETE FROM preguntas WHERE rowid=? ";

	   ConexionServ.query(consulta,[pregunta.rowid]).then(function(result){


           console.log('pregunta eliminido', result);
           $scope.preguntas = $filter('filter') ($scope.preguntas, {rowid: '!' + pregunta.rowid})
	   } , function(tx){

	   	console.log('pregunta no se pudo Eliminar' , tx)

	   });

	 } 

});