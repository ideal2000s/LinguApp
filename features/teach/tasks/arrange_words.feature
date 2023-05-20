@javascript
Feature: new arrange words task
  In order to create a new task
  I need to submit form with valid data

  Background: initial data
    Given I am team member
    And the following languages:
      | system_name | name      | code |
      | norwegian   | Norwegian | nb   |
      | english     | English   | en   |
    And I have a "Ruby for Dummies" lesson
    And the following task:
      | name            | type                | subject |
      | My awesome task | Tasks::ArrangeWords | engage  |

  Scenario: Create arrange words task
    Given I am on the teach lesson page
    When I submit new task form for engage section with the following data:
      | Name     | Type          |
      | New Task | Arrange Words |
    Then I should be on edit teach task page

  Scenario: editing task configuration
    Given I go to current teach lesson edit task page
    When I submit arrange words form with "I love this city" and ""
    And I submit arrange words form with "A quick brown fox" and ""
    Then I should see "I love this city" in the task items list
    And I should see "A quick brown fox" in the task items list
