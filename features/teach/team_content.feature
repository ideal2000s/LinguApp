@javascript
@wip
Feature: Team Content

  Background:
    Given I am team member
    And the following languages:
      | system_name | name      | code |
      | norwegian   | Norwegian | nb   |
      | english     | English   | en   |

  Scenario: view lesson in team scope
    Given I have a "Flying" lesson in a "Batman" team
    And I have a "Swimming" lesson in a "Aquaman" team
    When I am on the teach lessons page
    And I switch to Batman team
    Then I should be on team onboarding page
    And I select abilities for team and submit
    Then I should see "Flying" on the current page
    Then I should not see "Swimming" on the current page
