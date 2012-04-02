package com.adaptionsoft.games.uglytrivia;

import java.util.LinkedList;

public class Questions {

	public LinkedList popQuestions = new LinkedList ();
	public LinkedList scienceQuestions = new LinkedList ();
	public LinkedList sportsQuestions = new LinkedList ();
	public LinkedList rockQuestions = new LinkedList ();

	public Questions(){
		for (int i = 0; i < 50; i++) {
			popQuestions.addLast(createQuestion(i,"Text.0") + i); //$NON-NLS-1$
			scienceQuestions.addLast(createQuestion(i,"Text.1") + i); //$NON-NLS-1$
			sportsQuestions.addLast(createQuestion(i,"Text.2") + i); //$NON-NLS-1$
			rockQuestions.addLast(createQuestion(i,"Text.3")); //$NON-NLS-1$
		}
	}
	
	private String createQuestion(int index, String message){
		return Messages.getString(message) + index; 
	}
	
	public LinkedList getPopQuestions() {
		return popQuestions;
	}	

	public String askQuestion(String currentCategory) {
		if (currentCategory == Messages.getString("Text.14")) //$NON-NLS-1$
			return popQuestions.removeFirst().toString();
		else if (currentCategory == Messages.getString("Text.15")) //$NON-NLS-1$
				return scienceQuestions.removeFirst().toString();
		else if (currentCategory == Messages.getString("Text.16")) //$NON-NLS-1$
			return sportsQuestions.removeFirst().toString();
		else if (currentCategory == Messages.getString("Text.17")) //$NON-NLS-1$
			return rockQuestions.removeFirst().toString();
		else 
			return "";
	}

	public void setPopQuestions(LinkedList popQuestions) {
		this.popQuestions = popQuestions;
	}

	public LinkedList getScienceQuestions() {
		return scienceQuestions;
	}

	public void setScienceQuestions(LinkedList scienceQuestions) {
		this.scienceQuestions = scienceQuestions;
	}

	public LinkedList getSportsQuestions() {
		return sportsQuestions;
	}

	public void setSportsQuestions(LinkedList sportsQuestions) {
		this.sportsQuestions = sportsQuestions;
	}

	public LinkedList getRockQuestions() {
		return rockQuestions;
	}

	public void setRockQuestions(LinkedList rockQuestions) {
		this.rockQuestions = rockQuestions;
	}
}