@javascript
Feature: Collections page
  As a user
  I want our users to be able to manage collections

  Background:
    Given I am admin
    Given these languages:
      | system_name | name      | code |
      | English     | English   | em   |
    Given these phrases:
      | body          | language   |
      | school        | English    |
      | education     | English    |
    Given these collections:
      | name          | level       | language   | phrases      |
      | colors        | a1          | English    | school       |
      | emotions      | b1          | English    | education    |

  Scenario: User updates a collection
    When I go to "English" language collections page
    And I update collection "colors" with the following data:
      | name             | level       | language   | phrases      |
      | updatedColor     | A2          | English    | school       |
    Then I should see the collection "updatedColor" in the collections table
    But I should not see the collection "colors" in the collections table
