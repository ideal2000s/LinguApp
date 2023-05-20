# frozen_string_literal: true

module Teach
  class CourseSectionsController < ApplicationController
    def create
      course_section = scope.new
      course_section.save
      render :create, locals: { section_index: course.course_sections.count, course_section: course_section, course: course }
    end

    def destroy
      course_section.destroy
      respond_to do |f|
        f.html { redirect_to teach_course_path(course) }
      end
    end

    def update
      respond_to do |f|
        if course_section.update(section_params)
          f.json { respond_with_bip(course_section) }
        else
          f.json { head :unprocessable_entity }
        end
      end
    end

    def add_lesson
      lesson.update!(course_section: course_section)
      render :add_lesson, locals: { lesson: lesson, course_section: course_section, course: course }
    end

    def remove_lesson
      lesson.update!(course_section: nil)
      render :remove_lesson, locals: { lesson: lesson, course_section: course_section }
    end

    def move_up
      course_section.move_higher
      head :ok
    end

    def move_up_lesson
      if lesson.first?
        prev_section = course_section.higher_item
        move_lesson_to_other_section(params[:lesson_id], prev_section) if prev_section.present?
      else
        lesson.move_higher
      end
      render :reorder_lessons, locals: { course: course, sections: scope }
    end

    def move_down_lesson
      if lesson.last?
        next_section = course_section.lower_item
        move_lesson_to_other_section(params[:lesson_id], next_section, 'down') if next_section.present?
      else
        lesson.move_lower
      end
      render :reorder_lessons, locals: { course: course, sections: scope }
    end

    private

    def section_params
      params.require(:course_section).permit(:name)
    end

    def course
      @course ||= Course.kept.friendly.find(params[:course_id])
    end

    def scope
      course.course_sections
    end

    def course_section
      @course_section ||= scope.find(params[:id])
    end

    def lesson
      @lesson ||= Lesson.find(params[:lesson_id])
    end

    def move_lesson_to_other_section(lesson_id, course_section, direction = 'up')
      lesson = Lesson.find(lesson_id)
      lesson.update!(course_section: course_section)
      lesson.move_to_top if direction == 'down'
    end
  end
end
