{{#view App.FiltrosBusquedaView}}
<div id="filtroBusqueda">
	<p>
	<select id="selFiltro1">
		<option value="--" length="12">----</option>
	</select>
	<select id="selFiltro2" length="12">
		<option value="--">----</option>
	</select>
	<label for="circuito">
		{{t forwarding.filtros.circuito}}:
		<select id="selCircuito">
			<option value="--" length="12">{{ t forwarding.filtros.circuito.todos}}</option>
			<option value="--" length="12">{{ t forwarding.filtros.circuito.import}}</option>
			<option value="--" length="12">{{ t forwarding.filtros.circuito.export}}</option>
		</select>

	</label>
	<label for="estado">
		{{t forwarding.filtros.estado}}:

		<select id="selEstado">
			<option value="--" length="12">{{t forwarding.filtros.estado.todos}}</option>
			<option value="--" length="12">{{t forwarding.filtros.estado.enPreparacio}}</option>
			<option value="--" length="12">{{t forwarding.filtros.estado.enCurs}}</option>
			<option value="--" length="12">{{t forwarding.filtros.estado.incidencies}}</option>
			<option value="--" length="12">{{t forwarding.filtros.estado.cancelat}}</option>
			<option value="--" length="12">{{t forwarding.filtros.estado.finalitzat}}</option>
		</select>
	</label>
	<select id="selEstado">
		<option value="--" length="12">{{t forwarding.filtros.antig.ultHora}}</option>
		<option value="--" length="12">{{t forwarding.filtros.antig.avui}}</option>
		<option value="--" length="12">{{t forwarding.filtros.antig.ahir}}</option>
		<option value="--" length="12">{{t forwarding.filtros.antig.ultSetm}}</option>
		<option value="--" length="12">{{t forwarding.filtros.antig.ult2Setm}}</option>
		<option value="--" length="12">{{t forwarding.filtros.antig.ult3Set}}</option>
		<option value="--" length="12">{{t forwarding.filtros.antig.ultMes}}</option>
		<option value="--" length="12">{{t forwarding.filtros.antig.ult2Mes}}</option>
		<option value="--" length="12">{{t forwarding.filtros.antig.ult3Mes}}</option>
	</select>
	<img src="goma de borrar"/>
	<button>{{t forwarding.filtros.buscar}}</button>
	<img src="excel"/>
	</p>
</div>	
{{/view}}
{{#view App.gestionExpsView}}
    <div id="menu">
        <input type="radio" id="menu1" name="menu" checked="checked"/><label for="menu1">{{t forwarding.gesExps.veure}}</label>
        <input type="radio" id="menu2" name="menu" /><label for="menu2">{{t forwarding.gesExps.imprimir}}</label>
        <input type="radio" id="menu3" name="menu" /><label for="menu3">{{t forwarding.gesExps.modificar}}</label>
        <input type="radio" id="menu4" name="menu" /><label for="menu4">{{t forwarding.gesExps.eliminar}}</label>
        <input type="radio" id="menu5" name="menu" /><label for="menu5">{{t forwarding.gesExps.finalitzar}}</label>
        <input type="radio" id="menu6" name="menu" /><label for="menu6">{{t forwarding.gesExps.clonar}}</label>
        <input type="radio" id="menu7" name="menu" /><label for="menu7">{{t forwarding.gesExps.documentacio}}</label>
    </div>
{{/view}}
{{#view App.llistaExpsView}}
	<div id="llistaExps">
		<p>
		<table id="gridExp"></table>
		</p>
	</div>
	<div id="llistaExpButtons">
		
	</div>
{{/view}}
{{#view App.llistaTrackTraceView}}
	<div id="llistaTrackTrace">
		<table id="gridTrackTrace"></table>
	</div>
{{/view}}