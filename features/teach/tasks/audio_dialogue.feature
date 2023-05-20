@javascript
@wip
Feature: new audio dialogue task
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
      | name            | type                 |
      | My awesome task | Tasks::AudioDialogue |
    And we have the following audio items:
      | audio_file  |
      | audio_3.mp3 |
      | audio_2.mp3 |

  Scenario: Create audio dialogue task
    Given I go to current teach lesson new task page
    When I submit new task form with the following data:
      | Name     | Type                | Subject |
      | New Task | Audio Dialogue Task | English |
    Then I should be on edit teach task page

  @javascript
  Scenario: adding audio item
    Given I go to current teach lesson edit task page
    When I submit audio dialogue item form with the following data:
      | partner_name | audio_file |
      | Bob          | audio.mp3  |
    Then I should see "audio.mp3" on the page

  Scenario: change order
    Given I go to current teach lesson edit task page
    When I move "audio_2.mp3" item up
    Then item "audio_2.mp3" becomes the first
