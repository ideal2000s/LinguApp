@javascript
  Feature: Search school
    Background:
      Given I am school member
      And the following languages:
        | system_name | name      | code | support |
        | norwegian   | Norwegian | nb   | true    |
        | english     | English   | en   | true    |
      And the following students:
        | fname | lname | email               |
        | joao  | fill  | joanfill@gmail.com  |
      And the following team users:
        | fname | lname | email               |
        | john  | fiao  | johnfiao@gmail.com  |

      Scenario: User searches school with search term
        When I go to school dashboard page
        And I click search bar and input search term with "jo"
        Then I should be on school search page
        And I should see "joanfill@gmail.com" on students tab and "johnfiao@gmail.com" on teachers tab