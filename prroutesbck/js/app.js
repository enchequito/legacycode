var App = Ember.Application.create({    
    title: 'Manos de estiba',
    ready: function(){
        // Carreguem els literals abans de pintar la página.
    	PorticCtx.loadBrowserLanguage();
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
    // Aquí posarem tot el codi a executar un cop resolta la vista.
    didInsertElement:function(){
        // Activem la validació.
    	//$("#frmAuth").validate();
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
			
		}catch(e){
			alert(e.message);
		}
	},
	doClean: function(event){
		$("#frmAuth")[0].reset();
	}
});


App.NavigationView = Ember.View.extend({
    templateName: 'top-nav-bar',
    selectedBinding: 'controller.selected',
    NavigationItemView: Ember.View.extend({
        tagName: 'li',
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
                displayText: 'Home',
                routeName: 'home',
                routePath: 'root.index.home',
                controller: 'navigationController'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Links/Resources',
                routeName: 'resources',
                routePath: 'root.index.resources',
                controller: 'navigationController'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Ember Tutorials',
                routeName: 'tutorials',
                routePath: 'root.index.tutorials',
                controller: 'navigationController'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Grid',
                routeName: 'grid',
                routePath: 'root.index.grid',
                controller: 'navigationController'
            })
        );
        this.pushObject(
            App.NavBarItem.create({
                displayText: 'Auth',
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

function str() {return "";}

App.Rescont3View  = Ember.View.extend({
    templateName: 'rescont3-view',
    init: function() {       
        if(!this.layout){
            alert("hola");
            $.get('rescont3.js',function(data){this.layout=Ember.Handlebars.compile(data);});
        }
    },         /*
    layout: Ember.Handlebars.compile(
                $.get('rescont3.js',            async: false,
            dataType: "text",
            success: function(data){return data;}
        });
    )
    )*/

    layout: Ember.Handlebars.compile("<h3>Opcion2-El usuario es:{{App.User.user}}</h3><h3>y su password:{{App.User.pass}}</h3>")
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
        index: Ember.Route.extend({
            route: '/',
            connectOutlets: function(router) {
                router.get('applicationController').connectOutlet('navigation', 'navigation');
            },
            home: Ember.Route.extend({
                route: '/',
                connectOutlets: function (router, context) {
                     router.get('applicationController').connectOutlet('home');
                }
            }),
            resources: Ember.Route.extend({
                route: '/resources',
                connectOutlets: function (router, context) {
                    router.get('applicationController').connectOutlet('resources');
                    router.get('resourcesController').connectOutlet('resnavbar','resnavbar');
                    router.get('resourcesController').connectOutlet('rescont');
                }
            }),
            tutorials: Ember.Route.extend({
                route: '/tutorials',
                connectOutlets: function (router, context) {
                    router.get('applicationController').connectOutlet('tutorials');
                    router.get('tutorialsController').connectOutlet('tutnavbar','appbar');
                    router.get('tutorialsController').connectOutlet('conttut1');
                }
            }),
            grid: Ember.Route.extend({
                route: '/grid',
                connectOutlets: function (router, context) {
                    router.get('applicationController').connectOutlet('grid');
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
                router.get('applicationController').connectOutlet('resources');
            },
            index: Ember.Route.extend({
                route: '/',
                connectOutlets: function (router, context) {
                     router.get('applicationController').connectOutlet('resources');
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
                router.get('applicationController').connectOutlet('tutorials');
            },
            index: Ember.Route.extend({
                route: '/',
                connectOutlets: function (router, context) {
                     router.get('applicationController').connectOutlet('tutorials');
                }
            }),
            op1: Ember.Route.extend({
                route: '/op1',
                connectOutlets: function (router, context) {
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