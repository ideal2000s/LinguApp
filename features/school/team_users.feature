@javascript
  Feature: Team users management
    Background:
      Given I am school member
      And the following languages:
        | system_name | name      | code | support |
        | norwegian   | Norwegian | nb   | true    |
        | english     | English   | en   | true    |
      And the following team users:
        | fname | lname | email               |
        | joao  | fill  | joanfill@gmail.com  |
        | john  | doe   | johndoe@gmail.com   |

    Scenario: User creates new team user
      When I go to school team users page
      And I create new team user with following and submit:
        | fname   |  lname    |  email             |
        | john    |  Ahn      | johnahn@gmail.com  |
      Then I should see "John Ahn" on the current page

    Scenario: User creates the new team user without first name and see the error
      When I go to school team users page
      And I create new team user with following and submit:
        | fname   |  lname    |  email             |
        |         |  Ahn      | johnahn@gmail.com  |
      Then I should see the error "can't be blank"

    Scenario: User imports team users from csv file
      When I go to school team users page
      And I import team users from csv
      Then I should see "Teacher accounts are being created. Please wait for a minute." on the current page

    Scenario: User updates the team user
      When I go to school team users page
      And I update team user "Joao Fill" with following and submit:
        | fname   |  lname    |  email                 |
        | joao    |  fill     | joanfill@hotmail.com   |
      Then I should see "joanfill@hotmail.com" on the current page

    Scenario: Team users filtered by roles
      When I go to school team users page
      And I check "manager" role filter and submit
      Then I should not see "joanfill@gmail.com" on the current page

    Scenario: Team users ordered by last name default
      When I go to school team users page
      Then I should see the "Joao" name under the "John" name
