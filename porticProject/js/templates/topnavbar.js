<div id="barranav">        
    <!--
    {{#each item in controller}}
        {{#view view.NavigationItemView menuBinding="item.routeName"}}
            <input type="radio" name="radio" {{action navigateTo item}} />            
        {{/view}} 
        {{view view.NavigationItemLabelView}}{{item.displayText}}
    {{/each}}
    -->
    <div id="radio">
        <input type="radio" id="radio1" name="radio" checked="checked" {{action llistaExp}}/><label for="radio1">{{t forwarding.menu.listaExp}}</label>
        <input type="radio" id="radio2" name="radio" {{action nouExpImp}}/><label for="radio2">{{t forwarding.menu.nouExpImp}}</label>
        <input type="radio" id="radio3" name="radio" /><label for="radio3">{{t forwarding.menu.nouExpExp}}</label>
        <input type="radio" id="radio4" name="radio" /><label for="radio4">{{t forwarding.menu.gestCargExp}}</label>
        <input type="radio" id="radio5" name="radio" {{action preferencies}}/><label for="radio5">{{t forwarding.menu.preferencies}}</label>
    </div>
    <!--
    <button {{action navigateTo2 barcoAction}}>Create user</button>
    {{#view App.ButtonsView}}
        <button {{action "doModal" target="App.ButtonsController"}}>Create new user</button>
    {{/view}}    
    -->  
</div>   
