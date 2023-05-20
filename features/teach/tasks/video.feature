@javascript
Feature: new video task
  In order to create a new video task
  I need to submit form with valid data

  Background: initial data
    Given I am team member
    And the following languages:
      | system_name | name      | code |
      | norwegian   | Norwegian | nb   |
      | english     | English   | en   |
    And I have a "Ruby for Dummies" lesson
    And the following task:
      | name           | type         | subject |
      | Old Video Task | Tasks::Video | teach   |
    And the following items in task "Old Video Task":
      | url                        |
      | https://youtu.be/asdasdasd |

  Scenario: Create video task
    Given I am on the teach lesson page
    And I submit new task form for teach section with the following data:
      | Name           | Type  |
      | New Video Task | Video |
    Then I should be on edit teach task page

  Scenario: editing task configuration
    Given I am on edit teach lesson task page
    When I add video task item with "https://youtu.be/WBMHTboH6rA"
    Then I expect to see video task url in the input field task_item_url

  # TODO: run this when preview will be reimplemented
  @wip
  Scenario: preview video task
    Given I go to current teach lesson edit task page
    When I add video task item with "https://youtu.be/WBMHTboH6rA"
    And I preview the teach video task
    Then I should see teach video task preview
