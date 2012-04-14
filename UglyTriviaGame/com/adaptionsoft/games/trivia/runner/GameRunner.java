
package com.adaptionsoft.games.trivia.runner;
import java.util.Random;

import com.adaptionsoft.games.uglytrivia.Game;

public class GameRunner {

	private static boolean notAWinner;
	protected static int NOLIMIT = -1;
	private static int totalRoundsToPlay = NOLIMIT;

	protected static void play(Game game, Random rand) {
		int currentRound = 0;
		do {	
			game.roll(dice(rand));
			
			if (isACorrectAnswerExpected(rand)) {
				notAWinner = game.wasCorrectlyAnswered();
			} else {
				notAWinner = game.wrongAnswer();			
			}
		
			currentRound++;
			
		} while (gameIsNotFinished(currentRound));
	}

	private static boolean gameIsNotFinished(int currentRound) {		
		return (notAWinner && (totalRoundsToPlay == NOLIMIT || currentRound < totalRoundsToPlay));
	}

	protected static void setTotalRoundsToPlay(int rounds){
		totalRoundsToPlay = rounds;
	}
	
	private static boolean isACorrectAnswerExpected(Random rand) {
		return rand.nextInt(9) != 7;
	}

	private static int dice(Random rand) {
		return rand.nextInt(5) + 1;
	}
	
}
