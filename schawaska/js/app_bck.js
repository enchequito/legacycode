App = null;

var BaseController = null;
var BaseArrayController = null;
var BaseView = null;
var FadeInView = null;

var initialize = function() {
    BaseController = Ember.Controller.extend();
    BaseView = Ember.View.extend();
    FadeInView = BaseView.extend({
        didInsertElement: function() {
            this.$().hide().fadeIn('slow');
        }
    });
    BaseArrayController = Ember.ArrayController.extend();
};


$(function() {

    initialize();
    
    App = Ember.Application.create();
    
    App.ApplicationController = BaseController.extend();
    
    App.NavBarItem = Ember.Object.extend({
        displayText: '',
        routePath: '',
        routeName: '',
        url: '#'
    });

    App.NavigationController = BaseArrayController.extend({
        content: [],
        selected: null,
        init: function() {
            
            this._super();
            this.pushObject(
                App.NavBarItem.create({
                    displayText: 'Home',
                    routeName: 'home',
                    routePath: 'root.index.home'
                })
            );
            this.pushObject(
                App.NavBarItem.create({
                    displayText: 'Links/Resources',
                    routeName: 'resources',
                    routePath: 'root.index.resources'
                })
            );
            this.pushObject(
                App.NavBarItem.create({
                    displayText: 'Ember Tutorials',
                    routeName: 'tutorials',
                    routePath: 'root.index.tutorials'
                })
            );
            this.pushObject(
                App.NavBarItem.create({
                    displayText: 'Contact',
                    routeName: 'contact',
                    routePath: 'root.index.contact'
                })
            );
        }        
    });
    
    App.HomeController = BaseArrayController.extend({
    
    });
    
    
    App.Resource = Ember.Object.extend({
        htmlText: function() {
            return new Handlebars.SafeString(this.get('text'));
        }.property('text'),
        text: '',
        url: '', 
        target: '_blank',
        description: '',
        category: ''
    });
    
    App.ResourcesController = BaseArrayController.extend({
        content: [],
        categories: ['All', 'Handlebars', 'Ember', 'Ember Data', 'Bootstrap', 'Other'],
        categorySelected: 'All',
        filtered: function() {
            if(this.get('categorySelected') == "All") {
                return this.get('content');                                        
            } else {
                return this.get("content")
                           .filterProperty(
                               "category",
                               this.get('categorySelected')
                           );
            }            
        }.property('content.@each', 'categorySelected'),
        filteredCount: function() {
            return this.get('filtered').length;                                        
        }.property('content.@each', 'categorySelected'),
        hasItems: function() {
            return this.get('filtered').length > 0;
        }.property('filteredCount'), 
        init: function() {
            this._super();

            this.pushObject(
                App.Resource.create({
                    text: 'StackOverflow with <em>ember.js</em> tag',
                    url: 'http://stackoverflow.com/questions/tagged/ember.js?sort=votes',
                    description: 'Takes you to a list of general questions/answers about Ember.js',
                    category: 'Ember'
                })
            );
            this.pushObject(
                App.Resource.create({
                    text: 'StackOverflow with <em>ember-data</em> tag',
                    url: 'http://stackoverflow.com/questions/tagged/ember-data?sort=votes',
                    description: 'Takes you to a list of questions/answers about Ember Data',
                    category: 'Ember Data'
                })
            );
            this.pushObject(
                App.Resource.create({
                    text: 'Getting Started With EmberJS',
                    url: 'http://andymatthews.net/read/2012/03/07/Getting-Started-With-EmberJS',
                    description: 'Introductory article about Ember.js by Andy Matthews',
                    category: 'Ember'
                })
            );
            this.pushObject(
                App.Resource.create({
                    text: 'Flame on! A beginner\'s guide to Ember.js',
                    url: 'http://www.adobe.com/devnet/html5/articles/flame-on-a-beginners-guide-to-emberjs.html',
                    description: 'Introductory article about Ember.js by Andy Matthews touching several beginner subjects',
                    category: 'Ember'
                })
            );
            this.pushObject(
                App.Resource.create({
                    text: 'Video: Tom Dale speaking on PragueJS',
                    url: 'http://www.youtube.com/watch?v=djhAsWGOImk',
                    description: 'Video: Tom Dale speaking on PragueJS',
                    category: 'Ember Data'
                })
            );
            this.pushObject(
                App.Resource.create({
                    text: 'JavaScript Templating with Handlebars',
                    url: 'http://javascriptplayground.com/blog/2012/05/javascript-templating-handlebars-tutorial',
                    description: 'JavaScript Templating with Handlebars',
                    category: 'Handlebars'
                })    
            );
            this.pushObject(
                App.Resource.create({
                    text: 'Ember/Handlebars template precompilation with Play',
                    url: 'http://eng.netwallet.com/2012/04/25/emberhandlebars-template-precompilation-with-play/',
                    description: 'Ember/Handlebars template precompilation with Play',
                    category: 'Handlebars'
                })    
            );
            this.pushObject(
                App.Resource.create({
                    text: 'Game On: Backbone and Ember',
                    url: 'http://net.tutsplus.com/tutorials/javascript-ajax/game-on-backbone-and-ember/',
                    description: 'Game On: Backbone and Ember',
                    category: 'Other'
                })    
            );
this.pushObject(
                App.Resource.create({
                    text: 'List of running Ember-Bootstrap controls and code',
                    url: 'http://jzajpt.github.com/ember-bootstrap/',
                    description: 'List of running Ember-Bootstrap controls and code',
                    category: 'Bootstrap'
                })    
            );

        }
    });    
    
    App.ContactController = BaseArrayController.extend({
    
    });

    App.ApplicationView = BaseView.extend({ 
        templateName: 'app-view' 
    });

    App.TutorialsController = BaseArrayController.extend({
        
    });

    App.TutorialsView = FadeInView.extend({
        templateName: 'tutorials-view'
    });

    App.NavigationView = BaseView.extend({
        templateName: 'top-nav-bar',
        selectedBinding: 'controller.selected',
        NavigationItemView: BaseView.extend({
            tagName: 'li',
            classNameBindings: 'isActive:active'.w(),
            isActive: function() {
                return this.get('menu') === this.get('parentView.selected');
            }.property('item', 'parentView.selected').cacheable(),
        })
    });
    
    App.HomeView = FadeInView.extend({
        templateName: 'home-view',
        watchVideo: function(e) {
            Bootstrap.ModalPane.popup({
                heading: "YouTube Video",
                message: '<div>Will the real Mitt Romney please stand up?</div><div><iframe width="530" height="315" src="http://www.youtube.com/embed/bxch-yi14BE" frameborder="0" allowfullscreen></iframe></div></div>',
                primary: "OK",
                secondary: "Cancel",
                showBackdrop: true,
                callback: function (opts, event) {
                }
            });        
        }
    });
    
    App.ResourcesView = FadeInView.extend({
        templateName: 'resources-view'
    });

    App.ContactView = FadeInView.extend({
        templateName: 'contact-view'                
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
                router.set('navigationController.selected', context.context.get('routeName'));
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
                    }
                }),
                tutorials: Ember.Route.extend({
                    route: '/tutorials',
                    connectOutlets: function (router, context) {
                        router.get('applicationController').connectOutlet('tutorials');
                    }
                }),
                contact: Ember.Route.extend({
                    route: '/contact',
                    connectOutlets: function (router, context) {
                        router.get('applicationController').connectOutlet('contact');
                    }
                })
            })          
        })
    });
    
    App.initialize();
    
});
​