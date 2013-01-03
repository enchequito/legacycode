User = Ember.Object.extend({
  firstName: null,
  lastName: null,
  fullName: function(key, value) {
    // getter
    if (arguments.length === 1) {
      var firstName = this.get('firstName');
      var lastName = this.get('lastName');
      return firstName + ' ' + lastName;
    // setter
    } else {
      var name = value.split(" ");
      this.set('firstName', name[0]);
      this.set('lastName', name[1]);
      return value;
    }
  }.property('firstName', 'lastName')
});
