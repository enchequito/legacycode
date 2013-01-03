var ListaExpApp = Ember.Application.create({
    title: 'Mock Up Lista Expedientes Forwarding',
    ready: function(){
        // Carreguem els literals abans de pintar la página.
    	PorticCtx.loadBrowserLanguage();
   }
});

ListaExpApp.menuView = Ember.View.extend({
	
    // Aquí posarem tot el codi a executar un cop resolta la vista.
    didInsertElement:function(){  
    	$("#menuForwarding").menu();
    }
});

ListaExpApp.filtrosBusquedaView = Ember.View.extend({
	
    // Aquí posarem tot el codi a executar un cop resolta la vista.
    didInsertElement:function(){
    }
});

ListaExpApp.gestionExpsView = Ember.View.extend({
	
    // Aquí posarem tot el codi a executar un cop resolta la vista.
    didInsertElement:function(){
    	$("#menuGestExps").menu();
    }
});


ListaExpApp.llistaExpsView = Ember.View.extend({
	
    didInsertElement:function(){
    	
	   	$("#gridExp").jqGrid({ 
				datatype: "jsonstring",
				jsonReader: {
				    repeatitems: false,
//				    id: "expediente",
				    root: "llista"
				},
	    		colNames:['Circuit','Seguiment', 'Expedient', 'Consignatari','Client','BL/Booking','Vaixell', 'L/S', 'ETA/ETD', 'Despeses', 'Condicions de transport', 'Estat', 'Data Ult. Modif.', 'Usuari'],
	    		colModel:[ 
	    					{name: 'circuito', index:'circuito', width : 40, sortable : true, sorttype: 'text', align: 'center'},
	    					{name: 'seguimento', width : 180, sortable : true, align: 'left'},
	    					{name: 'expediente', width : 120, sortable : true, align: 'left'},
	    					{name: 'consignatario', width : 130, sortable : true, align: 'left', hide: true},
	    					{name: 'cliente', width : 80, sortable : true, align: 'right'},
	    					{name: 'bl', width : 80, sortable : true, align: 'right'},
	    					{name: 'barco', width : 80, sortable : true, align: 'right'},
	    					{name: 'l_s', width : 80, sortable : true, align: 'right', formatter:formatLS},
	    					{name: 'eta_etd', width : 80, sortable : true, align: 'right'},
	    					{name: 'gastos', width : 80, sortable : true, align: 'right'},
	    					{name: 'condiciones', width : 80, sortable : true, align: 'right'},
	    					{name: 'estado', width : 80, sortable : true, align: 'right'},
	    					{name: 'fechaMod', index:'fechaMod', width : 80, sortable : true, sorttype: 'text', align: 'right'},
	    					{name: 'usuario', width : 80, sortable : true, align: 'right'}    		           
	    		         ], 
	             sortname: "data_ult_mod", 
	             viewrecords: true, 
	             sortorder: "asc", 
	             loadonce: false, 		// per activar/desactivar la recàrrega de dades.
	             sortable: true, 		// activar o desactivar el 'drag & drop' de columnes (requereix el mòdul de jQuery).
	             multiselect: false,	// true --> multisel·lecció, i apareix un checkbox com a primera columna.
	             autowidth: true,
	             rowNum: 6,
	             rowList:[6,12,18],
	             pager: "#llistaExpButtons"
	             /*onSelectRow: function(ids) {
	            	 pCtx.populateDataGridJSON ("gridTrackTrace", "/PorticMockUp/json/rest/trackTrace");

	             }*/
	    	});
	   	
	   		//pCtx.populateDataGridJSON ("gridExp", "/PorticMockUp/json/rest/listExp");
    }
});

ListaExpApp.llistaTrackTrace = Ember.View.extend({
	
    // Aquí posarem tot el codi a executar un cop resolta la vista.
    didInsertElement:function(){
	   	$("#gridTrackTrace").jqGrid({ 
			datatype: "jsonstring",
			jsonReader: {
			    repeatitems: false,
//			    id: "contenedorMat",
			    root: "llista"
			},
    		colNames:['CB','Matrícula Cont.', 'Tipo', 'Ref. Contenedor','Precinto','Mercancias Peligrosas','Empresa Transporte', 'Documentación Recibida', 'Transporte', 'Preaviso', 'Salida Depot', 'Entrada Terminal', 'Solícito', 'Posicionamiento', 'Despacho', 'Levante sin papeles', 'Carga', 'Seguimiento'],
    		colModel:[ 
    					{name: 'c_b', index: 'c_b', width : 40, sortable : true, sorttype: 'text', align: 'center'},
    					{name: 'contenedorMat', index: 'contenedorMat', width : 180, sortable : true, align: 'left'},
    					{name: 'tipo', index: 'tipo', width : 120, sortable : true, align: 'left'},
    					{name: 'contenedorRef', width : 130, sortable : true, align: 'left', hide: true},
    					{name: 'precinto', width : 80, sortable : true, align: 'right'},
    					{name: 'mercPelig', width : 80, sortable : true, align: 'right'},
    					{name: 'empTrans', width : 80, sortable : true, align: 'right'},
    					{name: 'docRecibida', width : 80, sortable : true, align: 'right'},
    					{name: 'transporte', width : 80, sortable : true, align: 'right'},
    					{name: 'preaviso', width : 80, sortable : true, align: 'right'},
    					{name: 'depotSalida', width : 80, sortable : true, align: 'right'},
    					{name: 'terminalEnt', width : 80, sortable : true, align: 'right'},
    					{name: 'solicito', width : 80, sortable : true, sorttype: 'text', align: 'right'},
    					{name: 'posicionamiento', width : 80, sortable : true, align: 'right'},
    					{name: 'despacho', width : 80, sortable : true, sorttype: 'text', align: 'right'},
    					{name: 'levSinPapeles', width : 80, sortable : true, align: 'right'},
    					{name: 'carga', width : 80, sortable : true, align: 'right'},
    					{name: 'seguimiento', width : 80, sortable : true, sorttype: 'text', align: 'right'}
    		         ], 
             sortname: "contenedorMat", 
             viewrecords: true, 
             sortorder: "asc", 
             loadonce: false, 		// per activar/desactivar la recàrrega de dades.
             sortable: true, 		// activar o desactivar el 'drag & drop' de columnes (requereix el mòdul de jQuery).
             multiselect: false,	// true --> multisel·lecció, i apareix un checkbox com a primera columna.
             autowidth: true
    	});
    }
});

// Cualquier controller/view/...  que se defina deber ir antes de esta línea.
ListaExpApp.initialize();



var formatLS = function(cellvalue, options, rowObject ){
	var lsReturn = "";
	
	if(cellvalue == "1"){
		lsReturn = "<img src='img/check_green.jpg'/>";
	}
	
	return lsReturn;
};