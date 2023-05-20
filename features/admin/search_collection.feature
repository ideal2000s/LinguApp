@javascript
Feature: Search collections
  As a user
  I want our users to be able to search collections

  Background:
    Given I am admin
    Given these languages:
      | system_name | name      | code |
      | English     | English   | en   |
    Given these phrases:
      | body          | language   |
      | school        | English    |
      | education     | English    |
    Given these collections:
      | name          | level       | language   | phrases      |
      | colors        | a1          | English    | school       |
      | emotions      | b1          | English    | education    |

  Scenario: User searches collections by body
    When I go to "English" language collections page
    And Type "co" in collection search box and press enter
    Then I should see the collection "colors" in the collections table
    But I should not see the collection "emotions" in the collections table

  Scenario: User searches phrases by level
    When I go to "English" language collections page
    And Select "A1" in the level dropdown
    Then I should see the collection "colors" in the collections table
    But I should not see the collection "emotions" in the collections table

  Scenario: User searches collections by alphabetic
    When I go to "English" language collections page
    And Click "E" button
    Then I should see the collection "emotions" in the collections table
    But I should not see the collection "colors" in the collections table
