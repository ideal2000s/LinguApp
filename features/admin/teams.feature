@javascript
@wip
Feature: Team management

  Background:
    Given I am team owner

  Scenario: User can view teams
    When I am on profile page
    Then I should see "My teams" on the current page
    Then I should see default team name

  Scenario: User can create new team
    When I am on profile page
    And I click on New team link
    And I fill in new team form with following data:
      | name           |
      | Superstar Team |
    Then I should be on team onboarding page
    And I select abilities for team and submit
    Then I should see "Superstar Team" on the current page

  Scenario: User can edit a team
    When I am on profile page
    And I click on Edit button for default team
    And I change team name to "Superman team"
    Then I should see "Superman team" on the current page

#  Scenario: User can delete a team
#    When I am on profile page
#    And I click on New team link
#    And I fill in new team form with following data:
#      | name           |
#      | Superstar Team |
#    Then I should be on team onboarding page
#    And I select abilities for team and submit
#    Then I should see "Superstar Team" on the current page
#    Then I click on Edit button for "Superstar Team" team
#    And I click on Delete team link with confirmation
#    Then I should not see "Superstar team" on the current page
