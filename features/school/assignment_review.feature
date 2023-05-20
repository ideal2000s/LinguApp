@javascript
  Feature: Assignment review
    Background:
      Given I am school member
      And the following languages:
        | system_name | name      | code |
        | norwegian   | Norwegian | nb   |
        | english     | English   | en   |
      And I have a "Lesson One" lesson
      And the following tasks:
        | name                | type                |
        | Essay task          | Tasks::Essay        |
      And the following task items:
        | type                |
        | TaskItems::Essay    |
      And the following students:
        | fname | lname | email               |
        | joao  | fill  | joanfill@gmail.com  |
      And the following documents:
        | content                | status           |
        | Test document          | pending          |

    Scenario: School user can see the document
      When I go to school assignments page
      And I click the document from student
      Then I should see "Test document" on the current page

    Scenario: School user can respond to document with text
      When I go to school assignments page
      And I click the document from student
      And I click the document response textarea and submit with following comment
        | comment     |
        | Good start  |
      Then I should see "Good start" on the current page