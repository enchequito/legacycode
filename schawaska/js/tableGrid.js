
App.Person = Ember.Object.extend();

App.GridController = Ember.ArrayController.extend({
   
});

App.personListController = Ember.ArrayProxy.create({
    content: [
        App.Person.create({firstName:'Oliver', lastName:'Smith'}),
        App.Person.create({firstName:'Thomas', lastName:'Smith'}),
        App.Person.create({firstName:'Harry', lastName:'McIntosh'}),
        App.Person.create({firstName:'Joshua', lastName:'Doe'}),
        App.Person.create({firstName:'Alfie', lastName:'Smith'}),
        App.Person.create({firstName:'Charlie', lastName:'Smith'}),
        App.Person.create({firstName:'Daniel', lastName:'Smith'}),
        App.Person.create({firstName:'James', lastName:'Smith'}),
        App.Person.create({firstName:'William', lastName:'Doe'})
    ]
});


App.testTable = Flame.ArrayTableController.create({
    contentBinding: 'App.personListController.content',
    columns: [
        {label: 'First name', property: 'firstName'},
        {label: 'Last name', property: 'lastName'}
    ],
    headerProperty: 'firstName'
});

App.GridView = Flame.RootView.extend({
    templateName: 'grid-view',
    childViews: ['tableView'],

    tableView: Flame.TableView.extend({
        contentBinding: 'App.testTable'
    })
});



/*


App.RootView = Flame.RootView.extend({
    childViews: ['tableView'],

    tableView: Flame.TableView.extend({
        contentBinding: 'App.testTable'
    })
});
*/