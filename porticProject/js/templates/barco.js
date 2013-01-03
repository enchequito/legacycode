{{#view App.BarcoView}}
<div id="barco-form" title="Llista Vaixells">
	<form id="frmBarco" method="get" {{action "doBuscarBarco" target="App.BarcoController" on="submit"}}>
		<fieldset>			
				<label for="nomBuscar">{{t forwarding.barco.nomBuscar}}:</label>
				<input type="text" id="nomBarco" name="nomBarco" class="text ui-widget-content ui-corner-all"/>
                <button>Buscar</button>
		
		</fieldset>
	</form>
    {{#view App.ListaBarcosView}}
		<p>
		<table id="gridListaBarcos"></table>
		</p>
    {{/view}}
</div>
{{/view}}