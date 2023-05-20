# frozen_string_literal: true

module NavigationHelpers
  # Maps a name to a path. Used by the
  #
  #   When /^I go to (.+)$/ do |page_name|
  #
  # step definition
  #
  PATH_MATCH = {
    'home' => '/',
    'edit admin user' => proc { edit_admin_user_path(@user) },
    'edit teach lesson task' => proc { edit_teach_lesson_task_path(@lesson, @tasks.values.last) },
    'teach lesson' => proc { teach_lesson_path(@lesson) }
  }.freeze

  def path_to(page_name)
    path = PATH_MATCH.fetch(page_name) do
      method(page_name.split(/\s+/).push('path').join('_').to_sym)
    end
    path.is_a?(String) ? path : instance_eval(&path)
  rescue NoMethodError, ArgumentError
    raise "Can't find mapping from \"#{page_name}\" to a path.\n" \
              "Now, go and add a mapping in #{__FILE__}"
  end
end

World(NavigationHelpers)
