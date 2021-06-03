package demo2.dal;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class Configuration {
	private int PasswordLength;
	private String compilation;
	private int historyTime;
	private boolean isDicAvoid;
	private String path;
	private int numbeOfFailed;

	public Configuration() {
		super();

		File file = new File(
				"C:\\CyberSecurityNetwork\\Backend\\cybercomputernetwork\\src\\main\\java\\Configuration.txt");

		BufferedReader br;
		try {
			br = new BufferedReader(new FileReader(file));

			this.setPasswordLength(Integer.valueOf(br.readLine()));
			this.setCompilation(br.readLine());
			int fixAccordingMap =Integer.valueOf(br.readLine())-1;
			this.setHistoryTime(fixAccordingMap);
			this.setDicAvoid(Boolean.valueOf(br.readLine()));
			if (this.isDicAvoid()) {
				this.setPath(br.readLine());
			} else {
				br.readLine();
			}
			this.setNumbeOfFailed(Integer.valueOf(br.readLine()));

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public int getPasswordLength() {
		return PasswordLength;
	}

	public void setPasswordLength(int passwordLength) {
		PasswordLength = passwordLength;
	}

	public String getCompilation() {
		return compilation;
	}

	public void setCompilation(String compilation) {
		this.compilation = compilation;
	}

	public int getHistoryTime() {
		return historyTime;
	}

	public void setHistoryTime(int historyTime) {
		this.historyTime = historyTime;
	}

	public boolean isDicAvoid() {
		return isDicAvoid;
	}

	public void setDicAvoid(boolean isDicAvoid) {
		this.isDicAvoid = isDicAvoid;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public int getNumbeOfFailed() {
		return numbeOfFailed;
	}

	public void setNumbeOfFailed(int numbeOfFailed) {
		this.numbeOfFailed = numbeOfFailed;
	}

}
