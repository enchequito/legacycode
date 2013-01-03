var App = Ember.Application.create({    
    title: 'Manos de estiba',
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
                url: 'js/views/%@.js'.fmt(name),
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
    doSomething: function(event) {
        console.log("I did something first");
        /*XXX: HOW DO I DO THIS? */
        App.router.navigateTo();
    },
    // Aquí posarem tot el codi a executar un cop resolta la vista.
    didInsertElement:function(){
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
    /*didInsertElement: function() {
        $( "#radio" ).buttonset();
    },*/
    NavigationItemView: Ember.View.extend({
        //tagName: 'li',
        classNameBindings: 'isActive:active'.w(),
        isActive: function() {
            return this.get('menu') === this.get('parentView.selected');
        }.property('item', 'parentView.selected').cacheable(),
    }) 
});

App.NavBarItem = Ember.Object.extend({
    displayText: '',
    routePath: '',
    routeName: '',
    url: '#',
    controller: ''
});

App.NavigationController = Ember.ArrayController.extend({
    content: [],
    selected: null,
    init: function() {
        
        this._super();
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Lista Expedientes',
                routeName: 'home',
                routePath: 'root.index.home',
                controller: 'navigationController'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Nuevo Expediente Import',
                routeName: 'resources',
                routePath: 'root.home.resources',
                controller: 'navigationController'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Nuevo Expediente Export',
                routeName: 'tutorials',
                routePath: 'root.home.tutorials',
                controller: 'navigationController'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Gestión Carga Expediente',
                routeName: 'grid',
                routePath: 'root.index.grid',
                controller: 'navigationController'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Preferencias',
                routeName: 'auth',
                routePath: 'root.index.auth',
                controller: 'navigationController'
            })
        );
    }        
});

App.GridController = Ember.ArrayController.extend({
   
});

App.GridView = Ember.View.extend({
    templateName: 'grid-view'
});


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

App.RescontController = Ember.ArrayController.extend({
     
});

App.RescontView = Ember.View.extend({
    templateName: 'rescont-view'
});

App.ResNavBarItem = Ember.Object.extend({
    displayText: '',
    routePath: '',
    routeName: '',
    url: '#',
    controller: ''
});

App.ResnavbarController = Ember.ArrayController.extend({
    content: [],
    selected: null,
    init: function() {        
        this._super();
        this.pushObject(
            App.ResNavBarItem.create({
                displayText: 'ResourcesOp1 ',
                routeName: 'op1',
                routePath: 'root.resources.op1',
                controller: 'resourcesController'
            })
        );
        this.pushObject(
            App.ResNavBarItem.create({
                displayText: 'ResourcesOp2 ',
                routeName: 'op2',
                routePath: 'root.resources.op2',
                controller: 'resourcesController'
            })
        );
        this.pushObject(
            App.ResNavBarItem.create({
                displayText: 'ResourcesOp3 ',
                routeName: 'op3',
                routePath: 'root.resources.op3',
                controller: 'resourcesController'
            })
        );
    }     
});

App.ResnavbarView = Ember.View.extend({
    templateName: 'resnavbar',
    selectedBinding: 'controller.selected',
    ResNavBarItemView: Ember.View.extend({
        tagName: 'tr',
        classNameBindings: 'isActive:active'.w(),
        isActive: function() {
            return this.get('menu') === this.get('parentView.selected');
        }.property('item', 'parentView.selected').cacheable(),
    }) 
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

App.ResourcesView  = Ember.View.extend({
    templateName: 'resources-view'
});

App.ResourcesController = Ember.ArrayController.extend({
   
});

App.Rescont2View  = Ember.View.extend({
    templateName: 'rescont2-view'
});

App.Rescont2Controller = Ember.ArrayController.extend({
   
});

Ember.TEMPLATES['rescont3-view'] = App.loadTemplates("rescont3");

App.Rescont3View  = Ember.View.extend({
    templateName: 'rescont3-view'
    //layout: Ember.Handlebars.compile("<h3>Opcion2-El usuario es:{{App.User.user}}</h3><h3>y su password:{{App.User.pass}}</h3>")
    //layout: Ember.Handlebars.compile("<div class='my-decorative-class'>{{yield}}</div>"),
    //template: Ember.Handlebars.compile("I got wrapped")
});

App.Rescont3Controller = Ember.ArrayController.extend({
   
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

App.Router = Ember.Router.extend({
    enableLogging: true,
    location: 'hash',
    root: Ember.Route.extend({
        navigateTo: function (router, context){
            //console.log("esto es context:"+context.context);
            // sets the document title with the route name, but you 
            // could have another property that keeps the title here
            $(document).attr('title', context.context.get('routeName'));
            // set the route name on the 'selected' property in the controller
            //router.set('navigationController'.selected', context.context.get('routeName'));
            router.set(context.context.get('controller')+'.selected', context.context.get('routeName'));
            // finaly transitions to the route that's provided by the model
            router.transitionTo(context.context.get('routePath'), context.context);
        },
        navigateToResources: function (router, context) {
            // since this is not called from a nav link which has a
            // model, the selected and the route must be set manually
            router.set('navigationController.selected','resources');
            router.transitionTo('root.index.resources');
        },
        navigateTo2: function (router, event){            
            $(document).attr('title', 'home');
            router.transitionTo('home', event.context);
        },
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
            },
            index: Ember.Route.extend({
                route: '/',
                connectOutlets: function (router, context) {
                    console.log('estoy aqui 2');
                     router.get('homeController').connectOutlet('navigation','navigation');
                }
            }),
            resources: Ember.Route.extend({
                route: '/resources',
                connectOutlets: function (router, context) {
                    router.get('homeController').connectOutlet('navigation','navigation');
                    router.get('homeController').connectOutlet('resources');
                    router.get('resourcesController').connectOutlet('resnavbar','resnavbar');
                    router.get('resourcesController').connectOutlet('rescont');
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
            auth: Ember.Route.extend({
                route: '/auth',
                connectOutlets: function (router, context) {
                    router.get('applicationController').connectOutlet('auth');
                }
            })
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