@javascript
Feature: Teach lesson management
  Background:
    Given I am team member
    And the following languages:
      | system_name | name      | code |
      | norwegian   | Norwegian | nb   |
      | english     | English   | en   |

    And the following lessons:
      | title      | language  |
      | Lesson One | norwegian |
      | Lesson Two | norwegian |

  Scenario: Team member can navigate to list of lessons
    When I am on the teach lessons page
    Then I can see lesson title "Lesson One"
    And I can see lesson title "Lesson Two"

  Scenario: Team member can create a lesson
    When I am on the new teach lesson page
    And I fill in new lesson form with following data:
      | title                   | language  |
      | Ruby Programming Lesson | Norwegian |
    Then I should be on teach lesson page
    And I can see lesson title "Ruby Programming Lesson"

  @wip
  Scenario: Team member can create tasks within a lesson

  Scenario: Team member can manage lesson glossary
    When I go to Glossary tab for the lesson "Lesson One"
    And I submit new lesson glossary phrase form with "Deep Purple"
    Then I should see glossary containing "deep purple" on the lesson "Lesson One"
    When I submit new lesson glossary phrase form with "Black Sabbath"
    Then I should see glossary containing "black sabbath, deep purple" on the lesson "Lesson One"

  Scenario: Team member can view lesson reviews
    Given I have a "Lesson Three" lesson
    And the following lesson reviews:
      | status   | content          | author       |
      | approved | Good job!        | John Smith   |
      | rejected | Could be better? | Jack Sparrow |
    When I go to the lesson review page
    Then I should see "Good job!" on the current page
    And I should see "Could be better?" on the current page

  @wip
  Scenario: Team member can publish lesson
