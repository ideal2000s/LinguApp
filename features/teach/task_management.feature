@javascript
Feature: Task Management

  Background:
    Given I am team member
    And the following languages:
      | system_name | name      | code |
      | norwegian   | Norwegian | nb   |
      | english     | English   | en   |
    And I have a "Ruby for Dummies" lesson
    And the following tasks:
      | name                        | type                |
      | Select the adjective        | Tasks::MarkWord     |
      | Type the adjective          | Tasks::FillInBlanks |
      | Write essay with adjectives | Tasks::Essay        |

  Scenario: Team member can browse lesson tasks
    When I go to current teach lesson page
    Then I can see task title "Select the adjective"
    And I can see task title "Type the adjective"
    And I can see task title "Write essay with adjectives"

  Scenario: Team member can delete a task
    When I go to current teach lesson page
    And I click on delete button for the "Select the adjective" task
    Then I should not see task name "Select the adjective"
    And I should see success notice "was deleted"

  Scenario: Team member can move tasks inside appropriate section
    When I go to current teach lesson page
    And I click on down link for the "Select the adjective" task
    Then I should see the "Select the adjective" task under the "Type the adjective" task

  Scenario: Team member can't move the first task inside appropriate section to other section
    When I go to current teach lesson page
    Then I can't click on down link for the "Write essay with adjectives" task
