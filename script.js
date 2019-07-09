/*Array Asociativo en el que se indica para cada materia cuales materias se deben tomar despues*/
var PREREQUISITOS = { 
            /*Prelaciones Semestre 1 - Todos*/
           'TRIDI3038':['TRIDI3103','TRIDI3025'],
           'EXP3000':['EXP3003'],
           'HIST3033':['HIST3030'],
           'TEO3104':['TEO3017', 'TEO3016'],
           'BIDI3023':['BIDI3024','TRIDI3025'],
           'TRIDI3103':['TRIDI3025'],
           'EXP3003':['EXP3008'],
           'BIDI3024':['BIDI3010'],
           'EXP3008':['EXP3105'],
           'EXP3105':['EXP3034'],
           'IMP3102':['IMP3021'],
           'IMP3021':['IMP3022'],
           'HIST3030':['HIST3029', 'TEO3016'],
           'HIST3029':['HIST3032'],
           'HIST3032':['HIST3026'],
           'TEO3106':['TEO3037','TEO3100'],
           'TEO3035':['TEO3100'],
           'TEO3100':['TEO3016'],
           'TRIDI3025':['TRIDI3015'],
           'IMP3021':['IMP3022'],
           'BIDI3010':['BIDI3011'],
           'SC1000':['SC1001'],
           'TEGA3109-1':['TEGA3109-2'],
           'CB0236':['CB0239'],
           'CB0246':['ST0270'],
           'ST0245':['ST0247','ST0246'],
           'ST0244':['ST0246'],
  //Semestre 3
            'ST0246':['ST0250'],
            'ST0248':['ST0249'],
  //Semestre 4
            'CB0232':['EC0255'],
            'OG0205':['ST0253'],
  'ST0251':['ST0252'],
  
  
  //Semestre 5
  'EC0255':['CB0244','PY0231'],  
  
  //Semestre 6
  'PY0231':['PT0113','CB0245'],

//Semestre 7
'CB0245':['PT0131'],
'ST0258':['PT0131'],
'ST0257':['PT0131']
           };

//Array Asociativo en el que se indican los correquisitos de una materia
var CORREQUISITOS = {'CB0260':['CB0246'],
            'ST0243':['ST0244'],
            'CB0236':['CB0231'],
                     
             'ST0250':['ST0251'],
              'ST0258':['ST0263']
       };
//duración del retrazo entre animaciones
var TIME_OUT_ANIM = 300;

//Booleano que indica si la flechas ya se añadieron
var FLECHAS_INICIALIZADAS = false;


$(document).ready(function(){
  $('.materia').on('click',function(){
    //alert('materia');
    var idMat = $(this).attr('id');
    $(this).addClass('selected');
    
    //alert('hace el llamado'+idMat);
    seleccionarAdelante( idMat );
    
    seleccionarCorreq( idMat );
    
    seleccionaPrevios(idMat);
  });
  
  $('.materia').on('mouseout',function(){
    //alert('materia');
    //var corr = $(this).attr('corr');
    
    //alert(corr);
    //alert('borre');
    limpiarSeleccion();
  });
  
  //Botón que alterna las flechas
  $('#toggleArrowBtn').on('click',function(){
    //Si ya se añadieron las flechas
    if( FLECHAS_INICIALIZADAS ){
      //las oculta
      $('svg').toggle();
    }else{
      //Las añade dinámicamente
       conectarMaterias(); 
      FLECHAS_INICIALIZADAS = true;
    }
    
  });
});

/*Función que selecciona las materias hacía adelante*/
function seleccionarAdelante( idMateria ){
   //alert('adelante'+idMateria);
    
    var corrAct = PREREQUISITOS[idMateria];
    
    //alert('corrAct'+corrAct);
    //Marca los correquisitos
  console.log(idMateria+'-> corrAct'+corrAct);
    if( corrAct ){
      for( var i = 0; i < corrAct.length; i++){    
        var idCorrAct = corrAct[i];
        //alert('iterando'+idCorrAct);
        
        console.log('idCorrAct'+idCorrAct);
        //alert('adelante: '+idCorrAct);
        $('#'+idCorrAct).addClass('prerequisito');
        
        
        //Se invoca recursivamente si existen prerrequisitos del prerequisito
        if( PREREQUISITOS[idCorrAct] ){
          console.log('llamado Recursivo con: '+idCorrAct);
          /*setTimeout( function(){*/seleccionarAdelante( idCorrAct );//}, TIME_OUT_ANIM );
          //seleccionarAdelante( idCorrAct );
        }
        
        //REtorna para quebrar el ciclo y el llamado recursivo
        //return;
      }
    }
  return;
}

/*Función que marca los correquisitos*/
function seleccionarCorreq( idMateria ){
  //Marca los prerequisitos
    var preAct = CORREQUISITOS[idMateria];
    
    //alert('preAct:'+preAct);
    if( preAct ){
      //Marca los correquisitos
      for( var i = 0; i < preAct.length; i++){    
        var idPreAct = preAct[i];
        //alert('iterando'+idCorrAct);
        $('#'+idPreAct).toggleClass('correquisito');
      }
    }
}

/*Función que marca las materias hacia atrás*/
function seleccionaPrevios( idMateria ){
  // alert(idSel);
  //Itera sobre la lista de prerequisitos
  for( var keyAct in PREREQUISITOS ){
    var rel = PREREQUISITOS[keyAct];
    
    //alert('rel: '+rel);
    
    var valAct;
    for( var j = 0; j < rel.length; j++ ){
      valAct = rel[j];
      if( valAct == idMateria ){
        $('#'+keyAct).addClass('previo');
        
        //seleccionaPrevios( keyAct )
        /*setTimeout( function(){*/seleccionaPrevios( keyAct );/*}, TIME_OUT_ANIM );*/
        
        //
        //break;
      }
      //alert(valAct);
    }
  }
}

/*Métdo que limpia las selecciones*/
function limpiarSeleccion(){
  $('.contenedor .correquisito').removeClass('correquisito');
  $('.contenedor .prerequisito').removeClass('prerequisito');
  $('.contenedor .previo').removeClass('previo');
  $('.contenedor .selected').removeClass('selected');
}

//Métodos de jsPlumb
//jsPlumb.bind("ready", conectarMaterias);

function conectarMaterias() {
    
    var color_prueba = "#002846";
    var common = {
          /*paintStyle:{ fillStyle:example3Color, opacity:0.5 },*/
      connector:"StateMachine",
    anchors:["Center", "Center" ],
    endpoints:["Dot", "Blank" ],
      endpointStyle:{ radius:2 },
     overlays:[ ["PlainArrow", {location:1, width:10, length:9} ]],
    /*connectorStyle:{ strokeStyle:'green', lineWidth:4 },*/
          paintStyle:{lineWidth:3,strokeStyle:color_prueba}
    };
    // your jsPlumb related init code goes here

    //Estilo de las flechas de correquisitos
    var commcorr  = {
      /*connector:"StateMachine",*/
      anchors:["Center", "Center" ],
      endpoints:["Blank", "Blank" ],
      endpointStyle:{ radius:2 },
       /*overlays:[ ["PlainArrow", {location:1, width:10, length:9} ]],*/
      paintStyle:{ 
        lineWidth:2,
        strokeStyle:"rgb(131,8,135)",
        dashstyle:"2 2"
        /*joinstyle:"miter"*/
      }
    }

    //alert('inicializo');
    for( var keyAct in PREREQUISITOS ){
      var rel = PREREQUISITOS[keyAct];
      var valAct;
      for( var j = 0; j < rel.length; j++ ){
        valAct = rel[j];
        //alert('conecte '+ keyAct+ ' '+valAct);
        jsPlumb.connect({source:keyAct, target:valAct},common);    
      }
    }
    /*
    jsPlumb.connect({source:"CB0230", target:"CB0231",},common);
    jsPlumb.connect({source:"CB0260", target:"CB0236"},common);
    jsPlumb.connect({source:"ST0242", target:"ST0245"},common);
    jsPlumb.connect({source:"ST0242", target:"ST0244"},common);

    jsPlumb.connect({source:"CB0231", target:"CB0232"},common);
    jsPlumb.connect({source:"CB0236", target:"CB0239"},common);  
    jsPlumb.connect({source:"CB0246", target:"ST0270"},common);
    jsPlumb.connect({source:"ST0245", target:"ST0247"},common);
    jsPlumb.connect({source:"ST0245", target:"ST0246"},common);
    jsPlumb.connect({source:"ST0244", target:"ST0246"},common);
    //Semestre 3
    jsPlumb.connect({source:"ST0246", target:"ST0250"},common);
    jsPlumb.connect({source:"ST0248", target:"ST0249"},common);

    jsPlumb.connect({source:"CB0232", target:"EC0255"},common);
    jsPlumb.connect({source:"OG0205", target:"ST0253"},common);
    jsPlumb.connect({source:"ST0251", target:"ST0252"},common);*/

    //Correquisitos
    //var corrAct = PREREQUISITOS[idMateria];

  //Marca los correquisitos
  for( var corrAct in CORREQUISITOS){    
     var idCorrAct = CORREQUISITOS[corrAct];     

    //alert('conecte: '+corrAct+' '+idCorrAct);
    jsPlumb.connect({source:corrAct+'' , target:idCorrAct+''},commcorr);
  }
    /*jsPlumb.connect({source:"CB0260", target:"CB0246"},commcorr);
    jsPlumb.connect({source:"ST0243", target:"ST0244"},commcorr);
    jsPlumb.connect({source:"CB0236", target:"CB0231"},commcorr);
    jsPlumb.connect({source:"ST0250", target:"ST0251"},commcorr);*/
}