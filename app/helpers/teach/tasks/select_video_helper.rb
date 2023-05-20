# frozen_string_literal: true

module Teach
  module Tasks
    module SelectVideoHelper
      def piperecorder(item)
        tag('pipe-recorder',
            'id' => dom_id(item, :recorder),
            'data-accounthash' => item.pipe_accounthash,
            'data-eid' => item.pipe_eid)
      end
    end
  end
end
