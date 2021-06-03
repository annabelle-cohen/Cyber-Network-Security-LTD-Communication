package demo2.dal;

import javax.persistence.Embeddable;

@Embeddable
public class UserName {


		private String firstName;
		private String lastName;

		public UserName() {

		}

		public UserName(String firstName, String lastName) {
			super();
			this.firstName = firstName;
			this.lastName = lastName;
		}

		public String getFirstName() {
			return firstName;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

	}

