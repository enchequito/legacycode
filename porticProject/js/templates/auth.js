{{#view App.AuthView}}
<div id="authentication">
	<h1>{{t logIn.title}}</h1>
	<form id="frmAuth" method="get" {{action "doAuthenticate" target="App.AuthController" on="submit"}}>
		<fieldset>
			<p>
				<label for="txtUID">{{t logIn.uid}}:</label>
				<input type="text" id="txtUID" name="usuari" class="text ui-widget-content ui-corner-all"/>
			</p>
			<p>
				<label for="txtPWD">{{t logIn.pwd}}:</label>
				<input type="password" id="txtPWD" name="claupub" class="text ui-widget-content ui-corner-all"/>
			</p>
			<p>
	    		<button>{{t logIn.accept}}</button>
				<button {{action "doClean" target="App.AuthController"}}>{{t logIn.clean}}</button>
			</p>
		</fieldset>
	</form>
</div>
<div id="errorDialog">
	<div id="errorDgTitle">
		<p>{{t error.title}}<a href="#" {{action "close" target="App.ErrorController"}}>{{t error.close}}</a></p>
	</div>
	<p>	
	<label class="error">{{t error.code}}:</label>
	<label id="errorCode"/>
	</p>
	<p>
	<label class="error">{{t error.desc}}:</label>
	<label id="errorDesc"/>
	</p>
</div>
{{/view}}
