# frozen_string_literal: true

class ApplicationUploader < Shrine
  # TODO: remove in favor of create_on_promote option after release.
  class Attacher
    def promote(*)
      create_derivatives
      super
    end
  end

  private

  def need_cast?(record, base_class)
    record.is_a?(base_class) && !record.instance_of?(base_class)
  end
end
