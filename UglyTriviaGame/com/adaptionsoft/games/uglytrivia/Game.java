package com.adaptionsoft.games.uglytrivia;

public class Game {
	
	//Esto debería llegar por factoria
    Questions questions = new Questions();
    Players players;

	int currentPlayer = 0;
    boolean isGettingOutOfPenaltyBox;
    
    public  Game(){    		
    }
    
	/**
	 * Return true if the game is playable.
	 * 
	 * @return true if the game is playable.
	 */
	public boolean isPlayable() {
		return (players.howManyPlayers() >= 2);
	}

	public void roll(int roll) {
		System.out.println(players.getPlayers().get(currentPlayer) + Messages.getString("Text.6")); //$NON-NLS-1$
		System.out.println(Messages.getString("Text.7") + roll); //$NON-NLS-1$
		
		if (players.getInPenaltyBox()[currentPlayer]) {
			if (roll % 2 != 0) {
				isGettingOutOfPenaltyBox = true;
				
				System.out.println(players.getPlayers().get(currentPlayer) + Messages.getString("Text.8")); //$NON-NLS-1$
				players.getPlaces()[currentPlayer] = players.getPlaces()[currentPlayer] + roll;
				if (players.getPlaces()[currentPlayer] > 11) players.getPlaces()[currentPlayer] = players.getPlaces()[currentPlayer] - 12;
				
				System.out.println(players.getPlayers().get(currentPlayer) 
						+ Messages.getString("Text.9")  //$NON-NLS-1$
						+ players.getPlaces()[currentPlayer]);
				System.out.println(Messages.getString("Text.10") + currentCategory()); //$NON-NLS-1$
				System.out.println(questions.askQuestion(currentCategory()));
			} else {
				System.out.println(players.getPlayers().get(currentPlayer) + Messages.getString("Text.11")); //$NON-NLS-1$
				isGettingOutOfPenaltyBox = false;
				}
			
		} else {
		
			players.getPlaces()[currentPlayer] = players.getPlaces()[currentPlayer] + roll;
			if (players.getPlaces()[currentPlayer] > 11) players.getPlaces()[currentPlayer] = players.getPlaces()[currentPlayer] - 12;
			
			System.out.println(players.getPlayers().get(currentPlayer) 
					+ Messages.getString("Text.9")  //$NON-NLS-1$
					+ players.getPlaces()[currentPlayer]);
			System.out.println(Messages.getString("Text.10") + currentCategory()); //$NON-NLS-1$
			System.out.println(questions.askQuestion(currentCategory()));
		}
		
	}
	
  public static void main(String[] args) {
    System.out.println(Messages.getString("Text.18")); // Display the string. //$NON-NLS-1$
  }

	// randomly return a category
	private String currentCategory() {
		if (players.getPlaces()[currentPlayer] == 0) return Messages.getString("Text.14"); //$NON-NLS-1$
		if (players.getPlaces()[currentPlayer] == 4) return Messages.getString("Text.14"); //$NON-NLS-1$
		if (players.getPlaces()[currentPlayer] == 8) return Messages.getString("Text.14"); //$NON-NLS-1$
		if (players.getPlaces()[currentPlayer] == 1) return Messages.getString("Text.15"); //$NON-NLS-1$
		if (players.getPlaces()[currentPlayer] == 5) return Messages.getString("Text.15"); //$NON-NLS-1$
		if (players.getPlaces()[currentPlayer] == 9) return Messages.getString("Text.15"); //$NON-NLS-1$
		if (players.getPlaces()[currentPlayer] == 2) return Messages.getString("Text.16"); //$NON-NLS-1$
		if (players.getPlaces()[currentPlayer] == 6) return Messages.getString("Text.16"); //$NON-NLS-1$
		if (players.getPlaces()[currentPlayer] == 10) return Messages.getString("Text.16"); //$NON-NLS-1$
		return Messages.getString("Text.17"); //$NON-NLS-1$
	}

	public boolean wasCorrectlyAnswered() {
		if (players.getInPenaltyBox()[currentPlayer]){
			if (isGettingOutOfPenaltyBox) {
				System.out.println(Messages.getString("Text.29")); //$NON-NLS-1$
				players.getPurses()[currentPlayer]++;
				System.out.println(players.getPlayers().get(currentPlayer) 
						+ Messages.getString("Text.30") //$NON-NLS-1$
						+ players.getPurses()[currentPlayer]
						+ Messages.getString("Text.31")); //$NON-NLS-1$
				
				boolean winner = players.didPlayerWin(currentPlayer);
				currentPlayer++;
				if (currentPlayer == players.getPlayers().size()) currentPlayer = 0;
				
				return winner;
			} else {
				currentPlayer++;
				if (currentPlayer == players.getPlayers().size()) currentPlayer = 0;
				return true;
			}
			
		} else {
		
			System.out.println(Messages.getString("Text.29")); //$NON-NLS-1$
			players.getPurses()[currentPlayer]++;
			System.out.println(players.getPlayers().get(currentPlayer) 
					+ Messages.getString("Text.30") //$NON-NLS-1$
					+ players.getPurses()[currentPlayer]
					+ Messages.getString("Text.31")); //$NON-NLS-1$
			
			boolean winner = players.didPlayerWin(currentPlayer);
			currentPlayer++;
			if (currentPlayer == players.getPlayers().size()) currentPlayer = 0;
			
			return winner;
		}
	}
	
	public boolean wrongAnswer(){
		System.out.println(Messages.getString("Text.35")); //$NON-NLS-1$
		System.out.println(players.getPlayers().get(currentPlayer)+ Messages.getString("Text.36")); //$NON-NLS-1$
		players.getInPenaltyBox()[currentPlayer] = true;
		
		currentPlayer++;
		if (currentPlayer == players.getPlayers().size()) currentPlayer = 0;
		return true;
	}

	public static class SimpleSingleton {
    private static SimpleSingleton singleInstance =  new SimpleSingleton();
 
    //Marking default constructor private
    //to avoid direct instantiation.
    private SimpleSingleton() {
    }
 
    //Get instance for class SimpleSingleton
    public static SimpleSingleton getInstance() {
 
        return singleInstance;
  }
}
    
	public Players getPlayers() {
		return players;
	}

	public void setPlayers(Players players) {
		this.players = players;
	}

	
}
