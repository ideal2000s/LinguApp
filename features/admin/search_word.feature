@javascript
Feature: Search phrases
  As a user
  I want our users to be able to search phrases

  Background:
    Given I am admin
    Given these languages:
      | system_name | name      | code |
      | English     | English   | en   |
    Given these phrases:
      | body          | word_class    | description                             | frequency     | language   |
      | school        | noun          | an institution for educating children   | 3             | English    |
      | education     | verb          | an enlightening experience              | 4             | English    |

  Scenario: User searches phrases by body
    When I go to "English" language phrases page
    And Type "sch" in search box and press enter
    Then I should see the phrase "school" in the phrases table
    But I should not see the phrase "education" in the phrases table

  Scenario: User searches phrases by frequency
    When I go to "English" language phrases page
    And Select "4" in the frequency dropdown
    Then I should see the phrase "education" in the phrases table
    But I should not see the phrase "school" in the phrases table

  Scenario: User searches phrases by noun
    When I go to "English" language phrases page
    And Click "N" button
    Then I should see the phrase "school" in the phrases table
    But I should not see the phrase "education" in the phrases table

  Scenario: User searches phrases by verb
    When I go to "English" language phrases page
    And Click "V" button
    Then I should see the phrase "education" in the phrases table
    But I should not see the phrase "school" in the phrases table

  Scenario: User searches phrases by alphabetic
    When I go to "English" language phrases page
    And Click "E" button
    Then I should see the phrase "education" in the phrases table
    But I should not see the phrase "school" in the phrases table