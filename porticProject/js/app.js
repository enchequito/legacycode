var App = Ember.Application.create({    
    title: 'Forwarding',
    ready: function(){
        // Carreguem els literals abans de pintar la página.
    	PorticCtx.loadBrowserLanguage();
    },
    loadTemplates: function (name) {
        //Cargamos los templates de un archivo
        if (!name) { return; }
       
        var template = Ember.get(Ember.TEMPLATES, name);
    
        if (!template) {
            $.ajax({            
                url: 'js/templates/%@.js'.fmt(name),
                dataType: "text",
                async: false
            }).success(function(data) {
                template = Ember.Handlebars.compile(data);
            });
        }
    
        if (!template) {
            console.log("Error al cargar template "+name);
            //throw new Ember.Error('%@ - Unable to find %@ "%@".'.fmt(this, type, name));
        }
        console.log("Cargado template "+name);
        return template;
    }
});

//Cargamos los templates
Ember.TEMPLATES['auth-view'] = App.loadTemplates("auth");
Ember.TEMPLATES['top-nav-bar'] = App.loadTemplates("topnavbar");
Ember.TEMPLATES['prefer-view'] = App.loadTemplates("prefer");
Ember.TEMPLATES['grid-view'] = App.loadTemplates("grid");
Ember.TEMPLATES['barco-view'] = App.loadTemplates("barco");


App.User = Ember.Object.create({
    user: '',
    pass: ''
})

App.ApplicationController = Ember.Controller.extend({
    response: function(data){
        alert(data.token);
    }
});

App.ApplicationView = Ember.View.extend({
  templateName: 'application'
});

App.AuthView = Ember.View.extend({
    templateName: 'auth-view',    
    // Aquí posarem tot el codi a executar un cop resolta la vista.
    didInsertElement:function(){
        $( "button" ).button();
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

App.AuthController = Ember.Object.create({
	doAuthenticate: function(event){
		var loJSON;
		
		try{
			event.preventDefault();
			           
            App.User.set("user",$("#frmAuth input[name=usuari]").val());
            App.User.set("pass", $("#frmAuth input[name=claupub]").val());
                    
			//loJSON = PorticCtx.formToJSON("frmAuth");

			//PorticCtx.sendJSONPost("credentials", loJSON, "/PorticMockUp/json/rest/autenticate", App.response);
			
            App.router.send('navigateTo2',event);            
            
		}catch(e){
			alert(e.message);
		}
	},
	doClean: function(event){
		$("#frmAuth")[0].reset();
	}
});

App.ErrorController = Ember.Object.create({
    close: function(event){
		$('#errorDialog').hide('clip', {}, 1000);	
	}
});


App.NavigationView = Ember.View.extend({
    templateName: 'top-nav-bar',
    selectedBinding: 'controller.selected',
    didInsertElement: function() {
        $( "#radio" ).buttonset();        
    },    
    NavigationItemView: Ember.View.extend({
        //tagName: 'input',
        classNameBindings: 'isActive:active'.w(),        
        isActive: function() {
            return this.get('menu') === this.get('parentView.selected');
        }.property('item', 'parentView.selected').cacheable()/*,
        attributeBindings: ['id','type','name'],
        id: function() {
            console.log("identif:"+this.get('idText') )
            return this.get('id') ;
        }.property(),
        id: 'radio',
        type: 'radio',
        name: 'radio'*/
    }),
    NavigationItemLabelView: Ember.View.extend({
        tagName: 'label',        
        attributeBindings: ['for'],
        for: 'radio' //tiene que coincidir con el id del control asociado
    })
});

App.NavBarItem = Ember.Object.extend({
    displayText: '',
    routePath: '',
    routeName: '',
    url: '#',
    controller: '',
    idText: ''
});

App.NavigationController = Ember.ArrayController.extend({
    content: [],
    selected: null,
    init: function() {
        
        this._super();
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Lista de Expedientes',
                routeName: 'home',
                routePath: 'root.home',
                controller: 'navigationController',
                idText: 'for=radio1'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Nuevo Expediente Import',
                routeName: 'barco',
                routePath: 'root.home.barco',
                controller: 'navigationController',
                idText: 'radio2'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Nuevo Expediente Export',
                routeName: 'tutorials',
                routePath: 'root.home.tutorials',
                controller: 'navigationController',
                idText: 'radio3'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Gestión Carga Expediente',
                routeName: 'grid',
                routePath: 'root.home.grid',
                controller: 'navigationController',
                idText: 'radio4'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Preferencias',
                routeName: 'prefer',
                routePath: 'root.home.prefer',
                controller: 'navigationController',
                idText: 'radio5'
            })
        );
    }
});

App.GridController = Ember.ArrayController.extend({
   
});

App.GridView = Ember.View.extend({
    templateName: 'grid-view'
});

App.llistaExpsController = Ember.ArrayController.extend({
     
});

var formatLS = function(cellvalue, options, rowObject ){
    var lsReturn = "";
	
	if(cellvalue == "1"){
		lsReturn = "<img src='img/check_green.jpg'/>";
	}
	
	return lsReturn;
};

App.TutorialsController = Ember.ArrayController.extend({
     
});

App.TutorialsView = Ember.View.extend({
    templateName: 'tutorials-view'
});

App.HomeController = Ember.ArrayController.extend({
     
});

App.HomeView = Ember.View.extend({
    templateName: 'home-view'
});


App.AppBarItem = Ember.Object.extend({
    displayText: '',
    routePath: '',
    routeName: '',
    url: '#',
    controller: ''
});

App.AppbarView  = Ember.View.extend({
    templateName: 'appbar-view',
    selectedBinding: 'controller.selected',
    AppBarItemView: Ember.View.extend({
        tagName: 'tr',
        classNameBindings: 'isActive:active'.w(),
        isActive: function() {
            return this.get('menu') === this.get('parentView.selected');
        }.property('item', 'parentView.selected').cacheable(),
    }) 
});

App.AppbarController = Ember.ArrayController.extend({
    content: [],
    selected: null,
    init: function() {        
        this._super();
        this.pushObject(
            App.AppBarItem.create({
                displayText: 'Opcion 1 ',
                routeName: 'op1',
                routePath: 'root.tutorials.op1',
                controller: 'appbarController'
            })
        );
        this.pushObject(
            App.AppBarItem.create({
                displayText: 'Opcion 2 ',
                routeName: 'op2',
                routePath: 'root.tutorials.op2',
                controller: 'appbarController'
            })
        );
    }     
});

App.ContentappbarView  = Ember.View.extend({
    templateName: 'contentappbar-view'
});

App.ContentappbarController = Ember.ArrayController.extend({
   
});

App.ContentView  = Ember.View.extend({
    templateName: 'content-view'
});

App.ContentController = Ember.ArrayController.extend({
   
});

App.BarcoView  = Ember.View.extend({
    templateName: 'barco-view',
    didInsertElement: function(){
        console.log("barcoview");
        $( "button" ).button();
        $( "#barco-form" ).dialog({
        	autoOpen: true,
			height: 345,
			width: 365,
			modal: true,
			buttons: {
				"Acceptar": function() {
					
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				
			}
		});

    }
});

App.BarcoController = Ember.ArrayController.extend({
    doBuscarBarco: function(event){
        console.log("Buscando...");
    }
});

App.ListaBarcosController = Ember.ArrayController.extend({
});

App.ListaBarcosView = Ember.View.extend({
    templateName: 'listbarcos-view',
    didInsertElement:function(){
        
	   	$("#gridListaBarcos").jqGrid({ 
				datatype: "jsonstring",
				jsonReader: {
				    repeatitems: false,
//				    id: "expediente",
				    root: "llista"
				},
	    		colNames:['Nom','Bandera', 'OMI', 'Radio'],
	    		colModel:[ 
	    					{name: 'nom', index:'nom', width : 15, sortable : true, sorttype: 'text', align: 'center'},
	    					{name: 'bandera', width : 7, sortable : true, align: 'left'},
	    					{name: 'omi', width : 7, sortable : true, align: 'left'},
	    					{name: 'radio', width : 8, sortable : true, align: 'left', hide: true}	           
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
	             pager: "#ListaBarcosButtons"
	             /*onSelectRow: function(ids) {
	            	 pCtx.populateDataGridJSON ("gridTrackTrace", "/PorticMockUp/json/rest/trackTrace");

	             }*/
	    	});
	   	
	   		//pCtx.populateDataGridJSON ("gridExp", "/PorticMockUp/json/rest/listExp");
    }
});


App.FilterbarView  = Ember.View.extend({
    templateName: 'filterbar-view'
});

App.FilterbarController = Ember.ArrayController.extend({
   
});

App.AppresView  = Ember.View.extend({
    templateName: 'appres-view'
});

App.AppresController = Ember.ArrayController.extend({
   
});

App.Conttut1View  = Ember.View.extend({
    templateName: 'conttut1-view'
});

App.Conttut1Controller = Ember.ArrayController.extend({
   
});

App.Conttut2View  = Ember.View.extend({
    templateName: 'conttut2-view'
});

App.Conttut2Controller = Ember.ArrayController.extend({
   
});

App.PreferView  = Ember.View.extend({
    templateName: 'prefer-view',
    didInsertElement: function() {
        $( "#tabs" ).tabs();
    },
});

App.PreferController = Ember.ArrayController.extend({
   
});


App.ButtonsView  = Ember.View.extend({
    templateName: 'buttons-view',
    didInsertElement: function() {
        console.log("entro en buttons view");
    }
});

App.ButtonsController = Ember.Object.create({
    doModal: function(event){
    	console.log("en buttonscontroller....");
        $("#barco-form").dialog( "open" );
	}
});


App.Router = Ember.Router.extend({
    enableLogging: true,
    location: 'hash',
    root: Ember.Route.extend({
        navigateTo: function (router, context){
            //console.log("esto es context:"+context.context.get('routeName'));
            // sets the document title with the route name, but you 
            // could have another property that keeps the title here
            $(document).attr('title', context.context.get('routeName'));
            /*if (context.context.get('routeName')=="barco") {
                console.log("vamos por el barco");
                $( "#barco-form" ).dialog( "open" );
            } else {*/
            // set the route name on the 'selected' property in the controller
            //router.set('navigationController'.selected', context.context.get('routeName'));
            router.set(context.context.get('controller')+'.selected', context.context.get('routeName'));
            // finaly transitions to the route that's provided by the model
            router.transitionTo(context.context.get('routePath'), context.context);
            //}
        },        
        navigateToResources: function (router, context) {
            // since this is not called from a nav link which has a
            // model, the selected and the route must be set manually
            router.set('navigationController.selected','resources');
            router.transitionTo('root.index.resources');
        },
        navigateTo2: function (router, event){
            console.log("esto es event:"+event.target.nodeName);
            if(event.target.nodeName=="BUTTON"){
                console.log("entro1");
                $(document).attr('title', 'barco');
                $( "#barco-form" ).dialog( "open" );
                //router.transitionTo('barco', event.context);   
            } else {
                console.log("entro2");
                $(document).attr('title', 'home');
                router.transitionTo('home', event.context);    
            }
            
        },
        llistaExp: Ember.Route.transitionTo('grid'),
        preferencies: Ember.Route.transitionTo('prefer'),
        nouExpImp: Ember.Route.transitionTo('barco'),
        index: Ember.Route.extend({
            route: '/',
            connectOutlets: function (router, context) {
                router.get('applicationController').connectOutlet('auth');
                //router.get('applicationController').connectOutlet('home');
                //router.get('homeController').connectOutlet('navigation','navigation');
            }
        }),
        home: Ember.Route.extend({
            route: '/',
            connectOutlets: function (router, context) {
                //router.get('applicationController').connectOutlet('auth');
                console.log('estoy aqui 1');
                router.get('applicationController').connectOutlet('home');
                router.get('homeController').connectOutlet('navigation','navigation');
                router.get('homeController').connectOutlet('grid');
            },
            index: Ember.Route.extend({
                route: '/',
                connectOutlets: function (router, context) {
                    console.log('estoy aqui 2');
                     router.get('homeController').connectOutlet('navigation','navigation');
                     router.get('homeController').connectOutlet('grid');
                }
            }),
            tutorials: Ember.Route.extend({
                route: '/tutorials',
                connectOutlets: function (router, context) {
                    router.get('homeController').connectOutlet('navigation','navigation');
                    router.get('homeController').connectOutlet('tutorials');
                    router.get('tutorialsController').connectOutlet('tutnavbar','appbar');
                    router.get('tutorialsController').connectOutlet('conttut1');
                }
            }),
            grid: Ember.Route.extend({
                route: '/grid',
                connectOutlets: function (router, context) {
                    router.get('homeController').connectOutlet('navigation','navigation');
                    router.get('homeController').connectOutlet('grid');
                }
            }),
            prefer: Ember.Route.extend({
                route: '/prefer',
                connectOutlets: function (router, context) {
                    router.get('homeController').connectOutlet('navigation','navigation');
                    router.get('homeController').connectOutlet('prefer');
                    router.get('preferController').connectOutlet('prefer');
                }
            }),
            barco: Ember.Route.extend({
                route: '/barco',
                connectOutlets: function (router, context) {
                    router.get('homeController').connectOutlet('barco');
                }
            })
        }),
        barco: Ember.Route.extend({
            route: '/barco',
            connectOutlets: function (router, context) {
                router.get('homeController').connectOutlet('barco');
            }
        }),
        grid: Ember.Route.extend({
            route: '/grid',
            connectOutlets: function (router, context) {
                router.get('homeController').connectOutlet('navigation','navigation');
                router.get('homeController').connectOutlet('grid');
            }
        }),
        prefer: Ember.Route.extend({
            route: '/prefer',
            connectOutlets: function (router, context) {
                router.get('homeController').connectOutlet('navigation','navigation');
                router.get('homeController').connectOutlet('prefer');
                router.get('preferController').connectOutlet('prefer');
            }
        }),
        resources: Ember.Route.extend({
            route: '/resources',
            connectOutlets: function (router, context) {
                console.log('estoy aqui resources 1');
                //router.get('homeController').connectOutlet('navigation','navigation');
                router.get('resourcesController').connectOutlet('resnavbar','resnavbar');
                router.get('resourcesController').connectOutlet('rescont');
            },
            index: Ember.Route.extend({
                route: '/',
                connectOutlets: function (router, context) {
                    console.log('estoy aqui resources 1');
                    //router.get('homeController').connectOutlet('navigation','navigation');
                    router.get('resourcesController').connectOutlet('resnavbar','resnavbar');
                    router.get('resourcesController').connectOutlet('rescont');
                }
            }),
            op1: Ember.Route.extend({
                route: '/op1',
                connectOutlets: function (router, context) {
                     router.get('resourcesController').connectOutlet('resnavbar','resnavbar');
                     router.get('resourcesController').connectOutlet('rescont2');
                }
            }),
            op2: Ember.Route.extend({
                route: '/op2',
                connectOutlets: function (router, context) {
                     router.get('resourcesController').connectOutlet('resnavbar','resnavbar');
                     router.get('resourcesController').connectOutlet('rescont3');
                }
            }),
            op3: Ember.Route.extend({
                route: '/op3',
                connectOutlets: function (router, context) {
                     router.get('resourcesController').connectOutlet('resnavbar','resnavbar');
                     router.get('resourcesController').connectOutlet('rescont4');
                }
            })
        }),
        tutorials: Ember.Route.extend({
            route: '/tutorials',
            connectOutlets: function (router, context) {
                //router.get('homeController').connectOutlet('tutorials');
                router.get('tutorialsController').connectOutlet('tutnavbar','appbar');
                router.get('tutorialsController').connectOutlet('conttut1');
            },
            index: Ember.Route.extend({
                route: '/',
                connectOutlets: function (router, context) {
                    //router.get('homeController').connectOutlet('tutorials');
                    router.get('tutorialsController').connectOutlet('tutnavbar','appbar');
                    router.get('tutorialsController').connectOutlet('conttut1');
                }
            }),
            op1: Ember.Route.extend({
                route: '/op1',
                connectOutlets: function (router, context) {
                    router.get('homeController').connectOutlet('tutorials');
                    router.get('tutorialsController').connectOutlet('tutnavbar','appbar');
                    router.get('tutorialsController').connectOutlet('conttut1');
                }
            }),
            op2: Ember.Route.extend({
                route: '/op2',
                connectOutlets: function (router, context) {
                    router.get('tutorialsController').connectOutlet('tutnavbar','appbar');
                    router.get('tutorialsController').connectOutlet('conttut2');
                }
            })
        })   
    })
})

App.initialize();