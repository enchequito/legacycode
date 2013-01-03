(function(){

	/**
	 *@class PorticCtx
	 */
	// Si existeix, recuperem el context global de portic (1 context per navegador).
	if('undefined' === typeof window.top.PorticCtx){
		PorticCtx = {};
	}else{
		PorticCtx = window.top.PorticCtx;
	}
	
	if ('undefined' !== typeof window) {
	    window.pCtx = window.PorticCtx = pCtx = PorticCtx;
	}
	
	
	/**
	 * 'Singleton' una �nica sessi� per context.
	 */
    function Session(){
    	this.tokenSessio = "";
    	this.usuariSessio = "";
    	this.paisSessio = "";
    	this.nifSessio = "";
    	this.idioma = "";
    	this.ready = function(){return this.tokenSessio!="";};
     };
     var session = new Session();

     function GenericForm(){
    	 this.pagina = "-1";
    	 this.totalElements = "";
    	 this.elementsPagina = "";
    	 this.params = "";
     };
     GenericForm.prototype = new Session();
    	
	/**
	 * Declaraci� de les constants de configuraci�.
	 */
	var CONFIG = (function(){
		var values = {
		   // Resoluci� de fitxers de literals.
		   'LANGUAGE_BASEPATH': 'js/resources/',
		   'LANGUAGE_FILE': 'language_%LANG%.properties',
		   'LANGUAGE_DEFAULT': 'language_en.properties',
		   'LANGUAGE_TOKEN': '%LANG%'
		};
	    
		return{
			get: function(key) {return values[key];}
		};
	})();
	
	/**
	 * Retorna l'objecte sessi� carregat en el context.
	 * @returns {Session}
	 */
	PorticCtx.getSession = function(){return session;};
		
	/**
	 * C�rrega els literals a partir del el fitxer per defecte.
	 * @method loadLiterals
	 */
	PorticCtx.loadBrowserLanguage = function(){
		PorticCtx.loadLanguage(navigator.language);
	};
	
	/**
	 * C�rrega dels literals a partir del idioma indicat per par�metre.
	 * Si no s'indica l'idioma, es carrega el fitxer per defecte.
	 * @method loadLiterals
	 */
	PorticCtx.loadLanguage = function(psLang){
		var loResourceToLoad = CONFIG.get('LANGUAGE_BASEPATH');
		
		if('undefined' === typeof psLang){
			loResourceToLoad += CONFIG.get('LANGUAGE_DEFAULT');
		}else{
			loResourceToLoad += CONFIG.get('LANGUAGE_FILE').replaceAll(CONFIG.get('LANGUAGE_TOKEN'), psLang);
		}
		
        $.ajax({
    	    url: loResourceToLoad,
		    async: false,
		    dataType: "text",
		    success: function(data, textStatus, jqXHR){Ember.I18n.translations = $.parseJSON(data);},
		    error: ajaxErrorHandler
		});
        
        //* Parece que esto no le gusta a mi proyecto
		/*this.sendAjaxPost("", 
						  loResourceToLoad, 
						  function(data, textStatus, jqXHR){Ember.I18n.translations = $.parseJSON(data);}, 
						  ajaxErrorHandler, 
						  "text");*/
	};
	
	/**
	 * Recorre tots els elements del formulari indicat, buscant quins corresponen a camps d'entrada i 
	 * genera la corresponent cadena JSON. T� en compte possibles arrays d'elements amb el mateix nom.
	 * @param formId valor del camp 'id' del formulari.
	 * @returns cadena JSON.
	 */
	PorticCtx.formToJSON = function(formId){
	    var loResult = {};
	    var loInputs = $("#"+formId).serializeArray();
	    
	    $.each(loInputs, function(){
	    	
	        if (loResult[this.name] === undefined) {
	        	loResult[this.name] = (this.value || '');
	        }else{
	            if (!loResult[this.name].push) {
	            	loResult[this.name] = [loResult[this.name]];
	            }
	            loResult[this.name].push(this.value || '');	        	
	        }
	    });
	    
	    return JSON.stringify(loResult);
	};
	
	/**
	 * Env�a una petici� al servidor on les dades s'intercanviaran en format JSON tant de pujada com de baixada.
	 * @param jsonType nom complert de la classe de servidor a la que corresp�n l'objecte JSON enviat. Opcional,
	 * si no s'indica, el servidor mapeja les dades JSON contra una col�lecci� de HashMaps.
	 * @param jsonData dades a enviar en format JSON.
	 * @param url URL on realitzar la petici�.
	 * @param callback funci� a invocar en cas que la petici� finalitzi correctament.
	 * @param errorCallBack funci� a invocar en cas que la petici� no finalitzi correctament. Opcional, si no 
	 * s'indica, s'utilitza el gestor d'errors per defecte.
	 */
	PorticCtx.sendJSONPost = function(jsonType, jsonData, url, callback, errorCallBack){
		try{
			var data = {jsonType : jsonType, jsonData : jsonData};
			
			this.sendAjaxPost(data, url, callback, errorCallBack, "json");

		}catch(e){
			alert(e.message);
		}
	};
	
	
	/**
	 * Env�a una petici� AJAX al servidor.
	 * @param dataToSend dades a enviar.
	 * @param url URL on realitzar la petici�.
	 * @param callback funci� a invocar en cas que la petici� finalitzi correctament.
	 * @param errorCallBack funci� a invocar en cas que la petici� no finalitzi correctament. Opcional, si no 
	 * s'indica, s'utilitza el gestor d'errors per defecte.
	 * @param returnDataType tipus de dades del retorn: text, xml, json, script, html... Opcional, per defecte
	 * 'text' i l'aplicaci� gestiona el tipus de dades. 
	 */
	PorticCtx.sendAjaxPost = function(dataToSend, url, callback, errorCallBack, returnDataType){
		try{
			var loErrorCallback = ajaxErrorHandler;
			var lsReturnType = "text";
			
			if('undefined' !== typeof errorCallBack){
				loErrorCallback = errorCallBack;
			}
			
			if('undefined' !== typeof returnDataType){
				lsReturnType = returnDataType;
			}
			
			$.ajax({
				type: "POST",
			    url: url,
			    dataType: lsReturnType,
			    async: false,
			    data:  dataToSend,
			    success: callback,
			    error: loErrorCallback
			});
		}catch(e){
			alert(e.message);
		}
	};
	
	PorticCtx.getLiteral = function(key){
		return $.format(Ember.I18n.translations[key]);
	};
	
	PorticCtx.showError = function(){
		$("#errorDialog").show("clip", {}, 1000);
	};
	
	ajaxErrorHandler = function(data, textStatus, jqXHR){
        alert('Error, error, eee-rror !!!!');
    };
})();



/**
 * Afegim al tipus String la funci� 'replaceAll'.
 **/
String.prototype.replaceAll = function(str1, str2){return this.split(str1).join(str2);};

/**
 * Recupera l'adre�a base per a crides http a l'aplicaci�.
 * Parteix de la suposi� que les URLs tenen la forma 'http://servername:port/appName/[......]
 * @returns {String}
 */
getApplicationPath = function(){
   var href = window.location.href.split('/');
   return href[2];
};