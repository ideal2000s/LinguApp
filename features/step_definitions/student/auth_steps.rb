# frozen_string_literal: true

Given(/^I am(?: (?:an?|the))? student/) do
  @current_student = create(:student)
end

Given(/I sign in with google/) do
  @identity = create(:student_identity, student: @current_student, provider: 'google_student')
  mock_oauth(@identity, email: @current_student.email)
  visit "/auth/#{@identity.provider}"
end

Given(/\AI sign up with google\z/) do
  @identity = OpenStruct.new(
    provider: 'google_student',
    uid: 'some_uid'
  )
  mock_oauth(@identity)
  visit "/auth/#{@identity.provider}"
end

Given(/I sign up with google and get blank name/) do
  @identity = OpenStruct.new(
    provider: 'google_student',
    uid: 'some_uid'
  )
  mock_oauth(@identity, first_name: '', last_name: '')
  visit "/auth/#{@identity.provider}"
end

Given(/I should see student sign up page/) do
  expect(page).to have_content('Create account')
end

Given(/I should be able to finish student sign up/) do
  within 'form#new_student' do
    fill_in 'student_fname', with: 'First Name'
    fill_in 'student_lname', with: 'Last Name'
    fill_in 'student_password', with: 'password'
    fill_in 'student_password_confirmation', with: 'password'
    find('label[for=basic-register-checkbox]').click
    click_button 'Sign up'
  end

  # expect(page).to have_content('Welcome to Lingu, Student!')
  expect(page).to have_content("Sorry, Tor couldn't find this page")
end
