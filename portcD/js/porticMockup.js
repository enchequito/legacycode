var LogInApp = Ember.Application.create({
    title: 'Mock Up Forwarding',
    ready: function(){
        // Carreguem els literals abans de pintar la página.
    	PorticCtx.loadBrowserLanguage();
   }
});

LogInApp.authView = Ember.View.extend({
	
    // Aquí posarem tot el codi a executar un cop resolta la vista.
    didInsertElement:function(){
    	$("#errorDialog").hide();
    	
		// Activem la validació del formulari.
		$("#frmAuth").validate({ 
			rules: {
				usuari: "required",
				claupub: {
					required: true,
					minlength: 6
				}	
			},
		    messages: {
				usuari: {
					required: PorticCtx.getLiteral("login.required"),
				},
				claupub: {
		            required: PorticCtx.getLiteral("login.required"),
		            minlength: PorticCtx.getLiteral("login.minLength")
		        }
		    }
		});
    }
});

LogInApp.authController = Ember.Object.create({
	doAuthenticate: function(event){
		var loJSON;
		
		try{
			event.preventDefault();
			
			loJSON = PorticCtx.formToJSON("frmAuth");
			
			//PorticCtx.sendJSONPost("", loJSON, "/PorticMockUp/json/rest/autenticate", response);
			
			if(pCtx.getSession().ready()){
				
			}else{
				alert("No hi ha sessió.");
			}
		}catch(e){
			alert(e.message);
		}
	},
	doClean: function(event){
		$("#frmAuth")[0].reset();
	}
	
});

LogInApp.errorController = Ember.Object.create({
	close: function(event){
		$('#errorDialog').hide('clip', {}, 1000);	
	}
});

function response(data){
	var loSession = pCtx.getSession();
	
	try{
		loSession.tokenSessio = data.token;
		loSession.usuariSessio = data.usuari;
		loSession.paisSessio = data.pais;
		loSession.nifSessio = data.nif;
		loSession.idioma = data.idioma;
	}catch(e){
		alert(e.message);
	}
}

// Cualquier controller/view/...  que se defina deber ir antes de esta línea.
LogInApp.initialize();