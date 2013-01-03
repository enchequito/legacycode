App.ResNavBarItem = Ember.Object.extend({
    displayText: '',
    routePath: '',
    routeName: '',
    url: '#'
});

App.ResourcesController = Ember.ArrayController.extend({
    content: [],
    selected: null,
    init: function() {
        
        this._super();
        this.pushObject(
            App.ResNavBarItem.create({
                displayText: 'opcion1',
                routeName: 'op1',
                routePath: 'root.index.resources.op1'
            })  
        );
        this.pushObject(
            App.ResNavBarItem.create({
                displayText: 'opcion2',
                routeName: 'op2',
                routePath: 'root.index.resources.op2'
            })
        );
        this.pushObject(
            App.ResNavBarItem.create({
                displayText: 'opcion3',
                routeName: 'op3',
                routePath: 'root.index.resources.op3'
            })
        );
        this.pushObject(
            App.ResNavBarItem.create({
                displayText: 'opcion4',
                routeName: 'op4',
                routePath: 'root.index.resources.op4'
            })
        );
    }        
});    
