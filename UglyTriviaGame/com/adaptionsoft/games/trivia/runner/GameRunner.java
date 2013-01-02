package com.adaptionsoft.games.trivia.runner;
import java.util.Random;

import com.adaptionsoft.games.uglytrivia.Game;
import com.adaptionsoft.games.uglytrivia.Players;


public class GameRunner {

	private static boolean notAWinner;

	public static void main(String[] args) {
		Game aGame = new Game();
		
		Players players = new Players();
		players.addPlayer("Chet");
		players.addPlayer("Pat");
		players.addPlayer("Sue");
		aGame.setPlayers(players);

		Random rand = new Random();

		play(aGame, rand);

	}

	protected static void play(Game aGame, Random rand) {
		do {	
			aGame.roll(rand.nextInt(5) + 1);

			if (rand.nextInt(9) == 7) {
				notAWinner = aGame.wrongAnswer();
			} else {
				notAWinner = aGame.wasCorrectlyAnswered();
			}

		} while (notAWinner);
	}

}