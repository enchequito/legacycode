package com.adaptionsoft.games.trivia.runner;

import static org.junit.Assert.*;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.PrintStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import com.adaptionsoft.games.uglytrivia.Game;
import com.adaptionsoft.games.uglytrivia.Historic;
import com.adaptionsoft.games.uglytrivia.Players;

import static org.mockito.Mockito.*;

public class GameRunnerTest {

	private ByteArrayOutputStream outContent; 
	private Game game;
	private Random randomMock;
	private static Players players;
	private static Historic historic;
	
	@BeforeClass
	public static void SetUpClass(){        
		try{
//			historic = new Historic();
//	    	ObjectOutputStream salida=new ObjectOutputStream(new FileOutputStream("historic.obj"));
//          salida.writeObject(historic);
//          salida.close();
			ObjectInputStream entrada=new ObjectInputStream(new FileInputStream("historic.obj"));
	        historic=(Historic)entrada.readObject();
	        historic.printResults();
		}catch (FileNotFoundException ex){
	    	System.out.println("No existe historico de puntuaciones, se crea");
	    	try{
	    		historic = new Historic();
		    	ObjectOutputStream salida=new ObjectOutputStream(new FileOutputStream("historic.obj"));
	            salida.writeObject(historic);
	            salida.close();
	    	}catch (IOException exc) {
		        System.out.println(exc);	    
		    }
		}catch (IOException ex) {
	        System.out.println(ex);
	    }catch (ClassNotFoundException ex) {
	        System.out.println(ex);	    
	    }
	}
	
	@Before
	public void SetUp(){
		randomMock = mock(Random.class);
		GameRunner.setTotalRoundsToPlay(GameRunner.NOLIMIT);	
		players = new Players();
		outContent = new ByteArrayOutputStream();
		System.setOut(new PrintStream(outContent));
	}
	
	@AfterClass
	public static void afterExecution(){
		historic.printResults();
		try{
	    	ObjectOutputStream salida=new ObjectOutputStream(new FileOutputStream("historic.obj"));
            salida.writeObject(historic);
            salida.close();
    	}catch (IOException exc) {
	        System.out.println(exc);	    
	    }
	}
		
	@Test
	public void one_play_for_player_one_and_all_answers_ok_has_6_gold_coins() {				
		when(randomMock.nextInt(5)).thenReturn(0);
		when(randomMock.nextInt(9)).thenReturn(2);
		
		game = new Game();
		game.setPlayers(setUpPlayersToPlay(1));
		GameRunner.setTotalRoundsToPlay(6);
		GameRunner.play(game, randomMock);

		assertEquals(true,outContent.toString().contains("Player1 now has 6 Gold Coins."));
	}	
	
	@Test
	public void one_play_for_player_one_but_answer_is_ko_so_penalty_box() {		
		Game gameSpy = spy(new Game());
		when(randomMock.nextInt(5)).thenReturn(0);
		when(randomMock.nextInt(9)).thenReturn(7).thenReturn(1);
		
		gameSpy.setPlayers(setUpPlayersToPlay(1));
		GameRunner.setTotalRoundsToPlay(1);		
		GameRunner.play(gameSpy, randomMock);
		
		assertEquals(true,outContent.toString().contains("Player1 was sent to the penalty box"));
		verify(gameSpy,times(1)).wrongAnswer();		
	}
	
	@Test
	public void game_with_3_players_all_answers_ok_and_player_one_has_6_gold_coins() {
		Game gameSpy = spy(new Game());
		Random randomSpy = spy (new Random());
		when(randomSpy.nextInt(9)).thenReturn(1);
			
		gameSpy.setPlayers(setUpPlayersToPlay(3));		
		GameRunner.play(gameSpy, randomSpy);
		
		assertEquals(true,outContent.toString().contains("Player1 now has 6 Gold Coins."));		
		verify(gameSpy,times(16)).wasCorrectlyAnswered();
	}
	
	@Test
	public void game_with_3_players_some_answers_ok_and_player_two_has_6_gold_coins() {
		Game gameSpy = spy(new Game());
		gameSpy.resetPlayers();
		Random randomSpy = spy (new Random());
		when(randomSpy.nextInt(9)).thenReturn(7).thenReturn(1);
		
		gameSpy.setPlayers(setUpPlayersToPlay(3));
		GameRunner.play(gameSpy, randomSpy);
		
		assertEquals(true,outContent.toString().contains("Player2 now has 6 Gold Coins."));		
		verify(gameSpy,times(16)).wasCorrectlyAnswered();
		verify(gameSpy,times(1)).wrongAnswer();	
	}
	
	@Test
	public void game_with_3_players_some_answers_ok_and_player_three_has_6_gold_coins() {
		Game gameSpy = spy(new Game());
		gameSpy.resetPlayers();
		Random randomSpy = spy (new Random());
		when(randomSpy.nextInt(9)).thenReturn(7).thenReturn(7).thenReturn(1);
		
		gameSpy.setPlayers(setUpPlayersToPlay(3));
		GameRunner.play(gameSpy, randomSpy);				
		
		assertEquals(true,outContent.toString().contains("Player3 now has 6 Gold Coins."));		
		verify(gameSpy,times(16)).wasCorrectlyAnswered();
		verify(gameSpy,times(2)).wrongAnswer();
	}	
				
	private Players setUpPlayersToPlay(int numberOfPlayers){
		for (int player=1;player<=numberOfPlayers;player++){
			players.addPlayer("Player".concat(String.valueOf(player)));
		}
		return players;
	}
	
	@Test
	public void validate_scores_one_play_for_player_one_and_all_answers_ok_has_6_gold_coins() {				
		when(randomMock.nextInt(5)).thenReturn(0);
		when(randomMock.nextInt(9)).thenReturn(2);
		
		game = new Game();
		game.setPlayers(setUpPlayersToPlay(1));
		GameRunner.setTotalRoundsToPlay(6);
		GameRunner.play(game, randomMock);

		historic.addPlayersScores(game.getPlayersScores());
		
		assertEquals(6,game.getPlayersScores().get("Player1"));
	}

	@Test
	public void validate_scores_game_with_3_players_some_answers_ok_and_player_three_has_6_gold_coins() {
		Game gameSpy = spy(new Game());
		gameSpy.resetPlayers();
		Random randomSpy = spy (new Random());
		when(randomSpy.nextInt(9)).thenReturn(7).thenReturn(7).thenReturn(1);
		
		gameSpy.setPlayers(setUpPlayersToPlay(3));
		GameRunner.play(gameSpy, randomSpy);				

		historic.addPlayersScores(gameSpy.getPlayersScores());
		assertNotNull(gameSpy.getPlayersScores());
	}

}
