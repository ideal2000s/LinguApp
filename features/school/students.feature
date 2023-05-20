@javascript
  Feature: Student management
    Background:
      Given I am school member
      And the following languages:
        | system_name | name      | code | support |
        | norwegian   | Norwegian | nb   | true    |
        | english     | English   | en   | true    |
        | danish      | Danish    | da   | true    |
        | french      | French    | fr   | true    |
      And the following students:
        | fname | lname | email               |
        | joao  | fill  | joanfill@gmail.com  |
        | mike  | fill  | mikefill@gmail.com  |
        | john  | doe   | johndoe@gmail.com   |
      And the following plans:
        | system_name | name_translations |
        | Study Plan  | {"en": "Study Plan"}  |

    Scenario: User creates new student
      When I go to school students page
      And I create new student with following and submit:
        | fname   |  lname    |  email             | native_language    | target_language  | level          |
        | john    |  Ahn      | johnahn@gmail.com  | norwegian          | english          | A1 - Beginner  |
      Then I should see "John Ahn" on the current page

    Scenario: User creates the student without first name and see the error
      When I go to school students page
      And I create new student with following and submit:
        | fname   |  lname    |  email             | native_language    | target_language  | level          |
        |         |  Ahn      | johnahn@gmail.com  | norwegian          | english          | A1 - Beginner  |
      Then I should see the error "can't be blank"

    Scenario: User updates the student
      When I go to school students page
      And I update student "Joao Fill" with following and submit:
        | fname   |  lname    |  email                 | native_language    | target_language  |
        | joao    |  fill     | joanfill@hotmail.com   | danish             | french           |
      Then I should see "joanfill@hotmail.com" on the current page
      Then I should see danish as native language
      Then I should see french as active language

    Scenario: User archives the student
      When I go to school students page
      And Click the archive button of the student with email "joanfill@gmail.com"
      Then I should not see "joanfill@gmail.com" on the current page

    Scenario: User assigns license to the student
      When I go to school students page
      And Click no license of the student and plan with "Study Plan"
      Then I should see "Study Plan" on the current page

    Scenario: User revokes license to the student
      When I go to school students page
      And Click no license of the student and plan with "Study Plan"
      And Click the active license of the student
      And Click revoke license button and submit
      Then I should see "No license" on the current page

    Scenario: User imports students from csv file
      When I go to school students page
      And I import students from csv file
      Then I should see "Students are being imported. Please wait for a minute." on the current page

    Scenario: User creates a class
      When I go to school students page
      And I create new class with following and submit:
        | name           | language       | level           |
        | student group  | English        | A1 - Beginner   |
      Then I should see "student group" on the current page

    Scenario: Student filters by target language
      When I go to school students page
      And I check target language code "en" and submit
      Then I should not see "joanfill@gmail.com" on the current page

    Scenario: Student orders by last name default
      When I go to school students page
      Then I should see the "Joao" name under the "John" name
      And Click name sort and submit "By name"
      Then I should see the "Mike" name under the "Joao" name
