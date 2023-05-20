# frozen_string_literal: true

require 'csv'

Language.transaction do
  CSV.foreach(Rails.root.join('db/data', 'languages.csv')) do |row|
    Language.create_with(system_name: row[1], name: row[1]).find_or_create_by(code: row[0])
  end
end

Language.where(code: %w[en nb sv da fr es de]).update(active: true, support: true)

@skills = %w[listening reading speaking conversation pronunciation writing grammar].each_with_object({}) do |w, hash|
  s = Skill.find_by('name_translations ->> ? = ?', 'en', w)
  s ||= Skill.create(name_en: w)
  instance_variable_set("@#{w}_skill", s)
  hash[w.to_sym] = s
end

unless Rails.env.production?

  User.transaction do
    CSV.foreach(Rails.root.join('db', 'seed_users.csv')) do |row|
      user = User.create_with(
        fname: row[1],
        lname: row[2],
        role: row[4],
        status: row[5],
        password: SecureRandom.hex(4)
      ).find_or_create_by(email: row[0])
      user.identities.create(uid: row[3], provider: 'rowling')
    end
  end

  # Create admin user
  admin = User.create_with(
    fname: 'John',
    lname: 'Smith',
    password: 'password',
    role: 'admin',
    status: 'active'
  ).find_or_create_by(email: 'john@lingu.com')

  # Create client manager
  manager = User.create_with(
    fname: 'Henry',
    lname: 'Fogg',
    password: 'password',
    role: 'basic',
    status: 'active'
  ).find_or_create_by(email: 'henry@brakebills.com')

  # Create lesson author
  author = User.create_with(
    fname: 'Quentin',
    lname: 'Coldwater',
    password: 'password',
    role: 'basic',
    status: 'active'
  ).find_or_create_by(email: 'quentin@brakebills.com')

  Student.transaction do
    CSV.foreach(Rails.root.join('db', 'seed_students.csv')) do |row|
      student = Student.create_with(
        fname: row[1].titleize,
        lname: row[2].titleize,
        locale: row[5],
        gender: row[3],
        mobile: row[4],
        ssn: row[6],
        password: 'password'
      ).find_or_create_by(email: row[0])
    end
  end

  team = Team.create(owner: admin, name: 'Team #1')

  team.users << manager
  team.users << author

  # Create lessons
  lesson = Lesson.create(
    title: 'Casting spells 101',
    team: team,
    author: author,
    language_id: Language.all.sample.id,
    level: :a1,
    objectives: ['Learn basic fingerwork', 'Cast the first flash spell'],
    status: :approved,
    published: true,
    skill_ids: [@writing_skill.id, @conversation_skill.id]
  )
  lesson2 = Lesson.create(
    title: 'The quest for the 7 golden keys chapter 1',
    team: team,
    author: author,
    language_id: Language.all.sample.id,
    level: :a1,
    kind: :storyline,
    objectives: ['fetch the first key'],
    skill_ids: [@writing_skill.id, @conversation_skill.id]
  )
  lesson3 = Lesson.create(
    title: 'The quest for the 7 golden keys chapter 2',
    team: team,
    author: author,
    language_id: Language.all.sample.id,
    parent_id: lesson2.id,
    level: :a1,
    kind: :storyline,
    objectives: ['Unlock the first door', 'Fetch the second key'],
    skill_ids: [@writing_skill.id, @conversation_skill.id]
  )

  # Create Multiple choice task
  task = Tasks::SelectText.create(
    name: 'Fillory quiz',
    introduction: 'Answer the questions below.',
    performance: 1.0,
    complexity: 'low',
    published: true,
    subject: 0,
    lesson_id: lesson.id
  )

  item = task.items.create(
    question: 'Where is Anchorage?'
  )
  item.options.create([
                        {
                          correct: true,
                          answer: 'America'
                        }, {
                          correct: false,
                          answer: 'Africa'
                        }, {
                          correct: false,
                          answer: 'Asia'
                        }
                      ])
  item = task.items.create(
    question: 'Where is Yakutia?'
  )
  item.options.create([
                        {
                          correct: false,
                          answer: 'America'
                        }, {
                          correct: false,
                          answer: 'Africa'
                        }, {
                          correct: true,
                          answer: 'Asia'
                        }
                      ])
  item = task.items.create(
    question: "Why don't polar bears eat penguins?"
  )
  item.options.create([
                        {
                          correct: false,
                          answer: 'Penguins taste bad'
                        }, {
                          correct: false,
                          answer: 'Penguins swim too fast.'
                        }, {
                          correct: true,
                          answer: "It's too far to swim to the south pole."
                        }
                      ])

  # Create Multiple choice Image task
  t1 = Tasks::SelectImage.create(
    name: 'Fillory quiz 2',
    introduction: 'Select the correct image to the questions',
    performance: 1.0,
    complexity: 'low',
    published: true,
    subject: 0,
    lesson_id: lesson3.id
  )
  item = t1.items.create(question: 'Which image is from New York?')
  %w[image_1.jpg image_2.jpg image_3.jpg].each_with_index do |image, i|
    item.options.create(correct: i.zero?, image: File.open(Rails.root.join('db', 'fixtures', image)))
  end

  item = t1.items.create(question: 'Which continent is this image from?')
  %w[image_4.jpg image_5.jpg image_6.jpg].each_with_index do |image, i|
    item.options.create(correct: i == 2, image: File.open(Rails.root.join('db', 'fixtures', image)))
  end

  # Create Essay task
  t2 = Tasks::Essay.create(
    name: 'Introduce yourself to the world!',
    introduction: 'Write a 100 word essay about who you are and where you come from.',
    performance: 1.0,
    score_method: 'manual',
    complexity: 'medium',
    published: true,
    subject: 0,
    lesson_id: lesson.id
  )
  t2.items.create(
    minimum_words: '100'
  )

  # Create Email task
  t3 = Tasks::Email.create(
    name: 'Your first email!',
    introduction: 'Write an email to a hedge witch.',
    performance: 1.0,
    score_method: 'manual',
    complexity: 'medium',
    published: true,
    subject: 0,
    lesson_id: lesson.id
  )
  t3.items.create(
    minimum_words: '30',
    from_name: '',
    from_email: '',
    body: ''
  )

  # Create Audio task
  t4 = Tasks::Audio.create(
    name: 'Introduce yourself to the magic world!',
    introduction: 'Tell me about the weather where you are right now.',
    performance: 1.0,
    complexity: 'medium',
    score_method: 'manual',
    published: true,
    subject: 0,
    lesson_id: lesson.id
  )
  t4.items.create(
    minimum_duration: '60'
  )

  # Create SMS task
  t5 = Tasks::SMS.create(
    name: 'Introduce yourself to the world!',
    introduction: 'Reply to programmatic messaging team',
    performance: 1.0,
    complexity: 'medium',
    score_method: 'manual',
    published: true,
    subject: 1,
    lesson_id: lesson2.id
  )
  t5.items.create(
    message: 'Hello, there!',
    partner_name: 'Christopher Plover'
  )

  t6 = Tasks::SMS.new(
    name: 'Texting with Ember & Umber',
    introduction: '',
    performance: 1.0,
    complexity: 'high',
    score_method: 'manual',
    published: true,
    subject: 1,
    lesson_id: lesson2.id
  )
  t6.items.new(
    partner_name: 'Ember',
    message: 'Did you finish your assigned task? B.'
  )
  t6.items.new(
    partner_name: 'Umber',
    message: 'Ok. You will get new tasks as of tomorrow anyway. Talk soon.'
  )
  t6.save!

  # Create True/false task
  t7 = Tasks::TrueFalse.create(
    name: 'Are these spells good or evil?',
    introduction: 'Answer good or evil to each statement',
    performance: 1.0,
    complexity: 'low',
    published: true,
    subject: 1,
    lesson_id: lesson3.id
  )
  t7.items.create(
    statement: 'Bilberries, also nearly black berries found in nutrient-poor soils.', veracity: true
  )
  t7.items.create(
    statement: 'Bilberries are also know as cloud berries.', veracity: false
  )

  # Create Fill in blanks task
  t8 = Tasks::FillInBlanks.create(
    name: 'Which verb fits the text',
    introduction: 'Find the missing words in the texts below.',
    performance: 1.0,
    complexity: 'high',
    published: true,
    subject: 1,
    lesson_id: lesson.id
  )
  t8.items.create(
    question: 'John *speaks:talks:writes* English with his friend.'
  )
  t8.items.create(
    question: 'Lisa *wrote* a letter to her friend.'
  )

  # Create Inline dropdown task
  t9 = Tasks::InlineDropdown.create(
    name: 'Which verb fits the incantation',
    introduction: 'Find the missing words in the texts below.',
    performance: 1.0,
    complexity: 'high',
    published: true,
    subject: 1,
    lesson_id: lesson.id
  )
  t9.items.create(
    statement: 'John *select:speaks/speak/spoke* English with his friend.'
  )
  t9.items.create(
    statement: 'Lisa *select:wrote/written/writes* a letter to her friend.'
  )

  # Create Mark word task
  t10 = Tasks::MarkWord.create(
    name: 'Find the adjectives',
    introduction: 'Which adjectives can you find in the text?',
    performance: 1.0,
    complexity: 'high',
    published: true,
    subject: 1,
    lesson_id: lesson.id
  )
  t10.items.create(
    statement: 'Bilberries, also nearly *black* berries found in *nutrient-poor* soils.'
  )
  t10.items.create(
    statement: 'Lisa sent a *short* letter to her *best* friend.'
  )

  # Create Arrange words tasks
  t11 = Tasks::ArrangeWords.new(
    name: 'Put these words into a correct sentence',
    introduction: '',
    performance: 1.0,
    complexity: 'high',
    score_method: 'fractional',
    published: true,
    subject: 1,
    lesson_id: lesson.id
  )
  t11.items.new(
    arrange_words: 'Polar bears do not eat penguins.',
    additional_words: 'horrid foul grunt'
  )
  t11.save!

  t12 = Tasks::ArrangeWords.new(
    name: 'Put these words into a working incantation',
    introduction: '',
    performance: 1.0,
    complexity: 'high',
    score_method: 'fractional',
    published: true,
    subject: 1,
    lesson_id: lesson.id
  )
  t12.items.new(
    arrange_words: 'Lisa does her homework.',
    additional_words: 'hopelessly void'
  )
  t12.save!

  t13 = Tasks::Text.new(
    name: 'Welcome to Fillory',
    introduction: '',
    performance: 1.0,
    complexity: 'high',
    score_method: 'no_score',
    published: true,
    subject: 1,
    lesson_id: lesson2.id
  )
  t13.items.new(
    content: 'Welcome, Child of Earth to Fillory! Both the planet and the kingdom.) Wonders, dangers, inscrutable creatures and magical mysteries await you. Explore with caution...</p>'
  )
  t13.save!

  t14 = Tasks::Video.new(
    name: 'Beautiful world',
    introduction: 'Watch the video',
    performance: 1.0,
    complexity: 'high',
    score_method: 'no_score',
    published: true,
    subject: 1,
    lesson_id: lesson2.id
  )
  t14.items.new(
    url: 'https://www.youtube.com/embed/kJQbPswf4Aw'
  )
  t14.save!
end
