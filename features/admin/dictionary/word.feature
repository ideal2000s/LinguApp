@javascript
Feature: Phrases page
  As a user
  I want our users to be able to CRUD phrases

  Background:
    Given I am admin
    Given these languages:
      | system_name | name      | code |
      | English     | English   | en   |
    Given these phrases:
      | body          | word_class    | description                             | frequency     | language   |
      | school        | noun          | an institution for educating children   | 3             | English    |
      | education     | noun          | an enlightening experience              | 4             | English    |

  Scenario: User creates a new phrase
    When I go to "English" language phrases page
    And Click add phrase button
    And Fill in the phrase form with following and submit:
      | prefix    | body          | description                                  | word_class     | frequency     |
      | a         | study         | look at closely in order to observe or read  | Verb           | 2             |
    Then I should see the phrase "study" in the phrases table

  Scenario: User creates a new phrase without the body and looks an error
    When I go to "English" language phrases page
    And Click add phrase button
    And Fill in the phrase form with following and submit:
      | prefix    | body          | description                                  | word_class     | frequency     |
      | a         |               | look at closely in order to observe or read  | Verb           | 2             |
    Then I should see the error "Body can't be blank"

  Scenario: User updates a phrase
    When I go to "English" language phrases page
    And Click phrase named "school"
    And Fill in the phrase form with following and submit:
      | prefix    | body          | description                                      | word_class     | frequency     |
      | a         | angry         | having a strong feeling of or showing annoyance  | Adjective      | 3             |
    Then I should see the phrase "angry" in the phrases table
    But I should not see the phrase "school" in the phrases table

  Scenario: User deletes phrases
    When I go to "English" language phrases page
    And I check all phrases checkbox
    And Click bulk delete button
    And Click ok on confirm dialog
    Then All the phrases should be deleted

  Scenario: User imports phrases from CSV
    When I go to "English" language phrases page
    And Click import button
    And Click upload csv button and choose csv in file select dialog
    Then I should see the "3 collections were imported." in the page

  Scenario: User imports phrases from text
    When I go to "English" language phrases page
    And Click import button
    And Fill in the text field with "I go"
    And click parse text button
    Then I should see the "2 words were imported." in the page
