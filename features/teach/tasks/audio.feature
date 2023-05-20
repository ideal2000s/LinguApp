@javascript
Feature: new audio task
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
      | name            | type         |
      | My awesome task | Tasks::Audio |

  Scenario: Create audio task
    Given I am on the teach lesson page
    And I submit new task form for test section with the following data:
      | Name     | Type  |
      | New Task | Audio |
    Then I should be on edit teach task page

  Scenario: editing task configuration
    Given I go to current teach lesson edit task page
    When I submit minimum duration form with "30"
    Then I should see "30" in the input field task_item_minimum_duration
    When I submit minimum duration form with "60"
    Then I should see "60" in the input field task_item_minimum_duration
