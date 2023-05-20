@wip @javascript
Feature: Create a crawler
  As an admin
  I want to create crawler job to parse a website

  Scenario: Create crawler
    Given as admin I am on the new admin crawler page
    And Fill in the crawler form with following and submit:
      | url                             | language      |
      | https://translate.google.com/   | English       |
    Then I should see the "https://translate.google.com/" in the crawlers page
