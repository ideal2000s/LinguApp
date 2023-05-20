@javascript
Feature: Lesson Review

  Background:
    Given I am team member
    And the following languages:
      | system_name | name      | code |
      | norwegian   | Norwegian | nb   |
      | english     | English   | en   |
    And I have a "Lesson One" lesson
    And the following tasks:
      | name                | type                |
      | Fill in blanks task | Tasks::FillInBlanks |
      | Audio task          | Tasks::Audio        |

  # TODO: run this when preview will be reimplemented
  @wip
  Scenario: Team member can view lesson preview
    When I go to the lesson reviews page
    Then I should see lesson tasks preview

  Scenario: Team member can see other author reviews
    Given the following lesson reviews:
      | author              | content                | status   |
      | Jurgen Smirnoff     | Lesson content is good | approved |
      | Jack Frankenshuller | Could be better        | rejected |

    When I go to the lesson reviews page
    Then I should see lesson reviews

  Scenario: Team member can post lesson review
    Given I am another team member
    When I go to the lesson reviews page
    And I post lesson review as "Good job" with "approved" status
    Then I should see "Good job" in reviews list

  Scenario: Lesson author cannot submit a review
    When I go to the lesson reviews page
    Then I do not see a "Post Review" button
