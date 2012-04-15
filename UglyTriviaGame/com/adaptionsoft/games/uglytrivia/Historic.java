package com.adaptionsoft.games.uglytrivia;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class Historic implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private HashMap historicInfo = new HashMap();
	
	public Historic (){
	}
	
	public void addPlayerScore (String player, int playerScore){
		if (historicInfo.containsKey(player)){
			historicInfo.put(player, (Integer) historicInfo.get(player) + playerScore);
		} else historicInfo.put(player, playerScore);
	}

	public HashMap getPlayersScores() {
		return historicInfo;
	}

	public void addPlayersScores(HashMap playersScores) {		
		Iterator it = playersScores.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry e = (Map.Entry)it.next();
			addPlayerScore((String)e.getKey() ,(Integer)e.getValue());
		}
	}

	public void printResults() {

		if (historicInfo.size()==0) {
			System.out.println("No hay datos");
		} else {
			System.out.println("Resultados-------------------------");   
	        Iterator it = historicInfo.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry e = (Map.Entry)it.next();
				System.out.println("Jugador " + e.getKey() + " " + "con resultado " + (Integer)e.getValue());
			}
		}
		
	}	
}
