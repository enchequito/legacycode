package com.adaptionsoft.games.uglytrivia;

import java.util.ArrayList;
import java.util.List;	

public class Players {
	private int number_of_players = 10;
	private int number_of_purses = 6;
	private ArrayList players = new ArrayList() ;
	private int[] places = new int[number_of_players];
	private int[] purses = new int[number_of_purses];
	private boolean[] inPenaltyBox = new boolean[number_of_players];
	private int[] highscores = new int[number_of_players];
	
	public Players() {
	}

	public boolean addPlayer(String playerName) {		
		
	    getPlayers().add(playerName);
	    getPlaces()[howManyPlayers()] = 0;
	    getPurses()[howManyPlayers()] = 0;
	    getInPenaltyBox()[howManyPlayers()] = false;
	    
	    System.out.println(playerName + Messages.getString("Text.4")); //$NON-NLS-1$
	    System.out.println(Messages.getString("Text.5") + getPlayers().size()); //$NON-NLS-1$
		return true;
	}
	
	public boolean remove(String playerName) {		
//		  getPlayers().remove(howManyPlayers());
		  getPlayers().remove(getPlayers().indexOf(playerName));
		  return true;
	}
	
	public int howManyPlayers() {
		return getPlayers().size();
	}
	
	/**
	 * Tells if the last player won.
	 */
	public boolean didPlayerWin(int currentPlayer) {
		return !(getPurses()[currentPlayer] == getNumber_of_purses());
	}
	
	public int getNumber_of_players() {
		return number_of_players;
	}

	public void setNumber_of_players(int number_of_players) {
		this.number_of_players = number_of_players;
	}

	public ArrayList getPlayers() {
		return players;
	}

	public void setPlayers(ArrayList players) {
		this.players = players;
	}

	public int[] getPlaces() {
		return places;
	}

	public void setPlaces(int[] places) {
		this.places = places;
	}

	public int[] getPurses() {
		return purses;
	}

	public void setPurses(int[] purses) {
		this.purses = purses;
	}

	public boolean[] getInPenaltyBox() {
		return inPenaltyBox;
	}

	public void setInPenaltyBox(boolean[] inPenaltyBox) {
		this.inPenaltyBox = inPenaltyBox;
	}

	public int[] getHighscores() {
		return highscores;
	}

	public void setHighscores(int[] highscores) {
		this.highscores = highscores;
	}
	public int getNumber_of_purses() {
		return number_of_purses;
	}

	public void setNumber_of_purses(int number_of_purses) {
		this.number_of_purses = number_of_purses;
	}
}