App.ResourcesView = Ember.View.extend({
    templateName: 'resources-view',
    selectedBinding: 'controller.selected',
    ResNavigationItemView: Ember.View.extend({
        tagName: 'li',
        classNameBindings: 'isActive:active'.w(),
        isActive: function() {
            return this.get('menu') === this.get('parentView.selected');
        }.property('item2', 'parentView.selected').cacheable(),
    }) 
});